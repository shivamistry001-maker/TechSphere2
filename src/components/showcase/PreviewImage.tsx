/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Monitor } from 'lucide-react';
import { ThemeMode } from '../../types.ts';
import {
  DEFAULT_LAZY_ROOT_MARGIN,
  DEFAULT_LAZY_THRESHOLD,
  useLazyImage,
} from '../../utils/lazyImage.ts';

export interface PreviewImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  theme: ThemeMode;
  className?: string;
  imgClassName?: string;
  /** Set true only for critical or user-opened interactive images (e.g., open lightbox). */
  eager?: boolean;
  /** Viewport preload margin passed to the shared IntersectionObserver pool. */
  rootMargin?: string;
  /** Visibility threshold passed to the shared IntersectionObserver pool. */
  threshold?: number;
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
  rootMargin = DEFAULT_LAZY_ROOT_MARGIN,
  threshold = DEFAULT_LAZY_THRESHOLD,
}) => {
  const { containerRef, imgRef, shouldLoad, status, handleLoad, handleError } = useLazyImage(src, {
    eager,
    rootMargin,
    threshold,
  });
  const isDark = theme === 'dark';
  const showSkeleton = status === 'idle' || status === 'loading';

  return (
    <div
      ref={containerRef}
      data-lazy-image="true"
      data-lazy-state={status}
      data-lazy-loaded={status === 'loaded' ? 'true' : 'false'}
      className={`relative w-full h-full overflow-hidden ${
        isDark ? 'bg-[#111111]' : 'bg-slate-100'
      } ${className}`}
    >
      {showSkeleton && (
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
      ) : shouldLoad ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="eager"
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : 'auto'}
          referrerPolicy="no-referrer"
          onLoad={handleLoad}
          onError={handleError}
          className={`relative z-[1] ${imgClassName} transition-opacity duration-300 motion-reduce:transition-none ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : null}
    </div>
  );
};
