import React, { useState } from 'react';
import { 
  Building2, Users, GraduationCap, CheckCircle2, 
  Calendar, BookOpen, Bell, Settings, Award, 
  ShieldAlert, UserCheck, Inbox, Image as ImageIcon,
  BookMarked, Bus, ChevronRight, X, Pencil
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditProfileModal } from './EditProfileModal';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onGoHome?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
  onGoHome
}) => {
  const { currentUser, school } = useApp();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Role-based navigation items matching Vidyasetu & School Desk specs
  const getNavItems = () => {
    switch (currentUser.role) {
      case 'ADMIN':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Building2 },
          { id: 'students', label: 'My Students', icon: GraduationCap },
          { id: 'teachers', label: 'Faculty Staff', icon: Users },
          { id: 'attendance', label: 'Attendance', icon: CheckCircle2 },
          { id: 'academics', label: 'Examinations', icon: Award },
          { id: 'timetable', label: 'Timetable', icon: Calendar },
          { id: 'announcements', label: 'Notices', icon: Bell },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'TEACHER':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Building2 },
          { id: 'teacher_attendance', label: 'Attendance', icon: CheckCircle2 },
          { id: 'teacher_homework', label: 'Assignments', icon: BookOpen },
          { id: 'teacher_materials', label: 'Study Notes', icon: BookMarked },
          { id: 'teacher_marks', label: 'Examinations', icon: Award },
          { id: 'teacher_schedule', label: 'Timetable', icon: Calendar },
          { id: 'announcements', label: 'Notices', icon: Bell },
        ];
      case 'STUDENT':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Building2 },
          { id: 'student_homework', label: 'Assignments', icon: BookOpen },
          { id: 'materials', label: 'Study Notes', icon: BookMarked },
          { id: 'student_timetable', label: 'Timetable', icon: Calendar },
          { id: 'student_attendance', label: 'Attendance', icon: CheckCircle2 },
          { id: 'student_results', label: 'Examinations', icon: Award },
          { id: 'student_fees', label: 'Fees', icon: UserCheck },
          { id: 'announcements', label: 'Notices', icon: Bell },
          { id: 'student_dashboard', label: 'Academic Hub', icon: GraduationCap },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Deep Royal Navy Sidebar with Premium Modern Aesthetics */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 md:sticky md:top-0
        w-64 bg-linear-to-b from-[#002252] via-[#002B66] to-[#001D45] text-white flex flex-col shrink-0 h-screen border-r border-[#003882]/40 select-none
        transition-transform duration-300 ease-in-out shadow-2xl overflow-hidden
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0 pointer-events-none md:pointer-events-auto'}
      `}>
        {/* Subtle geometric dot matrix texture in sidebar */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />

        {/* Ambient Top & Bottom Lighting */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* Brand Header with School Crest */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between relative z-10 backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/school_logo.jpg" 
              alt="School Logo" 
              className="w-10 h-10 rounded-full bg-white p-0.5 object-contain shadow-md border-2 border-amber-400/80 shrink-0"
            />
            <div className="overflow-hidden">
              <div className="font-black text-sm tracking-tight leading-none text-white truncate">
                BHAKTIVEDANTA
              </div>
              <div className="text-[9px] text-amber-300 font-bold tracking-wider uppercase mt-1 truncate">
                MISSION HR. SEC. SCHOOL
              </div>
              <div className="text-[8px] text-slate-300 font-medium tracking-wider uppercase flex items-center gap-1 mt-0.5">
                <span>POWERED BY</span>
                <span className="font-vidyasetu text-white font-bold tracking-normal text-[9.5px]">Vidyasetu</span>
              </div>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden text-slate-300 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation list with clean active highlight */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto relative z-10">
          <div className="px-3 pb-1 text-[10px] font-bold tracking-widest uppercase text-slate-400/80">
            Main Menu
          </div>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={`${item.id}_${idx}`}
                onClick={() => onSelectTab(item.id)}
                className={`group relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-400/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10 active:scale-98'
                }`}
              >
                <div className={`p-1 rounded-lg transition-transform duration-200 ${
                  isActive 
                    ? 'text-slate-950' 
                    : 'text-slate-300 group-hover:text-amber-300 group-hover:scale-110'
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Stay Updated! Notification Card */}
        <div className="p-3.5 mx-3 mb-3 rounded-2xl bg-linear-to-b from-white/10 to-white/5 border border-white/15 text-white backdrop-blur-md relative z-10 shadow-lg shadow-black/10">
          <div className="font-extrabold text-xs text-amber-300 tracking-wide">Stay Updated!</div>
          <p className="text-[11px] text-slate-200/90 mt-1 leading-snug font-normal">
            Enable notifications to never miss circulars, exams & alerts.
          </p>
          <button 
            onClick={() => alert('Notifications enabled for Bhaktivedanta Vidyasetu!')}
            className="mt-2.5 w-full py-1.5 px-3 bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 rounded-xl text-[11px] font-black transition-all duration-150 active:scale-95 shadow-md shadow-amber-400/10 cursor-pointer"
          >
            Enable Notifications
          </button>
        </div>

        {/* User profile footer - Interactive: Click to edit teacher/user profile */}
        <div 
          onClick={() => setShowEditModal(true)}
          className="p-3 border-t border-white/10 bg-[#00193D] hover:bg-[#002554] relative z-10 transition-all duration-150 cursor-pointer group select-none"
          title="Click to edit profile & photograph"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Teacher / User Photo Avatar */}
            <div className="relative shrink-0">
              {currentUser.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover object-top border-2 border-amber-400 shadow-md group-hover:scale-105 group-hover:border-amber-300 transition-all"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-400 to-amber-300 text-slate-950 font-black flex items-center justify-center text-xs shadow-xs border border-amber-300 group-hover:scale-105 transition-transform">
                  {currentUser.name.charAt(0)}
                </div>
              )}
              {/* Micro-pencil edit badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs border border-[#00193D] group-hover:bg-amber-300 group-hover:scale-110 transition-transform">
                <Pencil className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Teacher Details */}
            <div className="overflow-hidden flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors flex items-center justify-between">
                <span className="truncate">{currentUser.name}</span>
              </div>
              <div className="text-[10px] text-amber-300/90 truncate font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="truncate">
                  {currentUser.role === 'TEACHER' 
                    ? (currentUser.details?.classId ? `${currentUser.details.classId} Mentor` : 'Faculty Mentor') 
                    : currentUser.role}
                </span>
                <span className="text-[9px] text-slate-400 group-hover:text-amber-200 transition-colors shrink-0">✎ Edit</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Edit Profile Pop-up Dialog */}
      <EditProfileModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
    </>
  );
};
