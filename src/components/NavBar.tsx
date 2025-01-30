import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Interface defining the expected props for the NavBar component
interface NavBarProps {
  progress: number;      // Current progress as a percentage
  currentQuestion: number; // Current question number
  totalQuestions: number;  // Total number of questions
}

// NavBar component provides navigation and progress tracking
const NavBar: React.FC<NavBarProps> = ({ 
  progress, 
  currentQuestion, 
  totalQuestions 
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with link to home page */}
          <Link 
            to="/" 
            className="text-deep-purple hover:text-teal-blue transition-colors duration-300"
          >
            <span className="font-poppins font-semibold text-xl">Home</span>
          </Link>

          {/* Question progress indicator */}
          <div className="text-sm text-slate-grey font-medium">
            Question {currentQuestion} of {totalQuestions}
          </div>
        </div>

        {/* Animated progress bar */}
        <div className="h-2 bg-slate-grey bg-opacity-20 mt-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;