// src/types/audit.ts

export interface SectionMetrics {
  tpp: number;
  points: number;
  weightedTpp: number;
  weightedPoints: number;
  scorePerItem: number;
  complyingCount: number;
  needImprovementCount: number;
  ncCount: number;
  naCount: number;
  countExNa: number;
  needImprovementPlusNc: number;
  needImprovementWeighted: number;
  ncWeighted: number;
  markdownCorrection: number;
  correctedScore: number;
  weightedPointsMarkdown: number;
}

export interface AnswerType {
  id: number;
  answer: string;
}

export interface SectionWithItems extends Section {
  items: Item[];
}

export interface SectionWithAnswers extends SectionWithItems {
  items: ItemWithAnswer[];
}

export interface ItemWithAnswer extends Item {
  answer: Answer;
  points: number;
}

export interface SectionData {
  scoreSummary: ScoreSummary;
  sections: SectionWithItems[];
}

export interface SectionContentProps {
  sectionData: {
    scoreSummary: ScoreSummary;
    sections: SectionWithItems[];
  };
  projectId: string;
  metrics?: Record<string, SectionMetrics>;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export interface UserCompany {
  id: string;
  userId: string;
  companyName: string;
  address: string;
}

export interface Client {
  id: string;
  companyId: string;
  userId: string;
  clientName: string;
  hotelName: string;
  address: string;
  contactPersonOnSite: string;
  positionOfContactPerson: string;
}

export interface CriteriaItem {
  id: string;
  name: string;
  tpp: number;
  points: number;
  answer: Answer;
  comments?: string;
  isActive: boolean;
}

export interface GroupWeightage {
  id: string;
  name: string;
  weightage: number;
  verticalText?: string;
  criteria: CriteriaItem[];
}

export interface ScoreSummary {
  id: string;
  companyId: string;
  userId: string;
  item: string;
  percentagePerSection: number;
  minorNC: number;
  majorNC: number;
}

export interface Section {
  id: string;
  companyId: string;
  scoreSummaryId: string;
  item: string;
  weightage: number;
}

export interface Item {
  id: string;
  companyId: string;
  sectionId: string;
  question: string;
  comment?: string;
  tpp: number;
  answerId?: number;
  points?: number;
  total?: number;
}

export interface Report {
  id: string;
  companyId: string;
  userId: string;
  clientId: string;
  scoreSummaryId: string;
  sectionId: string;
  itemId: string;
  dateTimeOfAudit: Date;
  issueDate: Date;
  inspector: string;
  inspectionBody: string;
  address: string;
  reviewedBy: string;
  averageFloorAudit: number;
  totalMarkFloorAudit: number;
  totalMarkForSampling: number;
  overallQuality: number;
}

export interface Database {
  users: User[];
  userCompanies: UserCompany[];
  clients: Client[];
  scoreSummaries: ScoreSummary[];
  sections: Section[];
  items: Item[];
  reports: Report[];
  answers: AnswerType[];
}

export const ANSWERS: AnswerType[] = [
  { id: 1, answer: 'Complying' },
  { id: 2, answer: 'Need Improvement' },
  { id: 3, answer: 'NC' },
  { id: 4, answer: 'NA' },
];

export type Answer = 'Complying' | 'Need Improvement' | 'NC' | 'NA';

export const getAnswerText = (answerId: number): Answer => {
  const answer = ANSWERS.find((a) => a.id === answerId);
  return (answer?.answer as Answer) || 'NA';
};

export const getAnswerId = (answerText: Answer): number => {
  const answer = ANSWERS.find((a) => a.answer === answerText);
  return answer?.id || 4; // Default to NA (4) if not found
};

export const POINTS_MAP = {
  Complying: 2,
  'Need Improvement': 1,
  NC: 0,
  NA: 0,
} as const;

export const getPointsForAnswer = (answer: Answer, tpp: number): number => {
  switch (answer) {
    case 'Complying':
      return tpp;
    case 'Need Improvement':
      return Math.floor(tpp / 2);
    case 'NC':
      return 0;
    case 'NA':
      return 0;
  }
};