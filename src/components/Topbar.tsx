import React from 'react';
import { Bell, ShieldCheck, Menu, Home, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopbarProps {
  pageTitle: string;
  onLogout: () => void;
  onGoHome?: () => void;
  onToggleMobileMenu?: () => void;
  onBackToPortalHome?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  pageTitle, 
  onLogout,
  onGoHome,
  onToggleMobileMenu,
  onBackToPortalHome
}) => {
  const { currentUser, switchUser, school, theme, toggleTheme } = useApp();

  return (
    <header className="h-16 bg-white dark:bg-[#0E1A29] border-b border-[#E3EAF0] dark:border-[#1E3146] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs transition-colors duration-200">
      {/* Title & Mobile Menu Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Back to Hub / Back to Home Button */}
        {onBackToPortalHome ? (
          <button
            onClick={onBackToPortalHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 dark:text-amber-400 bg-blue-50 dark:bg-white/10 border border-blue-200/80 dark:border-white/10 hover:bg-blue-100 dark:hover:bg-white/15 transition-all duration-150 active:scale-90 hover:-translate-x-0.5 cursor-pointer shadow-2xs"
            title="Return to Portal Mobile Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : onGoHome && (
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#17324D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all duration-150 active:scale-90 hover:-translate-x-0.5 cursor-pointer shadow-2xs"
            title="Return to Main Vidyasetu Homepage"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:hidden" />
            <Home className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Back</span>
          </button>
        )}

        {/* Page Title: Hidden on mobile phones to avoid duplicate title with page content below */}
        <h1 className="hidden md:block text-base sm:text-lg font-bold text-[#17324D] dark:text-white m-0 truncate">
          {pageTitle}
        </h1>
        <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
          <ShieldCheck className="w-3.5 h-3.5" />
          Tenant: {school.code}
        </span>
      </div>

      {/* Center: Admin, Teacher, Student Role Switcher (Center Aligned) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center bg-slate-100/90 dark:bg-white/10 backdrop-blur-md border border-slate-200/80 dark:border-white/15 p-0.5 rounded-full shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 hidden xl:inline">
            Role:
          </span>
          {(['ADMIN', 'TEACHER', 'STUDENT'] as const).map((r) => {
            const isActive = currentUser.role === r;
            const labels = { ADMIN: 'Admin', TEACHER: 'Teacher', STUDENT: 'Student' };
            const activeColors = {
              ADMIN: 'bg-[#17324D] dark:bg-amber-400 text-white dark:text-slate-950 shadow-xs',
              TEACHER: 'bg-[#159D96] text-white shadow-xs',
              STUDENT: 'bg-indigo-600 text-white shadow-xs',
            };
            return (
              <button
                key={r}
                onClick={() => switchUser(r)}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[10.5px] sm:text-xs font-bold rounded-full transition-all duration-200 cursor-pointer active:scale-90 hover:scale-[1.04] ${
                  isActive
                    ? `${activeColors[r]} font-black scale-[1.02]`
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {labels[r]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Actions: Theme Toggle + Notification + Logout */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Theme Toggle Button (Light/Dark Mode) with micro-interaction */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle color theme"
          className="p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-amber-300 hover:text-slate-800 dark:hover:text-amber-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all active:scale-90 cursor-pointer shadow-2xs"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
          ) : (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 transition-transform duration-300 hover:-rotate-12" />
          )}
        </button>

        {/* Notification Bell */}
        <button 
          aria-label="Notifications"
          className="relative p-1.5 sm:p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all active:scale-90 cursor-pointer shadow-2xs"
        >
          <Bell className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
          <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white dark:ring-slate-900"></span>
        </button>

        {/* Logout / Switch Account - Hidden on phones to keep topbar uncluttered */}
        <button
          onClick={onLogout}
          title="Sign out & return to login"
          className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 transition-all active:scale-95 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};
