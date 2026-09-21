import { useRef, useState } from "react";
import { FaArrowRight, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import emailjs from "@emailjs/browser";

function Contact() {
	const form = useRef();
	const isDark = useSelector((state) => state.dark.isDark)
	const [sent, setSent] = useState(false)
	const [isSending, setIsSending] = useState(false)
	const [error, setError] = useState('')
	const heading = isDark ? 'text-white' : 'text-[#17345c]'
	const label = isDark ? 'text-slate-300' : 'text-slate-500'
	const field = `mt-2 w-full rounded-md border px-3 py-3 text-sm font-normal outline-none transition focus:border-[#1976ed] focus:ring-2 focus:ring-blue-500/20 ${isDark ? 'border-slate-600 bg-[#10264a] text-white' : 'border-slate-200 bg-transparent text-slate-900'}`

	const sendEmail = (e) => {
        e.preventDefault();
		setIsSending(true)
		setError('')
        emailjs.sendForm(
            "service_vwpdlxx",
            "template_xfu219c",
            form.current,
            "twTB3RcD_3RPUtmK1"
        )
        .then(() => {
			setSent(true)
            if (form.current) {
                form.current.reset();
            }
        })
		.catch(() => {
			setError('We could not send your message. Please try again.')
		})
		.finally(() => {
			setIsSending(false)
        });
    };

	return (
		<div id="contact" className={isDark ? 'min-h-screen bg-darkBG' : 'min-h-screen bg-[#f5f9fe]'}>
			<main>
				<section className="scroll-pop mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-24 lg:px-20 lg:py-20">
					<div>
						<p className="mb-3 font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#1976ed]">Get in touch</p>
						<h2 className={`text-3xl font-extrabold ${heading}`}>We&apos;re here when<br />you need us.</h2>
						<div className="mt-10 space-y-7">
							{[[FaPhone, 'Call us', '+93​ 444 534'], [FaEnvelope, 'Email', 'vechicle168@gmail.com'], [FaMapMarkerAlt, 'Visit us', 'Phnom Penh,Cambodia'], [FaClock, 'Opening hours', 'Mon-Fri, 8am-5pm']].map(([Icon, itemLabel, value]) => (
								<div className="flex items-start gap-4" key={itemLabel}>
									<span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${isDark ? 'bg-blue-400/15' : 'bg-blue-50'} text-[#1976ed]`}>
										<Icon />
									</span>
									<div>
										<p className="text-xs font-bold text-slate-400">{itemLabel}</p>
										<p className={`mt-1 text-sm font-semibold ${heading}`}>{value}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className={`${isDark ? 'border-slate-700 bg-[#172f58]' : 'border-slate-200 bg-white'} rounded-xl border p-6 shadow-lg sm:p-8`}>
						<h2 className={`text-xl font-extrabold ${heading}`}>Send us a message</h2>
						{sent ? (
							<div className="mt-8 rounded-lg bg-emerald-50 p-6 text-center text-sm font-semibold text-emerald-700">
								Thanks for reaching out. Our team will be in touch soon.
							</div>
						) : (
							<form ref={form} className="mt-6 space-y-5" onSubmit={sendEmail}>
								<div className="grid gap-5 sm:grid-cols-2">
									<label className={`text-xs font-bold ${label}`}>
										Your name
										<input name="name" className={field} required />
									</label>
									<label className={`text-xs font-bold ${label}`}>
										Email address
										<input name="email" type="email" className={field} required />
									</label>
								</div>
								<label className={`block text-xs font-bold ${label}`}>
									What can we help with?
									<select name="subject" className={field}>
										<option>Finding a vehicle</option>
										<option>Book a test drive</option>
										<option>Financing question</option>
										<option>General question</option>
									</select>
								</label>
								<label className={`block text-xs font-bold ${label}`}>
									Message
									<textarea name="message" className={`${field} min-h-32 resize-y`} required />
								</label>
									{error && <p className="text-sm font-semibold text-red-600" role="alert">{error}</p>}
								<button
									className="inline-flex items-center gap-3 rounded-md bg-[#1976ed] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0f63ce] disabled:cursor-not-allowed disabled:opacity-60"
									type="submit"
									disabled={isSending}
								>
									{isSending ? 'Sending...' : (
										<>
											Send a message
											<FaArrowRight />
										</>
									)}
								</button>
							</form>
						)}
					</div>
				</section>
			</main>
		</div>
	)
}

export default Contact
