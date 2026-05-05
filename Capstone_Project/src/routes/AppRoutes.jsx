import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import QuizPage from '../pages/QuizPage';
import Results from '../pages/Results';

/**
 * AppRoutes handles all navigation logic.
 * Using React Router as per Mandatory Tech Stack.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing page for Domain Selection */}
      <Route path="/" element={<Home />} />

      {/* The Quiz Engine Page */}
      <Route path="/quiz" element={<QuizPage />} />

      {/* Results and Analytics Dashboard */}
      <Route path="/results" element={<Results />} />

      {/* Fallback to Home if route not found */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;