import React, { useState } from 'react';
import { 
  Users, GraduationCap, CheckCircle2, TrendingUp, 
  ArrowUpRight, Plus, Search, Filter, AlertCircle, 
  IndianRupee, Calendar, BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { school, students, teachers, homework, exams, announcements } = useApp();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const activeExams = exams.filter(e => e.status !== 'Completed').length;
  const avgAttendance = Math.round(
    students.reduce((acc, curr) => acc + curr.attendanceRate, 0) / (students.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#17324D] via-[#1b3d5e] to-[#204a70] dark:from-[#0d1d2d] dark:via-[#13283c] dark:to-[#17324D] rounded-xl p-5 sm:p-6 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-white/5">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
            Academic Year {school.academicYear}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white m-0">
            Welcome to {school.name}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
            Real-time management dashboard for student enrollments, faculty allocation, attendance tracking, and examination schedules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xs px-4 py-2.5 rounded-lg border border-white/10 text-center">
            <div className="text-xs text-slate-300">Total Enrolled</div>
            <div className="text-lg sm:text-xl font-bold text-white">{totalStudents} Students</div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid - Fully Clickable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students Card */}
        <div 
          onClick={() => onNavigate?.('students')}
          className="bg-white dark:bg-[#121F2F] p-5 rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] shadow-xs flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md hover:border-blue-400 cursor-pointer"
        >
          <div>
            <span className="text-xs font-semibold text-[#687789] dark:text-slate-400 uppercase tracking-wider">Total Students</span>
            <div className="text-2xl font-bold text-[#17324D] dark:text-white mt-1">{totalStudents}</div>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> View Directory →
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Faculty Staff Card */}
        <div 
          onClick={() => onNavigate?.('teachers')}
          className="bg-white dark:bg-[#121F2F] p-5 rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] shadow-xs flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md hover:border-teal-400 cursor-pointer"
        >
          <div>
            <span className="text-xs font-semibold text-[#687789] dark:text-slate-400 uppercase tracking-wider">Faculty Staff</span>
            <div className="text-2xl font-bold text-[#17324D] dark:text-white mt-1">{totalTeachers}</div>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> View Faculty →
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-[#159D96] dark:text-teal-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Attendance Card */}
        <div 
          onClick={() => onNavigate?.('attendance')}
          className="bg-white dark:bg-[#121F2F] p-5 rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] shadow-xs flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md hover:border-emerald-400 cursor-pointer"
        >
          <div>
            <span className="text-xs font-semibold text-[#687789] dark:text-slate-400 uppercase tracking-wider">Average Attendance</span>
            <div className="text-2xl font-bold text-[#17324D] dark:text-white mt-1">{avgAttendance}%</div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Take Attendance →
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Active Exams Card */}
        <div 
          onClick={() => onNavigate?.('academics')}
          className="bg-white dark:bg-[#121F2F] p-5 rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] shadow-xs flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md hover:border-amber-400 cursor-pointer"
        >
          <div>
            <span className="text-xs font-semibold text-[#687789] dark:text-slate-400 uppercase tracking-wider">Active Exams</span>
            <div className="text-2xl font-bold text-[#17324D] dark:text-white mt-1">{activeExams}</div>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> View Schedules →
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Content: Recent Enrollments & Live Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Roster Quick View */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121F2F] rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] shadow-xs overflow-hidden transition-colors">
          <div className="p-4 sm:p-5 border-b border-[#E3EAF0] dark:border-[#1E3146] flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#17324D] dark:text-white m-0">Recent Student Admissions</h3>
              <p className="text-xs text-[#687789] dark:text-slate-400 mt-0.5">Showing active enrolled students in Vidyasetu</p>
            </div>
            <button
              onClick={() => onNavigate?.('students')}
              className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/50 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-800 transition-colors cursor-pointer"
            >
              View All 30 Students →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#243447] dark:text-slate-200">
              <thead className="bg-[#F7F9FC] dark:bg-[#0E1A29] text-xs font-semibold text-[#687789] dark:text-slate-400 uppercase border-b border-[#E3EAF0] dark:border-[#1E3146]">
                <tr>
                  <th className="px-5 py-3">Adm. No</th>
                  <th className="px-5 py-3">Student Name</th>
                  <th className="px-5 py-3">Class/Sec</th>
                  <th className="px-5 py-3">Attendance</th>
                  <th className="px-5 py-3">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3EAF0] dark:divide-[#1E3146]">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-medium text-slate-600 dark:text-slate-400">
                      {student.admissionNo}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-[#17324D] dark:text-white">{student.name}</div>
                      <div className="text-[11px] text-[#687789] dark:text-slate-400">Roll #{student.rollNo} • Guardian: {student.guardianName}</div>
                    </td>
                    <td className="px-5 py-3.5 font-medium">
                      Class {student.class}-{student.section}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full ${student.attendanceRate > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${student.attendanceRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{student.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                        student.feeStatus === 'Paid' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' 
                          : student.feeStatus === 'Partial'
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50'
                      }`}>
                        {student.feeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notices & School Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121F2F] rounded-xl border border-[#E3EAF0] dark:border-[#1E3146] p-5 shadow-xs transition-colors">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-[#17324D] dark:text-white m-0">Notice Board</h3>
              <button
                onClick={() => onNavigate?.('announcements')}
                className="text-xs font-semibold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>
            <div className="space-y-3">
              {announcements.slice(0, 3).map((ann) => (
                <div 
                  key={ann.id} 
                  onClick={() => onNavigate?.('announcements')}
                  className="p-3 rounded-lg border border-[#E3EAF0] dark:border-[#1E3146] bg-[#F7F9FC] dark:bg-[#0E1A29] hover:border-blue-300 dark:hover:border-amber-400/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-[#687789] dark:text-slate-400 mb-1">
                    <span className="font-semibold text-teal-700 dark:text-teal-300 bg-teal-100/60 dark:bg-teal-900/40 px-1.5 py-0.5 rounded">
                      {ann.category}
                    </span>
                    <span>{ann.publishedDate}</span>
                  </div>
                  <div className="font-semibold text-sm text-[#17324D] dark:text-white">{ann.title}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#17324D] dark:bg-[#0F1E2E] text-white rounded-xl p-5 shadow-xs border border-white/5">
            <h4 className="font-bold text-sm text-teal-300 uppercase tracking-wider mb-2">School Information</h4>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p><strong className="text-white">Tenant:</strong> {school.name} ({school.code})</p>
              <p><strong className="text-white">Address:</strong> {school.address}</p>
              <p><strong className="text-white">Email:</strong> {school.contactEmail}</p>
              <p><strong className="text-white">Helpline:</strong> {school.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
