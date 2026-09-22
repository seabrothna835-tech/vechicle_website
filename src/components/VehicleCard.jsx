import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { addItem } from "../Store/CartSlice";
import { toggleFavorite, viewItem } from "../Store/CartSlice";
import {
    Heart,
    CarFront,
    Box,
    BadgeCheck,
    ShieldCheck
} from "lucide-react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

export function VehicleCard({ v, vehicle }) {
    const dispatch = useDispatch()
    const isDark = useSelector((state) => state.dark.isDark)
    const wishlist = useSelector((state) => state.cart.wishlist)
    const item = v ?? vehicle ?? {}
    const itemId = item.id ?? item.name
    const favorite = wishlist.some((savedItem) => (savedItem.id ?? savedItem.name) === itemId)
    return (
        <div
            className={`scroll-pop group flex flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isDark
                ? "border-[#27344B] bg-[#0B1A38] text-white"
                : "border-[#DDE3EC] bg-white text-[#172033]"
                }`}
        >
            {/* ================= IMAGE ================= */}
            <div className="relative p-3 pb-0">
                <div
                    className={`relative h-[210px] overflow-hidden rounded-xl ${isDark ? "bg-[#172641]" : "bg-[#E9EEF5]"
                        }`}
                >
                    {/* Vehicle image */}
                    <img
                        src={item.pic ?? item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:brightness-90"
                    />

                    {/* Dark overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* ================= STATUS ================= */}
                    <div className="absolute left-2 top-2">
                        <div
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs  shadow-lg backdrop-blur-md ${String(item.status ?? '').toLowerCase() === "available"
                                ? "bg-emerald-600/95 text-white"
                                : String(item.status ?? '').toLowerCase() === "maintenance"
                                    ? "bg-amber-500/95 text-white"
                                    : "bg-red-400/95 text-white"
                                }`}
                        >
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${String(item.status ?? '').toLowerCase() === "available"
                                    ? "bg-emerald-200"
                                    : String(item.status ?? '').toLowerCase() === "maintenance"
                                        ? "bg-yellow-200"
                                        : "bg-red-200"
                                    }`}
                            />

                            {item.status}
                        </div>
                    </div>

                    {/* ================= FAVORITE ================= */}
                    <button
                        onClick={() => dispatch(toggleFavorite(item))}
                        type="button"
                        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all ${isDark
                            ? "border-white/10 bg-[#182A48]/90 text-white hover:bg-[#22385D]"
                            : "border-black/10 bg-white/90 text-[#667085] hover:bg-white"
                            }`}
                    >
                        {favorite? <IoIosHeart size={16} strokeWidth={2} />:<IoIosHeartEmpty size={16} strokeWidth={2} />}
                    </button>
                </div>
            </div>

            {/* ================= BODY ================= */}
            <div className="px-5 pb-5 pt-5 font-bold">
                {/* Vehicle name */}
                <h2
                    className={`text-lg font-semibold leading-tight ${isDark ? "text-darktext" : "text-lighttext"
                        }`}
                >
                    {item.name}
                </h2>

                {/* Vehicle ID */}
                <div
                    className={`mt-1 text-sm font-medium ${isDark ? "text-darktext" : "text-lighttext"
                        }`}
                >
                    {item.id}
                </div>

                {/* ================= VEHICLE INFO ================= */}
                <div className="mt-1">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                        <div
                            className={`flex h-6 w-6 items-center justify-center ${isDark
                                ? "text-darktext"
                                : "text-lighttext"
                                }`}
                        >
                            <CarFront size={20} strokeWidth={1.8} />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={
                                    isDark
                                        ? "text-darktext"
                                        : "text-lighttext"
                                }
                            >
                                Category:
                            </span>
                            <span
                                className={`font-medium ${isDark
                                    ? "text-darktext"
                                    : "text-lighttext"
                                    }`}
                            >
                                {item.category}
                            </span>
                        </div>
                    </div>
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div
                            className={`flex h-6 w-6 items-center justify-center ${isDark
                                ? "text-darktext"
                                : "text-lighttext"
                                }`}
                        >
                            <Box size={20} strokeWidth={1.8} />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={
                                    isDark
                                        ? "text-darktext"
                                        : "text-lighttext"
                                }
                            >
                                Brand:
                            </span>

                            <span
                                className={`font-medium ${isDark
                                    ? "text-darktext"
                                    : "text-lighttext"
                                    }`}
                            >
                                {item.brand}
                            </span>
                        </div>
                    </div>

                    {/* Model */}
                    <div className="flex items-center gap-2">
                        <div
                            className={`flex h-6 w-6 items-center justify-center ${isDark
                                ? "text-darktext"
                                : "text-lighttext"
                                }`}
                        >
                            <BadgeCheck size={20} strokeWidth={1.8} />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={
                                    isDark
                                        ? "text-darktext"
                                        : "text-lighttext"
                                }
                            >
                                Model:
                            </span>

                            <span
                                className={`font-medium ${isDark
                                    ? "text-darktext"
                                    : "text-lighttext"
                                    }`}
                            >
                                {item.model}
                            </span>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <div
                            className={`flex h-6 w-6 items-center justify-center ${isDark
                                ? "text-darktext"
                                : "text-lighttext"
                                }`}
                        >
                            <ShieldCheck size={20} strokeWidth={1.8} />
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={
                                    isDark
                                        ? "text-darktext"
                                        : "text-lighttext"
                                }
                            >
                                Status:
                            </span>
                            <span
                                className={`font-medium ${String(item.status ?? '').toLowerCase() === "available"
                                    ? "text-emerald-400"
                                    : String(item.status ?? '').toLowerCase() === "maintenance"
                                        ? "text-amber-400"
                                        : "text-red-400"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ================= ACTION BUTTONS ================= */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs">
                    {/* add */}
                    <button
                        type="button"
                        onClick={() => dispatch(addItem(item))}
                        className={`p-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${isDark
                            ? "border-[#123C91] bg-[#0D2A68] text-[#6EA0FF] hover:bg-[#12367C]"
                            : "border-[#C8D8FF] bg-[#EEF4FF] text-[#356DDE] hover:bg-[#E2ECFF]"
                            }`}
                    >
                        Add to cart
                    </button>

                    {/* View */}
                    <button
                        type="button"
                        onClick={() => dispatch(viewItem(item))}
                        className={`p-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${isDark
                            ? "border-[#263A92] bg-[#17245C] text-[#A18BFF] hover:bg-[#202F70]"
                            : "border-[#D7D0FF] bg-[#F1EEFF] text-[#745CDE] hover:bg-[#E9E5FF]"
                            }`}
                    >
                        View details
                    </button>

                    {/* Delete */}
                    {/* <button
                        type="button"
                        onClick={() => onDelete?.(item)}
                        className={`p-2 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${isDark
                            ? "border-[#7D2735] bg-[#301624] text-[#FF4257] hover:bg-[#401A2A]"
                            : "border-[#FFD0D5] bg-[#FFF0F1] text-[#EF3340] hover:bg-[#FFE5E8]"
                            }`}
                    >
                        <Trash2 size={16} strokeWidth={2} />
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default VehicleCard;