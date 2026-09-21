import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDark } from '../Store/Filter/DarkSlice'
import { NavLink } from 'react-router-dom'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'
import Logo from "../assets/logoSystem.png"
import { SlBasketLoaded } from "react-icons/sl";

function Header({ onCartClick }) {
	const dispatch = useDispatch()
	const isDark = useSelector((state) => state.dark.isDark)
	const cartCount = useSelector((state) => state.cart.count)
	const [menuOpen, setMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('home-content')
	const surface = isDark ? 'border-white/10 bg-[#10274b]' : 'border-slate-200 bg-white'
	const navLinks = [
		{ label: 'Home', href: '/#home-content' },
		{ label: 'Popular', href: '/#popular-page' },
		{ label: 'About', href: '/#about-page' },
		{ label: 'Contact', href: '/#contact-page' },
	]
	const navText = isDark ? 'text-blue-100/75 hover:text-white' : 'text-slate-500 hover:text-[#176bd4]'
	const activeNav = isDark ? 'text-white' : 'text-[#176bd4]'

	useEffect(() => {
		const sections = ['home-content', 'popular-page', 'about-page', 'contact-page']
		const observer = new IntersectionObserver((entries) => {
			const visibleSection = entries
				.filter((entry) => entry.isIntersecting)
				.sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
			if (visibleSection) setActiveSection(visibleSection.target.id)
		}, { rootMargin: '-64px 0px -45% 0px', threshold: [0.1, 0.3, 0.6] })

		sections.forEach((id) => {
			const section = document.getElementById(id)
			if (section) observer.observe(section)
		})
		return () => observer.disconnect()
	}, [])
	return (
		<header className={`relative z-20 border-b shadow-sm ${surface}`}>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
				<NavLink className={`inline-flex items-center gap-2 font-['Manrope'] text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#17345c]'}`} to="/" aria-label="Vehicle home">
					<span className="grid place-items-center "><img src={Logo} alt="" className={`h-16 w-16 ${isDark? "bg-darkBG":"bg-slate-500"} rounded-2xl text-lg shadow-lg shadow-blue-500/25`}/></span><span className={`uppercase text-2xl font-bold ${isDark? "text-darktext":"text-lighttext"}`}>aura</span>
				</NavLink>
				<nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
					{navLinks.map((link, index) => {
						const sectionId = ['home-content', 'popular-page', 'about-page', 'contact-page'][index]
						const isActive = activeSection === sectionId
						return <a key={link.href} href={link.href} onClick={() => setActiveSection(sectionId)} className={`relative py-5 font-['Manrope'] text-xs font-semibold transition ${isActive ? activeNav : navText} ${isActive ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#1976ed]' : ''}`}>{link.label}</a>
					})}
				</nav>
				<div className="flex items-center gap-2 sm:gap-3">
					<button onClick={onCartClick} className={`relative grid h-9 w-9 place-items-center rounded-full transition ${isDark ? 'text-blue-100/75 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-[#176bd4]'}`} aria-label={`Shopping cart, ${cartCount} items `}><SlBasketLoaded className="text-md" />{cartCount > 0 && <span className="absolute -right-1 -top-1 grid min-h-2 min-w-2 place-items-center rounded-full px-1 text-xs text-red-500 bg-red-100 leading-4">{cartCount}</span>}</button>
					<button className={`grid h-9 w-9 place-items-center rounded-full transition ${isDark ? 'text-blue-100/75 hover:bg-white/10 hover:text-white' : 'text-slate-500 hover:bg-blue-50 hover:text-[#176bd4]'}`} onClick={() => dispatch(setDark(!isDark))} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>{isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}</button>
					<NavLink className={`hidden rounded-md border px-4 py-2 font-['Manrope'] text-xs font-semibold transition sm:block ${isDark ? 'border-white/25 text-white hover:bg-white/10' : 'border-slate-200 text-[#17345c] hover:border-blue-200 hover:bg-blue-50'}`} to="/contact">Login</NavLink>
					<NavLink className="hidden rounded-md bg-[#1976ed] px-4 py-2 font-['Manrope'] text-xs font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#0f63ce] sm:block" to="/contact">Register</NavLink>
					<button className={`grid h-9 w-9 place-items-center rounded-md border md:hidden ${isDark ? 'border-white/20 text-white' : 'border-slate-200 text-[#17345c]'}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
				</div>
			</div>
			<nav className={`overflow-hidden border-t px-5 transition-all duration-300 md:hidden ${menuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'} ${isDark ? 'border-white/10 bg-[#10274b]' : 'border-slate-200 bg-white'}`} aria-label="Mobile navigation">
				<div className="mx-auto flex max-w-7xl flex-col gap-1">
					{navLinks.map((link, index) => {
						const sectionId = ['home-content', 'popular-page', 'about-page', 'contact-page'][index]
						const isActive = activeSection === sectionId
						return <a key={link.href} className={`rounded-md px-3 py-3 font-['Manrope'] text-sm font-semibold transition ${isActive ? `${activeNav} bg-blue-500/10` : navText}`} href={link.href} onClick={() => { setActiveSection(sectionId); setMenuOpen(false) }}>{link.label}</a>
					})}
				</div>
			</nav>
		</header>
	)
}

export default Header
