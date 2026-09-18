import { FaCheckCircle, FaShieldAlt, FaUsers, FaWrench } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const stats = [
	[FaUsers, '10K+', 'Happy drivers'],
	[FaShieldAlt, '150+', 'Inspection points'],
	[FaWrench, '15+', 'Years experience'],
	[FaCheckCircle, '98%', 'Recommend us'],
]

const principles = [
	['Transparent', 'Clear from the start', 'Simple pricing, honest descriptions, and no surprises after you decide.'],
	['Trusted', 'Quality you can rely on', 'Every vehicle receives a detailed inspection before it reaches our collection.'],
	['Personal', 'People behind every sale', 'Our specialists listen first, then help you find the right fit.'],
]

function About() {
	const isDark = useSelector((state) => state.dark.isDark)
	const heading = isDark ? 'text-white' : 'text-[#132a4d]'
	const body = isDark ? 'text-blue-100/70' : 'text-slate-500'
	const panel = isDark ? 'bg-[#132846] border-white/10' : 'bg-white border-slate-200'

	return (
		<div id="about" className={isDark ? 'min-h-screen bg-darkBG' : 'min-h-screen bg-[#eef4fc]'}>
			<style>{`
				@keyframes riseIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
				.rise-in { animation: riseIn .8s cubic-bezier(.2,.7,.3,1) both; }
				@media (prefers-reduced-motion: reduce) {
					.rise-in { animation: none; }
				}
			`}</style>
			<main>
				{/* Hero */}
				<section className="relative overflow-hidden bg-[#0b1f3a] px-6 py-20 text-white sm:px-10 lg:px-20 lg:py-28">
					<div
						className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#e8a33d]/70 to-transparent"
						aria-hidden="true"
					/>
					<div className="mx-auto max-w-7xl">
						<p className="rise-in mb-5 font-['Fraunces'] text-sm italic text-[#69b1ff]">About Vehicle</p>
						<h1 className="rise-in max-w-3xl font-['Fraunces'] text-4xl font-semibold leading-[1.1] sm:text-6xl" style={{ animationDelay: '.08s' }}>
							Buying a car should feel exciting, not stressful.
						</h1>
						<p
							className="rise-in mt-6 max-w-xl text-sm leading-7 text-blue-100/75"
							style={{ animationDelay: '.16s' }}
						>
							We bring together trusted vehicles, transparent information, and real human support to make your
							next move feel effortless.
						</p>

						{/* Instrument strip */}
						<div
							className="rise-in mt-14 grid grid-cols-2 divide-y divide-white/10 border-t border-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:border-x-0"
							style={{ animationDelay: '.24s' }}
						>
							{stats.map(([Icon, value, label]) => (
								<div key={label} className="flex flex-col gap-2 py-6 pr-6 first:pl-0 sm:px-6">
									<Icon className="text-base text-[#e8a33d]" />
									<strong className="font-['Fraunces'] text-3xl font-semibold text-white">{value}</strong>
									<span className="text-xs text-blue-100/60">{label}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Story */}
				<section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
					<div className="flex gap-0 lg:gap-16">
						<div className="hidden shrink-0 flex-col items-center lg:flex">
							<span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#e8a33d]" />
							<span className="mt-2 w-px flex-1 bg-slate-300/60" />
						</div>
						<div className="grid flex-1 gap-12 py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24 lg:py-24">
							<div>
								<p className="mb-3 font-['Fraunces'] text-sm italic text-[#1976ed]">Our story</p>
								<h2 className={`font-['Fraunces'] text-3xl font-semibold leading-tight sm:text-5xl ${heading}`}>
									A smarter way to move forward.
								</h2>
								<p className={`mt-6 text-sm leading-7 ${body}`}>
									Vehicle started with a simple belief: finding a great car should be as enjoyable as driving
									one. Today, we help thousands of people find vehicles that fit their lives, their plans, and
									their budgets.
								</p>
								<p className={`mt-4 text-sm leading-7 ${body}`}>
									From the first search to the moment you take the keys, our team makes every step clear and
									personal.
								</p>
							</div>
							<div className={`flex flex-col justify-center border-t-2 border-[#e8a33d] ${panel} border p-8`}>
								<p className={`font-['Fraunces'] text-xl italic leading-snug ${heading}`}>
									&ldquo;We&apos;d rather lose a sale than let someone drive off unsure.&rdquo;
								</p>
								<p className={`mt-4 text-xs uppercase tracking-normal ${isDark ? 'text-blue-100/50' : 'text-slate-400'}`}>
									The promise every specialist works by
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Principles */}
				<section className={isDark ? 'bg-[#10274b]' : 'bg-white'}>
					<div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
						<div className="flex gap-0 lg:gap-16">
							<div className="hidden shrink-0 flex-col items-center lg:flex">
								<span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#e8a33d]" />
							</div>
							<div className="flex-1 py-16 lg:py-20">
								<p className="mb-3 font-['Fraunces'] text-sm italic text-[#1976ed]">What guides us</p>
								<h2 className={`font-['Fraunces'] text-3xl font-semibold ${heading}`}>The Vehicle standard.</h2>

								<div className="relative mt-12 grid gap-10 border-t border-dashed border-slate-300/70 pt-10 md:grid-cols-3 md:gap-8">
									{principles.map(([word, title, text]) => (
										<article key={word}>
											<span className="font-['Fraunces'] text-lg italic text-[#e8a33d]">{word}</span>
											<h3 className={`mt-3 text-lg font-bold ${heading}`}>{title}</h3>
											<p className={`mt-3 text-sm leading-6 ${body}`}>{text}</p>
										</article>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	)
}

export default About