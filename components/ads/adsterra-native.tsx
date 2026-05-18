'use client';

import { useEffect, useRef } from 'react';

interface AdsterraNativeProps {
  /** Ad key from the invoke.js URL (e.g. '025dafa42e4cef854a761b233b63dd00') */
  adKey: string;
  /** Container className */
  className?: string;
}

export default function AdsterraNative({
  adKey,
  className = '',
}: AdsterraNativeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // 1. Create the container div with the exact ID Adsterra expects
    const containerId = `container-${adKey}`;
    const container = document.createElement('div');
    container.id = containerId;
    wrapper.appendChild(container);

    // 2. Create and append the invoke.js script
    const script = document.createElement('script');
    script.src = `https://pl29485786.effectivecpmnetwork.com/${adKey}/invoke.js`;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    wrapper.appendChild(script);

    return () => {
      wrapper.innerHTML = '';
    };
  }, [adKey]);

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden ${className}`}
    />
  );
}
