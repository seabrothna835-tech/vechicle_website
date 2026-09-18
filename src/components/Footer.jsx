function Footer() {
	return (
		<footer className="overflow-hidden bg-[#162033] px-6 pb-6 pt-16 text-[#f4f5f3] sm:px-10 lg:px-20 lg:pt-20">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col justify-between gap-14 border-b border-white/15 pb-14 md:flex-row md:gap-20 lg:pb-20">
					<div>
						<a className="group inline-flex items-center gap-2.5 font-['Manrope'] text-sm font-extrabold tracking-[0.18em]" href="/" aria-label="Kinetic home">
							<span className="inline-flex h-7 w-7 rotate-[-7deg] items-center justify-center bg-[#e95731] text-[13px] tracking-normal text-white transition-transform duration-300 group-hover:rotate-0">K</span>
							<span>KINETIC<span className="text-[#e95731]">.</span></span>
					</a>
						<p className="mt-6 font-['Manrope'] text-xs leading-7 text-[#a6b0b6]">Designed for the road ahead.<br />Built around how you move.</p>
					</div>
					<div className="w-full md:max-w-md">
						<p className="mb-5 font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#ff805d]">Keep moving</p>
						<h2 className="mb-8 font-['Playfair_Display'] text-4xl leading-[0.98] tracking-[-0.04em] sm:text-5xl">Good things are<br /><em className="text-[#ff805d]">going places.</em></h2>
						<form className="flex border-b border-white/45" onSubmit={(event) => event.preventDefault()}>
							<label className="sr-only" htmlFor="footer-email">Email address</label>
							<input className="min-w-0 flex-1 bg-transparent py-3 font-['Manrope'] text-xs text-[#f4f5f3] outline-none placeholder:text-[#a6b0b6]" id="footer-email" type="email" placeholder="Your email address" required />
							<button className="my-1 h-10 w-10 shrink-0 bg-[#e95731] text-lg text-white transition-colors hover:bg-[#ff805d]" type="submit" aria-label="Subscribe to the Kinetic newsletter">↗</button>
					</form>
				</div>
			</div>

				<div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 md:grid-cols-3 lg:py-16">
					<div className="flex flex-col items-start gap-3">
						<p className="mb-2 font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#ff805d]">Explore</p>
						<a className="font-['Manrope'] text-xs text-[#f4f5f3] transition-colors hover:text-[#ff805d]" href="/vehicles">Vehicles</a>
						<a className="font-['Manrope'] text-xs text-[#f4f5f3] transition-colors hover:text-[#ff805d]" href="/about">About us</a>
						<a className="font-['Manrope'] text-xs text-[#f4f5f3] transition-colors hover:text-[#ff805d]" href="/contact">Contact</a>
				</div>
					<div className="flex flex-col items-start gap-3">
						<p className="mb-2 font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#ff805d]">Connect</p>
						<a className="font-['Manrope'] text-xs text-[#f4f5f3] transition-colors hover:text-[#ff805d]" href="mailto:hello@kinetic.example">hello@kinetic.example</a>
						<a className="font-['Manrope'] text-xs text-[#f4f5f3] transition-colors hover:text-[#ff805d]" href="tel:+18005550184">+1 800 555 0184</a>
						<span className="font-['Manrope'] text-xs text-[#a6b0b6]">Mon-Fri, 9am-6pm</span>
				</div>
					<div className="col-span-2 flex flex-col items-start gap-3 md:col-span-1">
						<p className="mb-2 font-['DM_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#ff805d]">Follow along</p>
						<div className="flex gap-2">
							<a className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 font-['DM_Mono'] text-[11px] uppercase transition-colors hover:border-[#ff805d] hover:text-[#ff805d]" href="#instagram" aria-label="Instagram">ig</a>
							<a className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 font-['DM_Mono'] text-[11px] uppercase transition-colors hover:border-[#ff805d] hover:text-[#ff805d]" href="#youtube" aria-label="YouTube">yt</a>
							<a className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 font-['DM_Mono'] text-[11px] uppercase transition-colors hover:border-[#ff805d] hover:text-[#ff805d]" href="#linkedin" aria-label="LinkedIn">in</a>
						</div>
					</div>
				</div>

				<div className="flex flex-col items-start gap-4 border-t border-white/15 pt-5 font-['DM_Mono'] text-[10px] text-[#a6b0b6] sm:flex-row sm:items-center sm:justify-between">
					<span>© 2025 Kinetic Motors</span>
					<div className="flex gap-6"><a className="transition-colors hover:text-[#ff805d]" href="#privacy">Privacy</a><a className="transition-colors hover:text-[#ff805d]" href="#terms">Terms</a></div>
					<span>Made to keep moving <b className="text-base text-[#ff805d]">↗</b></span>
			</div>
			</div>
		</footer>
	)
}

export default Footer
