import React from 'react';

export function CaretDownIcon({ onClick }) {
  return (
    <svg viewBox="0 0 8 8" onClick={onClick} fill="currentColor">
      <path d="M0 0l4 4 4-4h-8z" transform="translate(0 2)" />
    </svg>
  );
}
