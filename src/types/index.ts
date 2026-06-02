export interface StudentProfile {
  id: string;
  name: string;
  grade: number;
  school: string;
  avatar: string;
  learningConfidence: number;
  mathMastery: number;
  scienceMastery: number;
  englishMastery: number;
  examReadiness: number;
  recommendedFocus: string;
  predictedImprovement: number;
  xp: number;
  level: number;
  streak: number;
  badges: Badge[];
  learningPath: LearningStage[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  date?: string;
}

export interface LearningStage {
  id: string;
  name: string;
  completed: boolean;
  progress: number;
  topics: string[];
}

export interface Quiz {
  id: string;
  subject: string;
  topic: string;
  type: 'mcq' | 'true-false' | 'fill-blanks' | 'image-based' | 'scenario';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  quizId: string;
  correct: boolean;
  answer: string;
  timestamp: Date;
}

export interface ParentData {
  studentName: string;
  studyHours: number;
  attendance: number;
  quizPerformance: number;
  learningProgress: number;
  recommendations: string[];
  weeklyReport: {
    day: string;
    hours: number;
  }[];
}

export interface TeacherClassData {
  className: string;
  classAverage: number;
  topPerformers: string[];
  riskStudents: string[];
  subjectHeatmap: { subject: string; score: number }[];
  students: { name: string; performance: number; weakTopics: string[] }[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  roadmap: string[];
  scholarships: string[];
  exams: string[];
  icon: string;
}

export interface ImpactMetrics {
  studentsHelped: number;
  questionsSolved: number;
  learningHours: number;
  languagesSupported: number;
  schoolsConnected: number;
  improvementRate: number;
}

export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language?: string;
}

export type Language = 'english' | 'hindi' | 'telugu' | 'tamil' | 'kannada';

export interface AIState {
  isListening: boolean;
  isSpeaking: boolean;
  selectedLanguage: Language;
  messages: Message[];
}
