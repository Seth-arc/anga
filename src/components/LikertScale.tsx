import React from 'react';
import { motion } from 'framer-motion';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, className = '' }) => {
  // Labels for our Likert scale points
  const labels = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex justify-between mb-2">
        {labels.map((label, index) => (
          <span key={index} className="text-xs text-slate-grey text-center w-16">
            {label}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center gap-2">
        {labels.map((_, index) => {
          const isSelected = value === index + 1;
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(index + 1)}
              className={`
                w-16 h-16
                rounded-full
                flex items-center justify-center
                transition-colors duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-teal-blue
                focus:ring-offset-2
                ${isSelected 
                  ? 'bg-teal-blue text-white' 
                  : 'bg-white border-2 border-slate-grey text-slate-grey hover:border-teal-blue'
                }
              `}
              aria-label={`Rate ${index + 1} out of 5 (${labels[index]})`}
            >
              {index + 1}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default LikertScale;