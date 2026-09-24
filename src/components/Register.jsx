import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaCar } from "react-icons/fa6";

export default function Register({
    open = true,
    onClose = () => { },
    onSubmit = async () => { },
    onSwitch = () => { },
}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const closeRef = useRef(null);
    const isDark = useSelector((state)=>state.data.isDark)

    useEffect(() => {
        if (open) {
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirm("");
            setAgree(false);
            setError("");
            setLoading(false);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        closeRef.current?.focus();
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const t = isDark
        ? {
            card: "border-slate-800 bg-slate-900/95",
            title: "text-white",
            sub: "text-slate-400",
            label: "text-slate-300",
            input: "border-slate-700 bg-slate-950/60 text-white placeholder:text-slate-500 focus:border-blue-500",
            divider: "border-slate-800",
            muted: "text-slate-400",
            link: "text-blue-400 hover:text-blue-300",
            closeBtn: "text-slate-400 hover:bg-slate-800 hover:text-white",
            barTrack: "bg-slate-800",
        }
        : {
            card: "border-slate-200 bg-white",
            title: "text-slate-900",
            sub: "text-slate-500",
            label: "text-slate-700",
            input: "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-600",
            divider: "border-slate-200",
            muted: "text-slate-500",
            link: "text-blue-600 hover:text-blue-700",
            closeBtn: "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
            barTrack: "bg-slate-100",
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim().length < 2) return setError("Enter your full name.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        if (password !== confirm) return setError("Passwords don't match.");
        if (!agree) return setError("You need to accept the terms to continue.");
        setError("");
        setLoading(true);
        try {
            const data = { name, email, phone, password };
            const storedUser = localStorage.getItem("user");
            const oldUser = storedUser ? JSON.parse(storedUser) : null;

            if (oldUser?.email?.toLowerCase() === email.trim().toLowerCase()) {
                setError("An account with this email already exists.");
                return;
            }

            await onSubmit(data);
            localStorage.setItem("user", JSON.stringify(data));
            onClose();
        } catch (err) {
            setError(err?.message || "Couldn't create your account. Try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="register-modal-title"
                className={`w-full max-w-sm rounded-t-2xl border p-7 shadow-2xl sm:rounded-2xl ${t.card} max-h-[90vh] overflow-y-auto`}
            >
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl text-blue-500">
                            <FaCar />
                        </div>
                        <span className={`text-sm font-semibold tracking-tight ${t.title}`}>Vechicle</span>
                    </div>
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        aria-label="Close"
                        className={`rounded-md p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${t.closeBtn}`}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </div>

                <h2 id="register-modal-title" className={`text-xl font-bold ${t.title}`}>
                    Create account
                </h2>

                {error && (
                    <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                    <div>
                        <label htmlFor="reg-name" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Full name
                        </label>
                        <input
                            id="reg-name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Sok Dara"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${t.input}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="reg-email" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Email
                        </label>
                        <input
                            id="reg-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${t.input}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="reg-phone" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Phone <span className={t.muted}>(optional)</span>
                        </label>
                        <input
                            id="reg-phone"
                            type="tel"
                            autoComplete="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+855 12 345 678"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${t.input}`}
                        />
                    </div>

                    <div>
                        <label htmlFor="reg-password" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="reg-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full rounded-lg border px-3.5 py-2.5 pr-10 text-sm outline-none transition-colors ${t.input}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.muted}`}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.5 5.1A10.4 10.4 0 0 1 12 5c5 0 9 4 10 7-.4 1.2-1.2 2.5-2.3 3.6M6.1 6.6C4 8 2.5 10 2 12c1 3 5 7 10 7 1.2 0 2.4-.2 3.5-.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="reg-confirm" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Confirm password
                        </label>
                        <input
                            id="reg-confirm"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            placeholder="••••••••"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${t.input}`}
                        />
                    </div>

                    <label className={`flex items-start gap-2 text-sm ${t.muted}`}>
                        <input
                            type="checkbox"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                        />
                        <span>
                            I agree to the <span className={t.link}>Terms of Service</span> and{" "}
                            <span className={t.link}>Privacy Policy</span>.
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
                    >
                        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                        {loading ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <div className={`mt-6 border-t pt-4 text-center text-sm ${t.divider} ${t.muted}`}>
                    Already have an account?{" "}
                    <button onClick={onSwitch} className={`font-medium ${t.link}`}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}