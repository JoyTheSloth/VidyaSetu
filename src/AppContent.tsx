import React, { useState, lazy, Suspense } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { useApp } from './context/AppContext';
import { LoginPage } from './portals/auth/LoginPage';
import { HomePage } from './portals/home/HomePage';
import { MobilePortalView } from './portals/MobilePortalView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Role } from './types';

// Lazy Loaded Admin Views
const AdminDashboard = lazy(() => import('./portals/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const StudentDirectory = lazy(() => import('./portals/admin/StudentDirectory').then(m => ({ default: m.StudentDirectory })));
const TeacherDirectory = lazy(() => import('./portals/admin/TeacherDirectory').then(m => ({ default: m.TeacherDirectory })));
const ExamManagement = lazy(() => import('./portals/admin/ExamManagement').then(m => ({ default: m.ExamManagement })));
const TimetableView = lazy(() => import('./portals/admin/TimetableView').then(m => ({ default: m.TimetableView })));
const AnnouncementsView = lazy(() => import('./portals/admin/AnnouncementsView').then(m => ({ default: m.AnnouncementsView })));
const SchoolSettingsView = lazy(() => import('./portals/admin/SchoolSettingsView').then(m => ({ default: m.SchoolSettingsView })));

// Lazy Loaded Teacher Views
const TeacherAttendance = lazy(() => import('./portals/teacher/TeacherAttendance').then(m => ({ default: m.TeacherAttendance })));
const TeacherHomework = lazy(() => import('./portals/teacher/TeacherHomework').then(m => ({ default: m.TeacherHomework })));

// Lazy Loaded Student Views
const StudentDashboard = lazy(() => import('./portals/student/StudentDashboard').then(m => ({ default: m.StudentDashboard })));

// Lazy Loaded Shared Common Views
const StudyNotesView = lazy(() => import('./portals/common/StudyNotesView').then(m => ({ default: m.StudyNotesView })));

// Elegant Loading Skeleton Component for Suspense
const PortalLoadingSkeleton: React.FC = () => (
  <div className="p-6 space-y-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-4 w-72 bg-slate-100 dark:bg-slate-850 rounded-md"></div>
      </div>
      <div className="h-9 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-28 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-white/5"></div>
      ))}
    </div>
    <div className="h-72 bg-slate-200/70 dark:bg-slate-800/70 rounded-xl border border-slate-200/60 dark:border-white/5"></div>
  </div>
);

export const AppContent: React.FC = () => {
  const { currentUser, switchUser } = useApp();
  // Flow states: 'home' | 'login' | 'portal'
  const [viewState, setViewState] = useState<'home' | 'login' | 'portal'>('home');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Sync default tab when user switches role - set to dashboard home hub
  React.useEffect(() => {
    setCurrentTab('dashboard');
  }, [currentUser.role]);

  // Handle direct launch from HomePage
  const handleLaunchFromHome = (role?: Role) => {
    if (role) {
      switchUser(role);
      setViewState('portal');
    } else {
      setViewState('login');
    }
  };

  // 1. Render HomePage
  if (viewState === 'home') {
    return <HomePage onGoToPortal={handleLaunchFromHome} />;
  }

  // 2. Render LoginPage
  if (viewState === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={() => setViewState('portal')} 
        onGoHome={() => setViewState('home')}
      />
    );
  }

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'School Executive Overview';
      case 'students': return 'Student Directory & Admissions';
      case 'teachers': return 'Faculty Staff & Teaching Assignments';
      case 'attendance': return 'Institutional Attendance Records';
      case 'academics': return 'Examinations & Marks Approval';
      case 'timetable': return 'Master Timetable & Period Allocation';
      case 'announcements': return 'School Circulars & Notice Board';
      case 'settings': return 'School Tenant Configuration';
      case 'teacher_dashboard':
      case 'teacher_attendance': return 'Daily Class Attendance';
      case 'teacher_homework': return 'Homework & Class Assignments';
      case 'teacher_marks': return 'Examinations & Results Roster';
      case 'teacher_schedule': return 'Faculty Teaching Schedule';
      case 'student_dashboard': return 'Student Academic Hub';
      case 'student_homework': return 'Assigned Homework & Submissions';
      case 'student_results': return 'Published Exam Reports';
      case 'student_attendance': return 'My Attendance Record';
      case 'student_timetable': return 'Class Timetable Schedule';
      case 'student_fees': return 'Fee Statement';
      default: return 'Vidyasetu Management System';
    }
  };

  const renderContent = () => {
    // Admin Views
    if (currentUser.role === 'ADMIN') {
      if (currentTab === 'students') return <StudentDirectory />;
      if (currentTab === 'teachers') return <TeacherDirectory />;
      if (currentTab === 'academics') return <ExamManagement />;
      if (currentTab === 'timetable') return <TimetableView />;
      if (currentTab === 'announcements') return <AnnouncementsView />;
      if (currentTab === 'settings') return <SchoolSettingsView />;
      if (currentTab === 'attendance') return <TeacherAttendance />;
      return <AdminDashboard onNavigate={(tab) => setCurrentTab(tab)} />;
    }

    // Teacher Views
    if (currentUser.role === 'TEACHER') {
      if (currentTab === 'teacher_homework') return <TeacherHomework />;
      if (currentTab === 'teacher_materials' || currentTab === 'materials') return <StudyNotesView />;
      if (currentTab === 'teacher_marks') return <ExamManagement />;
      if (currentTab === 'teacher_schedule') return <TimetableView />;
      if (currentTab === 'announcements') return <AnnouncementsView />;
      if (currentTab === 'dashboard') return <TeacherAttendance />;
      return <TeacherAttendance />;
    }

    // Student Views
    if (currentUser.role === 'STUDENT') {
      if (currentTab === 'materials' || currentTab === 'teacher_materials') return <StudyNotesView />;
      if (currentTab === 'announcements') return <AnnouncementsView />;
      if (currentTab === 'student_timetable') return <TimetableView />;
      if (currentTab === 'dashboard') return <StudentDashboard onNavigate={(tab) => setCurrentTab(tab)} />;
      return <StudentDashboard onNavigate={(tab) => setCurrentTab(tab)} />;
    }

    return <AdminDashboard onNavigate={(tab) => setCurrentTab(tab)} />;
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#0B131E] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Role-based persistent Sidebar with mobile overlay support */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setIsMobileMenuOpen(false); // Close drawer on mobile after selection
        }} 
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onGoHome={() => setViewState('home')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* On mobile, when on dashboard, MobilePortalView renders its own top hero header.
            When navigating to sub-pages or on desktop, render the standard Topbar with Back-to-Hub button */}
        <div className={currentTab === 'dashboard' ? 'hidden md:block' : 'block'}>
          <Topbar 
            pageTitle={getPageTitle()} 
            onLogout={() => setViewState('login')} 
            onGoHome={() => setViewState('home')}
            onToggleMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
            onBackToPortalHome={currentTab !== 'dashboard' ? () => setCurrentTab('dashboard') : undefined}
          />
        </div>

        {/* 1. Mobile Phone UI View (exact match to Picture 2 reference design) */}
        {currentTab === 'dashboard' && (
          <div className="md:hidden pb-24">
            <MobilePortalView 
              onNavigate={(tab) => setCurrentTab(tab)}
              onGoHome={() => setViewState('home')}
              onToggleSidebar={() => setIsMobileMenuOpen(prev => !prev)}
            />
          </div>
        )}

        {/* 2. Desktop Dashboard OR Sub-View on Mobile */}
        <main className={`flex-1 ${currentTab === 'dashboard' ? 'hidden md:block' : 'block'} p-3.5 sm:p-6 pb-32 md:pb-6 max-w-7xl w-full mx-auto`}>
          <Suspense fallback={<PortalLoadingSkeleton />}>
            {renderContent()}
          </Suspense>
        </main>

        {/* 3. Floating Mobile Bottom Navigation Bar - Visible across all portal views on mobile */}
        <div className="md:hidden">
          <MobileBottomNav 
            currentTab={currentTab}
            role={currentUser.role}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        </div>
      </div>
    </div>
  );
};
