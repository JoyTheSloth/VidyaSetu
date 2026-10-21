import React, { useState } from 'react';
import { 
  Plus, BookOpen, Calendar, Clock, CheckCircle2, Users, X, 
  Upload, FileText, Download, Eye, Award, Filter, ChevronRight,
  Sparkles, Check, Paperclip, AlertCircle, Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Homework } from '../../types';
import { StudentPdfSubmissionModal } from '../../components/StudentPdfSubmissionModal';

export const TeacherHomework: React.FC = () => {
  const { homework, addHomework, currentUser } = useApp();

  // Class & Section Filter state - Default to Class 7 as user requested
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('7');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('A');

  // Create Assignment Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>({
    name: 'Class_7A_Maths_Assignment_Unit4.pdf',
    size: '1.4 MB'
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    class: '7',
    section: 'A',
    subject: 'Mathematics',
    assignedDate: '2026-10-21',
    dueDate: '2026-10-25',
    maxMarks: 25,
    totalStudents: 28,
    status: 'Assigned' as const
  });

  // PDF Submissions Modal State
  const [evaluatingHw, setEvaluatingHw] = useState<Homework | null>(null);

  // Available Classes & Sections
  const classesList = ['All', '6', '7', '8', '9', '10', '11', '12'];
  const sectionsList = ['All', 'A', 'B', 'C'];

  // Filter homework list
  const filteredHomework = homework.filter(hw => {
    const matchClass = selectedClassFilter === 'All' || hw.class === selectedClassFilter;
    const matchSection = selectedSectionFilter === 'All' || hw.section === selectedSectionFilter;
    return matchClass && matchSection;
  });

  const handleOpenCreateModal = () => {
    setFormData(prev => ({
      ...prev,
      class: selectedClassFilter === 'All' ? '7' : selectedClassFilter,
      section: selectedSectionFilter === 'All' ? 'A' : selectedSectionFilter
    }));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    addHomework({
      ...formData,
      assignedBy: currentUser.name,
      attachmentName: uploadedFile?.name || 'Assignment_Questions.pdf',
      attachmentSize: uploadedFile?.size || '1.2 MB'
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      description: '',
      class: selectedClassFilter === 'All' ? '7' : selectedClassFilter,
      section: selectedSectionFilter === 'All' ? 'A' : selectedSectionFilter,
      subject: 'Mathematics',
      assignedDate: '2026-10-21',
      dueDate: '2026-10-25',
      maxMarks: 25,
      totalStudents: 28,
      status: 'Assigned'
    });
  };

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Top Section: Faculty Assignment Command Header */}
      <div className="bg-white dark:bg-[#121F2F] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#002B66] dark:text-white m-0">
                  Faculty Assignment Portal
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                  CBSE Digital Ledger
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
                Instructor: <strong>{currentUser.name}</strong> • Publish worksheets & evaluate student PDF submissions
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-500/25 transition-all duration-150 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Assignment</span>
        </button>
      </div>

      {/* 2. Interactive Class & Section Filter Bar */}
      <div className="bg-white dark:bg-[#121F2F] rounded-2xl p-4 border border-slate-200/80 dark:border-[#1E3146] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Class Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Class:
          </span>
          {classesList.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClassFilter(cls)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedClassFilter === cls
                  ? 'bg-[#002B66] text-white shadow-sm dark:bg-amber-400 dark:text-slate-950 scale-102'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
              }`}
            >
              {cls === 'All' ? 'All Classes' : `Class ${cls}`}
            </button>
          ))}
        </div>

        {/* Section Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Section:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
            {sectionsList.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSectionFilter(sec)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedSectionFilter === sec
                    ? 'bg-white dark:bg-[#1E3146] text-[#002B66] dark:text-white shadow-xs font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Assignments Grid with PDF Evaluation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredHomework.map((hw) => {
          const submissionPercent = Math.round((hw.submissionCount / hw.totalStudents) * 100);
          return (
            <div 
              key={hw.id} 
              className="bg-white dark:bg-[#121F2F] p-5 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-[#1E3146] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                      Class {hw.class}-{hw.section} • {hw.subject}
                    </span>
                    {hw.maxMarks && (
                      <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                        {hw.maxMarks} Marks
                      </span>
                    )}
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    hw.status === 'Graded' 
                      ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                  }`}>
                    {hw.status}
                  </span>
                </div>

                {/* Assignment Title & Details */}
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#002B66] dark:text-white m-0">
                    {hw.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed m-0">
                    {hw.description}
                  </p>
                </div>

                {/* Attached Worksheet PDF badge */}
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                        {hw.attachmentName || `Class_${hw.class}${hw.section}_Assignment.pdf`}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {hw.attachmentSize || '1.4 MB'} • Digital Question Paper
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Previewing assignment worksheet: ${hw.attachmentName || 'Assignment.pdf'}`)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    title="Preview Worksheet"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Progress & Evaluation Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due: <strong>{hw.dueDate}</strong></span>
                  </span>
                  <span className="font-bold text-[#002B66] dark:text-white">
                    {hw.submissionCount}/{hw.totalStudents} Submissions ({submissionPercent}%)
                  </span>
                </div>

                {/* Submission Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${submissionPercent}%` }}
                  />
                </div>

                {/* Primary Button: View & Grade Student PDF Submissions */}
                <button
                  onClick={() => setEvaluatingHw(hw)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-blue-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-500 group-hover:text-white dark:group-hover:text-slate-950" />
                  <span>Evaluate Student PDF Submissions ({hw.submissionCount})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {filteredHomework.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-[#121F2F] rounded-3xl border border-slate-200/80 dark:border-[#1E3146] space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-base">
            No assignments for Class {selectedClassFilter}-{selectedSectionFilter}
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click the button below to upload the first assignment worksheet for this class.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
          >
            Create Assignment for Class {selectedClassFilter}
          </button>
        </div>
      )}

      {/* 4. Create & Upload Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-[#101D2C] rounded-3xl shadow-2xl w-full max-w-xl border border-slate-200 dark:border-[#1E3146] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-[#0B1724] dark:to-[#101D2C]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                    Upload Class Assignment
                  </h3>
                  <p className="text-xs text-slate-400 m-0">
                    Publish question papers and configure PDF submission guidelines
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
              
              {/* Class & Section Selector (Pre-filled, fully customizable) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Class *
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    {['6', '7', '8', '9', '10', '11', '12'].map((c) => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="Science">Science</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
              </div>

              {/* Assignment Title */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Assignment Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chapter 4: Linear Equations & Balance Method"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject & Max Marks */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science (Physics/Chem/Bio)</option>
                    <option value="English">English Core</option>
                    <option value="Sanskrit">Sanskrit & Vedic Studies</option>
                    <option value="AI & Robotics">AI & STEM Robotics</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Max Marks / Weightage
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={100}
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 text-xs font-mono font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Instructions / Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Instructions & Criteria for Students
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Solve exercises 4.1 to 4.3. Show step-by-step balance method derivations in PDF format..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Submission Deadline */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Submission Deadline / Due Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* PDF Worksheet Attachment Upload Box */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-rose-500" />
                    <span>Upload Assignment Worksheet (PDF Format)</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">PDF Ready</span>
                </label>

                {uploadedFile ? (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {uploadedFile.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {uploadedFile.size} • Verified PDF Document
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 dark:border-white/15 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors bg-slate-50/50 dark:bg-white/5">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Click to choose or drag & drop Worksheet PDF
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PDF documents up to 25MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleSimulateFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* PDF Mandatory Notice */}
              <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/40 flex items-center gap-2 text-[11px] text-blue-800 dark:text-blue-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Student portal will enforce PDF file uploads for submission tracking.</span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Publish to Class {formData.class}-{formData.section}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. Student PDF Submission & Evaluation Viewer Modal */}
      {evaluatingHw && (
        <StudentPdfSubmissionModal
          isOpen={Boolean(evaluatingHw)}
          onClose={() => setEvaluatingHw(null)}
          assignmentTitle={evaluatingHw.title}
          className={evaluatingHw.class}
          section={evaluatingHw.section}
          subject={evaluatingHw.subject}
          maxMarks={evaluatingHw.maxMarks || 25}
        />
      )}

    </div>
  );
};
