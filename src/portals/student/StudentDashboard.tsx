import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, BookOpen, Calendar, Award, 
  ArrowRight, Clock, ChevronRight, CreditCard, Download, 
  FileText, Check, X, Printer, Sparkles, AlertCircle, Share2,
  TrendingUp, QrCode, ShieldCheck, Copy, CheckCheck, Zap, PieChart, Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface StudentDashboardProps {
  initialSection?: 'all' | 'attendance' | 'homework' | 'results' | 'fees' | 'schedule';
  onNavigate?: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ initialSection, onNavigate }) => {
  const { school, homework, announcements } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [submittedHw, setSubmittedHw] = useState<Record<string, boolean>>({});
  
  // Modals & Interactive States
  const [showReportCardModal, setShowReportCardModal] = useState<boolean>(false);
  const [showFeeReceiptModal, setShowFeeReceiptModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState<boolean>(false);
  const [isFeePaidSuccess, setIsFeePaidSuccess] = useState<boolean>(false);
  const [upiCopied, setUpiCopied] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialSection === 'results') setShowReportCardModal(true);
    else if (initialSection === 'fees') {
      const el = document.getElementById('student-fees-analytics');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else setShowFeeReceiptModal(true);
    }
    else if (initialSection === 'attendance') {
      const el = document.getElementById('student-attendance-analytics');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    else if (initialSection) setActiveCategory(initialSection);
  }, [initialSection]);

  const studentInfo = {
    name: 'Anoop Awasthi',
    admissionNo: '310190295',
    class: 'Class 11 - Science',
    rollNo: 14,
    dob: '12-Aug-2008',
    guardian: 'Mr. R. K. Awasthi',
    schoolName: school.name || 'Bhaktivedanta Institute Mission Hr. Sec. School',
    session: '2025–2026',
    attendancePercent: 92,
    presentDays: 22,
    totalDays: 24,
    feesTotal: 36500,
    feesPaid: isFeePaidSuccess ? 36500 : 24500,
    feesDue: isFeePaidSuccess ? 0 : 12000
  };

  const categories = [
    { 
      id: 'attendance', 
      title: 'My Attendance', 
      stat: '92% Present', 
      icon: '🗓️',
      action: () => {
        const el = document.getElementById('student-attendance-analytics');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    { id: 'assignments', title: 'Assignments', stat: '4 Pending', icon: '📝' },
    { id: 'timetable', title: 'Time Table', stat: 'Live Period 3', icon: '📅' },
    { id: 'results', title: 'Report Card', stat: 'Term 1 Published', icon: '🏆', action: () => setShowReportCardModal(true) },
    { 
      id: 'fees', 
      title: 'Fee Overview', 
      stat: isFeePaidSuccess ? '₹0 Due (Paid)' : '₹12,000 Due', 
      icon: '💳', 
      action: () => {
        const el = document.getElementById('student-fees-analytics');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    { id: 'notices', title: 'Circulars', stat: '3 Unread Alerts', icon: '📢' },
    { 
      id: 'materials', 
      title: 'Study Notes', 
      stat: 'PDF Library', 
      icon: '📚',
      action: () => {
        if (onNavigate) onNavigate('materials');
      }
    },
    { id: 'feedback', title: 'Teacher Chat', stat: 'Direct Connect', icon: '💬' },
  ];

  const subjectGrades = [
    { subject: 'Physics', code: '042', theory: 62, practical: 26, total: 88, max: 100, grade: 'A1', remarks: 'Exceptional' },
    { subject: 'Chemistry', code: '043', theory: 59, practical: 26, total: 85, max: 100, grade: 'A2', remarks: 'Good aptitude' },
    { subject: 'Mathematics', code: '041', theory: 72, practical: 18, total: 90, max: 100, grade: 'A1', remarks: 'Outstanding' },
    { subject: 'English Core', code: '301', theory: 64, practical: 18, total: 82, max: 100, grade: 'A2', remarks: 'Commendable' },
    { subject: 'Computer Science', code: '083', theory: 64, practical: 28, total: 92, max: 100, grade: 'A1', remarks: 'Mastery shown' },
  ];

  const classSchedule = [
    { period: 1, time: '08:00 AM - 08:45 AM', subject: 'Physics', teacher: 'Mr. R. Singh', room: 'Room 203', status: 'Completed' },
    { period: 2, time: '08:45 AM - 09:30 AM', subject: 'Chemistry', teacher: 'Ms. P. Verma', room: 'Science Lab', status: 'Completed' },
    { isBreak: true, time: '09:30 AM - 09:45 AM', label: 'Morning Recess & Refreshment' },
    { period: 3, time: '09:45 AM - 10:30 AM', subject: 'Mathematics', teacher: 'Mr. A. Kumar', room: 'Room 202', status: 'Live Now' },
    { period: 4, time: '10:30 AM - 11:15 AM', subject: 'English Core', teacher: 'Ms. S. Nair', room: 'Room 105', status: 'Upcoming' },
    { period: 5, time: '11:15 AM - 12:00 PM', subject: 'Computer Science', teacher: 'Mr. V. Sharma', room: 'Lab 1', status: 'Upcoming' },
  ];

  const handleToggleSubmit = (id: string) => {
    setSubmittedHw((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 pb-20 sm:pb-6 relative">
      
      {/* 1. Glassmorphic Hero Banner with Ambient Glow */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#002B66]/95 via-[#0c438c]/90 to-[#002B66]/95 text-white backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-[#002B66]/30">
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-50px] left-[20%] w-64 h-64 rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Avatar and Student Data */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative group shrink-0">
              <img 
                src="/assets/anoop_avatar.jpg" 
                alt={studentInfo.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-300 shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#002B66] ring-2 ring-emerald-400/30 animate-pulse"></span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-3xl font-black text-white m-0 tracking-tight">
                  {studentInfo.name}
                </h1>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                  CBSE Science
                </span>
              </div>
              <div className="text-xs text-slate-200 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-bold text-amber-300">{studentInfo.class}</span>
                <span>•</span>
                <span className="font-mono">Adm: {studentInfo.admissionNo}</span>
                <span>•</span>
                <span>Roll #{studentInfo.rollNo}</span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1 font-medium">
                {studentInfo.schoolName}
              </div>
            </div>
          </div>

          {/* Glowing Metric Pills */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm">
              <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Attendance</div>
              <div className="text-lg sm:text-xl font-black text-amber-300 mt-0.5">
                {studentInfo.attendancePercent}%
              </div>
              <div className="text-[9px] text-emerald-300 font-bold">22/24 Days</div>
            </div>

            <div 
              onClick={() => setShowReportCardModal(true)}
              className="flex-1 md:flex-initial bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm group"
            >
              <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">GPA / Rank</div>
              <div className="text-lg sm:text-xl font-black text-white mt-0.5 group-hover:text-amber-300 transition-colors">
                #5 / 58
              </div>
              <div className="text-[9px] text-amber-300 font-bold flex items-center justify-center gap-0.5">
                <span>View Marks</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>

            <div 
              onClick={() => setShowFeeReceiptModal(true)}
              className="flex-1 md:flex-initial bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center transition-all duration-200 hover:scale-105 cursor-pointer shadow-sm group"
            >
              <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Fee Balance</div>
              <div className="text-lg sm:text-xl font-black text-rose-300 mt-0.5">
                ₹{studentInfo.feesDue.toLocaleString('en-IN')}
              </div>
              <div className="text-[9px] text-rose-200 font-bold flex items-center justify-center gap-0.5">
                <span>Get Receipt</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive 3D Category Grid with Micro-Interactions */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm sm:text-base font-extrabold text-[#002B66] dark:text-white m-0">
              Student Quick Hub
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            Academic Session {studentInfo.session}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                if (cat.action) cat.action();
              }}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col items-center text-center gap-1.5 active:scale-95 group ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/30 scale-102'
                  : 'bg-white/80 dark:bg-[#121F2F]/80 backdrop-blur-md border-slate-200/80 dark:border-[#1E3146] hover:border-amber-400 dark:hover:border-amber-400 hover:shadow-md text-slate-700 dark:text-slate-200 hover:-translate-y-1'
              }`}
            >
              <div className="text-2xl transition-transform duration-200 group-hover:scale-115">{cat.icon}</div>
              <div className="font-extrabold text-xs leading-tight line-clamp-1">{cat.title}</div>
              <div className={`text-[10px] font-semibold leading-none truncate max-w-full ${
                activeCategory === cat.id ? 'text-blue-100' : 'text-slate-400 dark:text-slate-400'
              }`}>
                {cat.stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2.5 Unique Modern Attendance Visual Analytics & Donut Gauge */}
      <div 
        id="student-attendance-analytics" 
        className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm hover:shadow-md transition-all duration-200 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/25">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-[#002B66] dark:text-white m-0">
                  Attendance Intelligence & Biometric Log
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  CBSE Compliant (≥75%)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
                RFID Smart Gate ID #8841-B • October 2026 Academic Term
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-bold shadow-xs">
              <span className="text-sm">🔥</span>
              <span>14-Day Streak</span>
            </div>
            <button 
              onClick={() => alert('Attendance report for October 2026 downloaded!')}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
              title="Export Log"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Analytics Grid: Donut Radial Gauge + Weekly Interactive Bar Chart + Safety Buffer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Radial SVG Donut Gauge (4 cols) */}
          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-[#0B1A2C] dark:to-[#0B1A2C]/50 border border-slate-100 dark:border-white/5 gap-4">
            {/* SVG Donut */}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                {/* Background Track */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Absent Segment (Optional aesthetic offset) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="#F43F5E"
                  strokeWidth="10"
                  strokeDasharray="301.6"
                  strokeDashoffset="288"
                  strokeLinecap="round"
                  fill="transparent"
                  className="opacity-70"
                />
                {/* Main Progress Ring (92% = 301.6 * (1 - 0.92) = 24.1 offset) */}
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke="url(#attendanceGradient)"
                  strokeWidth="11"
                  strokeDasharray="301.6"
                  strokeDashoffset="24.1"
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out drop-shadow-sm"
                />
                <defs>
                  <linearGradient id="attendanceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Donut Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-[#002B66] dark:text-white tracking-tight">
                  {studentInfo.attendancePercent}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Present
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Top 5% in Class
                </span>
              </div>
            </div>

            {/* Quick Status Legend */}
            <div className="grid grid-cols-3 gap-2 w-full text-center">
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 shadow-2xs">
                <div className="text-[10px] text-slate-400 font-semibold">Present</div>
                <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">22 Days</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 shadow-2xs">
                <div className="text-[10px] text-slate-400 font-semibold">Absent</div>
                <div className="text-sm font-extrabold text-rose-500">1 Day</div>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 shadow-2xs">
                <div className="text-[10px] text-slate-400 font-semibold">Leave</div>
                <div className="text-sm font-extrabold text-amber-500">1 Day</div>
              </div>
            </div>
          </div>

          {/* Weekly Interactive Bar Graph & CBSE Threshold (7 cols) */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Header of Chart */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Current Week Biometric Check-ins
                </div>
                <div className="text-[11px] text-slate-400">
                  Swipe card scanned daily at 07:48 AM average
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/40">
                Week 4 (Oct 16 - 21)
              </span>
            </div>

            {/* Daily Bar Columns */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3 pt-3">
              {[
                { day: 'Mon', date: 'Oct 16', status: 'present', time: '07:44 AM', height: 'h-24' },
                { day: 'Tue', date: 'Oct 17', status: 'present', time: '07:51 AM', height: 'h-24' },
                { day: 'Wed', date: 'Oct 18', status: 'present', time: '07:42 AM', height: 'h-24' },
                { day: 'Thu', date: 'Oct 19', status: 'leave', time: 'Sanctioned', height: 'h-14' },
                { day: 'Fri', date: 'Oct 20', status: 'present', time: '07:49 AM', height: 'h-24' },
                { day: 'Sat', date: 'Oct 21', status: 'present', time: '07:46 AM', height: 'h-24' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center group cursor-pointer"
                  title={`${item.day} (${item.date}): ${item.status === 'present' ? `Present at ${item.time}` : item.time}`}
                >
                  {/* Tooltip / Status indicator */}
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-bold">
                    {item.day}
                  </span>

                  {/* Bar Background Track */}
                  <div className="w-full h-24 bg-slate-100 dark:bg-white/5 rounded-xl flex items-end p-1 transition-all group-hover:bg-slate-200/60 dark:group-hover:bg-white/10">
                    <div 
                      className={`w-full ${item.height} rounded-lg transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-white shadow-xs ${
                        item.status === 'present'
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:scale-y-105'
                          : 'bg-gradient-to-t from-amber-500 to-yellow-400'
                      }`}
                    >
                      <span className="transform -rotate-90 sm:rotate-0">
                        {item.status === 'present' ? 'P' : 'L'}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1.5">
                    {item.day}
                  </span>
                  <span className="text-[9px] text-slate-400">
                    {item.date.split(' ')[1]}
                  </span>
                </div>
              ))}
            </div>

            {/* CBSE Compliance Buffer Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-100 dark:border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">
                  CBSE Examination Eligibility Threshold
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  92% / 75% required (+17% safe margin)
                </span>
              </div>

              {/* Progress bar with 75% threshold marker */}
              <div className="relative w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                  style={{ width: '92%' }} 
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>0%</span>
                <span className="text-amber-500 font-bold">▲ 75% CBSE Board Exam Cutoff</span>
                <span className="text-emerald-500 font-bold">92% Current</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Main Dashboard Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Homework & Schedule */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Homework & Tasks Card */}
          <div className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-amber-400" />
                <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                  Assigned Homework & Submissions
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                {homework.length} Active Tasks
              </span>
            </div>

            <div className="space-y-3">
              {homework.map((hw) => {
                const isDone = submittedHw[hw.id];
                return (
                  <div 
                    key={hw.id} 
                    className="p-4 rounded-2xl bg-slate-50/70 dark:bg-[#0B1A2C]/60 border border-slate-200/80 dark:border-[#1E3146] hover:border-blue-400/80 dark:hover:border-amber-400/60 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                          {hw.subject}
                        </span>
                        <span className="text-xs font-mono text-rose-600 dark:text-rose-400 font-bold">
                          Due: {hw.dueDate}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[#002B66] dark:text-white group-hover:text-blue-600 dark:group-hover:text-amber-300 transition-colors">
                        {hw.title}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {hw.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleSubmit(hw.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 shrink-0 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-xs ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                          : 'bg-[#002B66] dark:bg-amber-500 text-white dark:text-slate-950 hover:opacity-90'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Work</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Schedule with 'Live Now' Badge */}
          <div className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                  Daily Timetable (Thursday)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Class 11 - Science
              </span>
            </div>

            <div className="space-y-2.5">
              {classSchedule.map((slot, idx) => (
                slot.isBreak ? (
                  <div key={idx} className="py-2 px-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 text-center text-xs font-bold text-amber-700 dark:text-amber-400">
                    ☕ {slot.label} • {slot.time}
                  </div>
                ) : (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      slot.status === 'Live Now'
                        ? 'bg-blue-50/90 dark:bg-blue-950/40 border-blue-400 ring-2 ring-blue-400/20 shadow-xs'
                        : 'bg-slate-50/70 dark:bg-[#0B1A2C]/60 border-slate-200/80 dark:border-[#1E3146]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center ${
                        slot.status === 'Live Now'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                      }`}>
                        {slot.period}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-[#002B66] dark:text-white">{slot.subject}</span>
                          {slot.status === 'Live Now' && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500 text-white animate-pulse">
                              Live Now
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{slot.teacher} • {slot.room}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-300 font-bold">{slot.time}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Report Card, Fee & Circulars */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Term 1 Report Card with Printable Trigger */}
          <div className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                  Published Report Card
                </h3>
              </div>
              <button
                onClick={() => setShowReportCardModal(true)}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Card</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {subjectGrades.map((sub, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-[#0B1A2C]/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#002B66] dark:text-white">{sub.subject}</div>
                    <div className="text-[10px] text-slate-400">Code: {sub.code} • {sub.remarks}</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{sub.total}/{sub.max}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                      {sub.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowReportCardModal(true)}
              className="w-full mt-4 py-2.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold text-xs rounded-xl border border-purple-200 dark:border-purple-800/40 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official CBSE Marksheet</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* UNIQUE MODERN NEO-BANKING FEE CARD & PAYMENT GATEWAY     */}
          {/* ======================================================== */}
          <div 
            id="student-fees-analytics" 
            className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm hover:shadow-md transition-all duration-200 scroll-mt-20"
          >
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                  Fee Statement & Digital Pass
                </h3>
              </div>
              <button
                onClick={() => setShowFeeReceiptModal(true)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Receipt</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Neo-Banking Holographic Metallic Fee Card */}
            <div className="relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#0A2244] via-[#103A70] to-[#081830] text-white shadow-xl shadow-blue-950/40 border border-amber-400/30 overflow-hidden mb-4 group transition-transform duration-300 hover:scale-[1.01]">
              {/* Card Ambient Glow & Holographic Shine */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Card Header: Chip + Wireless Waves */}
              <div className="flex items-center justify-between relative z-10 mb-3">
                <div className="flex items-center gap-2">
                  {/* Metallic EMV Gold Chip Icon */}
                  <div className="w-8 h-6 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 border border-amber-200 shadow-inner flex items-center justify-center p-0.5">
                    <div className="w-full h-full border border-yellow-700/60 rounded-xs flex flex-col justify-around py-0.5">
                      <div className="w-full h-px bg-yellow-800/40" />
                      <div className="w-full h-px bg-yellow-800/40" />
                    </div>
                  </div>
                  {/* Contactless Waves */}
                  <span className="text-amber-300 text-xs font-mono font-bold flex items-center gap-1">
                    <span>📶</span>
                    <span className="font-vidyasetu text-[13px] font-bold">Vidyasetu</span>
                    <span>Pay</span>
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                  SMART PASS
                </span>
              </div>

              {/* Student Identification & Class */}
              <div className="relative z-10 mb-3">
                <div className="text-[10px] text-slate-300 uppercase tracking-widest">Student Cardholder</div>
                <div className="text-base sm:text-lg font-black tracking-wider text-white">
                  {studentInfo.name.toUpperCase()}
                </div>
                <div className="text-[11px] font-mono text-amber-200 mt-0.5">
                  ADM: {studentInfo.admissionNo} • {studentInfo.class}
                </div>
              </div>

              {/* Outstanding Balance Banner */}
              <div className="relative z-10 pt-2.5 border-t border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-[9.5px] uppercase tracking-wider text-slate-300">Outstanding Balance</div>
                  <div className={`text-xl sm:text-2xl font-black tracking-tight ${
                    studentInfo.feesDue === 0 ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {studentInfo.feesDue === 0 ? '₹ 0.00' : `₹ ${studentInfo.feesDue.toLocaleString('en-IN')}`}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold shadow-sm ${
                  studentInfo.feesDue === 0 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-rose-500/90 text-white animate-pulse'
                }`}>
                  {studentInfo.feesDue === 0 ? 'PAID IN FULL ✓' : 'INSTALMENT 3 DUE'}
                </span>
              </div>
            </div>

            {/* Segmented Dual Fee Progress Bar */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-600 dark:text-emerald-400">
                  ₹{studentInfo.feesPaid.toLocaleString('en-IN')} Paid (67%)
                </span>
                <span className="text-rose-600 dark:text-rose-400">
                  ₹{studentInfo.feesDue.toLocaleString('en-IN')} Due (33%)
                </span>
              </div>
              
              {/* Dual Progress Track */}
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
                <div 
                  style={{ width: `${(studentInfo.feesPaid / studentInfo.feesTotal) * 100}%` }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                  title={`Paid: ₹${studentInfo.feesPaid.toLocaleString('en-IN')}`}
                />
                <div 
                  style={{ width: `${(studentInfo.feesDue / studentInfo.feesTotal) * 100}%` }}
                  className="h-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-700"
                  title={`Due: ₹${studentInfo.feesDue.toLocaleString('en-IN')}`}
                />
              </div>
            </div>

            {/* Installment Milestones */}
            <div className="space-y-2 text-xs mb-4">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 dark:text-white">Term 1 (Tuition & Admission)</div>
                  <div className="text-[10px] text-slate-400">Paid on 10-Apr-2025 • Ref: TXN_9841</div>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> ₹12,250
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 dark:text-white">Term 2 (Labs & Library)</div>
                  <div className="text-[10px] text-slate-400">Paid on 15-Jul-2025 • Ref: TXN_6203</div>
                </div>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                  <Check className="w-3.5 h-3.5" /> ₹12,250
                </span>
              </div>

              <div className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                studentInfo.feesDue === 0
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40'
                  : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30'
              }`}>
                <div>
                  <div className="font-bold text-slate-800 dark:text-white">Term 3 (Exams & Annual Sports)</div>
                  <div className="text-[10px] text-slate-400">
                    {studentInfo.feesDue === 0 ? 'Paid Online • Verified' : 'Due by 15-Nov-2025 • 25 Days Remaining'}
                  </div>
                </div>
                <span className={`font-bold flex items-center gap-1 text-[11px] ${
                  studentInfo.feesDue === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {studentInfo.feesDue === 0 ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  ₹12,000
                </span>
              </div>
            </div>

            {/* Quick Action CTA Buttons */}
            <div className="flex gap-2.5">
              <button 
                onClick={() => {
                  if (studentInfo.feesDue === 0) {
                    setShowFeeReceiptModal(true);
                  } else {
                    setShowPaymentModal(true);
                  }
                }}
                className={`flex-1 py-3 px-4 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer ${
                  studentInfo.feesDue === 0
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-linear-to-r from-[#002B66] to-[#0047A5] hover:from-[#001D45] hover:to-[#002B66] text-white shadow-blue-900/20'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{studentInfo.feesDue === 0 ? 'Fee Settled — View Receipt' : 'Pay ₹12,000 Online Now'}</span>
              </button>
              
              <button 
                onClick={() => setShowFeeReceiptModal(true)}
                className="px-3.5 py-3 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-700 dark:text-white font-bold text-xs rounded-xl border border-slate-200 dark:border-white/10 transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                title="Print Official Receipt"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* School Alerts & Circulars */}
          <div className="bg-white/90 dark:bg-[#121F2F]/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-sm">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-white/10">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                  School Alerts & Circulars
                </h3>
              </div>
            </div>

            <div className="space-y-2.5">
              {announcements.slice(0, 3).map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-[#0B1A2C]/60 border border-slate-200/80 dark:border-[#1E3146] hover:border-amber-400/50 transition-all">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="px-2 py-0.5 rounded font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {ann.category}
                    </span>
                    <span className="text-slate-400 font-mono">{ann.publishedDate}</span>
                  </div>
                  <div className="font-bold text-xs text-[#002B66] dark:text-white">{ann.title}</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MODAL 1: Printable CBSE 360° Report Card Modal        */}
      {/* ======================================================== */}
      {showReportCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-extrabold text-base text-[#002B66]">Official CBSE Progress Report Card</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#002B66] text-white hover:bg-[#00204d] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button 
                  onClick={() => setShowReportCardModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Institutional Header with Emblem */}
              <div className="text-center pb-4 border-b-2 border-slate-900/80">
                <img 
                  src="/assets/school_logo.jpg" 
                  alt="School Emblem" 
                  className="w-16 h-16 mx-auto rounded-full object-contain mb-2"
                />
                <h2 className="text-lg sm:text-xl font-black text-[#002B66] uppercase tracking-tight m-0">
                  {studentInfo.schoolName}
                </h2>
                <div className="text-xs text-amber-700 font-serif font-bold">
                  अथातो ब्रह्म जिज्ञासा • CBSE AFFILIATION NO: 2430092
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Knowledge Campus Wing • Term 1 Assessment (Session 2025–26)
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Student Name</span>
                  <span className="font-bold text-slate-900">{studentInfo.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Admission No.</span>
                  <span className="font-bold font-mono text-slate-900">{studentInfo.admissionNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Class & Section</span>
                  <span className="font-bold text-slate-900">{studentInfo.class}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Roll Number</span>
                  <span className="font-bold text-slate-900">#{studentInfo.rollNo}</span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200">
                  <thead className="bg-[#002B66] text-white">
                    <tr>
                      <th className="p-2.5">Code</th>
                      <th className="p-2.5">Subject</th>
                      <th className="p-2.5 text-center">Theory (80)</th>
                      <th className="p-2.5 text-center">Prac (20)</th>
                      <th className="p-2.5 text-center">Total (100)</th>
                      <th className="p-2.5 text-center">Grade</th>
                      <th className="p-2.5">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {subjectGrades.map((g, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2.5 font-mono">{g.code}</td>
                        <td className="p-2.5 font-bold">{g.subject}</td>
                        <td className="p-2.5 text-center">{g.theory}</td>
                        <td className="p-2.5 text-center">{g.practical}</td>
                        <td className="p-2.5 text-center font-bold text-blue-700">{g.total}</td>
                        <td className="p-2.5 text-center font-black text-emerald-700">{g.grade}</td>
                        <td className="p-2.5 text-slate-500">{g.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs">
                <div>
                  <span className="text-slate-600 block">Overall Percentage:</span>
                  <span className="text-xl font-black text-blue-800">87.4% (Distinction)</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Class Rank:</span>
                  <span className="text-xl font-black text-blue-800">5 / 58</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Attendance:</span>
                  <span className="text-xl font-black text-emerald-700">92%</span>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex justify-between items-end text-center text-xs text-slate-500">
                <div>
                  <div className="w-32 border-b border-slate-400 mb-1"></div>
                  <span>Class Teacher</span>
                </div>
                <div>
                  <div className="w-32 border-b border-slate-400 mb-1"></div>
                  <span>Exam Controller</span>
                </div>
                <div>
                  <div className="w-32 border-b border-slate-400 mb-1 font-serif text-slate-800 font-bold">Dr. Matthew</div>
                  <span>Principal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL 2: Official Fee Payment Receipt Modal          */}
      {/* ======================================================== */}
      {showFeeReceiptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
            
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 rounded-t-3xl">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-base text-[#002B66]">Official Fee Payment Receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#002B66] text-white hover:bg-[#00204d] transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button 
                  onClick={() => setShowFeeReceiptModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-5">
              
              <div className="text-center pb-3 border-b border-slate-200">
                <h3 className="font-black text-base text-[#002B66] uppercase m-0">
                  {studentInfo.schoolName}
                </h3>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Receipt No: <strong className="text-slate-800">REC-2025-08942</strong> • Date: 18-Oct-2025
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-900">{studentInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Admission No:</span>
                  <span className="font-mono font-bold text-slate-900">{studentInfo.admissionNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Class:</span>
                  <span className="font-bold text-slate-900">{studentInfo.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold text-emerald-700">UPI / NetBanking (Verified)</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Annual Tuition Fee (Installment 1):</span>
                  <span className="font-bold">₹ 14,500</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Science Lab & Computer Practical:</span>
                  <span className="font-bold">₹ 6,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Library & Activity Subscription:</span>
                  <span className="font-bold">₹ 4,000</span>
                </div>
                <div className="flex justify-between py-2 text-sm font-black border-t-2 border-slate-900">
                  <span className="text-[#002B66]">Total Amount Paid:</span>
                  <span className="text-emerald-700">₹ 24,500</span>
                </div>
                <div className="flex justify-between py-1 text-xs text-rose-600 font-bold">
                  <span>Balance Outstanding (Installment 3):</span>
                  <span>₹ 12,000</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Transaction Authorized & Digitally Stamped
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5.5 INTERACTIVE ONLINE PAYMENT GATEWAY MODAL             */}
      {/* ======================================================== */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0E1E31] text-slate-900 dark:text-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-white/10">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-[#122236] rounded-t-3xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#002B66] text-white flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#002B66] dark:text-white m-0">
                    <span className="font-vidyasetu text-base font-bold">Vidyasetu</span> Instant Pay
                  </h4>
                  <div className="text-[10px] text-slate-400">256-bit SSL Secure Payment Gateway</div>
                </div>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              
              {/* Payment Success State */}
              {isFeePaidSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <CheckCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white m-0">Payment Successful!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ₹12,000 received for <strong>{studentInfo.name}</strong> (Adm: {studentInfo.admissionNo})
                  </p>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-mono">
                    Transaction ID: <span className="font-bold text-emerald-600">TXN_984128521</span>
                  </div>
                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setShowPaymentModal(false);
                        setShowFeeReceiptModal(true);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#002B66] text-white text-xs font-bold hover:bg-[#001D45] transition-all cursor-pointer"
                    >
                      View Receipt
                    </button>
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Amount to Pay Card */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Total Due (Term 3)</span>
                      <span className="text-2xl font-black text-[#002B66] dark:text-white">₹12,000.00</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10px] font-bold">
                      Verified Invoice
                    </span>
                  </div>

                  {/* Payment Methods Tabs */}
                  <div className="flex rounded-xl bg-slate-100 dark:bg-white/5 p-1 text-xs font-bold">
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        paymentMethod === 'upi'
                          ? 'bg-white dark:bg-[#122236] text-[#002B66] dark:text-white shadow-xs font-black'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      UPI / QR
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-white dark:bg-[#122236] text-[#002B66] dark:text-white shadow-xs font-black'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Card
                    </button>
                    <button
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`flex-1 py-2 rounded-lg transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'bg-white dark:bg-[#122236] text-[#002B66] dark:text-white shadow-xs font-black'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      NetBanking
                    </button>
                  </div>

                  {/* Method 1: UPI / QR Code */}
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 text-center">
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 inline-block shadow-sm">
                        {/* Dynamic QR Box */}
                        <div className="w-40 h-40 bg-slate-100 dark:bg-white p-2 rounded-xl flex flex-col items-center justify-center relative mx-auto">
                          <img 
                            src="/assets/school_logo.jpg" 
                            alt="Logo" 
                            className="w-8 h-8 rounded-full border border-amber-400 object-contain p-0.5 bg-white shadow-xs z-10" 
                          />
                          <div className="text-[9px] font-mono text-slate-800 font-bold mt-1 text-center">
                            Scan with GPay / PhonePe / Paytm
                          </div>
                          <div className="text-[8px] text-slate-500 mt-0.5">UPI ID: bvihss@icici</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs">
                        <span className="font-mono text-slate-600 dark:text-slate-300">bvihss.fees@icici</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('bvihss.fees@icici');
                            setUpiCopied(true);
                            setTimeout(() => setUpiCopied(false), 2000);
                          }}
                          className="flex items-center gap-1 font-bold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{upiCopied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Method 2: Card */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3 text-left">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block mb-1">Card Number</label>
                        <input 
                          type="text" 
                          defaultValue="4532 •••• •••• 8941" 
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">Expiry</label>
                          <input 
                            type="text" 
                            defaultValue="08/28" 
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-center" 
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 block mb-1">CVV</label>
                          <input 
                            type="password" 
                            defaultValue="•••" 
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-mono text-center" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Method 3: NetBanking */}
                  {paymentMethod === 'netbanking' && (
                    <div className="space-y-2 text-xs">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank, i) => (
                        <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:border-blue-500 cursor-pointer flex items-center justify-between font-bold">
                          <span>{bank}</span>
                          <span className="text-emerald-500">Fast Pay</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Complete Payment Button */}
                  <button
                    disabled={isPaymentProcessing}
                    onClick={() => {
                      setIsPaymentProcessing(true);
                      setTimeout(() => {
                        setIsPaymentProcessing(false);
                        setIsFeePaidSuccess(true);
                      }, 1200);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                  >
                    {isPaymentProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying Secure Bank Transfer...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ₹12,000 Securely</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
