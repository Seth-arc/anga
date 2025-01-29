import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Answer, TeachingStyleResults } from '../types';

// First, let's clearly define our state structure
interface AssessmentState {
  currentQuestionIndex: number;
  answers: Answer[];
  isComplete: boolean;
  results: TeachingStyleResults | null;
}

// Define our action types with proper type safety
type AssessmentAction =
  | { type: 'SET_ANSWER'; payload: Answer }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SET_RESULTS'; payload: TeachingStyleResults }
  | { type: 'RESET_ASSESSMENT' };

// Our initial state with proper typing
const initialState: AssessmentState = {
  currentQuestionIndex: 0,
  answers: [],
  isComplete: false,
  results: null,
};

// Define the shape of our context
interface AssessmentContextType {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  saveAssessmentState: (state: AssessmentState) => void;
  loadAssessmentState: () => AssessmentState | null;
}

// Create our context with proper typing
const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

// Local storage helper functions with proper error handling
const saveAssessmentState = (state: AssessmentState): void => {
  try {
    localStorage.setItem('anga_assessment', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save assessment state:', error);
  }
};

const loadAssessmentState = (): AssessmentState | null => {
  try {
    const savedState = localStorage.getItem('anga_assessment');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load assessment state:', error);
    return null;
  }
};

// Our reducer function with proper type checking
function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_ANSWER': {
      // Using a proper type-safe way to handle array operations
      const existingAnswerIndex = state.answers.findIndex(
        answer => answer.questionId === action.payload.questionId
      );
      
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

    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, 23),
      };

    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };

    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload,
        isComplete: true,
      };

    case 'RESET_ASSESSMENT':
      return initialState;

    default:
      return state;
  }
}

// Provider component with proper type safety
export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Load saved state on initial mount with proper type handling
  useEffect(() => {
    const savedState = loadAssessmentState();
    if (savedState) {
      // Properly handle each answer from the saved state
      savedState.answers.forEach(answer => {
        dispatch({
          type: 'SET_ANSWER',
          payload: answer
        });
      });
    }
  }, []);

  // Create our context value with all necessary functions
  const contextValue: AssessmentContextType = {
    state,
    dispatch,
    saveAssessmentState,
    loadAssessmentState
  };

  return (
    <AssessmentContext.Provider value={contextValue}>
      {children}
    </AssessmentContext.Provider>
  );
};

// Custom hook with proper error handling and type safety
export function useAssessment(): AssessmentContextType {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}

export type { AssessmentState, AssessmentAction, AssessmentContextType };