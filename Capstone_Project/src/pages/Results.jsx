import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { resetQuiz } from '../features/quiz/quizSlice';
import Layout from '../components/Common/Layout';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#111827', border: '1px solid rgba(0,245,196,0.2)',
      borderRadius: 10, padding: '8px 14px', fontSize: '0.8rem', color: 'var(--text)',
    }}>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: 'var(--neon)' }}>{label}</div>
      <div>Score: <strong>{payload[0]?.value}</strong></div>
    </div>
  );
};

function RankBadge({ difficulty, score }) {
  const tiers = [
    { min: 200, label: 'GRANDMASTER', color: '#ffb830', glow: 'rgba(255,184,48,0.4)' },
    { min: 100, label: 'EXPERT',      color: '#00f5c4', glow: 'rgba(0,245,196,0.4)' },
    { min: 50,  label: 'CHALLENGER',  color: '#c084fc', glow: 'rgba(192,132,252,0.4)' },
    { min: 0,   label: 'ROOKIE',      color: '#5a6480', glow: 'transparent' },
  ];
  const rank = tiers.find(t => score >= t.min) || tiers[tiers.length - 1];
  return (
    <div style={{
      display: 'inline-block',
      fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
      fontSize: '0.75rem', letterSpacing: '0.15em',
      color: rank.color,
      background: `${rank.color}14`,
      border: `1px solid ${rank.color}35`,
      padding: '5px 16px', borderRadius: 99,
      textShadow: `0 0 14px ${rank.glow}`,
      marginBottom: '0.75rem',
    }}>
      {rank.label}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div style={{
      flex: '1 1 100px',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      padding: '1.25rem',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '2rem', color: accent || 'var(--neon)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{label}</div>
    </div>
  );
}

export default function Results() {
  const { score, history, difficulty } = useSelector(s => s.quiz);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = history.length;
  const correct = history.filter(h => h.correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  return (
    <Layout>
      <div className="anim-fade-up" style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* ── Score hero ── */}
        <div style={{
          position: 'relative', textAlign: 'center',
          background: 'rgba(17,24,39,0.85)',
          border: '1px solid var(--border)',
          borderRadius: 24, padding: '3rem 2rem',
          marginBottom: '1.25rem', overflow: 'hidden',
        }}>
          {/* Glow blob */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280, height: 280, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,196,0.12) 0%, transparent 70%)',
            filter: 'blur(30px)', pointerEvents: 'none',
          }} />

          <RankBadge difficulty={difficulty} score={score} />

          <div style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
            fontSize: 'clamp(5rem, 15vw, 8rem)',
            color: 'var(--neon)', lineHeight: 1,
            textShadow: '0 0 40px rgba(0,245,196,0.5), 0 0 80px rgba(0,245,196,0.2)',
            letterSpacing: '-0.02em',
          }}>
            {score}
          </div>
          <div style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', marginTop: 6,
          }}>
            Final Score · Reached {difficulty.toUpperCase()}
          </div>
        </div>

        {/* ── Stat row ── */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <StatCard label="Questions" value={total} accent="var(--neon2)" />
          <StatCard label="Correct" value={correct} accent="var(--neon)" />
          <StatCard label="Accuracy" value={`${accuracy}%`} accent="var(--amber)" />
          <StatCard label="Peak Tier" value={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            accent={difficulty === 'hard' ? 'var(--rose)' : difficulty === 'medium' ? 'var(--amber)' : 'var(--neon)'} />
        </div>

        {/* ── Chart ── */}
        <div style={{
          background: 'rgba(17,24,39,0.85)',
          border: '1px solid var(--border)',
          borderRadius: 20, padding: '1.75rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
            fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 11L5 6l3 3 5-7" stroke="var(--neon)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Performance Analytics
          </div>
          <div style={{ height: 200 }}>
            {history.length > 1 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history} margin={{ top: 4, right: 8, left: -24, bottom: 4 }}>
                  <defs>
                    <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00f5c4" />
                      <stop offset="100%" stopColor="#00c9f5" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="name" tick={{ fill: '#5a6480', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5a6480', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone" dataKey="score"
                    stroke="url(#lg)" strokeWidth={3}
                    dot={{ fill: '#00f5c4', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#00f5c4', strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                Answer more questions to see your trend.
              </div>
            )}
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => { dispatch(resetQuiz()); navigate('/'); }}
            style={{
              flex: 1, padding: '1rem',
              background: 'linear-gradient(135deg, var(--neon), var(--neon2))',
              border: 'none', borderRadius: 14,
              color: '#080c1a', fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
              boxShadow: '0 0 24px rgba(0,245,196,0.3)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Play Again
          </button>
          <button
            onClick={() => window.print()}
            style={{
              flex: 1, padding: '1rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid var(--border)',
              borderRadius: 14, color: 'var(--muted)',
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
              fontSize: '0.9rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            Save Report
          </button>
        </div>
      </div>
    </Layout>
  );
}
