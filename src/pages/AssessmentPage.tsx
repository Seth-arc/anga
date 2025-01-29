import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import LikertScale from '../components/LikertScale';
import Button from '../components/Button';
import NavBar from '../components/NavBar';
import { useAssessment } from '../contexts/AssessmentContext';
import { scenarios } from '../data/scenarios';

const AssessmentPage: React.FC = () => {
  // Initialize navigation and assessment context
  const navigate = useNavigate();
  const { state, dispatch, saveAssessmentState } = useAssessment();
  
  // Get the current question from our scenarios array
  const currentQuestion = scenarios[state.currentQuestionIndex];

  // Save assessment state whenever it changes
  useEffect(() => {
    saveAssessmentState(state);
  }, [state, saveAssessmentState]);

  // Handle when a user selects an answer on the Likert scale
  const handleAnswer = (value: number) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        value,
      },
    });
  };

  // Find the current answer if it exists
  const currentAnswer = state.answers.find(
    answer => answer.questionId === currentQuestion.id
  );

  // Handle navigation to next question or results
  const handleNext = () => {
    if (state.currentQuestionIndex === scenarios.length - 1) {
      if (state.answers.length === scenarios.length) {
        navigate('/results');
      }
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  // Handle navigation to previous question
  const handlePrevious = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  return (
    <div className="min-h-screen bg-cloud-white">
      {/* Fixed navigation bar with progress tracking */}
      <NavBar
        progress={(state.answers.length / scenarios.length) * 100}
        currentQuestion={state.currentQuestionIndex + 1}
        totalQuestions={scenarios.length}
      />

      {/* Main content container with padding for fixed navbar */}
      <Container className="pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Image placeholder for scenario visualization */}
          <motion.div 
            className="w-full h-48 bg-slate-grey bg-opacity-10 rounded-lg mb-8 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Replace this with actual scenario images when available */}
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-slate-grey">Scenario Illustration</span>
            </div>
          </motion.div>

          {/* Question card with scenario and response options */}
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
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
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={state.currentQuestionIndex === 0}
              className="min-w-[120px]"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="min-w-[120px]"
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