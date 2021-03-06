import React from 'react';

export function PencilIcon({ onClick }) {
  return (
    <svg viewBox="0 0 8 8" onClick={onClick} fill="currentColor">
      <path d="M6 0l-1 1 2 2 1-1-2-2zm-2 2l-4 4v2h2l4-4-2-2z" />
    </svg>
  );
}
