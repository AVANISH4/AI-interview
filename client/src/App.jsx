import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { DashboardPage } from './pages/DashboardPage';
import { InterviewSetupPage } from './pages/InterviewSetupPage';
import { AIInterviewRoomPage } from './pages/AIInterviewRoomPage';
import { EvaluationResultsPage } from './pages/EvaluationResultsPage';
import { ReportViewerPage } from './pages/ReportViewerPage';
import { ResumeInterviewPage } from './pages/ResumeInterviewPage';
import { CompanyInterviewsPage } from './pages/CompanyInterviewsPage';
import { CodingWorkspacePage } from './pages/CodingWorkspacePage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PricingPage } from './pages/PricingPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Landing & Auth */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Platform Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/interview/setup" element={<InterviewSetupPage />} />
            <Route path="/interview/room" element={<AIInterviewRoomPage />} />
            <Route path="/evaluation" element={<EvaluationResultsPage />} />
            <Route path="/report/:id" element={<ReportViewerPage />} />
            <Route path="/resume-interview" element={<ResumeInterviewPage />} />
            <Route path="/companies" element={<CompanyInterviewsPage />} />
            <Route path="/coding" element={<CodingWorkspacePage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
