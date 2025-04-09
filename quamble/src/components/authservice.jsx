const API_BASE_URL = "http://3.109.121.195:5000";
export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      return {
        status: 'danger',
        message: 'Internal server error. Please try again later.'
      };
    }
  },
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          role: userData.role
        }),
      });
      return await response.json();
    } catch (error) {
      return {
        status: 'danger',
        message: 'Internal server error while adding user.'
      };
    }
  },
  submitQuiz: async (quizData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit_quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          quiz_id: quizData.quiz_id,
          user_response: quizData.user_response,
          theme: quizData.theme,
          start_time: quizData.start_time,
          end_time: quizData.end_time
        }),
      });
      return await response.json();
    } catch (error) {
      return {
        status: 'danger',
        message: 'Internal server error while submitting quiz.'
      };
    }
  },
  getOverallLeaderboard: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard_overall`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while fetching the leaderboard.'
      };
    }
  },
  getDailyLeaderboard: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard_daily`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while fetching the daily leaderboard.'
      };
    }
  }
};