import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AccountPanel from '../components/AccountPanel'
import { FaArrowRight, FaBolt, FaHeadset, FaShieldAlt, FaSlidersH, FaStar } from 'react-icons/fa'
import { getData } from '../Data/api'
import VehicleCard from "../components/VehicleCard"

const heroImages = [
    'https://media.4x4australia.com.au/uploads/2022/04/9dc69ea0-2022_Lexus_LX600_Ultra_Luxury_2.jpg',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
]

const normalizeValue = (value) =>
    String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')

function Home() {
    const isDark = useSelector((state) => state.data.isDark)
    const [saved, setSaved] = useState([])
    const [search, setSearch] = useState({ category: 'all', brand: 'all', fuel: 'all' })
    const [heroIndex, setHeroIndex] = useState(0)
    const [nextHeroIndex, setNextHeroIndex] = useState(1)
    const [isSliding, setIsSliding] = useState(false)
    const [active, setActive] = useState(false)
    const [vehicles, setVechicle] = useState([])
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])
    const [fuelType, setFuelType] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setActive(true)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            const nextIndex = (heroIndex + 1) % heroImages.length
            setNextHeroIndex(nextIndex)
            setIsSliding(true)

            const timeoutId = setTimeout(() => {
                setHeroIndex(nextIndex)
                setIsSliding(false)
            }, 700)

            return () => clearTimeout(timeoutId)
        }, 9000)

        return () => clearInterval(intervalId)
    }, [heroIndex])

    // ==========Get  all Vechicle=====================
    const getAllVechicle = async () => {
        try {
            const data = await getData('vehicles')
            if (Array.isArray(data) && data.length !== 0) {
                setVechicle(data.map((vehicle) => ({
                    ...vehicle,
                    brandId: vehicle.brand?.id ?? vehicle.brandId,
                    brand: vehicle.brand?.label ?? vehicle.brand ?? '',
                    modelId: vehicle.model?.id ?? vehicle.modelId,
                    model: vehicle.model?.label ?? vehicle.model ?? '',
                    categoryId: vehicle.category?.id ?? vehicle.categoryId,
                    category: vehicle.category?.label ?? vehicle.category ?? '',
                    fuelTypeId: vehicle.fuelType?.id ?? vehicle.fuelTypeId,
                    fuel: vehicle.fuel ?? vehicle.fuelType?.label ?? '',
                    type: vehicle.brand?.value ?? vehicle.brand ?? '',
                    image: vehicle.image ?? vehicle.pic ?? '',
                })))
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    // =================Get all fuel =============================
    const getAllFuelType = async () => {
        try {
            const data = await getData('fuelTypes')
            if (Array.isArray(data) && data.length !== 0) {
                setFuelType([
                    { value: 'all', label: 'All Fuel Types' },
                    ...data.map((f) => ({
                        value: normalizeValue(f.value ?? f.label),
                        label: f.label ?? f.value,
                        id: f.id,
                    })),
                ])
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    // ================Get brand=======================================
    const getAllBrand = async () => {
        try {
            const data = await getData('brands')
            if (Array.isArray(data) && data.length !== 0) {
                setBrand([
                    { value: 'all', label: 'All Brands' },
                    ...data.map((brandItem) => ({
                        value: normalizeValue(brandItem.brandName),
                        label: `${brandItem.id} - ${brandItem.brandName}`,
                        id: brandItem.id,
                    })),
                ])
            }
        } catch (error) {
            console.log('Error:', error)
        }
    }

    // ================Get Category=======================================
    const getAllCategory = async () => {
        try {
            const data = await getData('categories')
            if (Array.isArray(data) && data.length !== 0) {
                setCategory([
                    { value: 'all', label: 'All Categories' },
                    ...data.map((item) => ({
                        value: normalizeValue(item.categoryName),
                        label: `${item.id} - ${item.categoryName}`,
                        id: item.id,
                    })),
                ])
            }
        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        getAllVechicle()
        getAllBrand()
        getAllCategory()
        getAllFuelType()
    }, [])

    const toggleSaved = (name) => setSaved((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])

    const filteredVehicles = vehicles.filter((vehicle) => {
        const categoryValue = normalizeValue(vehicle.category)
        const brandValue = normalizeValue(vehicle.brand)
        const fuelValue = normalizeValue(vehicle.fuel)

        const categoryMatch = search.category === 'all' || categoryValue === search.category
        const brandMatch = search.brand === 'all' || brandValue === search.brand
        const fuelMatch = search.fuel === 'all' || fuelValue === search.fuel

        return categoryMatch && brandMatch && fuelMatch
    })

    const visibleVehicles = filteredVehicles.slice(0, 4)
    const filterFields = [
        { key: 'category', label: 'Category', options: category },
        { key: 'brand', label: 'Brand', options: brand },
        { key: 'fuel', label: 'Fuel Type', options: fuelType },
    ]
    const userResgister = localStorage.getItem("user");
    console.log("User : ",userResgister)
    return (
        <div className={isDark ? 'min-h-screen bg-darkBG' : 'min-h-screen bg-[#f5f9fe]'}>
            <main id="top">
                <section className="relative min-h-130 scroll-mt-16 overflow-hidden bg-darkBG text-white sm:min-h-140">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className={`absolute inset-0 bg-cover bg-center ${isSliding ? 'hero-slide-out' : ''}`}
                            style={{
                                backgroundImage: `linear-gradient(90deg, rgba(5,22,48,.96) 0%, rgba(5,22,48,.72) 38%, rgba(5,22,48,.08) 78%), url('${heroImages[heroIndex]}')`,
                            }}
                        />
                        <div
                            className={`absolute inset-0 bg-cover bg-center ${isSliding ? 'hero-slide-in' : ''}`}
                            style={{
                                backgroundImage: `linear-gradient(90deg, rgba(5,22,48,.96) 0%, rgba(5,22,48,.72) 38%, rgba(5,22,48,.08) 78%), url('${heroImages[nextHeroIndex]}')`,
                            }}
                        />
                    </div>
                    <div className="relative mx-auto flex min-h-130 max-w-7xl flex-col justify-center px-6 pb-28 pt-20 sm:min-h-140 sm:px-10 lg:px-20">
                        <div className="max-w-xl">
                            <p className="mb-5 font-['DM_Mono'] text-xs font-medium uppercase tracking-[.18em] text-[#4da3ff]">Find your perfect ride</p>
                            <h1 className={`max-w-lg text-5xl font-extrabold leading-[.98] tracking-tighter sm:text-6xl lg:text-[72px] ${active ? "animate-color" : "typewriter"}`}>
                                Drive Your<br />Dream <span className="text-[#1681f8]">Vehicle</span></h1>
                            <p className="mt-5 max-w-md text-sm leading-7 text-blue-100/80 sm:text-base">Browse our wide selection of quality vehicles. From daily commutes to family adventures, we&apos;ve got the right car for you.</p>
                        </div>
                        <div className={`absolute bottom-5 left-6 right-6 grid max-w-190 grid-cols-1 gap-2 rounded-xl ${isDark ? "bg-darkBG text-darktext" : "bg-lightBG text-lighttext"} p-2 shadow-2xl sm:bottom-8 sm:left-10 sm:right-auto sm:grid-cols-[1fr_1fr_1fr] sm:rounded-lg lg:left-20 transition hover:-translate-y-1 hover:shadow-xl`}>
                            {filterFields.map((field) => (
                                <label
                                    className={`flex min-h-14 items-center gap-3 border-b ${isDark ? "border-darktext" : "border-lighttext"
                                        } px-3 sm:border-b-0 sm:border-r`}
                                    key={field.key}
                                >
                                    <FaSlidersH className="text-[#2277db]" />

                                    <span>
                                        <span className="block text-[10px] font-semibold text-slate-400">
                                            {field.label}
                                        </span>

                                        <select
                                            value={search[field.key]}
                                            onChange={(event) =>
                                                setSearch({
                                                    ...search,
                                                    [field.key]: event.target.value,
                                                })
                                            }
                                            className={`w-full appearance-none ${isDark
                                                    ? "bg-darkBG text-darktext"
                                                    : "bg-lightBG text-lighttext"
                                                } text-xs font-semibold outline-none`}
                                        >
                                            {field.options.map((option) => (
                                                <option
                                                    key={option.id ?? option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="popular" className="scroll-pop scroll-mt-16 mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[minmax(0,1fr)_195px] lg:px-10 lg:py-10">
                    <div>
                        <div className="mb-6 flex items-end justify-between">
                            <div><p className="mb-2 font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#1976ed]">Our collection</p><h2 className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#1b355a]'}`}>Popular Vehicles</h2><span className="mt-3 block h-1 w-8 bg-[#1976ed]" /></div>
                                <a className="text-xs font-bold text-[#1976ed] transition hover:text-[#0f63ce]" href="/vehicles">View All <span className="text-base">→</span></a>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {visibleVehicles.map((vehicle, index) => (
                                <VehicleCard
                                    key={`${vehicle.id ?? 'vehicle'}-${vehicle.name ?? 'unnamed'}-${vehicle.modelId ?? vehicle.model ?? index}-${index}`}
                                    vehicle={vehicle}
                                    onSave={toggleSaved}
                                />
                            ))}
                            {filteredVehicles.length === 0 && <p className={`col-span-full rounded-lg ${isDark ? "bg-darkBG text-darktext" : "bg-lightBG text-lighttext"} p-8 text-center text-sm`}>No vehicles match these filters yet.</p>}
                        </div>
                        {filteredVehicles.length > 4 && (
                            <p className={`mt-4 text-right text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                                Showing 4 of {filteredVehicles.length} vehicles
                            </p>
                        )}
                    </div>
                    <div className='z-10'><AccountPanel /></div>
                </section>
                {/* <section className="bg-[#0d2c58] px-6 py-16 text-white sm:px-10 lg:px-20 lg:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="mb-3 font-['DM_Mono'] text-[10px] uppercase tracking-[.16em] text-[#69b1ff]">Ready when you are</p><h2 className="max-w-xl text-3xl font-extrabold leading-tight sm:text-5xl">Your next adventure<br /><span className="text-[#3d9bff]">starts here.</span></h2></div><a className="inline-flex items-center gap-3 rounded-md bg-[#1976ed] px-6 py-4 text-xs font-bold text-white transition hover:bg-[#0f63ce]" href="/#vehicles-page">Find my vehicle <FaArrowRight /></a></div></section> */}
            </main>
        </div>
    )
}

export default Home
