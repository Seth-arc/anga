// Types for teaching styles and assessment
export interface TeachingStyle {
  id: number;
  name: string;
  description: string;
}

export interface Question {
  id: number;
  scenario: string;
  question: string;
}

export interface Answer {
  questionId: number;
  value: number;
}

export type TeachingStyleResults = Record<number, number>;