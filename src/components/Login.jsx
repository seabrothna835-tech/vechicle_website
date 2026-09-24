import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticated } from "../Store/Filter/DarkSlice";

export default function Login({
    open = true,
    onClose = () => { },
    onSubmit = async () => { },
    onSwitch = () => { }
}) {
    const isDark = useSelector((state)=>state.data.isDark)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const closeRef = useRef(null);
    

    useEffect(() => {
        if (open) {
            setEmail("");
            setPassword("");
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
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        setError("");
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("user");
            const registeredUser = storedUser ? JSON.parse(storedUser) : null;
            const emailMatches = registeredUser?.email?.trim().toLowerCase() === email.trim().toLowerCase();

            if (!registeredUser || !emailMatches || registeredUser.password !== password) {
                throw new Error("Email or password is incorrect.");
            }

            await onSubmit({ email, password, remember });
            dispatch(setAuthenticated(true));
            onClose();
        } catch (err) {
            setError(err?.message || "Couldn't sign in. Check your details and try again.");
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
                aria-labelledby="login-modal-title"
                className={`w-full max-w-sm rounded-t-2xl border p-7 shadow-2xl sm:rounded-2xl ${t.card}`}
            >
                <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-blue-500">
                            <path d="M3 13l1.6-4.8A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.2L21 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 13h18v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-11v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <circle cx="7.5" cy="17.5" r="1.4" fill="currentColor" />
                            <circle cx="16.5" cy="17.5" r="1.4" fill="currentColor" />
                        </svg>
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

                <h2 id="login-modal-title" className={`text-xl font-bold ${t.title}`}>
                    Sign in
                </h2>
                <p className={`mt-1 text-sm ${t.sub}`}>Access your fleet and bookings.</p>

                {error && (
                    <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                    <div>
                        <label htmlFor="login-email" className={`mb-1.5 block text-sm font-medium ${t.label}`}>
                            Email
                        </label>
                        <input
                            id="login-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${t.input}`}
                        />
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label htmlFor="login-password" className={`block text-sm font-medium ${t.label}`}>
                                Password
                            </label>
                            <button type="button" className={`text-xs font-medium ${t.link}`}>
                                Forgot password?
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
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

                    <label className={`flex items-center gap-2 text-sm ${t.muted}`}>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                        />
                        Keep me signed in
                    </label>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-70"
                    >
                        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />}
                        {loading ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <div className={`mt-6 border-t pt-4 text-center text-sm ${t.divider} ${t.muted}`}>
                    Don't have an account?{" "}
                    <button onClick={onSwitch} className={`font-medium ${t.link}`}>
                        Create account
                    </button>
                </div>
            </div>
        </div>
    );
}