import { useState } from 'react';

interface SmartImageProps {
  src: string;
  fallbackLabel?: string;
  alt: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
  className?: string;
  priority?: boolean;
}

function PlaceholderBlock({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e2230] border border-[#2e3347]">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-3 opacity-30">
        <rect x="1" y="1" width="38" height="38" rx="4" stroke="#b8962e" strokeWidth="1.5" strokeDasharray="4 3"/>
        <path d="M14 26l5-7 4 5 3-4 4 6H14z" fill="#b8962e" opacity="0.4"/>
        <circle cx="25" cy="15" r="3" fill="#b8962e" opacity="0.4"/>
      </svg>
      <span className="text-xs font-medium tracking-widest uppercase text-[#b8962e] opacity-50 text-center px-4">
        {label}
      </span>
    </div>
  );
}

export function SmartImage({
  src,
  fallbackLabel = 'Image Placeholder',
  alt,
  aspectRatio = '1/1',
  objectFit = 'cover',
  className = '',
  priority = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit }}
        />
      ) : (
        <PlaceholderBlock label={fallbackLabel} />
      )}
    </div>
  );
}
