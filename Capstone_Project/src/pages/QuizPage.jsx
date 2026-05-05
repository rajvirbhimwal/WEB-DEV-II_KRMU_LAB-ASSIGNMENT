import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { processAnswer } from '../features/quiz/quizSlice';
import { useNavigate } from 'react-router-dom';
import { useTimer } from '../hooks/useTimer';
import Layout from '../components/Common/Layout';
import OptionButton from '../components/Common/OptionButton';
import ProgressBar from '../components/Quiz/ProgressBar';

const RADIUS = 22;
const CIRC = 2 * Math.PI * RADIUS;

function TimerRing({ timeLeft, total = 30 }) {
  const pct = timeLeft / total;
  const offset = CIRC * (1 - pct);
  const color = timeLeft < 10 ? 'var(--rose)' : timeLeft < 20 ? 'var(--amber)' : 'var(--neon)';
  return (
    <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" className="timer-ring">
        <circle className="timer-track" cx="28" cy="28" r={RADIUS} />
        <circle
          className="timer-fill"
          cx="28" cy="28" r={RADIUS}
          stroke={color}
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ boxShadow: `0 0 8px ${color}` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Rajdhani, sans-serif', fontWeight: 700,
        fontSize: '0.9rem', color,
      }}>
        {timeLeft}
      </div>
    </div>
  );
}

function StatPill({ label, value, accent = 'var(--neon)' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '0.6rem 1.2rem',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      minWidth: 80,
    }}>
      <span style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: accent, lineHeight: 1 }}>{value}</span>
      <span style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>{label}</span>
    </div>
  );
}

export default function QuizPage() {
  const { domain, difficulty, score, streak } = useSelector(s => s.quiz);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [qNum, setQNum] = useState(1);
  const lockedRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChoice = useCallback((choice) => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setAnswered(true);
    const isCorrect = question && choice === question.correct_answer;
    dispatch(processAnswer(isCorrect));
    setTimeout(() => {
      lockedRef.current = false;
      setAnswered(false);
      setQNum(n => n + 1);
      fetchQuestion();
    }, 500);
  }, [question]);

  const { timeLeft, resetTimer } = useTimer(30, () => handleChoice(null));

  const fetchQuestion = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=1&category=${domain.id}&difficulty=${difficulty}&type=multiple`);
      const data = await res.json();
      setQuestion(data.results[0]);
      resetTimer();
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (!domain) { navigate('/'); return; }
    fetchQuestion();
  }, []);

  const answers = question ? [...question.incorrect_answers, question.correct_answer].sort() : [];

  const diffColor = difficulty === 'hard' ? 'var(--rose)' : difficulty === 'medium' ? 'var(--amber)' : 'var(--neon)';

  if (loading) return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', gap: '1rem' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: '3px solid rgba(255,255,255,0.06)',
          borderTopColor: 'var(--neon)',
          animation: 'spin 0.75s linear infinite',
        }} />
        <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Loading {difficulty} question…
        </p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="anim-fade-in" style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* ── Stat bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <StatPill label="Score" value={score} accent="var(--neon)" />
            <StatPill label="Streak" value={streak} accent={streak >= 2 ? 'var(--amber)' : 'var(--muted)'} />
          </div>

          <TimerRing timeLeft={timeLeft} />

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <StatPill label="Question" value={`#${qNum}`} accent="var(--muted)" />
            <span className={`badge badge-${difficulty}`}>{difficulty}</span>
          </div>
        </div>

        {/* ── Streak progress ── */}
        <ProgressBar current={streak % 3} total={3} />

        {/* ── Question card ── */}
        <div
          className="scanlines"
          style={{
            background: 'rgba(17,24,39,0.85)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: '2rem',
            marginBottom: '1rem',
            backdropFilter: 'blur(12px)',
            position: 'relative',
          }}
        >
          {/* Domain + difficulty strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <span style={{
              fontSize: '0.65rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
              color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              {domain?.name}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)', display: 'inline-block' }} />
            <span style={{ fontSize: '0.65rem', fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: diffColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {difficulty}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: 1.55, color: 'var(--text)',
              marginBottom: '1.75rem',
            }}
            dangerouslySetInnerHTML={{ __html: question?.question }}
          />

          {/* Answers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {answers.map((ans, i) => (
              <OptionButton
                key={ans}
                text={ans}
                index={i}
                onClick={() => handleChoice(ans)}
                disabled={answered}
              />
            ))}
          </div>
        </div>

        {/* ── End button ── */}
        <button
          onClick={() => navigate('/results')}
          style={{
            width: '100%', padding: '0.75rem',
            background: 'none', border: 'none',
            color: 'var(--muted)', fontSize: '0.82rem',
            cursor: 'pointer', transition: 'color 0.2s',
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600,
            letterSpacing: '0.06em',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          END QUIZ → SEE RESULTS
        </button>
      </div>
    </Layout>
  );
}
