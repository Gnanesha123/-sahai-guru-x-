import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

// Lazy-loaded pages for route-level code splitting
const Landing = lazy(() => import('@/pages/Landing').then(m => ({ default: m.Landing })));
const Login = lazy(() => import('@/pages/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('@/pages/Dashboard').then(m => ({ default: m.Dashboard })));
const AITutor = lazy(() => import('@/pages/AITutor').then(m => ({ default: m.AITutor })));
const OCRScanner = lazy(() => import('@/pages/OCRScanner').then(m => ({ default: m.OCRScanner })));
const LearningTwin = lazy(() => import('@/pages/LearningTwin').then(m => ({ default: m.LearningTwin })));
const QuizCenter = lazy(() => import('@/pages/QuizCenter').then(m => ({ default: m.QuizCenter })));
const ProgressAnalytics = lazy(() => import('@/pages/ProgressAnalytics').then(m => ({ default: m.ProgressAnalytics })));
const ParentDashboard = lazy(() => import('@/pages/ParentDashboard').then(m => ({ default: m.ParentDashboard })));
const TeacherDashboard = lazy(() => import('@/pages/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const CareerGuidance = lazy(() => import('@/pages/CareerGuidance').then(m => ({ default: m.CareerGuidance })));
const ImpactDashboard = lazy(() => import('@/pages/ImpactDashboard').then(m => ({ default: m.ImpactDashboard })));
const Settings = lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/50">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tutor" element={<AITutor />} />
            <Route path="ocr" element={<OCRScanner />} />
            <Route path="twin" element={<LearningTwin />} />
            <Route path="quiz" element={<QuizCenter />} />
            <Route path="analytics" element={<ProgressAnalytics />} />
            <Route path="parent" element={<ParentDashboard />} />
            <Route path="teacher" element={<TeacherDashboard />} />
            <Route path="careers" element={<CareerGuidance />} />
            <Route path="impact" element={<ImpactDashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
