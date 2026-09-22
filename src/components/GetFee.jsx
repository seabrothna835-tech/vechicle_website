import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const TIMEOUT_SECONDS = 120;
const DEPOSIT_RATE = 0.3;

const mockGetFee = async (booking) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    const total = booking?.totalPrice ?? booking?.purchasePrice ?? 0;
    return { amount: total * DEPOSIT_RATE, total, currency: "USD", qrImage: null };
};

function PlaceholderQR({ seed = "fee" }) {
    const size = 25;
    const cells = useMemo(() => {
        let hash = 0;
        for (const character of seed) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
        const result = [];
        for (let y = 0; y < size; y += 1) {
            for (let x = 0; x < size; x += 1) {
                const inFinder = (x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9);
                if (inFinder) continue;
                hash = (hash * 1664525 + 1013904223) >>> 0;
                if (hash & 0x10000) result.push([x, y]);
            }
        }
        return result;
    }, [seed]);

    const finder = (offsetX, offsetY) => (
        <g key={`${offsetX}-${offsetY}`}>
            <rect x={offsetX} y={offsetY} width="7" height="7" fill="#111" />
            <rect x={offsetX + 1} y={offsetY + 1} width="5" height="5" fill="#fff" />
            <rect x={offsetX + 2} y={offsetY + 2} width="3" height="3" fill="#111" />
        </g>
    );

    return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full" shapeRendering="crispEdges" role="img" aria-label="Sample QR code">
            <rect width={size} height={size} fill="#fff" />
            {cells.map(([x, y]) => <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />)}
            {finder(0, 0)}
            {finder(size - 7, 0)}
            {finder(0, size - 7)}
        </svg>
    );
}

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

export default function GetFee({ 
    open = true, 
    onClose = () => { }, 
    booking, 
    getFee = mockGetFee, 
    onExpired = () => { } }) {
    const [step, setStep] = useState("loading");
    const [fee, setFee] = useState(null);
    const [left, setLeft] = useState(TIMEOUT_SECONDS);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState("");
    const closeRef = useRef(null);

    const requestFee = useCallback((showLoading = true) => {
        if (showLoading) setStep("loading");
        getFee(booking)
            .then((result) => {
                if (!result || typeof result.amount !== "number" || !result.currency) throw new Error("Invalid fee response");
                setFee(result);
                setLeft(TIMEOUT_SECONDS);
                setStep("pay");
            })
            .catch(() => setStep("error"));
    }, [booking, getFee]);

    useEffect(() => {
        if (open) requestFee(false);
    }, [open, requestFee]);

    useEffect(() => {
        if (step !== "pay") return undefined;
        const timer = setInterval(() => setLeft((seconds) => seconds - 1), 1000);
        return () => clearInterval(timer);
    }, [step]);

    useEffect(() => {
        if (step !== "pay" || left > 0) return undefined;
        setStep("expired");
        onExpired();
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [left, step, onClose, onExpired]);

    useEffect(() => {
        if (!open) return undefined;
        closeRef.current?.focus();
        const handleKeyDown = (event) => event.key === "Escape" && onClose();
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, onClose]);

    if (!open) return null;

    const percentage = Math.max(0, left / TIMEOUT_SECONDS);
    const urgent = left <= 20;

    const money = (n) => `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    const bookingFee = booking.totalPrice * 0.3;
    const telegramMessage = [
        "============ ការកក់ថ្មី ============",
        "",
        `🆔 លេខកូដ: ${booking.id}`,
        `🚘 ឈ្មោះរថយន្ត: ${booking.name}`,
        `🏷️ ម៉ាក: ${booking.brand}`,
        `🚙 ម៉ូដែល: ${booking.model}`,
        `🚗 ប្រភេទរថយន្ត: ${booking.category}`,
        `📅 ឆ្នាំផលិត: ${booking.year}`,
        `⛽ ប្រេងឥន្ធនៈ: ${booking.fuel}`,
        `⚙️ ប្រអប់លេខ: ${booking.transmission}`,
        `🛣️ ចំងាយបើក: ${Number(booking.mileage).toLocaleString("en-US")} km`,
        `📊 ស្ថានភាព: ${booking.status}`,
        "",
        `🔢 ចំនួនកក់: ${booking.quantity}`,
        `💵 តម្លៃកក់: ${money(bookingFee)}`,
        `💰 តម្លៃសរុប: ${money(booking.totalPrice)}`,
        "==================================",
    ].join("\n");
    const handleSubmit = async () => {
        if (isSending) return;
        setIsSending(true);
        setSendError("");
        try {
            const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
            const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

            if (!token || !chatId) {
                throw new Error("Telegram is not configured");
            }

            const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                }),
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null);
                throw new Error(result?.description || result?.error || `Request failed (${response.status})`);
            }
            onClose();
        } catch (error) {
            setSendError(error.message || "Could not send the booking. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div role="dialog" aria-modal="true" aria-labelledby="payment-qr-title" className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <h2 id="payment-qr-title" className="text-lg font-semibold text-slate-900">Payment QR code</h2>
                    <button type="button" ref={closeRef} onClick={onClose} aria-label="Close payment dialog" className="rounded-lg px-2 py-1 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700">&times;</button>
                </div>

                {step === "loading" && <div className="px-5 py-12 text-center text-sm text-slate-600" role="status">Preparing your payment fee...</div>}

                {step === "error" && (
                    <div className="px-5 py-8 text-center" role="alert">
                        <p className="font-medium text-red-600">We could not get the payment fee.</p>
                        <button type="button" onClick={requestFee} className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">Try again</button>
                    </div>
                )}

                {step === "pay" && fee && (
                    <div className="px-5 py-6 text-center">
                        <p className="text-sm text-slate-500">30% booking deposit</p>
                        <p className="mb-4 text-3xl font-semibold tabular-nums text-slate-900">{fee.amount.toFixed(2)} <span className="text-lg font-medium text-slate-500">{fee.currency}</span></p>
                        <p className="mb-4 text-sm text-slate-500">Total price: {fee.total?.toFixed(2) ?? "-"} {fee.currency}</p>
                        <div className="mx-auto h-52 w-52 rounded-xl border border-slate-200 bg-white p-2">
                            {fee.qrImage ? <img src={fee.qrImage} alt="Payment QR code" className="h-full w-full object-contain" /> : <PlaceholderQR seed={`${booking?.name ?? "booking"}${fee.amount}`} />}
                        </div>
                        <p className="mt-3 text-sm text-slate-600">Scan with your banking app to pay.</p>
                        {sendError && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{sendError}</p>}
                        <button type="button" onClick={handleSubmit} disabled={isSending} className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
                            {isSending ? "Sending booking..." : "Send booking request"}
                        </button>
                        <div className="mt-4" aria-live="off">
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${urgent ? "bg-red-500" : "bg-blue-600"}`} style={{ width: `${percentage * 100}%` }} /></div>
                            <p className={`mt-2 text-sm tabular-nums ${urgent ? "font-medium text-red-600" : "text-slate-500"}`}>QR expires in {formatTime(Math.max(left, 0))}</p>
                        </div>
                    </div>
                )}

                {step === "expired" && <div role="status" className="px-5 py-8 text-center"><p className="font-semibold text-slate-900">QR code expired</p><p className="mt-1 text-sm text-slate-500">Closing...</p></div>}
                {step !== "expired" && <div className="border-t border-slate-200 bg-slate-50 px-5 py-3"><button type="button" onClick={onClose} className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">Close</button></div>}
            </div>
        </div>
    );
}
