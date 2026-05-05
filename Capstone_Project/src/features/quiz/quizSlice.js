import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  domain: null,
  difficulty: 'easy',
  score: 0,
  streak: 0,
  history: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setDomain: (state, action) => { state.domain = action.payload; },
    processAnswer: (state, action) => {
      const isCorrect = action.payload;
      if (isCorrect) {
        const pts = state.difficulty === 'hard' ? 30 : state.difficulty === 'medium' ? 20 : 10;
        state.score += pts;
        state.streak += 1;
      } else {
        state.streak = 0;
      }
      if (state.streak >= 3 && state.difficulty === 'easy')   { state.difficulty = 'medium'; state.streak = 0; }
      if (state.streak >= 3 && state.difficulty === 'medium') { state.difficulty = 'hard';   state.streak = 0; }

      state.history.push({
        name: `Q${state.history.length + 1}`,
        score: state.score,
        difficulty: state.difficulty,
        correct: isCorrect,
      });
    },
    resetQuiz: () => initialState,
  },
});

export const { setDomain, processAnswer, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
