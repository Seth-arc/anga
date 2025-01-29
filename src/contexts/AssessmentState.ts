// src/contexts/AssessmentState.ts

import { Answer, TeachingStyleResults } from '../types';

// Define the structure of our assessment state
// This interface represents all the data we need to track throughout the assessment
export interface AssessmentState {
  currentQuestionIndex: number;  // Tracks which question the user is currently viewing (0-23)
  answers: Answer[];            // Stores all user responses
  isComplete: boolean;         // Indicates if the assessment has been completed
  results: TeachingStyleResults | null;  // Stores the calculated teaching style results
}

// Define all possible actions that can modify our assessment state
// This type union ensures type safety when dispatching actions
export type AssessmentAction =
  | { type: 'SET_ANSWER'; payload: Answer }              // When user answers a question
  | { type: 'NEXT_QUESTION' }                           // Navigate to next question
  | { type: 'PREVIOUS_QUESTION' }                       // Navigate to previous question
  | { type: 'SET_RESULTS'; payload: TeachingStyleResults }  // Set final results
  | { type: 'RESET_ASSESSMENT' };                          // Reset assessment to initial state

// Define the initial state when starting a new assessment
export const initialState: AssessmentState = {
  currentQuestionIndex: 0,
  answers: [],
  isComplete: false,
  results: null,
};

// The reducer function handles all state updates based on dispatched actions
// It ensures our state updates are predictable and type-safe
export function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case 'SET_ANSWER': {
      // Find if an answer already exists for this question
      const existingAnswerIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );
      
      // Update existing answer or add new one
      const updatedAnswers = existingAnswerIndex >= 0
        ? state.answers.map((answer, index) =>
            index === existingAnswerIndex ? action.payload : answer
          )
        : [...state.answers, action.payload];

      return {
        ...state,
        answers: updatedAnswers,
      };
    }

    case 'NEXT_QUESTION': {
      // Move to next question, but don't exceed maximum (23)
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, 23),
      };
    }

    case 'PREVIOUS_QUESTION': {
      // Move to previous question, but don't go below 0
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    }

    case 'SET_RESULTS': {
      // Set the final results and mark assessment as complete
      return {
        ...state,
        results: action.payload,
        isComplete: true,
      };
    }

    case 'RESET_ASSESSMENT': {
      // Reset everything back to initial state
      return initialState;
    }

    default: {
      // TypeScript will ensure we've handled all possible action types
      return state;
    }
  }
}

// Utility function to save assessment state to localStorage
// This allows users to resume their assessment if they leave the page
export function saveAssessmentState(state: AssessmentState): void {
  try {
    localStorage.setItem('anga_assessment', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save assessment state:', error);
  }
}

// Utility function to load saved assessment state from localStorage
// Returns null if no saved state exists or if there's an error
export function loadAssessmentState(): AssessmentState | null {
  try {
    const savedState = localStorage.getItem('anga_assessment');
    if (!savedState) return null;

    // Parse the saved state and validate its structure
    const parsedState = JSON.parse(savedState);
    
    // Ensure the loaded state has all required properties
    if (
      typeof parsedState.currentQuestionIndex === 'number' &&
      Array.isArray(parsedState.answers) &&
      typeof parsedState.isComplete === 'boolean'
    ) {
      return parsedState as AssessmentState;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load assessment state:', error);
    return null;
  }
}

// Helper function to calculate the completion percentage
export function calculateProgress(answers: Answer[]): number {
  return (answers.length / 24) * 100; // 24 is total number of questions
}

// Helper function to validate an individual answer
export function isValidAnswer(answer: Answer): boolean {
  return (
    typeof answer.questionId === 'number' &&
    answer.questionId >= 1 &&
    answer.questionId <= 24 &&
    typeof answer.value === 'number' &&
    answer.value >= 1 &&
    answer.value <= 5
  );
}

// Helper function to check if the assessment is complete
export function isAssessmentComplete(answers: Answer[]): boolean {
  // Check if we have exactly 24 valid answers
  return (
    answers.length === 24 &&
    answers.every(isValidAnswer) &&
    // Ensure we have an answer for each question 1-24
    new Set(answers.map(a => a.questionId)).size === 24
  );
}

// Helper function to validate the entire assessment state
export function validateAssessmentState(state: AssessmentState): boolean {
  return (
    typeof state.currentQuestionIndex === 'number' &&
    state.currentQuestionIndex >= 0 &&
    state.currentQuestionIndex <= 23 &&
    Array.isArray(state.answers) &&
    state.answers.every(isValidAnswer) &&
    typeof state.isComplete === 'boolean' &&
    (state.results === null || typeof state.results === 'object')
  );
}