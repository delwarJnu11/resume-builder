'use client';

import { useEffect, useRef } from 'react';

interface AdsterraBannerProps {
  adKey: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Adsterra atOptions banner format:
 * <script>atOptions = {...}</script>
 * <script src=".../invoke.js"></script>
 */
export default function AdsterraBanner({
  adKey,
  width = 300,
  height = 250,
  className = '',
}: AdsterraBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    // 1. Inline config script (runs synchronously when appended)
    const configScript = document.createElement('script');
    configScript.setAttribute('data-cfasync', 'false');
    configScript.textContent = `
      atOptions = {
        'key': '${adKey}',
        'format': 'iframe',
        'height': ${height},
        'width': ${width},
        'params': {}
      };
    `;
    container.appendChild(configScript);

    // 2. External invoke.js (loads async, reads atOptions)
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    container.appendChild(invokeScript);
  }, [adKey, width, height]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ width: '100%', maxWidth: `${width}px`, minHeight: `${height}px` }}
    />
  );
}
