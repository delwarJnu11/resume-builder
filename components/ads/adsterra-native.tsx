"use client";

import { useEffect, useRef } from "react";

interface AdsterraNativeProps {
	/** Adsterra ad key from dashboard */
	adKey: string;
	/** Banner width */
	width?: number;
	/** Banner height */
	height?: number;
	/** Container className */
	className?: string;
}

export default function AdsterraNative({ adKey, width = 728, height = 90, className = "" }: AdsterraNativeProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Set atOptions on window BEFORE loading invoke.js
		(window as unknown as Record<string, unknown>).atOptions = {
			key: adKey,
			format: "iframe",
			height,
			width,
			params: {},
		};

		const script = document.createElement("script");
		script.src = `https://pl29485786.effectivecpmnetwork.com/${adKey}/invoke.js`;
		script.async = true;
		script.setAttribute("data-cfasync", "false");

		container.appendChild(script);

		return () => {
			container.innerHTML = "";
		};
	}, [adKey, width, height]);

	return (
		<div
			ref={containerRef}
			className={`overflow-hidden ${className}`}
			style={{ width: "100%", maxWidth: `${width}px`, minHeight: `${height}px` }}
		/>
	);
}
