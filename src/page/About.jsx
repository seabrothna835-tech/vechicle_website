import { useEffect, useState } from "react";
import {
	Target,
	Binoculars,
	Car,
	Search,
	ShieldCheck,
	Coins,
	Heart,
	Smartphone
} from "lucide-react";
import { useSelector } from "react-redux";

const benefits = [
	{ icon: Car, title: "Wide Vehicle Selection", text: "Browse different brands, models, and categories." },
	{ icon: Search, title: "Easy Search", text: "Quickly find vehicles using advanced filters." },
	{ icon: ShieldCheck, title: "Trusted & Secure", text: "Protect your data and vehicle information." },
	{ icon: Coins, title: "Competitive Prices", text: "Find vehicles at reasonable prices." },
	{ icon: Heart, title: "Save Favorites", text: "Registered users can save vehicles they like." },
	{ icon: Smartphone, title: "Easy to Use", text: "Simple and responsive interface on all devices." },
];

function Eyebrow({ children, className = "" }) {
	return (
		<p
			className={`text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 ${className}`}
		>
			{children}
		</p>
	);
}

export default function AboutPage() {
	const isDark = useSelector((state)=>state.data.isDark)
	return (
		<div className={`min-h-screen ${isDark? "bg-darkBG text-darktext":"bg-[#F3F7FB] text-lighttext"}`}>
			{/* About */}
			<section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:py-16 scroll-pop">
				<div>
					<Eyebrow>Who we are</Eyebrow>
					<h1 className={`mt-2 text-4xl font-bold tracking-tight ${isDark? "text-darktext":"text-lighttext"} md:text-5xl`}>
						About Vechicle
					</h1>
					<p className="mt-5 max-w-md leading-relaxed">
						Vechicle is a modern vehicle platform designed to make buying, selling, and discovering
						vehicles simple and convenient. We provide users with an easy way to explore vehicles by
						category, brand, model, fuel type, price, and availability.
					</p>
					<p className="mt-4 max-w-md leading-relaxed">
						Our goal is to connect people with the right vehicles and create a better, smoother
						experience in the automotive world.
					</p>
				</div>

				<div className=" overflow-hidden rounded-2xl hover:-translate-y-1 shadow-lg">
					<img
						src="https://cdn.directify.app/directories/cover_images/01M1QAZC0J1K7FQKFV1V4EFJVV.png"
						alt="Vechicle showroom with cars parked outside"
						className="h-full w-full object-cover"
					/>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className={`m-auto`}>
				<div className="scroll-pop mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-2 md:gap-5">
					<div className={`flex gap-3 md:pr-12 p-4 shadow-md transition hover:-translate-y-1 rounded-2xl ${isDark? "bg-[#0D2C58] text-darktext":"bg-lightBG text-lighttext"}`}>
						<div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${isDark? "bg-blue-500":"bg-blue-400"} text-white`}>
							<Target size={28} />
						</div>
						<div>
							<Eyebrow>Our mission</Eyebrow>
							<h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
								Make Vehicle Discovery Easier
							</h2>
							<p className="mt-2 text-sm leading-relaxed">
								To make vehicle discovery easier, faster, and more transparent by providing reliable
								vehicle information and a simple digital experience for every customer.
							</p>
						</div>
					</div>

					<div className={`flex gap-3 p-4 shadow-md transition hover:-translate-y-1 rounded-2xl ${isDark? "bg-[#0D2C58] text-darktext":"bg-lightBG text-lighttext"}`}>
						<div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${isDark? "bg-blue-500":"bg-blue-400"} text-white`}>
							<Binoculars size={28} />
						</div>
						<div>
							<Eyebrow>Our vision</Eyebrow>
							<h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
								A Trusted Vehicle Platform
							</h2>
							<p className="mt-2 text-sm leading-relaxed">
								To become a trusted digital vehicle platform where people can confidently find the
								right vehicle for their needs.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="mx-auto max-w-6xl px-6 py-14 scroll-pop">
				<div className="text-center">
					<Eyebrow>Why choose us</Eyebrow>
					<h2 className="mt-2 text-3xl font-bold ">
						The Benefits of Choosing Vechicle
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed">
						We are committed to giving you the best experience with reliable vehicles, transparent
						information, and excellent support.
					</p>
				</div>

				<div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
					{benefits.map(({ icon: Icon, title, text }) => (
						<div key={title} className="flex flex-col items-center text-center">
							<div className={`flex h-14 w-14 items-center justify-center rounded-full ${isDark? "bg-blue-950 hover:bg-blue-900":"bg-blue-100 hover:bg-blue-200"}`}>
								<Icon size={24} />
							</div>
							<h3 className="mt-4 text-sm font-semibold ">{title}</h3>
							<p className="mt-1 text-xs leading-relaxed">{text}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}