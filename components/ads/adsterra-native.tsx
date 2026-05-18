'use client';

import { useEffect, useRef } from 'react';

interface AdsterraNativeProps {
  adKey: string;
  className?: string;
}

export default function AdsterraNative({
  adKey,
  className = '',
}: AdsterraNativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement('script');
    script.src = `https://pl29485786.effectivecpmnetwork.com/${adKey}/invoke.js`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, [adKey]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div id={`container-${adKey}`} />
    </div>
  );
}
