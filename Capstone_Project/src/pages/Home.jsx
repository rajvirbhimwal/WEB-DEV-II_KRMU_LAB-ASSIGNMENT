import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDomain, resetQuiz } from '../features/quiz/quizSlice';
import { Cpu, Trophy, History, Leaf } from 'lucide-react';
import Layout from '../components/Common/Layout';

const DOMAINS = [
  {
    id: 18, name: 'Computers',
    sub: 'Hardware · Software · Web',
    Icon: Cpu,
    accent: '#00f5c4',
    grad: 'linear-gradient(135deg, rgba(0,245,196,0.15), rgba(0,201,245,0.08))',
    border: 'rgba(0,245,196,0.2)',
  },
  {
    id: 21, name: 'Sports',
    sub: 'Records · Athletes · Teams',
    Icon: Trophy,
    accent: '#ffb830',
    grad: 'linear-gradient(135deg, rgba(255,184,48,0.15), rgba(255,120,48,0.08))',
    border: 'rgba(255,184,48,0.2)',
  },
  {
    id: 23, name: 'History',
    sub: 'Empires · Events · People',
    Icon: History,
    accent: '#c084fc',
    grad: 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(139,92,246,0.08))',
    border: 'rgba(192,132,252,0.2)',
  },
  {
    id: 17, name: 'Science',
    sub: 'Physics · Biology · Space',
    Icon: Leaf,
    accent: '#34d399',
    grad: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(16,185,129,0.08))',
    border: 'rgba(52,211,153,0.2)',
  },
];

function DomainCard({ domain, onStart }) {
  const { Icon, name, sub, accent, grad, border } = domain;
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onStart(domain)}
      style={{
        background: hovered ? grad : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? border : 'var(--border)'}`,
        borderRadius: 20,
        padding: '2rem 1.75rem',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 16px 48px -12px ${accent}40` : 'none',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${accent}18`,
        border: `1px solid ${accent}35`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.25rem',
        transition: 'transform 0.25s',
        transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1)',
      }}>
        <Icon size={22} color={accent} />
      </div>

      {/* Text */}
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.4rem', color: 'var(--text)', marginBottom: 4, letterSpacing: '0.03em' }}>
        {name}
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: 400 }}>
        {sub}
      </div>

      {/* CTA */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
        fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase',
        color: accent,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.2s',
      }}>
        Start Quiz
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 6h10M7 2l4 4-4 4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Ghost icon */}
      <div style={{
        position: 'absolute', bottom: -10, right: -10,
        opacity: hovered ? 0.08 : 0.03,
        transition: 'opacity 0.3s',
        transform: 'scale(1)',
        pointerEvents: 'none',
      }}>
        <Icon size={100} color={accent} />
      </div>
    </button>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStart = (domain) => {
    dispatch(resetQuiz());
    dispatch(setDomain({ id: domain.id, name: domain.name }));
    navigate('/quiz');
  };

  return (
    <Layout>
      {/* Hero */}
      <div className="anim-fade-up" style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '1rem' }}>

        {/* Tag line */}
        <div className="anim-fade-up stagger-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
          fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--neon)',
          background: 'rgba(0,245,196,0.08)',
          border: '1px solid rgba(0,245,196,0.2)',
          padding: '5px 14px', borderRadius: 99,
          marginBottom: '1.5rem',
        }}>
          <span className="anim-neon-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon)', display: 'inline-block' }} />
          Adaptive difficulty engine
        </div>

        <h1 className="anim-fade-up stagger-2" style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: 'var(--text)',
          marginBottom: '1.25rem',
        }}>
          Ready to{' '}
          <span className="glow-neon" style={{ color: 'var(--neon)' }}>Level Up?</span>
        </h1>

        <p className="anim-fade-up stagger-3" style={{
          fontSize: '1rem', color: 'var(--muted)', maxWidth: 480,
          margin: '0 auto', lineHeight: 1.7, fontWeight: 400,
        }}>
          Pick a domain. Answer questions. The engine scales difficulty in real-time —
          hit <strong style={{ color: 'var(--text)' }}>Hard tier</strong> to claim your rank.
        </p>
      </div>

      {/* Domain grid */}
      <div
        className="anim-fade-up stagger-5"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        {DOMAINS.map((d) => (
          <DomainCard key={d.id} domain={d} onStart={handleStart} />
        ))}
      </div>

      {/* Footer hint */}
      <p className="anim-fade-up stagger-6" style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
        3 correct answers in a row → difficulty upgrade · 10 pts → 20 pts → 30 pts
      </p>
    </Layout>
  );
}
