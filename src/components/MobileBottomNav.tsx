import React from 'react';
import { Home, BookOpen, FileText, Send, User } from 'lucide-react';
import { Role } from '../types';

interface MobileBottomNavProps {
  currentTab: string;
  role: Role;
  onNavigate: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  role,
  onNavigate,
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: currentTab === 'dashboard',
      targetTab: 'dashboard',
    },
    {
      id: 'classes',
      label: 'Classes',
      icon: BookOpen,
      isActive: ['timetable', 'student_timetable', 'teacher_schedule', 'academics'].includes(currentTab),
      targetTab: role === 'STUDENT' ? 'student_timetable' : (role === 'TEACHER' ? 'teacher_schedule' : 'timetable'),
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      isActive: ['materials', 'teacher_materials', 'homework', 'student_homework'].includes(currentTab),
      targetTab: role === 'TEACHER' ? 'teacher_materials' : 'materials',
    },
    {
      id: 'notices',
      label: 'Notices',
      icon: Send,
      isActive: currentTab === 'announcements',
      targetTab: 'announcements',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      isActive: ['student_dashboard', 'students', 'teachers', 'settings', 'teacher_attendance', 'student_results', 'teacher_marks'].includes(currentTab),
      targetTab: role === 'STUDENT' ? 'student_dashboard' : (role === 'TEACHER' ? 'teacher_attendance' : 'students'),
    },
  ];

  const activeIndex = navItems.findIndex((item) => item.isActive);
  const resolvedIndex = activeIndex >= 0 ? activeIndex : 0;
  // Calculate percentage center for the indicator and scoop:
  // Each tab occupies (100 / 5)% = 20% width. Center of index i is (i * 20) + 10 = (i * 20 + 10)%
  const scoopCenterPercent = (resolvedIndex * 20) + 10;

  return (
    <nav className="fixed bottom-3 inset-x-3 max-w-[390px] mx-auto z-40 select-none pointer-events-auto">
      <div className="relative">
        {/* Floating Bubble Pill with Gradient Icon (Smoothly translates across the active tab) */}
        <div 
          className="absolute -top-5 z-20 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] -translate-x-1/2"
          style={{ left: `${scoopCenterPercent}%` }}
        >
          <div className="w-13 h-13 rounded-full bg-white dark:bg-slate-900 p-1 shadow-[0_8px_20px_rgba(99,102,241,0.35)] ring-4 ring-slate-100/60 dark:ring-slate-800/80 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-inner transform transition-transform duration-300 scale-100">
              {React.createElement(navItems[resolvedIndex].icon, {
                className: "w-5 h-5 stroke-[2.4] text-white drop-shadow-sm animate-pulse-subtle"
              })}
            </div>
          </div>
        </div>

        {/* SVG Background Bar with Dynamic Dip / Scoop Path */}
        <div className="relative w-full h-[62px] filter drop-shadow-[0_10px_25px_rgba(15,23,42,0.14)] dark:drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 350 62"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="navBarBgLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F8FAFC" />
              </linearGradient>
              <linearGradient id="navBarBgDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            {/* Compute smooth scoop path around the active tab's center X (0 to 350 scale) */}
            {(() => {
              const x = (resolvedIndex * 70) + 35; // each item is 70px wide in 350 coordinate space
              const r = 26; // scoop radius
              const s = 14; // smooth shoulder transition
              const pathD = `
                M 24,0
                L ${x - r - s},0
                C ${x - r},0 ${x - r + 3},10 ${x - r + 8},18
                C ${x - 8},30 ${x + 8},30 ${x + r - 8},18
                C ${x + r - 3},10 ${x + r},0 ${x + r + s},0
                L 326,0
                A 24,24 0 0 1 350,24
                L 350,38
                A 24,24 0 0 1 326,62
                L 24,62
                A 24,24 0 0 1 0,38
                L 0,24
                A 24,24 0 0 1 24,0
                Z
              `;

              return (
                <path
                  d={pathD}
                  className="fill-white dark:fill-slate-900 stroke-slate-200/80 dark:stroke-slate-800 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  strokeWidth="1.2"
                />
              );
            })()}
          </svg>

          {/* Interactive Nav Item Click Zones and Labels */}
          <div className="absolute inset-0 grid grid-cols-5 items-end pb-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isItemActive = index === resolvedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.targetTab)}
                  className="relative flex flex-col items-center justify-end h-full w-full group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
                  aria-label={item.label}
                >
                  {/* Subtle inactive icon (hidden/faded when active as the floating bubble takes over) */}
                  <div className={`transition-all duration-200 ${
                    isItemActive 
                      ? 'opacity-0 scale-50 pointer-events-none -translate-y-4' 
                      : 'opacity-70 group-hover:opacity-100 translate-y-0'
                  }`}>
                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 stroke-[1.8]" />
                  </div>

                  {/* Label Text */}
                  <span
                    className={`text-[10.5px] tracking-tight transition-all duration-200 mt-1 ${
                      isItemActive
                        ? 'font-bold text-slate-900 dark:text-white translate-y-0.5 scale-105'
                        : 'font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
