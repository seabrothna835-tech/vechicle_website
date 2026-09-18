import { useState } from 'react'
import { FaArrowRight, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { useSelector } from 'react-redux'

function Contact() {
	const isDark = useSelector((state) => state.dark.isDark)
	const [sent, setSent] = useState(false)
	const heading = isDark ? 'text-white' : 'text-[#17345c]'

	return (
		<div id="contact" className={isDark ? 'min-h-screen bg-darkBG' : 'min-h-screen bg-[#f5f9fe]'}>
			<main>
				<section className="bg-[#0d2c58] px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-24"><div className="mx-auto max-w-7xl"><p className="mb-4 font-['DM_Mono'] text-[10px] uppercase tracking-[.18em] text-[#69b1ff]">Contact our team</p><h1 className="text-4xl font-extrabold sm:text-6xl">Let&apos;s find your<br /><span className="text-[#3d9bff]">next vehicle.</span></h1><p className="mt-6 max-w-md text-sm leading-7 text-blue-100/75">Questions about a vehicle, financing, or your next test drive? We&apos;re ready to help.</p></div></section>
				<section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-20 lg:py-20">
					<div><p className="mb-3 font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#1976ed]">Get in touch</p><h2 className={`text-3xl font-extrabold ${heading}`}>We&apos;re here when<br />you need us.</h2><div className="mt-10 space-y-7">{[[FaPhone, 'Call us', '+1 800 555 0184'], [FaEnvelope, 'Email us', 'hello@vehicle.example'], [FaMapMarkerAlt, 'Visit us', '18 Motion Avenue, Portland'], [FaClock, 'Opening hours', 'Mon-Fri, 9am-6pm']].map(([Icon, label, value]) => <div className="flex items-start gap-4" key={label}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-50 text-[#1976ed]"><Icon /></span><div><p className="text-xs font-bold text-slate-400">{label}</p><p className={`mt-1 text-sm font-semibold ${heading}`}>{value}</p></div></div>)}</div></div>
					<div className={`${isDark ? 'bg-[#172f58]' : 'bg-white'} rounded-xl border border-slate-200 p-6 shadow-lg sm:p-8`}><h2 className={`text-xl font-extrabold ${heading}`}>Send us a message</h2>{sent ? <div className="mt-8 rounded-lg bg-emerald-50 p-6 text-center text-sm font-semibold text-emerald-700">Thanks for reaching out. Our team will be in touch soon.</div> : <form className="mt-6 space-y-5" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold text-slate-500">Your name<input className="mt-2 w-full rounded-md border border-slate-200 bg-transparent px-3 py-3 text-sm font-normal outline-none focus:border-[#1976ed]" required /></label><label className="text-xs font-bold text-slate-500">Email address<input type="email" className="mt-2 w-full rounded-md border border-slate-200 bg-transparent px-3 py-3 text-sm font-normal outline-none focus:border-[#1976ed]" required /></label></div><label className="block text-xs font-bold text-slate-500">What can we help with?<select className="mt-2 w-full rounded-md border border-slate-200 bg-transparent px-3 py-3 text-sm font-normal outline-none focus:border-[#1976ed]"><option>Finding a vehicle</option><option>Book a test drive</option><option>Financing question</option><option>General question</option></select></label><label className="block text-xs font-bold text-slate-500">Message<textarea className="mt-2 min-h-32 w-full resize-y rounded-md border border-slate-200 bg-transparent px-3 py-3 text-sm font-normal outline-none focus:border-[#1976ed]" required /></label><button className="inline-flex items-center gap-3 rounded-md bg-[#1976ed] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0f63ce]" type="submit">Send message <FaArrowRight /></button></form>}</div>
				</section>
			</main>
		</div>
	)
}

export default Contact
