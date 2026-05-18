"use client";

import Script from "next/script";

export default function AdsterraGlobalAds() {
	return (
		<>
			{/* Popunder Ad */}
			<Script
				id="adsterra-popunder"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            (function() {
              var script = document.createElement('script');
              script.src = 'https://pl29485623.effectivecpmnetwork.com/17/29/4d/17294d9a11b1cd0b71fc75561dfe45ff.js';
              script.async = true;
              document.head.appendChild(script);
            })();
          `,
				}}
			/>
		</>
	);
}
