'use client';

import { useEffect, useRef } from 'react';

interface AdsterraNativeProps {
  /** Full Adsterra native banner script URL from your dashboard */
  scriptSrc: string;
  /** Container className */
  className?: string;
}

/**
 * For Adsterra "Native Banner" or standard banner scripts.
 * Paste the exact script URL from your Adsterra dashboard.
 */
export default function AdsterraNative({ scriptSrc, className = '' }: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const script = document.createElement('script');
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current && script.parentNode === containerRef.current) {
        containerRef.current.removeChild(script);
        hasLoadedRef.current = false;
      }
    };
  }, [scriptSrc]);

  return (
    <div
      ref={containerRef}
      className={`adsterra-native-banner overflow-hidden rounded-lg ${className}`}
    />
  );
}
