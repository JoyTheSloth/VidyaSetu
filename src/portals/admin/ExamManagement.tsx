import React, { useState } from 'react';
import { Award, CheckCircle2, Search, Filter, Check, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ExamManagement: React.FC = () => {
  const { exams, results, publishExam } = useApp();
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || 'ex_01');
  const [publishedAlert, setPublishedAlert] = useState(false);

  const selectedExam = exams.find(e => e.id === selectedExamId);
  const examResults = results.filter(r => r.examId === selectedExamId);

  const handlePublish = () => {
    publishExam(selectedExamId);
    setPublishedAlert(true);
    setTimeout(() => setPublishedAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17324D] m-0">Examinations & Marksheet Approval</h2>
          <p className="text-xs text-[#687789] mt-0.5">Control grade publishing visibility for students & review performance</p>
        </div>
        {selectedExam?.status !== 'Published' ? (
          <button
            onClick={handlePublish}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Publish Results to Students
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
            <Check className="w-4 h-4" />
            Results Published & Visible to Students
          </div>
        )}
      </div>

      {publishedAlert && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Examination results have been published live to student portals.
        </div>
      )}

      {/* Exam Selector Tabs */}
      <div className="flex gap-3 border-b border-[#E3EAF0] pb-2">
        {exams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedExamId === exam.id
                ? 'bg-[#17324D] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {exam.name} ({exam.term})
          </button>
        ))}
      </div>

      {/* Marks Table */}
      <div className="bg-white rounded-xl border border-[#E3EAF0] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E3EAF0] bg-[#F7F9FC] flex justify-between items-center">
          <span className="text-xs font-bold text-[#17324D] uppercase tracking-wider">
            Consolidated Marks Roster
          </span>
          <span className="text-xs text-slate-500">
            Status: <strong>{selectedExam?.status}</strong>
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F9FC] text-xs font-semibold text-[#687789] uppercase border-b border-[#E3EAF0]">
              <tr>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Class</th>
                <th className="px-5 py-3">Subject</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Max Marks</th>
                <th className="px-5 py-3">Grade</th>
                <th className="px-5 py-3">Visibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAF0]">
              {examResults.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#17324D]">{r.studentName}</td>
                  <td className="px-5 py-3.5 font-medium">Class {r.class}</td>
                  <td className="px-5 py-3.5 text-slate-700">{r.subject}</td>
                  <td className="px-5 py-3.5 font-bold text-teal-600">{r.marksObtained}</td>
                  <td className="px-5 py-3.5 text-slate-500">{r.maxMarks}</td>
                  <td className="px-5 py-3.5 font-bold text-xs">{r.grade}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                      r.isPublished 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {r.isPublished ? 'Published to Student' : 'Draft Only'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
