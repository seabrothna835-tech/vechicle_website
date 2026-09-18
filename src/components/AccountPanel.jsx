import { useSelector } from "react-redux"
import { FaPeopleGroup } from "react-icons/fa6";

function AccountPanel() {
    const isDark = useSelector((state)=>state.dark.isDark)
	return (
		<aside className={`rounded-lg ${isDark? "bg-darkBG text-darktext": "bg-lightBG text-lighttext"} p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-xl  lg:-mt-46.25 lg:min-h-101.25`}>
			<div className="text-center">
				<div className={`mx-auto grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-2xl text-[#1976ed]`}><FaPeopleGroup /></div>
				<h2 className={`mt-4 text-lg font-extrabold ${isDark? " text-darktext": " text-lighttext"}`}>Join Us Today</h2>
				<p className="mt-2 text-xs leading-5 text-slate-400">Create an account to save your favorite vehicles, get updates, and manage your purchases.</p>
				<a className="mt-5 block rounded-md bg-[#1976ed] py-3 text-xs font-bold transition hover:bg-[#0f63ce]" href="#register">Register Now</a>
				<a className={`mt-2 block rounded-md border-2 border-blue-300 py-2.5 text-xs font-bold  ${isDark ? 'border-white/25 text-darktext hover:bg-white/10' : 'border-slate-200 text-lighttext hover:border-blue-200 hover:bg-blue-50'}`} href="#login">Login</a>
			</div>
			<div className="mt-7 space-y-5 border-t pt-6 text-xs font-semibold text-slate-500">
				<p><span className="mr-3 text-lg text-[#176bd4]">♢</span>Trusted &amp; Secure</p>
				<p><span className="mr-3 text-lg text-[#176bd4]">◉</span>24/7 Support</p>
				<p><span className="mr-3 text-lg text-[#176bd4]">★</span>Best Prices</p>
			</div>
		</aside>
	)
}

export default AccountPanel
