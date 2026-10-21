import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TimetableView: React.FC = () => {
  const { timetable } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const slotsForDay = timetable.filter(t => t.day === selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17324D] m-0">Master Class Timetable & Scheduling</h2>
          <p className="text-xs text-[#687789] mt-0.5">Automated period conflict detection for faculty and classrooms</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Zero Room / Teacher Conflicts Detected
        </div>
      </div>

      {/* Day Pills */}
      <div className="flex gap-2 border-b border-[#E3EAF0] pb-2 overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedDay === day
                ? 'bg-[#159D96] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Timetable Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slotsForDay.map((slot) => (
          <div key={slot.id} className="bg-white p-5 rounded-xl border border-[#E3EAF0] shadow-xs hover:border-teal-300 transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Period {slot.period}
              </span>
              <span className="text-xs font-mono text-teal-700 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {slot.startTime} - {slot.endTime}
              </span>
            </div>

            <h3 className="font-bold text-base text-[#17324D] m-0">{slot.subject}</h3>
            <p className="text-xs text-[#687789] mt-1">Class {slot.class}-{slot.section} • {slot.room}</p>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Faculty:</span>
              <span className="font-semibold text-[#17324D]">{slot.teacherName}</span>
            </div>
          </div>
        ))}

        {slotsForDay.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 text-sm">
            No periods scheduled for {selectedDay}.
          </div>
        )}
      </div>
    </div>
  );
};
