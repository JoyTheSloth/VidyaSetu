import React, { useState } from 'react';
import { 
  Check, X, Calendar, Search, Users, AlertCircle, Save, 
  UserCheck, Clock, CheckCircle2, Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AttendanceRecord } from '../../types';
import { EditProfileModal } from '../../components/EditProfileModal';

export const TeacherAttendance: React.FC = () => {
  const { students, attendance, recordAttendance, currentUser } = useApp();
  const [selectedDate, setSelectedDate] = useState('2026-10-20');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Filter students for the teacher's selected class
  const classStudents = students.filter(
    s => s.class === selectedClass && s.section === selectedSection
  );

  // Map local attendance state
  const [localStatus, setLocalStatus] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>(() => {
    const map: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    classStudents.forEach(s => {
      const existing = attendance.find(a => a.studentId === s.id && a.date === selectedDate);
      map[s.id] = (existing?.status as any) || 'Present';
    });
    return map;
  });

  const toggleStatus = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setLocalStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status: 'Present' | 'Absent') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    classStudents.forEach(s => {
      updated[s.id] = status;
    });
    setLocalStatus(updated);
  };

  const handleSaveAttendance = () => {
    const newRecords: AttendanceRecord[] = classStudents.map(student => ({
      id: `att_${student.id}_${selectedDate}`,
      date: selectedDate,
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      section: student.section,
      status: localStatus[student.id] || 'Present'
    }));

    recordAttendance(newRecords);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const presentCount = Object.values(localStatus).filter(s => s === 'Present').length;
  const absentCount = Object.values(localStatus).filter(s => s === 'Absent').length;
  const lateCount = Object.values(localStatus).filter(s => s === 'Late').length;

  return (
    <div className="space-y-6">
      {/* Header & Controls with Faculty Portrait Card */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-[#121F2F] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#1E3146] shadow-xs transition-colors">
        <div className="flex items-center gap-3.5">
          {/* Faculty Photo Portrait with online status */}
          <div 
            onClick={() => setShowEditModal(true)}
            className="relative group shrink-0 cursor-pointer"
            title="Click to view/edit teacher profile"
          >
            <img
              src={currentUser.avatarUrl || '/assets/teacher_sunita.jpg'}
              alt={currentUser.name}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-md ring-2 ring-amber-400/20 group-hover:scale-105 transition-transform"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-[#121F2F] rounded-full animate-pulse" title="Faculty Active" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#002B66] dark:text-white m-0">
                {currentUser.name}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                Class {selectedClass}-{selectedSection} Register
              </span>
              <button
                onClick={() => setShowEditModal(true)}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>✎ Edit Details</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">
              {currentUser.details?.qualification || 'Senior Mathematics Faculty'} • Emp ID: {currentUser.details?.employeeId || 'TCH-101'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#0B1A2C] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#1E3146]">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-semibold bg-transparent text-slate-800 dark:text-white focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleSaveAttendance}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-[#002B66] hover:bg-[#00204d] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Submit Roll Call</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs sm:text-sm flex items-center gap-2.5 shadow-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Attendance records for Class {selectedClass}-{selectedSection} on {selectedDate} submitted and synced across school portals!</span>
        </div>
      )}

      {/* Quick Summary Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white dark:bg-[#121F2F] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3146] shadow-xs">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Enrolled</div>
          <div className="text-2xl font-black text-[#002B66] dark:text-white mt-1">{classStudents.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Total class roster</div>
        </div>

        <div className="bg-white dark:bg-[#121F2F] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3146] shadow-xs">
          <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Present</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{presentCount}</div>
          <div className="text-[10px] text-emerald-500 mt-0.5">{Math.round((presentCount / (classStudents.length || 1)) * 100)}% of class</div>
        </div>

        <div className="bg-white dark:bg-[#121F2F] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3146] shadow-xs">
          <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Absent</div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{absentCount}</div>
          <div className="text-[10px] text-rose-500 mt-0.5">Requires follow-up</div>
        </div>

        <div className="bg-white dark:bg-[#121F2F] p-4 rounded-2xl border border-slate-200 dark:border-[#1E3146] shadow-xs">
          <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Late</div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{lateCount}</div>
          <div className="text-[10px] text-amber-500 mt-0.5">Excused / late pass</div>
        </div>
      </div>

      {/* Student List with Action Buttons */}
      <div className="bg-white dark:bg-[#121F2F] rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-[#1E3146] shadow-xs overflow-hidden">
        
        {/* Sub-header with quick batch buttons */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-[#0B1A2C]">
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-[#002B66] dark:text-white uppercase tracking-wider">
              Student List ({classStudents.length} Students)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Click status pill for on-the-fly toggling
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => markAll('Present')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/50 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-all active:scale-95 cursor-pointer"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll('Absent')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-rose-700 bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 dark:hover:bg-rose-900/60 transition-all active:scale-95 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* List of Students */}
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {classStudents.map((student) => {
            const current = localStatus[student.id] || 'Present';
            return (
              <div 
                key={student.id} 
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#002B66] dark:text-blue-300 border border-blue-200 dark:border-blue-900/40 flex items-center justify-center font-black text-sm shrink-0">
                    {student.rollNo}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#002B66] dark:text-white flex items-center gap-2">
                      {student.name}
                      <span className="text-[10px] text-slate-400 font-normal">({student.gender})</span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                      <span className="font-mono">{student.admissionNo}</span>
                      <span>•</span>
                      <span>Guardian: {student.guardianName}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Status Buttons with Micro-interaction Feedback */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => toggleStatus(student.id, 'Present')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer ${
                      current === 'Present'
                        ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30'
                        : 'bg-slate-100 dark:bg-[#0B1A2C] text-slate-600 dark:text-slate-300 hover:bg-emerald-50'
                    }`}
                  >
                    ✓ Present
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStatus(student.id, 'Absent')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer ${
                      current === 'Absent'
                        ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/30'
                        : 'bg-slate-100 dark:bg-[#0B1A2C] text-slate-600 dark:text-slate-300 hover:bg-rose-50'
                    }`}
                  >
                    ✕ Absent
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleStatus(student.id, 'Late')}
                    className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer ${
                      current === 'Late'
                        ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-400/30'
                        : 'bg-slate-100 dark:bg-[#0B1A2C] text-slate-600 dark:text-slate-300 hover:bg-amber-50'
                    }`}
                  >
                    ⏰ Late
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Teacher Profile Dialog Box */}
      <EditProfileModal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
      />
    </div>
  );
};
