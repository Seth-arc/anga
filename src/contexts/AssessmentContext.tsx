// src/contexts/AssessmentContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { 
    AssessmentState, 
    AssessmentAction, 
    initialState, 
    assessmentReducer 
} from './AssessmentState';

// Create context with undefined initial value
const AssessmentContext = createContext<{
    state: AssessmentState;
    dispatch: React.Dispatch<AssessmentAction>;
} | undefined>(undefined);

// Provider component that makes assessment state available
export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(assessmentReducer, initialState);

    return (
        <AssessmentContext.Provider value={{ state, dispatch }}>
            {children}
        </AssessmentContext.Provider>
    );
};

// Custom hook for accessing the assessment context
export function useAssessment() {
    const context = useContext(AssessmentContext);
    if (context === undefined) {
        throw new Error('useAssessment must be used within an AssessmentProvider');
    }
    return context;
}