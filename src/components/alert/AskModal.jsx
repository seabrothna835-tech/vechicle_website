import React, { useEffect } from "react";

const iconProps = (size, strokeWidth = 2) => ({
	width: size,
	height: size,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth,
	strokeLinecap: "round",
	strokeLinejoin: "round",
});

const AlertIcon = ({ size = 24 }) => (
	<svg {...iconProps(size, 2.1)} aria-hidden="true">
		<path d="M12 9v4" />
		<path d="M12 17h.01" />
		<path d="M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
	</svg>
);

const XIcon = ({ size = 15 }) => (
	<svg {...iconProps(size, 2.2)} aria-hidden="true">
		<path d="m18 6-12 12" />
		<path d="m6 6 12 12" />
	</svg>
);

export default function AskModal({
	isOpen = false,
	title = "Are you sure?",
	message = "This action cannot be undone.",
	confirmText = "Confirm",
	cancelText = "Cancel",
	bgColor = "bg-[#181B20]",
	textColor = "text-[#F1EFE9]",
	borderColor = "border-[#343A45]",
	danger = false,
	onClose = () => {},
	onConfirm = () => {},
}) {
	useEffect(() => {
		if (!isOpen) return undefined;

		const handleKeyDown = (event) => {
			if (event.key === "Escape") onClose();
			if (event.key === "Enter") onConfirm();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose, onConfirm]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
			role="presentation"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<div
				role="alertdialog"
				aria-modal="true"
				aria-labelledby="ask-modal-title"
				aria-describedby="ask-modal-message"
				className={`w-full max-w-[430px] overflow-hidden rounded-2xl border ${borderColor} ${bgColor} shadow-2xl`}
				onMouseDown={(event) => event.stopPropagation()}
			>
				<div className={`flex items-start gap-4 px-6 pb-5 pt-6 ${textColor}`}>
					<div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${danger ? "bg-red-950/70 text-red-400" : "bg-green-700 text-green-400"}`}>
						<AlertIcon />
					</div>
					<div className="min-w-0 flex-1">
						<div className="flex items-start justify-between gap-3">
							<h2 id={`ask-modal-title`} className={`font-['Oswald',sans-serif] text-[19px] font-semibold ${textColor}`}>
								{title}
							</h2>
							<button
								type="button"
								aria-label="Close confirmation"
								onClick={onClose}
								className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${borderColor} ${bgColor} ${textColor} transition-colors hover:text-[#F1EFE9]`}
							>
								<XIcon />
							</button>
						</div>
						<p id="ask-modal-message" className={`mt-2 text-[13px] leading-5 ${textColor}`}>
							{message}
						</p>
					</div>
				</div>
				<div className={`flex justify-end gap-3 border-t ${borderColor} ${bgColor} px-6 py-4`}>
					<button type="button" onClick={onClose} className={`rounded-lg border ${borderColor} ${bgColor} px-5 py-2.5 text-[13px] font-semibold ${textColor} transition-colors hover:border-gray-200`}>
						{cancelText}
					</button>
					<button type="button" onClick={onConfirm} className={`rounded-lg px-5 py-2.5 text-[13px] font-bold transition-colors ${danger ? "bg-red-600 text-white hover:bg-red-500" : "bg-[#D98A0B] text-[#15171B] hover:bg-[#F5A623]"}`}>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
