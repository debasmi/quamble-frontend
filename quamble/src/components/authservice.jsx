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
      const result = await response.json();
      return result.message ? result : {
        status: 'success',
        message: 'Welcome!',
        token: result.token
      };
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
      const result = await response.json();
      return result.message ? result : {
        status: 'success',
        message: 'Account created successfully'
      };
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
      // Server returns: { "leaderboard": [...], "status": "success" }
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
      // Server returns: { "leaderboard": [], "status": "success" }
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while fetching the daily leaderboard.'
      };
    }
  },
  getThemeLeaderboard: async (theme) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard_theme`, {
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
        message: 'An error occurred while fetching the leaderboard for theme: ' + theme
      };
    }
  },
  addQuestionManually: async (theme, question, correct_option) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add_question_master`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme,
          question,
          correct_option
        })
      });
      const result = await response.json();
      return result.message ? result : {
        message: "Question added to question bank"
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to add question in the database.'
      };
    }
  },
  addQuestionLLM: async (theme) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add_question_llm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme
        })
      });
      const result = await response.json();
      return result.message ? result : {
        message: "Question added to question bank"
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to add question in the database.'
      };
    }
  },
  createQuiz: async (theme, num_questions) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create_quiz_master`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme,
          num_questions
        })
      });
      return await response.json();
      // Server returns: { "correct_options": [...], "questions": [...], "quiz_id": 37 }
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to generate quiz.'
      };
    }
  },
  reportQuestionIssue: async (theme, ques_id, issue_description) => {
    try {
      const response = await fetch(`${API_BASE_URL}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme,
          ques_id,
          issue_description
        })
      });
      const result = await response.json();
      return result.message ? result : {
        message: "Issue reported successfully"
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'An error occurred while reporting the issue'
      };
    }
  },
  submitFeedback: async (rating, comments) => {
    try {
      const response = await fetch(`${API_BASE_URL}/submit_feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          rating,
          comments
        })
      });
      const result = await response.json();
      return result.message ? result : {
        message: "Feedback submitted successfully"
      };
    }
    catch (error) {
      return {
        status: 'error',
        message: 'Failed to submit feedback.'
      };
    }
  },
  createquizfrombank: async (theme, num_questions) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create_quiz_from_bank`, {
        method: 'POST',  // Fixed: changed method='POST' to method: 'POST'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme,
          num_questions
        })
      });
      return await response.json();
      // Server returns: { "correct_options": [...], "questions": [...], "quiz_id": 37 }
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to create quiz.'
      };
    }
  },
  generateRandomQuestion: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate_question_random_theme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.message) {
        return result;
      } else {
        return {
          status: 'success',
          message: 'Question added successfully!',
          theme: result.theme
        };
      }
    } catch (error) {
      return {
        status: 'error',
        message: `Error adding question:${error.question_text }`,
       
      };
    }
  },
  
  addTheme: async (theme) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add_theme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          theme
        })
      });
      const result = await response.json();
      return result.message ? result : {
        message: "Theme added successfully"
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to add theme.'
      };
    }
  },
  beatTheAi: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/beat_the_ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      return await response.json();
    } catch (error) {
      return {
        status: 'error',
        message: 'Database insertion failed',
      };
    }
  },
  editProfile: async (profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/edit_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          organisation: profileData.organisation,
          industry: profileData.industry,
          bio: profileData.bio
        }),
      });
      const result = await response.json();
      return result.message ? result : {
        status: 'success',
        message: 'Profile updated successfully!'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to update profile'
      };
    }
  },
  
  // New method for view profile
  viewProfile: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/view_profile`, {
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
        message: 'User does not exist.'
      };
    }
  },
  viewQuizScore: async (quiz_id, theme) => {
    try {
      const response = await fetch(`${API_BASE_URL}/view_quiz_score`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return await response.json();
      // Server returns: quiz_id, theme, user_response, score, accuracy, time_taken
    } catch (error) {
      return {
        status: 'error',
        message: 'Unable to fetch quiz score'
      };
    }
  }, 
  getShareableQuizLink: async (quiz_id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/share_attempted_quiz`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      return result;
      
    } catch (error) {
      return {
        status: 'error',
        message: 'Unable to generate shareable link'
      };
    }
  }
};

export default authService;