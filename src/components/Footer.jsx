import {
	FaCar,
	FaEnvelope,
	FaPhone,
	FaLocationDot,
	FaFacebookF,
	FaInstagram,
	FaYoutube,
} from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { useSelector } from "react-redux";

const columns = [
	{
		title: "Explore",
		links: [
			{ label: "Home", href: "/#home-content" },
			{ label: "Popular", href: "/#popular-page" },
			{ label: "About", href: "/#about-page" },
			{ label: "Contact", href: "/#contact-page" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About Us", href: "/#about-page" },
			{ label: "Contact", href: "/#contact-page" },
			{ label: "Help Center", href: "#" },
			{ label: "FAQ", href: "/faq" },
		],
	},
];

const socials = [
	{ icon: FaFacebookF, label: "Facebook", href: "#" },
	{ icon: FaInstagram, label: "Instagram", href: "#" },
	{ icon: FaTelegramPlane, label: "Telegram", href: "https://t.me/+855965668263" },
	{ icon: FaYoutube, label: "YouTube", href: "#" },
];

const linkClass =
	"text-sm text-slate-600 transition-colors hover:text-blue-600 focus:outline-none focus-visible:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 dark:focus-visible:text-blue-400";

export default function Footer() {
	const isDark = useSelector((state)=>state.dark.isDark)
	return (
		<footer className={`border-t border-slate-200 ${isDark? "bg-[#10274B] text-darktext":"bg-[#FFFFFF] text-lighttext"}`}>
			<div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
				{/* Brand */}
				<div>
					<a href="/" className="inline-flex items-center gap-2">
						<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
							<FaCar size={18} />
						</span>
						<span className="text-xl font-bold text-slate-900 dark:text-white">Vechicle</span>
					</a>
					<p className="mt-4 max-w-xs text-sm leading-relaxed">
						A modern vehicle platform that makes buying, selling, and discovering vehicles simple
						and convenient.
					</p>
					<div className="mt-5 flex gap-2">
						{socials.map(({ icon: Icon, label, href }) => (
							<a
								key={label}
								href={href}
								aria-label={label}
								target="_blank"
								className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 transition hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-blue-500/15 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white"
							>
								<Icon size={16} />
							</a>
						))}
					</div>
				</div>

				{/* Link columns */}
				{columns.map((col) => (
					<nav key={col.title} aria-label={col.title}>
						<h3 className="text-sm font-semibold text-slate-900 dark:text-white">{col.title}</h3>
						<ul className="mt-4 space-y-3">
							{col.links.map((l) => (
								<li key={l.label}>
									<a href={l.href} className={linkClass} target="_blank" rel="noopener noreferrer">
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				))}

				{/* Contact */}
				<div>
					<h3 className="text-sm font-semibold text-slate-900 dark:text-white">Contact Us</h3>
					<ul className="mt-4 space-y-3 text-sm">
						<li className="flex items-start gap-3">
							<FaLocationDot size={16} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
							<span>Phnom penh, Cambodia</span>
						</li>
						<li className="flex items-center gap-3">
							<FaPhone size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
							<a href="tel:+000000000" className={linkClass}>
								+93 444 534
							</a>
						</li>
						<li className="flex items-center gap-3">
							<FaEnvelope size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
							<a href="mailto:seabrothna0@gmail.com" className={linkClass}>
								vechicle168@gmail.com
							</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-slate-200 dark:border-slate-800">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs sm:flex-row">
					<p>© {new Date().getFullYear()} Vechicle. All rights reserved.</p>
					<div className="flex gap-5">
						<a href="/privacy" className={linkClass}>
							Privacy Policy
						</a>
						<a href="/terms" className={linkClass}>
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}