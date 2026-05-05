import React from 'react';

export default function ProgressBar({ current, total }) {
  const pct = Math.min((current / total) * 100, 100);
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Progress to next tier
        </span>
        <span style={{ fontSize: '0.7rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: 'var(--neon)' }}>
          {Math.round(pct)}%
        </span>
      </div>
    </div>
  );
}
