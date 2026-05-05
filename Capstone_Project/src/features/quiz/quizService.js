import axios from 'axios';

const BASE_URL = 'https://opentdb.com/api.php';

/**
 * Fetches a single question based on domain and current difficulty level.
 * Implements clean API logic as per SOP guidelines.
 */
export const fetchQuestionFromAPI = async (categoryId, difficulty) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        amount: 1,
        category: categoryId,
        difficulty: difficulty, // 'easy', 'medium', or 'hard'
        type: 'multiple',
      },
    });

    if (response.data.response_code === 0) {
      return response.data.results[0];
    } else {
      throw new Error("No questions found for this level.");
    }
  } catch (error) {
    console.error("Quiz API Error:", error);
    throw error;
  }
};