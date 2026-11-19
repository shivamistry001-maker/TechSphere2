/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Monitor } from 'lucide-react';
import { ThemeMode } from '../../types.ts';

interface PreviewImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  theme: ThemeMode;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  theme,
  className = '',
  imgClassName = 'w-full h-full object-cover object-top',
  eager = false,
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const imgRef = useRef<HTMLImageElement | null>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setStatus('loaded');
    } else {
      setStatus('loading');
    }
  }, [src]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        isDark ? 'bg-[#111111]' : 'bg-slate-100'
      } ${className}`}
    >
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 ts-skeleton-block ${
            isDark ? 'ts-skeleton-dark bg-[#1D1D1D]' : 'ts-skeleton-light bg-[#E8EEF5]'
          }`}
        />
      )}

      {status === 'error' ? (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center ${
            isDark
              ? 'bg-gradient-to-br from-[#171717] to-[#0D0D0D] text-[#A3A3A3]'
              : 'bg-gradient-to-br from-[#F5FAFE] to-slate-100 text-slate-500'
          }`}
        >
          <Monitor className={`w-7 h-7 mb-2 ${isDark ? 'text-[#D4D4D4]' : 'text-[#0284C7]'}`} />
          <p className={`text-xs font-semibold ${isDark ? 'text-[#F5F5F5]' : 'text-[#101B35]'}`}>
            {fallbackTitle}
          </p>
          {fallbackSubtitle && (
            <p className="text-[11px] mt-0.5 opacity-80">{fallbackSubtitle}</p>
          )}
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`relative z-[1] ${imgClassName} transition-opacity duration-150 ${
            eager || status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
