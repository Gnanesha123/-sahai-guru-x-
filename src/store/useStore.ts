import { create } from 'zustand';
import type { StudentProfile, ParentData, TeacherClassData, CareerPath, ImpactMetrics, Message, Language, Quiz, QuizResult } from '@/types';

interface AppState {
  // Auth
  isAuthenticated: boolean;
  userRole: 'student' | 'parent' | 'teacher' | null;
  setAuthenticated: (role: 'student' | 'parent' | 'teacher') => void;
  logout: () => void;

  // Student
  student: StudentProfile;
  updateStudent: (updates: Partial<StudentProfile>) => void;
  addXP: (amount: number) => void;

  // Quiz
  currentQuiz: Quiz | null;
  quizHistory: QuizResult[];
  setCurrentQuiz: (quiz: Quiz | null) => void;
  addQuizResult: (result: QuizResult) => void;

  // AI
  isListening: boolean;
  isSpeaking: boolean;
  selectedLanguage: Language;
  messages: Message[];
  setListening: (value: boolean) => void;
  setSpeaking: (value: boolean) => void;
  setLanguage: (lang: Language) => void;
  addMessage: (msg: Message) => void;

  // Parent
  parentData: ParentData;

  // Teacher
  teacherData: TeacherClassData;

  // Career
  careers: CareerPath[];

  // Impact
  impact: ImpactMetrics;
}

const defaultStudent: StudentProfile = {
  id: 'student-1',
  name: 'Priya Sharma',
  grade: 8,
  school: 'Rural Excellence Academy',
  avatar: '',
  learningConfidence: 84,
  mathMastery: 91,
  scienceMastery: 79,
  englishMastery: 65,
  examReadiness: 82,
  recommendedFocus: 'English Grammar',
  predictedImprovement: 12,
  xp: 3450,
  level: 4,
  streak: 12,
  badges: [
    { id: 'b1', name: 'Quiz Champion', icon: '🏆', earned: true, date: '2025-03-15' },
    { id: 'b2', name: 'Science Explorer', icon: '🔬', earned: true, date: '2025-03-20' },
    { id: 'b3', name: 'Reading Master', icon: '📚', earned: false },
    { id: 'b4', name: 'Consistent Learner', icon: '⭐', earned: true, date: '2025-04-01' },
    { id: 'b5', name: 'Rural Innovator', icon: '🌾', earned: false },
  ],
  learningPath: [
    { id: 's1', name: 'Foundation', completed: true, progress: 100, topics: ['Basic Math', 'Reading Skills', 'Science Basics'] },
    { id: 's2', name: 'Intermediate', completed: true, progress: 85, topics: ['Algebra', 'Grammar', 'Physics'] },
    { id: 's3', name: 'Advanced', completed: false, progress: 45, topics: ['Calculus', 'Literature', 'Chemistry'] },
    { id: 's4', name: 'Exam Ready', completed: false, progress: 20, topics: ['Mock Tests', 'Revision', 'Time Management'] },
  ],
};

const defaultParentData: ParentData = {
  studentName: 'Priya Sharma',
  studyHours: 4.5,
  attendance: 92,
  quizPerformance: 78,
  learningProgress: 72,
  recommendations: [
    'Focus on English grammar exercises',
    'Practice math word problems',
    'Review science chapter 5-8',
  ],
  weeklyReport: [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 5.0 },
    { day: 'Thu', hours: 3.8 },
    { day: 'Fri', hours: 4.5 },
    { day: 'Sat', hours: 6.0 },
    { day: 'Sun', hours: 2.0 },
  ],
};

const defaultTeacherData: TeacherClassData = {
  className: 'Grade 8 - Section A',
  classAverage: 72,
  topPerformers: ['Priya Sharma', 'Raj Patel', 'Ananya Singh'],
  riskStudents: ['Vikram Kumar', 'Sunita Rao'],
  subjectHeatmap: [
    { subject: 'Math', score: 78 },
    { subject: 'Science', score: 72 },
    { subject: 'English', score: 65 },
    { subject: 'History', score: 80 },
    { subject: 'Geography', score: 70 },
  ],
  students: [
    { name: 'Priya Sharma', performance: 85, weakTopics: ['English Grammar', 'Chemistry'] },
    { name: 'Raj Patel', performance: 82, weakTopics: ['Physics'] },
    { name: 'Ananya Singh', performance: 80, weakTopics: ['Algebra'] },
    { name: 'Vikram Kumar', performance: 45, weakTopics: ['All Subjects'] },
    { name: 'Sunita Rao', performance: 52, weakTopics: ['Math', 'Science'] },
  ],
};

const defaultCareers: CareerPath[] = [
  { id: 'c1', title: 'Doctor', description: 'Help communities by providing healthcare', subjects: ['Biology', 'Chemistry', 'Physics'], roadmap: ['Complete 12th with Science', 'Clear NEET', 'MBBS Degree', 'Specialization'], scholarships: ['National Medical Scholarship', 'Rural Doctor Fellowship'], exams: ['NEET', 'AIIMS'], icon: '🩺' },
  { id: 'c2', title: 'Engineer', description: 'Build technology that transforms lives', subjects: ['Math', 'Physics', 'Computer Science'], roadmap: ['Complete 12th with PCM', 'Clear JEE', 'B.Tech Degree', 'Get Placed'], scholarships: ['Rural Engineering Scholarship', 'Tech for Good Grant'], exams: ['JEE Main', 'JEE Advanced'], icon: '⚙️' },
  { id: 'c3', title: 'Teacher', description: 'Educate the next generation', subjects: ['All Subjects', 'Education'], roadmap: ['Complete 12th', 'B.Ed Degree', 'CTET Clearance', 'Join School'], scholarships: ['Teaching Fellowship', 'Rural Education Grant'], exams: ['CTET', 'STET'], icon: '📖' },
  { id: 'c4', title: 'Government Officer', description: 'Serve the nation through civil services', subjects: ['All Subjects', 'General Knowledge', 'Current Affairs'], roadmap: ['Complete Graduation', 'Clear UPSC Prelims', 'Clear Mains', 'Interview'], scholarships: ['UPSC Scholarship for Rural Students'], exams: ['UPSC', 'State PSC'], icon: '🏛️' },
  { id: 'c5', title: 'Agriculture Technologist', description: 'Modernize farming with technology', subjects: ['Biology', 'Chemistry', 'Geography', 'Computer Science'], roadmap: ['Complete 12th with Science', 'B.Sc Agriculture', 'Specialization in AgTech', 'Start Agri-venture'], scholarships: ['Agriculture Innovation Grant'], exams: ['ICAR AIEEA'], icon: '🌾' },
];

const defaultImpact: ImpactMetrics = {
  studentsHelped: 2847,
  questionsSolved: 156890,
  learningHours: 42350,
  languagesSupported: 5,
  schoolsConnected: 128,
  improvementRate: 34,
};

export const useStore = create<AppState>((set) => ({
  // Auth
  isAuthenticated: false,
  userRole: null,
  setAuthenticated: (role) => set({ isAuthenticated: true, userRole: role }),
  logout: () => set({ isAuthenticated: false, userRole: null }),

  // Student
  student: defaultStudent,
  updateStudent: (updates) => set((state) => ({ student: { ...state.student, ...updates } })),
  addXP: (amount) => set((state) => {
    const newXP = state.student.xp + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;
    return { student: { ...state.student, xp: newXP, level: newLevel } };
  }),

  // Quiz
  currentQuiz: null,
  quizHistory: [],
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  addQuizResult: (result) => set((state) => ({ quizHistory: [...state.quizHistory, result] })),

  // AI
  isListening: false,
  isSpeaking: false,
  selectedLanguage: 'english',
  messages: [],
  setListening: (value) => set({ isListening: value }),
  setSpeaking: (value) => set({ isSpeaking: value }),
  setLanguage: (lang) => set({ selectedLanguage: lang }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),

  // Data
  parentData: defaultParentData,
  teacherData: defaultTeacherData,
  careers: defaultCareers,
  impact: defaultImpact,
}));
