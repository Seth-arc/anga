import { useMemo } from 'react';
import { Answer, TeachingStyleResults } from '../types';
import { calculateScores, getMainTeachingStyle, getStyleStrengths } from '../utils/calculateScores';
import { teachingStyles } from '../data/teachingStyles';

export function useScoring(answers: Answer[]) {
  const results = useMemo(() => calculateScores(answers), [answers]);
  const mainStyleId = useMemo(() => getMainTeachingStyle(results), [results]);
  const styleStrengths = useMemo(() => getStyleStrengths(results), [results]);

  const mainStyle = teachingStyles.find(style => style.id === mainStyleId);
  const orderedStyles = styleStrengths.map(strength => ({
    ...teachingStyles.find(style => style.id === strength.id)!,
    score: strength.score
  }));

  return {
    results,
    mainStyle,
    orderedStyles,
    isComplete: answers.length === 24
  };
}