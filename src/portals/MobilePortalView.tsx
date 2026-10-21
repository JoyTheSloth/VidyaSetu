import React, { useState } from 'react';
import { 
  Menu, Search, Bell, Home, BookOpen, User, Send, 
  ChevronDown, ChevronUp, ChevronRight, X, ArrowLeft,
  Sparkles, CheckCircle2, Clock, Calendar, Check,
  Video, ClipboardList, MessageSquare, Edit3, UserCheck,
  GraduationCap, Award, FileText, CreditCard, Target,
  Sun, Moon, Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { EditProfileModal } from '../components/EditProfileModal';

interface MobilePortalViewProps {
  onNavigate: (tab: string) => void;
  onGoHome: () => void;
  onToggleSidebar?: () => void;
}

export const MobilePortalView: React.FC<MobilePortalViewProps> = ({
  onNavigate,
  onGoHome,
  onToggleSidebar
}) => {
  const { currentUser, switchUser, school, announcements, theme, toggleTheme } = useApp();
  const [isCategoryExpanded, setIsCategoryExpanded] = useState<boolean>(true);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Greeting by hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // User display name
  const getUserDisplayName = () => {
    return currentUser.name || (currentUser.role === 'STUDENT' ? 'Anoop Awasthi' : currentUser.role === 'TEACHER' ? 'Mrs. Sunita Mukherjee' : 'Dr. Rajesh Sharma');
  };

  // Role-adaptive categories matching the reference design in Picture 2
  const getCategoryItems = () => {
    if (currentUser.role === 'STUDENT') {
      return [
        {
          id: 'assignments',
          title: 'Assignments',
          tab: 'student_homework',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
              <ClipboardList className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'timetable',
          title: 'Time Table',
          tab: 'student_timetable',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
              <Calendar className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'my_attendance',
          title: 'My Attendance',
          tab: 'student_attendance',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
              <UserCheck className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'messages',
          title: 'Messages',
          tab: 'announcements',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
              <MessageSquare className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'assessment',
          title: 'Report Card',
          tab: 'student_results',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/25">
              <Award className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'payroll',
          title: 'Fee Payment',
          tab: 'student_fees',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
              <CreditCard className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'my_performance',
          title: 'Performance',
          tab: 'student_dashboard',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-red-500/25">
              <Target className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'study_notes',
          title: 'Study Notes',
          tab: 'materials',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-500/25">
              <BookOpen className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'mark_entry',
          title: 'Exam Roster',
          tab: 'student_results',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 via-red-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 font-black text-xs">
              A+
            </div>
          ),
        },
        {
          id: 'teacher_chat',
          title: 'Teacher Chat',
          tab: 'announcements',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
              <Edit3 className="w-5 h-5" />
            </div>
          ),
        },
        {
          id: 'student_id',
          title: 'My Profile',
          tab: 'student_dashboard',
          icon: (
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
          ),
        },
      ];
    }

    // Default / Admin & Teacher Categories
    return [
      {
        id: 'teacher_panel',
        title: 'Teacher Panel',
        tab: currentUser.role === 'TEACHER' ? 'teacher_attendance' : 'teachers',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/25">
            <Video className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'assignments',
        title: 'Assignments',
        tab: currentUser.role === 'TEACHER' ? 'teacher_homework' : 'student_homework',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
            <ClipboardList className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'timetable',
        title: 'Time Table',
        tab: currentUser.role === 'TEACHER' ? 'teacher_schedule' : 'timetable',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
            <Calendar className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'messages',
        title: 'Messages',
        tab: 'announcements',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-400 via-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
            <MessageSquare className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'mark_attendance',
        title: 'Mark Attendance',
        tab: currentUser.role === 'TEACHER' ? 'teacher_attendance' : 'attendance',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25">
            <Edit3 className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'my_attendance',
        title: 'My Attendance',
        tab: 'attendance',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/25">
            <UserCheck className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'student_attendance',
        title: 'Student Attendance',
        tab: 'students',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-500/25">
            <GraduationCap className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'mark_entry',
        title: 'Mark Entry',
        tab: currentUser.role === 'TEACHER' ? 'teacher_marks' : 'academics',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 via-red-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/25 font-black text-xs">
            A+
          </div>
        ),
      },
      {
        id: 'assessment',
        title: 'Assessment',
        tab: 'academics',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-pink-500/25">
            <Award className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'payroll',
        title: 'Payroll',
        tab: 'settings',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
            <CreditCard className="w-5 h-5" />
          </div>
        ),
      },
      {
        id: 'my_performance',
        title: 'My Performance',
        tab: 'dashboard',
        icon: (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-red-500/25">
            <Target className="w-5 h-5" />
          </div>
        ),
      },
    ];
  };

  const categoryItems = getCategoryItems();

  // Alerts List matching Picture 2
  const alertsList = [
    {
      id: 'a1',
      title: 'CBSE Circulars',
      date: '15/05/2024',
      avatar: '/assets/principal_matthew.jpg',
      borderColor: 'border-l-orange-500',
      badgeColor: 'text-orange-500',
    },
    {
      id: 'a2',
      title: '12th Result Declared',
      date: '14/05/2024',
      avatar: '/assets/anoop_avatar.jpg',
      borderColor: 'border-l-purple-500',
      badgeColor: 'text-purple-500',
    },
    {
      id: 'a3',
      title: '10th Result Declared',
      date: '12/05/2024',
      avatar: '/assets/principal_matthew.jpg',
      borderColor: 'border-l-blue-500',
      badgeColor: 'text-blue-500',
    },
    {
      id: 'a4',
      title: 'Syllabus For 12th',
      date: '05/03/2024',
      avatar: '/assets/anoop_avatar.jpg',
      borderColor: 'border-l-emerald-500',
      badgeColor: 'text-emerald-500',
    },
  ];

  const visibleCategories = isCategoryExpanded ? categoryItems : categoryItems.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#F4F7FC] dark:bg-[#07131F] text-slate-800 dark:text-slate-100 pb-36 select-none transition-colors duration-200">
      
      {/* 1. Curved Blue Hero Header */}
      <div className="bg-gradient-to-b from-[#183B7A] via-[#1E4EB8] to-[#2B63E2] text-white pt-4 pb-14 px-4 sm:px-6 rounded-b-[36px] shadow-lg relative overflow-hidden">
        {/* Geometric Hexagon / Dot Overlay Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FFFFFF 1.5px, transparent 1.5px)`,
            backgroundSize: '16px 16px',
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Top App Bar */}
        <div className="flex items-center justify-between relative z-10 gap-2">
          {/* Left: Hamburger Button */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all active:scale-90 cursor-pointer shadow-xs"
              aria-label="Open portal navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Admin, Teacher, Student Role Pill (Center Aligned) */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center bg-black/25 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-inner">
              {(['ADMIN', 'TEACHER', 'STUDENT'] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => switchUser(r)}
                  className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full transition-all duration-200 cursor-pointer active:scale-90 hover:scale-[1.04] ${
                    currentUser.role === r
                      ? 'bg-amber-400 text-slate-950 shadow-xs scale-[1.02]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {r === 'ADMIN' ? 'Admin' : r === 'TEACHER' ? 'Teacher' : 'Student'}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Night Mode / Dark Theme Toggle + Search + Notifications */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Button (Light / Night Mode) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all active:scale-90 cursor-pointer shadow-xs"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-white transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all active:scale-90 cursor-pointer shadow-xs"
              aria-label="Search portal"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Notification Bell with Badge */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white transition-all active:scale-90 cursor-pointer shadow-xs relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-blue-600 animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* User Greeting Area with Photo Avatar */}
        <div className="mt-5 relative z-10 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white m-0 tracking-tight leading-tight">
              Hi, {getUserDisplayName()}
            </h1>
            <p className="text-xs text-blue-100 font-medium mt-0.5 opacity-90">
              {getGreeting()} • {currentUser.role === 'TEACHER' ? 'Faculty Mentor' : currentUser.role === 'STUDENT' ? 'Class 10-A' : 'Executive Admin'}
            </p>
          </div>

          {/* Photo Avatar with Edit Profile trigger */}
          <div 
            onClick={() => setShowEditProfileModal(true)}
            className="flex flex-col items-center cursor-pointer group shrink-0"
            title="Edit Faculty Profile & Photo"
          >
            <div className="relative">
              <img
                src={currentUser.avatarUrl || (currentUser.role === 'TEACHER' ? '/assets/teacher_sunita.jpg' : '/assets/anoop_avatar.jpg')}
                alt={currentUser.name}
                className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-lg group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-bold shadow-xs">
                ✎
              </span>
            </div>
            <span className="text-[9px] font-bold text-amber-300 mt-0.5">Edit Profile</span>
          </div>
        </div>

        {/* Student Status & Metrics Strip */}
        {currentUser.role === 'STUDENT' && (
          <div className="mt-3.5 pt-2.5 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                Class 11 Science
              </span>
              <span className="text-[11px] font-mono text-white/90">Roll #14</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[11px]">
              <span className="text-emerald-300">92% Attd</span>
              <span>•</span>
              <span className="text-amber-300">Rank #5</span>
              <span>•</span>
              <span className="text-rose-200">₹12,000 Due</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Floating White Card: "Category" with 4-Column Grid */}
      <div className="px-3.5 -mt-8 relative z-20">
        <div className="bg-white dark:bg-[#0E1E31] rounded-[28px] p-4 sm:p-5 shadow-xl shadow-blue-900/10 dark:shadow-black/40 border border-slate-100 dark:border-white/10 relative">
          
          {/* Card Title */}
          <div className="flex items-center justify-between mb-3.5 px-1">
            <h2 className="text-sm font-black text-slate-800 dark:text-white tracking-tight m-0">
              Category
            </h2>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {currentUser.role} HUB
            </span>
          </div>

          {/* 4-column Grid */}
          <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
            {visibleCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.tab)}
                className="flex flex-col items-center text-center group cursor-pointer active:scale-92 transition-transform"
              >
                <div className="transition-transform duration-200 group-hover:scale-108 group-active:scale-95">
                  {item.icon}
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 dark:text-slate-200 mt-1.5 leading-tight tracking-tight line-clamp-2 max-w-[68px]">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Orange Down Chevron Button */}
          <div className="flex justify-center -mb-8 mt-2">
            <button
              onClick={() => setIsCategoryExpanded(prev => !prev)}
              aria-label={isCategoryExpanded ? "Collapse categories" : "Expand categories"}
              className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 border-2 border-white dark:border-[#0E1E31] cursor-pointer active:scale-90 transition-transform"
            >
              {isCategoryExpanded ? (
                <ChevronUp className="w-4 h-4 stroke-[3]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[3]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Alerts Section */}
      <div className="mt-9 px-4 sm:px-6">
        <div className="flex items-center justify-between mb-3 px-0.5">
          <h3 className="text-sm font-black text-slate-800 dark:text-white tracking-tight m-0">
            Alerts
          </h3>
          <button
            onClick={() => onNavigate('announcements')}
            className="text-xs font-bold text-blue-600 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Alert Cards */}
        <div className="space-y-2.5">
          {alertsList.map((alert) => (
            <div
              key={alert.id}
              onClick={() => onNavigate('announcements')}
              className={`bg-white dark:bg-[#0E1E31] rounded-2xl p-3 shadow-xs hover:shadow-md border border-slate-100 dark:border-white/10 ${alert.borderColor} border-l-[3.5px] flex items-center gap-3 transition-all duration-150 active:scale-98 cursor-pointer group`}
            >
              {/* Avatar thumbnail */}
              <img 
                src={alert.avatar} 
                alt={alert.title} 
                className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200 dark:border-white/20 shadow-2xs"
              />

              {/* Title & Date */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-extrabold text-slate-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
                  {alert.title}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {alert.date}
                </div>
              </div>

              {/* Chevron icon */}
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          ))}
        </div>
      </div>



      {/* 5. Search Modal Dialog */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0E1E31] rounded-2xl w-full max-w-sm p-4 shadow-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
              <span className="font-extrabold text-xs text-slate-800 dark:text-white">Quick Search</span>
              <button onClick={() => setShowSearchModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, exams, circulars..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#132235] border border-slate-200 dark:border-white/10 outline-none text-slate-800 dark:text-white"
              />
            </div>
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Suggested Links</div>
              {categoryItems.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setShowSearchModal(false);
                    onNavigate(cat.tab);
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center justify-between"
                >
                  <span>{cat.title}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Notification Center Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0E1E31] rounded-2xl w-full max-w-sm p-4 shadow-2xl border border-slate-200 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-1.5 font-extrabold text-xs text-slate-800 dark:text-white">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                <span>Urgent Circulars & Alerts</span>
              </div>
              <button onClick={() => setShowNotificationModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {announcements.map((ann) => (
                <div 
                  key={ann.id}
                  onClick={() => {
                    setShowNotificationModal(false);
                    onNavigate('announcements');
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-left cursor-pointer hover:border-blue-300"
                >
                  <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
                    <span className="font-bold text-amber-600 dark:text-amber-400">{ann.category}</span>
                    <span>{ann.publishedDate}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-white">{ann.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Faculty Profile Modal */}
      <EditProfileModal 
        isOpen={showEditProfileModal} 
        onClose={() => setShowEditProfileModal(false)} 
      />

    </div>
  );
};
