"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
	/** The Adsterra data-ad-slot or script data attribute */
	slot: string;
	/** Banner size, e.g. '300x250', '728x90', '320x50', 'responsive' */
	size?: string;
	/** Optional className for container styling */
	className?: string;
}

export default function AdsterraBanner({ slot, size = "responsive", className = "" }: AdsterraBannerProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const hasLoadedRef = useRef(false);

	useEffect(() => {
		if (!containerRef.current || hasLoadedRef.current) return;
		hasLoadedRef.current = true;

		const script = document.createElement("script");
		script.src = "https://www.highperformanceformat.com/023e73d50c6d43a4b6756f9f0644ea1f/invoke.js"; // Replace with your actual Adsterra banner script URL
		script.async = true;
		script.setAttribute("data-cfasync", "false");

		containerRef.current.appendChild(script);

		return () => {
			if (containerRef.current && script.parentNode === containerRef.current) {
				containerRef.current.removeChild(script);
				hasLoadedRef.current = false;
			}
		};
	}, [slot]);

	return (
		<div
			ref={containerRef}
			className={`adsterra-banner overflow-hidden ${className}`}
			data-ad-slot={slot}
			data-ad-size={size}
			style={{
				minHeight: size === "320x50" ? "50px" : size === "300x250" ? "250px" : size === "728x90" ? "90px" : "auto",
			}}
		/>
	);
}
