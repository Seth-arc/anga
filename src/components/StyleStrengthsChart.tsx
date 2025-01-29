import React from 'react';
import { motion } from 'framer-motion';
import { teachingStyles } from '../data/teachingStyles';

interface StyleStrengthsChartProps {
  results: Record<number, number>;
  className?: string;
}

const StyleStrengthsChart: React.FC<StyleStrengthsChartProps> = ({ results, className = '' }) => {
  const sortedStyles = Object.entries(results)
    .map(([id, score]) => ({
      style: teachingStyles.find(style => style.id === Number(id))!,
      score
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className={`space-y-4 ${className}`}>
      {sortedStyles.map(({ style, score }, index) => (
        <div key={style.id} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-deep-purple">{style.name}</span>
            <span className="text-slate-grey">{score}%</span>
          </div>
          <div className="h-2 bg-slate-grey bg-opacity-20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-teal-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                ease: "easeOut"
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StyleStrengthsChart;