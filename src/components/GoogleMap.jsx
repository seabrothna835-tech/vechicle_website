export default function GoogleMap() {
    const latitude = 11.583551;
    const longitude = 104.9207696;
    const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
    const openUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    return (
        <div className="relative h-[380px] w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] ring-1 ring-slate-100">
            <iframe
                title="Location map"
                src={embedUrl}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent px-4 pb-4 pt-10">
                <div className="text-left text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200">Visit us</p>
                    <p className="mt-1 text-sm font-semibold">Phnom Penh, Cambodia</p>
                </div>

                <a
                    href={openUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-3.5 py-2 text-[11px] font-bold text-slate-800 shadow-lg transition hover:bg-slate-100"
                >
                    Open map
                </a>
            </div>
        </div>
    );
}