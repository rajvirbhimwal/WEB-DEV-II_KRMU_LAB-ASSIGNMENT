import React from 'react';

const LABELS = ['A', 'B', 'C', 'D'];

export default function OptionButton({ text, onClick, index = 0, disabled = false }) {
  return (
    <button
      className="option-btn"
      style={{ animationDelay: `${0.05 + index * 0.07}s` }}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="option-label">{LABELS[index]}</span>
      <span style={{ flex: 1 }} dangerouslySetInnerHTML={{ __html: text }} />
      <span className="option-arrow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
}
