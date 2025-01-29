import { Answer, TeachingStyleResults } from '../types';
import { scoringMatrix } from '../data/scoringMatrix';

export function calculateScores(answers: Answer[]): TeachingStyleResults {
  // Initialize results object with all styles starting at 0
  const results: TeachingStyleResults = {
    1: 0, // All-around flexible
    2: 0, // Student-centered
    3: 0, // Official curriculum
    4: 0, // Straight facts
    5: 0, // Big conference
    6: 0  // One-off
  };

  // Calculate raw scores
  answers.forEach(answer => {
    const styleId = scoringMatrix[answer.questionId];
    if (styleId) {
      results[styleId] += answer.value;
    }
  });

  // Calculate average scores (normalize by number of questions per style)
  const questionsPerStyle = Object.values(scoringMatrix).reduce((acc, styleId) => {
    acc[styleId] = (acc[styleId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Normalize scores to a 0-100 scale
  Object.keys(results).forEach(styleId => {
    const numQuestions = questionsPerStyle[Number(styleId)] || 1;
    const maxPossibleScore = numQuestions * 5; // 5 is max score per question
    results[Number(styleId)] = Math.round((results[Number(styleId)] / maxPossibleScore) * 100);
  });

  return results;
}

export function getMainTeachingStyle(results: TeachingStyleResults): number {
  return Object.entries(results).reduce((a, b) => 
    results[Number(a)] > results[Number(b[0])] ? Number(a) : Number(b[0])
  , 1);
}

export function getStyleStrengths(results: TeachingStyleResults): Array<{id: number, score: number}> {
  return Object.entries(results)
    .map(([id, score]) => ({
      id: Number(id),
      score
    }))
    .sort((a, b) => b.score - a.score);
}