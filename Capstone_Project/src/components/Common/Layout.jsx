import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden" style={{ background: 'var(--navy)' }}>
      {/* Ambient orbs */}
      <div className="orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,245,196,0.12) 0%, transparent 70%)', top: -180, left: -120, animationDelay: '0s' }} />
      <div className="orb" style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(0,201,245,0.1) 0%, transparent 70%)', bottom: -100, right: -80, animationDelay: '-6s' }} />
      <div className="orb" style={{ width: 260, height: 260, background: 'radial-gradient(circle, rgba(255,184,48,0.07) 0%, transparent 70%)', top: '45%', left: '55%', animationDelay: '-11s' }} />

      {/* Nav */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(8,12,26,0.7)',
        backdropFilter: 'blur(16px)',
      }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Logo mark */}
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--neon), var(--neon2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(0,245,196,0.4)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 5V11L8 15L1 11V5L8 1Z" stroke="#080c1a" strokeWidth="1.5" fill="none"/>
              <circle cx="8" cy="8" r="2.5" fill="#080c1a"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', letterSpacing: '0.05em' }}>
            ADAPTIVE<span style={{ color: 'var(--neon)' }}>QUIZ</span>
          </span>
        </button>

        <div style={{
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '0.7rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--muted)', border: '1px solid var(--border)',
          padding: '4px 12px', borderRadius: 99,
        }}>
          Open Trivia DB
        </div>
      </nav>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {children}
      </main>
    </div>
  );
}
