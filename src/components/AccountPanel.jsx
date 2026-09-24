import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAuthenticated, setLogin, setRegister } from "../Store/Filter/DarkSlice"
import { FaPeopleGroup } from "react-icons/fa6";
import AskModal from "./alert/AskModal";
import { IoStar } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";


function AccountPanel() {
	const dispatch = useDispatch()
	const isDark = useSelector((state)=>state.data.isDark)
	const isAuthenticated = useSelector((state) => state.data.isAuthenticated)
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
	const openRegister = () => {
		if (isAuthenticated) {
			localStorage.removeItem("user")
		}
		dispatch(setRegister(true))
		dispatch(setLogin(false))
	}
	const handleLogout = () => {
		setShowLogoutConfirm(true)
	}
	const confirmLogout = () => {
		localStorage.removeItem("user")
		dispatch(setAuthenticated(false))
		dispatch(setLogin(true))
		dispatch(setRegister(false))
		setShowLogoutConfirm(false)
	}
	return (
		<>
		<aside className={`rounded-lg ${isDark? "bg-darkBG text-darktext": "bg-lightBG text-lighttext"} p-6 shadow-2xl transition hover:-translate-y-1 hover:shadow-xl  lg:-mt-46.25 lg:min-h-101.25`}>
			<div className="text-center">
				<div className={`mx-auto grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-2xl text-[#1976ed]`}><FaPeopleGroup /></div>
				<h2 className={`mt-4 text-lg font-extrabold ${isDark? " text-darktext": " text-lighttext"}`}>Join Us Today</h2>
				<p className="mt-2 text-xs leading-5 text-slate-400">Create an account to save your favorite vehicles, get updates, and manage your purchases.</p>
				<button type="button" onClick={openRegister} className="mt-5 block w-full rounded-md bg-[#1976ed] py-3 text-xs font-bold transition hover:bg-[#0f63ce]">{isAuthenticated ? 'Register again' : 'Register Now'}</button>
				<button type="button" onClick={isAuthenticated ? handleLogout : () => { dispatch(setLogin(true)); dispatch(setRegister(false)) }} className={`mt-2 block w-full rounded-md border-2 border-blue-300 py-2.5 text-xs font-bold ${isDark ? 'border-white/25 text-darktext hover:bg-white/10' : 'border-slate-200 text-lighttext hover:border-blue-200 hover:bg-blue-50'}`}>{isAuthenticated ? 'Logout' : 'Login'}</button>
			</div>
			<div className="mt-7 space-y-5 border-t pt-6 text-xs font-semibold text-slate-500">
				<p className="flex items-center"><span className="mr-3 text-lg text-[#176bd4]"><MdOutlineSecurity /></span>Trusted &amp; Secure</p>
				<p className="flex items-center"><span className="mr-3 text-lg text-[#176bd4]"><FaHandsHelping /></span>24/7 Support</p>
				<p className="flex items-center"><span className="mr-3 text-lg text-[#176bd4]"><IoStar /></span>Best Prices</p>
			</div>
		</aside>
		<AskModal
			isOpen={showLogoutConfirm}
			title="Log out?"
			message="Are you sure you want to log out of your account?"
			confirmText="Logout"
			cancelText="Cancel"
			danger
			onClose={() => setShowLogoutConfirm(false)}
			onConfirm={confirmLogout}
		/>
		</>
	)
}

export default AccountPanel
