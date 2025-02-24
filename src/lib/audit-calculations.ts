// src/lib/audit-calculations.ts
import type {  SectionMetrics, Answer, Item, SectionWithItems } from '@/types/audit'

// interface ItemCalculations {
//     tpp: number;
//     points: number;
//     weightedTpp: number;      // wgt*TPP
//     weightedPoints: number;   // wgt*Points
//     scorePerItem: number;     // wgt*Points/wgt*TPP
//     complyingCount: number;
//     needImprovementCount: number;
//     ncCount: number;
//     naCount: number;
//     countExNa: number;
//     needImprovementPlusNc: number;
//     needImprovementWeighted: number;  // Need Improvement * 0.5
//     ncWeighted: number;               // NC * 1
//     markdownCorrection: number;
//     correctedScore: number;           // Score per item * Markdown
//     weightedPointsMarkdown: number;   // wgt*points * Markdown Correction
//   }

interface ItemWithAnswer extends Item {
  answer: Answer;
  points?: number; // Make points optional
}

interface SectionWithAnswers extends SectionWithItems {
  items: ItemWithAnswer[];
}

  
export const calculateSectionMetrics = (section: SectionWithAnswers): SectionMetrics => {
  const weightage = section.weightage / 100; // Convert percentage to decimal
  const items = section.items;

  // Basic counts
  const complyingCount = items.filter(item => item.answer === 'Complying').length;
  const needImprovementCount = items.filter(item => item.answer === 'Need Improvement').length;
  const ncCount = items.filter(item => item.answer === 'NC').length;
  const naCount = items.filter(item => item.answer === 'NA').length;
  const countExNa = items.length - naCount;

  // Points calculations
  const totalPoints = items.reduce((sum, item) => {
    if (item.answer === 'NA') return sum;
    return sum + (item.points || 0); // Handle undefined points
  }, 0);

  // TPP calculations - exclude NA items
  const totalTpp = items.reduce((sum, item) => {
    if (item.answer === 'NA') return sum;
    return sum + item.tpp;
  }, 0);

  // Weighted calculations
  const weightedTpp = totalTpp * weightage;
  const weightedPoints = totalPoints * weightage;
  const scorePerItem = weightedTpp ? (weightedPoints / weightedTpp) * 100 : 0;

  // Non-complying calculations
  const needImprovementPlusNc = needImprovementCount + ncCount;
  const needImprovementWeighted = needImprovementCount * 0.5;
  const ncWeighted = ncCount * 1;

  // Markdown correction
  let markdownCorrection = 0;
  if (countExNa > 0) {
    markdownCorrection = (countExNa - needImprovementWeighted - ncWeighted) / countExNa;
  }

  // Final calculations
  const correctedScore = scorePerItem ? scorePerItem * markdownCorrection : 0;
  const weightedPointsMarkdown = weightedPoints * markdownCorrection;

  return {
    tpp: totalTpp,
    points: totalPoints,
    weightedTpp,
    weightedPoints,
    scorePerItem,
    complyingCount,
    needImprovementCount,
    ncCount,
    naCount,
    countExNa,
    needImprovementPlusNc,
    needImprovementWeighted,
    ncWeighted,
    markdownCorrection,
    correctedScore,
    weightedPointsMarkdown
  };
};
  
export const calculateOverallScore = (sections: SectionWithAnswers[]): number => {
  // First calculate metrics for all sections
  const sectionMetrics = sections.map(calculateSectionMetrics);
  
  // Calculate totals
  const totalWeightedPointsMarkdown = sectionMetrics
    .reduce((sum, metrics) => sum + metrics.weightedPointsMarkdown, 0);
  
  const totalWeightedTpp = sectionMetrics
    .reduce((sum, metrics) => sum + metrics.weightedTpp, 0);
  
  // Calculate final percentage
  return totalWeightedTpp > 0 
    ? (totalWeightedPointsMarkdown / totalWeightedTpp) * 100 
    : 0;
}