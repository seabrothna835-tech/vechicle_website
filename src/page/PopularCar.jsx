import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    ResponsiveContainer,
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
} from "recharts";
function Card({ title, isDark, children }) {
    const theme = isDark
        ? "border border-slate-700 bg-slate-900/90 text-slate-200"
        : "border border-slate-200 bg-white text-slate-700";

    return (
        <div className={`scroll-pop w-full rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-xl ${theme}`}>
            <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>{title}</h3>
            {children}
        </div>
    );
}
const types = [
    { name: "Toyota", percent: 14.2, amount: 170 },
    { name: "Honda", percent: 11.5, amount: 138 },
    { name: "Nissan", percent: 7.8, amount: 94 },
    { name: "Mazda", percent: 6.3, amount: 76 },
    { name: "Hyundai", percent: 9.6, amount: 115 },
    { name: "Kia", percent: 8.9, amount: 107 },
    { name: "BMW", percent: 5.4, amount: 65 },
    { name: "Mercedes", percent: 5.1, amount: 61 },
    { name: "Chevrolet", percent: 4.9, amount: 59 },
    { name: "Ford", percent: 6.7, amount: 80 },
    { name: "Lexus", percent: 14.8, amount: 178 },
    { name: "Tesla", percent: 6.0, amount: 72 },
];
const typeData = types.map((t) => ({ ...t, trend: t.percent + 2.2 }));

const HEIGHT = 420;
const X_AXIS_HEIGHT = 40;
const PLOT_BOTTOM = HEIGHT - X_AXIS_HEIGHT;

const formatPercent = (n) => `${n.toLocaleString("de-DE")}%`;

function Gradients({ isDark }) {
    const hatch = isDark ? "#6b7280" : "#9ca3af";

    return (
        <defs>
            {/* highlighted bar */}
            <linearGradient id="activeBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7f56b" />
                <stop offset="100%" stopColor="#3de8a8" />
            </linearGradient>

            {/* curved line */}
            <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5f8f3f" />
                <stop offset="40%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#7a8a3a" />
            </linearGradient>

            {/* percentage badge */}
            <linearGradient id="badge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7cf29a" />
                <stop offset="100%" stopColor="#f7f56b" />
            </linearGradient>

            {/* diagonal stripes for inactive bars */}
            <pattern
                id="hatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
            >
                <line x1="0" y1="0" x2="0" y2="8" stroke={hatch} strokeWidth="1" />
            </pattern>
        </defs>
    );
}

function BarShape({ x, y, width, height, isActive, isDark }) {
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={14}
            fill={isActive ? "url(#activeBar)" : "url(#hatch)"}
            stroke={isActive ? "none" : isDark ? "#374151" : "#d1d5db"}
            strokeWidth={1}
        />
    );
}

function ActiveMarker({ cx, cy, value }) {
    return (
        <g>
            {/* dashed guide down into the bar */}
            <line
                x1={cx}
                x2={cx}
                y1={cy}
                y2={PLOT_BOTTOM - 14}
                stroke="#ffffff"
                strokeOpacity={0.6}
                strokeDasharray="4 4"
            />
            {/* dot on the line */}
            <circle cx={cx} cy={cy} r={5} fill="#b6f36a" />

            {/* badge above the dot */}
            <rect x={cx - 38} y={cy - 48} width={76} height={28} rx={14} fill="url(#badge)" />
            <text
                x={cx}
                y={cy - 30}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#0b1210"
            >
                ● {formatPercent(value)}
            </text>
        </g>
    );
}

function VehicleTypeChart({ isDark }) {
    const [activeIndex, setActiveIndex] = useState(2);

    const handleMouseMove = (state) => {
        if (state?.activeTooltipIndex != null) {
            setActiveIndex(Number(state.activeTooltipIndex));
        }
    };

    return (
        <Card title="Vehicle Popular Brand" isDark={isDark}>
            <div style={{ height: HEIGHT }}>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={typeData}
                        margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
                        barCategoryGap="12%"
                        onMouseMove={handleMouseMove}
                    >
                        <Gradients isDark={isDark} />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            height={X_AXIS_HEIGHT}
                            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 13 }}
                        />
                        <YAxis hide domain={[0, 17]} />

                        <Bar
                            dataKey="percent"
                            isAnimationActive={false}
                            shape={(props) => (
                                <BarShape {...props} isActive={props.index === activeIndex} isDark={isDark} />
                            )}
                        />

                        <Line
                            type="monotone"
                            dataKey="trend"
                            stroke="url(#trendLine)"
                            strokeWidth={2.5}
                            isAnimationActive={false}
                            activeDot={false}
                            dot={({ cx, cy, index, payload }) =>
                                index === activeIndex ? (
                                    <ActiveMarker key={index} cx={cx} cy={cy} value={payload.percent} />
                                ) : (
                                    <g key={index} />
                                )
                            }
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
export default function PopularCar() {
    const isDark = useSelector((state) => state.dark.isDark);
    const pageTheme = isDark
        ? "bg-darkBG text-slate-100"
        : "bg-[#f3f7fb] text-slate-800";
    const mutedText = isDark ? "text-slate-400" : "text-slate-500";
    const rankStyles = [
        { label: "Top 1", badge: "bg-blue-500 text-white", value: "text-blue-400", ring: "ring-1 ring-blue-500/50" },
        { label: "Top 2", badge: "bg-emerald-500/15 text-emerald-400", value: "text-emerald-400", ring: "" },
        { label: "Top 3", badge: "bg-orange-500/15 text-orange-400", value: "text-orange-400", ring: "" },
    ];
    const top3 = [...types].sort((a, b) => b.amount - a.amount).slice(0, 3);
    return (
        <div className={` min-h-screen px-6 py-10 transition-colors sm:px-10 lg:px-16 ${pageTheme}`}>
            <div className=" mx-auto max-w-7xl">
                <header className="mb-8 max-w-3xl">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">Lookup popular Inventory </p>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Popular vehicle overview</h1>
                    <p className={`mt-3 max-w-2xl text-sm leading-7 ${mutedText}`}>
                        Show all popular vechicle brands of our store
                    </p>
                </header>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {top3.map((stat, i) => {
                        const r = rankStyles[i];
                        return (
                        <div
                            key={stat.name}
                            className={`scroll-pop rounded-2xl border p-5 ${r.ring} ${
                            isDark ? "border-slate-700 bg-slate-900/70" : "border-slate-200 bg-white"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                            <p className={`text-lg font-medium ${isDark ? "text-slate-100" : "text-slate-800"}`}>
                                {stat.name}
                            </p>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.badge}`}>
                                {r.label}
                            </span>
                            </div>

                            <p className={`mt-3 text-3xl font-bold tabular-nums ${r.value}`}>
                            {stat.amount.toLocaleString()}
                            </p>
                            <p className={`mt-1 text-xs ${mutedText}`}>
                            vehicles · {stat.percent.toFixed(1)}% of fleet
                            </p>
                        </div>
                        );
                    })}
                </div>
                <VehicleTypeChart isDark={isDark} />
            </div>
        </div>
    );
}