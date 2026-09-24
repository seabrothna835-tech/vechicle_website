import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import GetFee from "./GetFee";
import Alert from "./alert/Alert";

const formatPrice = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

// All theme classes in one place, so the components below stay readable
const getTheme = (isDark) => ({
    panel: isDark
        ? "border-slate-700/80 bg-slate-900 text-slate-100 shadow-black/40"
        : "border-slate-200 bg-white text-slate-800 shadow-slate-900/10",
    muted: isDark ? "text-slate-400" : "text-slate-500",
    divider: isDark ? "border-slate-700/80" : "border-slate-200",
    input: isDark
        ? "bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-emerald-400"
        : "bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-emerald-500",
    stepper: isDark
        ? "border-slate-700 bg-slate-800 text-slate-200 hover:border-emerald-400 hover:bg-slate-700"
        : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50",
});

const primaryButton =
    "w-full rounded-xl bg-gradient-to-r from-lime-300 to-emerald-400 py-3 font-semibold text-slate-900 transition hover:brightness-105 active:scale-[0.99]";

function QuantityStepper({ value, onChange, theme }) {
    const btn = `h-9 w-9 rounded-lg border text-lg leading-none transition ${theme.stepper}`;

    return (
        <div className="flex items-center gap-3">
            <button type="button" className={btn} onClick={() => onChange(Math.max(1, value - 1))}>
                −
            </button>
            <span className="w-8 text-center font-medium">{value}</span>
            <button type="button" className={btn} onClick={() => onChange(Math.min(99, value + 1))}>
                +
            </button>
        </div>
    );
}

function CartForm({ item, theme, onSubmit }) {
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ item, quantity });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between">
                <span className={theme.muted}>Quantity</span>
                <QuantityStepper value={quantity} onChange={setQuantity} theme={theme} />
            </div>

            <div className={`flex items-center justify-between border-t pt-4 ${theme.divider}`}>
                <span className={theme.muted}>Total</span>
                <span className="text-xl font-bold">{formatPrice(item.purchasePrice * quantity)}</span>
            </div>

            <button type="submit" className={primaryButton}>
                Start booking
            </button>
        </form>
    );
}

/* =========================================================================
   Modal
   ========================================================================= */
export function BookingItem({
    isOpen,
    onClose,
    item,
    onAddToCart,
}) {
    const isDark = useSelector((state)=>state.data.isDark)
    const isAuthenticated = useSelector((state) => state.data.isAuthenticated)
    const theme = getTheme(isDark);
    const [showFee, setShowFee] = useState(false);
    const [warning, setWarning] = useState("");

    // Close with the Escape key
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen || !item) return null;

    if (showFee) {
        return <GetFee open booking={showFee} onClose={onClose} />;
    }

    const handleCart = (data) => {
        if (!isAuthenticated) {
            setWarning("Please log in before checking out.");
            window.setTimeout(() => setWarning(""), 2500);
            return;
        }
        onAddToCart?.(data);
        setShowFee({
            ...data.item,
            quantity: data.quantity,
            totalPrice: data.item.purchasePrice * data.quantity,
        });
    };

    return (
        <>
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={item.name}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md space-y-5 rounded-3xl border p-5 shadow-2xl sm:p-6 ${theme.panel}`}
            >
                {/* Item summary */}
                <div className={`flex items-center gap-3 rounded-2xl border p-3 ${isDark ? "border-slate-700/80 bg-slate-800/70" : "border-slate-200 bg-slate-50"}`}>
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-lime-300 to-emerald-400 shadow-sm">
                            {(item.image ?? item.pic) && (
                                <img src={item.image ?? item.pic} alt="" className="h-full w-full object-cover" />
                            )}
                    </div>
                    <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-bold">{item.name}</p>
                            <p className={`mt-1 text-sm ${theme.muted}`}>{formatPrice(item.purchasePrice)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                            className={`rounded-xl p-2 text-2xl leading-none transition hover:bg-black/5 ${theme.muted}`}
                    >
                        <TiDeleteOutline />
                    </button>
                </div>
                <CartForm item={item} theme={theme} onSubmit={handleCart} />
            </div>
        </div>
        {warning && <Alert message={warning} type="warning" />}
        </>
    );
}