import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Heart, ShoppingCart, X } from 'lucide-react'
import { removeFavorite, removeItem, setPanelOpen } from '../Store/CartSlice'
import { BookingItem } from './BookingItem'
import ViewDetailVehicle from './ViewDetailVechicle'

function CartAndWishlist() {
    const dispatch = useDispatch()
    const isDark = useSelector((state) => state.dark.isDark)
    const { cartItems, wishlist, panelOpen } = useSelector((state) => state.cart)
    const [activeTab, setActiveTab] = useState('cart')
    const [itemCheck, setItemCheck] = useState()
    const [openCheck, setOpenCheck] = useState(false)
    const [detailItem, setDetailItem] = useState(null)
    if (!panelOpen) return null

    const items = activeTab === 'cart' ? cartItems : wishlist
    const remove = activeTab === 'cart' ? removeItem : removeFavorite
    const handleItemAction = (item) => {
        if (activeTab === 'wishlist') {
            setDetailItem(item)
            return
        }
        setItemCheck(item)
        setOpenCheck(true)
    }
    return (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Cart and wishlist">
            <button
                type="button"
                className="absolute inset-0 h-full w-full cursor-default bg-slate-950/35"
                aria-label="Close cart and wishlist"
                onClick={() => dispatch(setPanelOpen(false))}
            />
            <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col shadow-2xl ${isDark ? 'bg-[#0B1A38] text-white' : 'bg-white text-slate-900'}`}>
                <div className={`flex items-center justify-between border-b px-5 py-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">Your collection</p>
                        <h2 className="mt-1 text-xl font-bold">Cart & Wishlist</h2>
                    </div>
                    <button type="button" onClick={() => dispatch(setPanelOpen(false))} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close panel">
                        <X size={20} />
                    </button>
                </div>

                <div className={`grid grid-cols-2 border-b p-2 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <button type="button" onClick={() => setActiveTab('cart')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === 'cart' ? 'bg-blue-600 text-white' : 'text-slate-500'}`}>
                        <ShoppingCart size={16} /> Cart ({cartItems.length})
                    </button>
                    <button type="button" onClick={() => setActiveTab('wishlist')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${activeTab === 'wishlist' ? 'bg-rose-500 text-white' : 'text-slate-500'}`}>
                        <Heart size={16} /> Favorites ({wishlist.length})
                    </button>
                </div>

                {/* <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                            {activeTab === 'cart' ? <ShoppingCart size={34} strokeWidth={1.5} /> : <Heart size={34} strokeWidth={1.5} />}
                            <p className="mt-3 font-semibold">{activeTab === 'cart' ? 'Your cart is empty' : 'No favorites yet'}</p>
                            <p className="mt-1 text-sm">Add a vehicle to see it here.</p>
                        </div>
                    ) : items.map((item, index) => (
                        <div key={`${item.id ?? item.name}-${index}`} className={`flex gap-3 rounded-xl border p-3 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
                            <img src={item.pic ?? item.image} alt="" className="h-16 w-20 rounded-lg object-cover" />
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold">{item.name ?? 'Vehicle'}</h3>
                                <p className="mt-1 text-xs text-slate-500">{item.brand ?? 'Unknown brand'} {item.model ?? ''}</p>
                                <p className="mt-1 text-xs font-medium text-blue-500">{item.status ?? 'Status unavailable'}</p>
                            </div>
                            <button className={`bg-green-300 rounded-lg px-4 py-2`}>Check out</button>
                            <button type="button" onClick={() => dispatch(remove(index))} className="self-start rounded-md p-1 text-slate-400 hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${item.name ?? 'vehicle'}`}>
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div> */}
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center text-center text-slate-400">
                            {activeTab === 'cart' ? (
                                <ShoppingCart size={34} strokeWidth={1.5} />
                            ) : (
                                <Heart size={34} strokeWidth={1.5} />
                            )}

                            <p className="mt-3 font-semibold">
                                {activeTab === 'cart' ? 'Your cart is empty' : 'No favorites yet'}
                            </p>

                            <p className="mt-1 text-sm">
                                Add a vehicle to see it here.
                            </p>
                        </div>
                    ) : (
                        items.map((item, index) => (
                            <div
                                key={`${item.id ?? item.name}-${index}`}
                                className={`
                    group relative flex gap-3 rounded-2xl border p-3
                    transition-all duration-200
                    hover:-translate-y-0.5 hover:shadow-md
                    ${isDark
                                        ? 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }
                `}
                            >
                                {/* Vehicle Image */}
                                <div className="relative shrink-0">
                                    <img
                                        src={item.pic ?? item.image}
                                        alt={item.name ?? 'Vehicle'}
                                        className="h-20 w-24 rounded-xl object-cover"
                                    />

                                    {/* Status badge */}
                                    <span
                                        className={`
                            absolute bottom-1 left-1 rounded-md px-2 py-0.5
                            text-[10px] font-semibold backdrop-blur-sm
                            ${isDark
                                                ? 'bg-black/60 text-white'
                                                : 'bg-white/90 text-slate-700'
                                            }
                        `}
                                    >
                                        {item.status ?? 'Available'}
                                    </span>
                                </div>

                                {/* Vehicle Information */}
                                <div className="min-w-0 flex-1 pr-5">
                                    <h3
                                        className={`truncate text-sm font-bold ${isDark ? 'text-white' : 'text-slate-800'
                                            }`}
                                    >
                                        {item.name ?? 'Vehicle'}
                                    </h3>

                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {item.brand ?? 'Unknown brand'}{' '}
                                        {item.model ?? ''}
                                    </p>

                                    {/* Item action */}
                                    <button
                                        onClick={() => handleItemAction(item)}
                                        type="button"
                                        className="
                            mt-3 inline-flex items-center gap-1.5
                            rounded-lg bg-blue-600 px-3.5 py-2
                            text-xs font-semibold text-white
                            shadow-sm
                            transition-all duration-200
                            hover:bg-blue-700
                            hover:shadow-md
                            active:scale-95
                        "
                                    >
                                        {activeTab === 'cart' ? 'Check out' : 'View details'}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="m12 5 7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => dispatch(remove(index))}
                                    className={`
                        absolute right-2 top-2
                        flex h-7 w-7 items-center justify-center
                        rounded-lg transition-all
                        ${isDark
                                            ? 'text-slate-500 hover:bg-red-500/10 hover:text-red-400'
                                            : 'text-slate-400 hover:bg-red-50 hover:text-red-500'
                                        }
                    `}
                                    aria-label={`Remove ${item.name ?? 'vehicle'}`}
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </aside>
            {openCheck && 
                <BookingItem
                    isOpen={openCheck}
                    onClose={() => setOpenCheck(false)}
                    item={itemCheck}
                    onAddToCart={(data) => console.log("cart", data)}
                    onAddToWishlist={(data) => console.log("wishlist", data)}
                />
            }
            {detailItem && (
                <ViewDetailVehicle
                    vehicle={detailItem}
                    onClose={() => setDetailItem(null)}
                />
            )}
        </div>
    )
}

export default CartAndWishlist