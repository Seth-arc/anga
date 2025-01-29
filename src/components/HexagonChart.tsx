import React from 'react';
import { motion } from 'framer-motion';
import { TeachingStyleResults } from '../types';

interface HexagonChartProps {
  results: TeachingStyleResults;
  className?: string;
}

const HexagonChart: React.FC<HexagonChartProps> = ({ results, className = '' }) => {
  // Function to calculate polygon points for a given set of values
  const getPolygonPoints = (values: number[]) => {
    const points = [];
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;

    for (let i = 0; i < 6; i++) {
      // Calculate the radius for this point based on the score
      const radius = (maxRadius * values[i]) / 100;
      // Calculate angle (60 degrees per point, starting from top)
      const angle = (i * 60 - 90) * (Math.PI / 180);
      // Convert polar coordinates to cartesian
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  // Convert results object to array in the correct order for the hexagon
  const values = [
    results[1], // All-around flexible (top)
    results[2], // Student-centered (top-right)
    results[3], // Official curriculum (bottom-right)
    results[4], // Straight facts (bottom)
    results[5], // Big conference (bottom-left)
    results[6]  // One-off (top-left)
  ];

  // Animation configuration for the results polygon
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`${className} relative`}>
      <svg viewBox="0 0 300 300" className="w-full max-w-md mx-auto">
        {/* Background grid hexagons */}
        {[20, 40, 60, 80, 100].map((percent, index) => {
          const points = getPolygonPoints(Array(6).fill(percent));
          return (
            <polygon
              key={`grid-${index}`}
              points={points}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Axis lines */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const x2 = 150 + 120 * Math.cos(angle);
          const y2 = 150 + 120 * Math.sin(angle);
          return (
            <line
              key={`axis-${i}`}
              x1="150"
              y1="150"
              x2={x2}
              y2={y2}
              stroke="#E2E8F0"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Results polygon with animation */}
        <motion.polygon
          points={getPolygonPoints(values)}
          fill="rgba(27, 153, 139, 0.2)"
          stroke="#1B998B"
          strokeWidth="2"
          initial="hidden"
          animate="visible"
          variants={pathVariants}
        />

        {/* Style labels */}
        <text x="150" y="15" className="text-xs" textAnchor="middle" fill="#4A4E69">All-around</text>
        <text x="260" y="80" className="text-xs" textAnchor="start" fill="#4A4E69">Student-centered</text>
        <text x="260" y="220" className="text-xs" textAnchor="start" fill="#4A4E69">Official curriculum</text>
        <text x="150" y="285" className="text-xs" textAnchor="middle" fill="#4A4E69">Straight facts</text>
        <text x="40" y="220" className="text-xs" textAnchor="end" fill="#4A4E69">Big conference</text>
        <text x="40" y="80" className="text-xs" textAnchor="end" fill="#4A4E69">One-off</text>

        {/* Score points with pop-in animation */}
        {values.map((value, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const radius = (120 * value) / 100;
          const x = 150 + radius * Math.cos(angle);
          const y = 150 + radius * Math.sin(angle);
          return (
            <motion.circle
              key={`point-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="#1B998B"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default HexagonChart;