import React, { useState } from "react";
import {
    X,
    Car,
    Calendar,
    Fuel,
    Settings2,
    Gauge,
    Palette,
    Users,
    Cog,
    FileText,
    RotateCcw,
    Trash2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    CircleGauge,
    DoorOpen,
} from "lucide-react";
import { useSelector } from "react-redux";

function ViewDetailVehicle({
    vehicle,
    onClose,
    onRestore,
    onDeleteForever,
}) {
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("specification");
    const isDark = useSelector((state)=>state.data.isDark)

    if (!vehicle) return null;

    // Support both `images` and a single `image`
    const images =
        vehicle.images?.length > 0
            ? vehicle.images
            : vehicle.image
                ? [vehicle.image]
                : [];

    const nextImage = () => {
        if (images.length === 0) return;

        setActiveImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const previousImage = () => {
        if (images.length === 0) return;

        setActiveImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const specs = [
        {
            label: "Seating Capacity",
            value: vehicle.seatingCapacity || "-",
            icon: Users,
        },
        {
            label: "Body Style",
            value: vehicle.category || vehicle.bodyStyle || "-",
            icon: Car,
        },
        {
            label: "Drive Type",
            value: vehicle.driveType || "-",
            icon: Cog,
        },
        {
            label: "Mileage",
            value: vehicle.mileage
                ? `${vehicle.mileage} km`
                : "-",
            icon: Gauge,
        },
        {
            label: "Registration Date",
            value: vehicle.registrationDate || "-",
            icon: Calendar,
        },
        {
            label: "Doors",
            value: vehicle.doors || "-",
            icon: DoorOpen,
        },
        {
            label: "Location",
            value: vehicle.location || "-",
            icon: MapPin,
        },
        {
            label: "Status",
            value: vehicle.status || "Active",
            icon: CircleGauge,
        },
    ];

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative flex max-h-[95vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-2xl border shadow-2xl ${isDark
                        ? "border-[#303743] bg-[#10151d] text-white"
                        : "border-gray-200 bg-white text-gray-900"
                    }`}
            >
                {/* ================= HEADER ================= */}
                <div
                    className={`flex shrink-0 items-center justify-between border-b px-6 py-4 ${isDark
                            ? "border-[#28303b]"
                            : "border-gray-200"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
                            <Car size={22} className="text-white" />
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold">
                                Vehicle Details
                            </h2>

                            <p
                                className={`text-xs ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                            >
                                View complete vehicle information
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${isDark
                                ? "text-gray-400 hover:bg-[#252b34] hover:text-white"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* ================= CONTENT ================= */}
                <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.05fr_0.95fr]">

                    {/* ================= LEFT ================= */}
                    <div
                        className={`border-b p-5 lg:border-b-0 lg:border-r ${isDark
                                ? "border-[#28303b]"
                                : "border-gray-200"
                            }`}
                    >
                        {/* Main Image */}
                        <div
                            className={`relative overflow-hidden rounded-xl border ${isDark
                                    ? "border-[#303743] bg-[#181e27]"
                                    : "border-gray-200 bg-gray-100"
                                }`}
                        >
                            {images.length > 0 ? (
                                <img
                                    src={images[activeImage]}
                                    alt={vehicle.model || "Vehicle"}
                                    className="h-[340px] w-full object-cover sm:h-[400px]"
                                />
                            ) : (
                                <div className="flex h-[340px] items-center justify-center sm:h-[400px]">
                                    <div className="text-center">
                                        <Car
                                            size={60}
                                            className="mx-auto mb-3 opacity-30"
                                        />
                                        <p className="text-sm opacity-50">
                                            No vehicle image
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Status */}
                            <div className="absolute left-4 top-4">
                                <span
                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${vehicle.isActive === false ||
                                            vehicle.status === "Inactive"
                                            ? "bg-red-500/90 text-white"
                                            : "bg-emerald-500/90 text-white"
                                        }`}
                                >
                                    <span className="h-2 w-2 rounded-full bg-white" />
                                    {vehicle.isActive === false ||
                                        vehicle.status === "Inactive"
                                        ? "Inactive"
                                        : "Active"}
                                </span>
                            </div>

                            {/* Previous */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={previousImage}
                                        className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    {/* Next */}
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                    {/* Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-xs text-white backdrop-blur">
                                        {activeImage + 1} / {images.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="mt-3 grid grid-cols-4 gap-3">
                                {images.slice(0, 4).map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setActiveImage(index)
                                        }
                                        className={`overflow-hidden rounded-lg border-2 transition ${activeImage === index
                                                ? "border-blue-500"
                                                : isDark
                                                    ? "border-[#303743]"
                                                    : "border-gray-200"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Vehicle ${index + 1}`}
                                            className="h-20 w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <div className="mt-6">
                            <div className="mb-2 flex items-center gap-2">
                                <FileText
                                    size={19}
                                    className="text-blue-500"
                                />

                                <h3 className="font-semibold">
                                    Description
                                </h3>
                            </div>

                            <p
                                className={`text-sm leading-6 ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                            >
                                {vehicle.description ||
                                    `The ${vehicle.brand || ""} ${vehicle.model || "vehicle"
                                    } is a reliable and comfortable vehicle designed for everyday driving and long-distance travel.`}
                            </p>
                        </div>
                    </div>

                    {/* ================= RIGHT ================= */}
                    <div className="flex flex-col p-5">

                        {/* Vehicle Name */}
                        <div className="mb-5 flex items-center gap-4">
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl ${isDark
                                        ? "bg-[#1b2430]"
                                        : "bg-blue-50"
                                    }`}
                            >
                                <Car
                                    size={28}
                                    className="text-blue-500"
                                />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">
                                    {vehicle.brand || "Unknown Brand"}{" "}
                                    {vehicle.model || "Vehicle"}
                                </h1>

                                <span className="mt-1 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-500">
                                    {vehicle.category ||
                                        vehicle.bodyStyle ||
                                        "Vehicle"}
                                </span>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="grid grid-cols-2 gap-3">
                            <InfoCard
                                label="Vehicle Code"
                                value={
                                    vehicle.vehicleCode ||
                                    vehicle.vechicleCode ||
                                    "-"
                                }
                                icon={Car}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Brand"
                                value={vehicle.brand || "-"}
                                icon={Car}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Model"
                                value={vehicle.model || "-"}
                                icon={Car}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Year"
                                value={vehicle.year || "-"}
                                icon={Calendar}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Color"
                                value={vehicle.color || "-"}
                                icon={Palette}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Fuel Type"
                                value={vehicle.fuelType || "-"}
                                icon={Fuel}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Transmission"
                                value={vehicle.transmission || "-"}
                                icon={Settings2}
                                isDark={isDark}
                            />

                            <InfoCard
                                label="Engine"
                                value={
                                    vehicle.engineCapacity
                                        ? `${vehicle.engineCapacity} L`
                                        : "-"
                                }
                                icon={Cog}
                                isDark={isDark}
                            />
                        </div>

                        {/* Tabs */}
                        <div
                            className={`mt-5 flex rounded-lg border ${isDark
                                    ? "border-[#303743]"
                                    : "border-gray-200"
                                }`}
                        >
                            <TabButton
                                active={
                                    activeTab === "specification"
                                }
                                onClick={() =>
                                    setActiveTab("specification")
                                }
                                icon={Settings2}
                                text="Specification"
                                isDark={isDark}
                            />

                            <TabButton
                                active={
                                    activeTab === "features"
                                }
                                onClick={() =>
                                    setActiveTab("features")
                                }
                                icon={Car}
                                text="Features"
                                isDark={isDark}
                            />

                            <TabButton
                                active={
                                    activeTab === "documents"
                                }
                                onClick={() =>
                                    setActiveTab("documents")
                                }
                                icon={FileText}
                                text="Documents"
                                isDark={isDark}
                            />
                        </div>

                        {/* Tab Content */}
                        <div
                            className={`mt-3 flex-1 overflow-y-auto rounded-xl border p-4 ${isDark
                                    ? "border-[#303743] bg-[#131a23]"
                                    : "border-gray-200 bg-gray-50"
                                }`}
                        >
                            {/* Specification */}
                            {activeTab === "specification" && (
                                <div className="divide-y divide-gray-700/30">
                                    {specs.map((spec, index) => {
                                        const Icon = spec.icon;

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon
                                                        size={17}
                                                        className="text-blue-500"
                                                    />

                                                    <span
                                                        className={`text-sm ${isDark
                                                                ? "text-gray-400"
                                                                : "text-gray-500"
                                                            }`}
                                                    >
                                                        {spec.label}
                                                    </span>
                                                </div>

                                                <span className="text-sm font-medium">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Features */}
                            {activeTab === "features" && (
                                <div>
                                    {vehicle.features?.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            {vehicle.features.map(
                                                (feature, index) => (
                                                    <div
                                                        key={index}
                                                        className={`rounded-lg px-3 py-3 text-sm ${isDark
                                                                ? "bg-[#1b222c] text-gray-300"
                                                                : "bg-white text-gray-700"
                                                            }`}
                                                    >
                                                        ✓ {feature}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="py-8 text-center text-sm opacity-50">
                                            No features available
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Documents */}
                            {activeTab === "documents" && (
                                <div className="space-y-3">
                                    {vehicle.documents?.length > 0 ? (
                                        vehicle.documents.map(
                                            (document, index) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-center justify-between rounded-lg p-3 ${isDark
                                                            ? "bg-[#1b222c]"
                                                            : "bg-white"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText
                                                            size={18}
                                                            className="text-blue-500"
                                                        />

                                                        <span className="text-sm">
                                                            {document.name ||
                                                                `Document ${index +
                                                                1
                                                                }`}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <p className="py-8 text-center text-sm opacity-50">
                                            No documents available
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ================= FOOTER ================= */}
                <div
                    className={`flex shrink-0 justify-end gap-3 border-t px-5 py-4 ${isDark
                            ? "border-[#28303b]"
                            : "border-gray-200"
                        }`}
                >
                    {onRestore && (
                        <button
                            onClick={() => onRestore(vehicle)}
                            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition ${isDark
                                    ? "bg-[#202833] text-gray-300 hover:bg-[#2b3440]"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <RotateCcw size={17} />
                            Restore
                        </button>
                    )}

                    {onDeleteForever && (
                        <button
                            onClick={() =>
                                onDeleteForever(vehicle)
                            }
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            <Trash2 size={17} />
                            Delete Forever
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
    label,
    value,
    icon: Icon,
    isDark,
}) {
    return (
        <div
            className={`rounded-xl border p-3 ${isDark
                    ? "border-[#29313d] bg-[#151d27]"
                    : "border-gray-200 bg-gray-50"
                }`}
        >
            <div className="mb-1 flex items-center gap-2">
                <Icon
                    size={15}
                    className="text-blue-500"
                />

                <span
                    className={`text-xs ${isDark
                            ? "text-gray-500"
                            : "text-gray-500"
                        }`}
                >
                    {label}
                </span>
            </div>

            <p className="truncate text-sm font-medium">
                {value}
            </p>
        </div>
    );
}

/* =========================================================
   TAB BUTTON
========================================================= */

function TabButton({
    active,
    onClick,
    icon: Icon,
    text,
    isDark,
}) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-1 items-center justify-center gap-2 px-3 py-3 text-xs font-medium transition ${active
                    ? "bg-blue-600 text-white"
                    : isDark
                        ? "text-gray-400 hover:bg-[#1b222c] hover:text-white"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
        >
            <Icon size={15} />
            <span className="hidden sm:inline">
                {text}
            </span>
        </button>
    );
}

export default ViewDetailVehicle;