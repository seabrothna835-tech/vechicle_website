import { useEffect, useMemo, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaArrowRight, FaCarSide, FaSearch } from 'react-icons/fa'
import { getData } from '../Data/api'
import { VehicleCard } from '../components/VehicleCard'
import Alert from '../components/alert/Alert'
import ViewDetailVehicle from '../components/ViewDetailVechicle'
import { viewItem as setViewItem } from '../Store/CartSlice'

function Vechicles() {
	const dispatch = useDispatch()
	const isDark = useSelector((state) => state.data.isDark)
	const selectedViewItem = useSelector((state) => state.cart.viewItem)
	const [query, setQuery] = useState('')
	const [vechicle, setVechicle] = useState([])
	const filteredVehicles = useMemo(() => vechicle.filter((vehicle) => {
		const matchesQuery = `${vehicle.name} ${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query.toLowerCase())
		return matchesQuery
	}), [vechicle, query])
	// ==========Get  all Vechicle=====================
	const getAllVechicle = async () => {
		try {
			const data = await getData("vehicles")
			if (Array.isArray(data) && data.length !== 0) {
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
	const cartCount = useSelector((state) => state.cart.count)
	const previousCartCount = useRef(cartCount)
	const [alert, setAlert] = useState({
		show: false,
		message: "Add to cart success !",
		type: "success"
	});

	useEffect(() => {
		const cartWasIncreased = cartCount > previousCartCount.current
		previousCartCount.current = cartCount
		if (!cartWasIncreased) {
			return
		}
		setAlert((currentAlert) => ({ ...currentAlert, show: true }))
		const timeoutId = window.setTimeout(() => {
			setAlert((currentAlert) => ({ ...currentAlert, show: false }))
		}, 2000)
		return () => window.clearTimeout(timeoutId)
	}, [cartCount])
	return (
		<div id="vehicles" className={isDark ? 'min-h-screen bg-darkBG pb-12' : 'min-h-screen bg-[#f5f9fe]'}>
			<main>
				<section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-20 ">
					<div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
						<div><p className="font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#1976ed]">Browse inventory</p>
							<h2 className={`mt-2 text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#17345c]'}`}>{filteredVehicles.length} vehicles available</h2></div>
						<label className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm md:max-w-xs"><FaSearch className="text-sm text-slate-400" />
							<input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400" placeholder="Search make or model" />
						</label>
					</div>

					<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredVehicles.map((v, index) =>
							<VehicleCard
								key={`${v.id ?? 'vehicle'}-${v.name ?? 'unnamed'}-${v.modelId ?? v.model ?? index}-${index}`}
								vehicle={v}
							/>
						)}
						{filteredVehicles.length === 0 && <div className="col-span-full rounded-lg bg-white px-6 py-16 text-center"><FaCarSide className="mx-auto text-3xl text-slate-300" /><p className="mt-4 text-sm text-slate-500">No vehicles found. Try another search.</p></div>}</div>
				</section>
				<section className={`mx-6 mb-12 overflow-hidden rounded-xl ${isDark? "bg-[#0F172B] text-darktext":"bg-blue-300 text-lighttext"} px-6 py-10 sm:mx-10 sm:px-10 lg:mx-auto lg:max-w-7xl lg:px-16`}>
					<div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
						<div>
							<p className="text-xs font-bold uppercase tracking-[.14em] ">Need a hand?</p>
							<h2 className="mt-2 text-2xl font-extrabold">Talk to a vehicle expert.</h2>
							<p className="mt-2 text-sm">We can help you find the right fit for your life and budget.</p>
						</div>
						<a className="inline-flex items-center gap-3 self-start rounded-md bg-white px-5 py-3 text-xs font-bold text-[#176bd4] transition hover:bg-blue-50" href="https://t.me/+855965668263">Contact our team <FaArrowRight /></a>
					</div>
				</section>
			</main>
			{alert.show && <Alert message={alert.message} type={alert.type} />}
			{selectedViewItem && (
				<ViewDetailVehicle
					vehicle={selectedViewItem}
					onClose={() => dispatch(setViewItem(null))}
				/>
			)}
		</div>
	)
}

export default Vechicles
