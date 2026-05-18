"use client";

import Script from "next/script";

/**
 * Adsterra Popunder & Social Bar global scripts.
 * Place this once in your root layout.
 *
 * REPLACE the script src values below with your actual
 * Adsterra dashboard codes.
 */
export default function AdsterraGlobalAds() {
	return (
		<>
			{/* Popunder Ad */}
			<Script
				id="adsterra-popunder"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            // Replace this entire block with your actual Adsterra popunder script
            (function() {
              var script = document.createElement('script');
              script.src = 'https://pl29485623.effectivecpmnetwork.com/17/29/4d/17294d9a11b1cd0b71fc75561dfe45ff.js';
              script.async = true;
              document.head.appendChild(script);
            })();
          `,
				}}
			/>

			{/* Social Bar */}
			<Script
				id="adsterra-social-bar"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
            // Replace this entire block with your actual Adsterra social bar script
            (function() {
              var script = document.createElement('script');
              script.src = 'https://pl26673851.effectivegatecpm.com/YOUR_SOCIAL_BAR_ID.js';
              script.async = true;
              document.head.appendChild(script);
            })();
          `,
				}}
			/>
		</>
	);
}
