import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import LikertScale from '../components/LikertScale';
import Button from '../components/Button';
import { useAssessment } from '../contexts/AssessmentContext';
import { saveAssessmentState } from '../contexts/AssessmentState';
import { scenarios } from '../data/scenarios'; // We'll create this in the next section

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAssessment();
  const currentQuestion = scenarios[state.currentQuestionIndex];

  // Save state whenever it changes
  useEffect(() => {
    saveAssessmentState(state);
  }, [state]);

  // Handle answer selection
  const handleAnswer = (value: number) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        value,
      },
    });
  };

  // Get the current answer if it exists
  const currentAnswer = state.answers.find(
    answer => answer.questionId === currentQuestion.id
  );

  // Navigation handlers
  const handleNext = () => {
    if (state.currentQuestionIndex === scenarios.length - 1) {
      // If this is the last question and all questions are answered,
      // navigate to results
      if (state.answers.length === scenarios.length) {
        navigate('/results');
      }
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  return (
    <div className="min-h-screen bg-cloud-white flex flex-col">
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-grey">
                Question {state.currentQuestionIndex + 1} of {scenarios.length}
              </span>
              <span className="text-sm text-slate-grey">
                {Math.round((state.answers.length / scenarios.length) * 100)}% complete
              </span>
            </div>
            <div className="w-full h-2 bg-slate-grey bg-opacity-20 rounded-full">
              <motion.div
                className="h-full bg-teal-blue rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(state.answers.length / scenarios.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-poppins font-semibold text-deep-purple mb-4">
              Scenario {state.currentQuestionIndex + 1}
            </h2>
            <p className="text-slate-grey mb-6 leading-relaxed">
              {currentQuestion.scenario}
            </p>
            <p className="text-lg font-medium text-deep-purple mb-8">
              {currentQuestion.question}
            </p>
            <LikertScale
              value={currentAnswer?.value || 0}
              onChange={handleAnswer}
              className="mb-8"
            />
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={state.currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
            >
              {state.currentQuestionIndex === scenarios.length - 1 ? 'View Results' : 'Next'}
            </Button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default AssessmentPage;