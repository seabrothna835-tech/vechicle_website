import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaArrowRight, FaCarSide, FaSearch } from 'react-icons/fa'
import { getData } from '../Data/api'
import {VehicleCard} from '../components/VehicleCard'

function Vechicles() {
	const isDark = useSelector((state) => state.dark.isDark)
	const [activeType, setActiveType] = useState('All vehicles')
	const [query, setQuery] = useState('')
	const [saved, setSaved] = useState([])
	const [vechicle, setVechicle] = useState([])
	const filteredVehicles = useMemo(() => vechicle.filter((vehicle) => {
		const matchesType = activeType === 'All vehicles' || vehicle.type === activeType
		const matchesQuery = `${vehicle.name} ${vehicle.brand}`.toLowerCase().includes(query.toLowerCase())
		return matchesType && matchesQuery
	}), [activeType, query])
	const toggleSaved = (name) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
	// ==========Get  all Vechicle=====================
	const getAllVechicle = async () => {
		try {
			const data = await getData("vehicles")
			if (data.length !== 0) {
				setVechicle(data.map((vehicle) => ({
					...vehicle,
					brandId: vehicle.brand?.id ?? vehicle.brandId,
					brand: vehicle.brand?.label ?? vehicle.brand ?? "",
					modelId: vehicle.model?.id ?? vehicle.modelId,
					model: vehicle.model?.label ?? vehicle.model ?? "",
					categoryId: vehicle.category?.id ?? vehicle.categoryId,
					category: vehicle.category?.label ?? vehicle.category ?? "",
					fuelTypeId: vehicle.fuelType?.id ?? vehicle.fuelTypeId,
					type: vehicle.brand?.value ?? vehicle.brand ?? "",
					image: vehicle.image ?? vehicle.pic ?? "",
				})))
			}
		} catch (error) {
			console.log("Error", error)
		}
	}
	useEffect(() => {
		getAllVechicle()
	}, [])

	return (
		<div id="vehicles" className={isDark ? 'min-h-screen bg-darkBG' : 'min-h-screen bg-[#f5f9fe]'}>
			<main>
				<section className="bg-[#0d2c58] px-6 py-14 text-white sm:px-10 lg:px-20 lg:py-20">
					<div className="mx-auto max-w-7xl"><p className="mb-4 font-['DM_Mono'] text-[10px] uppercase tracking-[.18em] text-[#69b1ff]">The collection</p><h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Find your next<br /><span className="text-[#3d9bff]">great drive.</span></h1><p className="mt-5 max-w-md text-sm leading-7 text-blue-100/75">Explore our carefully selected inventory of quality cars, SUVs, trucks, and electric vehicles.</p></div>
				</section>
				<section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-20 lg:py-14">
					<div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#1976ed]">Browse inventory</p><h2 className={`mt-2 text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#17345c]'}`}>{filteredVehicles.length} vehicles available</h2></div><label className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm md:max-w-xs"><FaSearch className="text-sm text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400" placeholder="Search make or model" /></label></div>
					<div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 pb-5">{['All vehicles', 'SUV', 'Sedan', 'Truck', 'Electric'].map((type) => <button className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeType === type ? 'bg-[#1976ed] text-white' : isDark ? 'bg-[#172f58] text-blue-100' : 'bg-white text-slate-500 hover:text-[#1976ed]'}`} key={type} onClick={() => setActiveType(type)}>{type}</button>)}</div>
					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredVehicles.map((v) =>
							<VehicleCard
								key={v.id}
								vehicle={v}
							/>
						)}
						{filteredVehicles.length === 0 && <div className="col-span-full rounded-lg bg-white px-6 py-16 text-center"><FaCarSide className="mx-auto text-3xl text-slate-300" /><p className="mt-4 text-sm text-slate-500">No vehicles found. Try another search.</p></div>}</div>
				</section>
				<section className="mx-6 mb-12 overflow-hidden rounded-xl bg-[#176bd4] px-6 py-10 text-white sm:mx-10 sm:px-10 lg:mx-auto lg:max-w-7xl lg:px-16"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-blue-100">Need a hand?</p><h2 className="mt-2 text-2xl font-extrabold">Talk to a vehicle expert.</h2><p className="mt-2 text-sm text-blue-100">We can help you find the right fit for your life and budget.</p></div><a className="inline-flex items-center gap-3 self-start rounded-md bg-white px-5 py-3 text-xs font-bold text-[#176bd4] transition hover:bg-blue-50" href="mailto:hello@vehicle.example">Contact our team <FaArrowRight /></a></div></section>
			</main>
		</div>
	)
}

export default Vechicles
