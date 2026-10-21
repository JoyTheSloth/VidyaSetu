import React, { useState } from 'react';
import { 
  BookMarked, Plus, Search, Filter, Download, Eye, 
  FileText, Calendar, User, Sparkles, BookOpen, X, 
  CheckCircle2, Upload, Paperclip, ChevronRight, Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StudyNote } from '../../types';
import { StudyNotesPdfModal } from '../../components/StudyNotesPdfModal';

export const StudyNotesView: React.FC = () => {
  const { studyNotes, addStudyNote, currentUser } = useApp();

  // Class & Subject Filter State - Defaults to Class 7
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('7');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [readingNote, setReadingNote] = useState<StudyNote | null>(null);

  const [uploadedPdf, setUploadedPdf] = useState<{ name: string; size: string } | null>({
    name: 'Class7_Maths_Linear_Equations_Unit4_Handwritten.pdf',
    size: '3.4 MB'
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Mathematics',
    class: '7',
    section: 'A',
    chapterNo: 4,
    type: 'Handwritten Notes' as const,
    tags: 'Handwritten Notes, Step-by-Step Proofs, Unit Test Focus'
  });

  const classesList = ['All', '6', '7', '8', '9', '10', '11', '12'];
  const subjectsList = ['All', 'Mathematics', 'Science', 'Physics', 'English', 'Sanskrit'];

  // Filter notes
  const filteredNotes = studyNotes.filter(note => {
    const matchClass = selectedClassFilter === 'All' || note.class === selectedClassFilter;
    const matchSubject = selectedSubjectFilter === 'All' || note.subject === selectedSubjectFilter;
    const matchSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchClass && matchSubject && matchSearch;
  });

  const handleOpenUpload = () => {
    setFormData(prev => ({
      ...prev,
      class: selectedClassFilter === 'All' ? '7' : selectedClassFilter
    }));
    setIsUploadModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const tagList = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    addStudyNote({
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      class: formData.class,
      section: formData.section,
      chapterNo: Number(formData.chapterNo),
      type: formData.type,
      author: currentUser.name,
      uploadDate: '2026-10-21',
      fileName: uploadedPdf?.name || `Class_${formData.class}_${formData.subject}_Notes.pdf`,
      fileSize: uploadedPdf?.size || '2.8 MB',
      tags: tagList
    });

    setIsUploadModalOpen(false);
    setFormData({
      title: '',
      description: '',
      subject: 'Mathematics',
      class: selectedClassFilter === 'All' ? '7' : selectedClassFilter,
      section: 'A',
      chapterNo: 5,
      type: 'Handwritten Notes',
      tags: 'Comprehensive Guide, CBSE Focus'
    });
  };

  const handleSimulateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPdf({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Header: Study Notes & Learning Repository */}
      <div className="bg-white dark:bg-[#121F2F] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-[#1E3146] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-400/20">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-[#002B66] dark:text-white m-0">
                  Study Notes & Chapter Materials
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                  PDF Library
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5">
                Official curriculum-aligned handwritten lecture notes, formula sheets, and chapter summaries
              </p>
            </div>
          </div>
        </div>

        {/* Upload Notes Button for Faculty & Admin */}
        {(currentUser.role === 'TEACHER' || currentUser.role === 'ADMIN') && (
          <button
            onClick={handleOpenUpload}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-2xl text-xs sm:text-sm font-black shadow-lg shadow-amber-400/20 transition-all duration-150 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Study Notes (PDF)</span>
          </button>
        )}
      </div>

      {/* 2. Filter Bar: Classes & Search */}
      <div className="bg-white dark:bg-[#121F2F] rounded-2xl p-4 border border-slate-200/80 dark:border-[#1E3146] shadow-xs space-y-3">
        
        {/* Class Selector Pills */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Grade:
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

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters or topics..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 dark:bg-[#0B1A2C] border border-slate-200 dark:border-white/10 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-400 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-white/5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Subject:
          </span>
          {subjectsList.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedSubjectFilter === sub
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

      </div>

      {/* 3. Study Notes PDF Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNotes.map((note) => (
          <div 
            key={note.id}
            className="bg-white dark:bg-[#121F2F] rounded-3xl p-5 border border-slate-200/80 dark:border-[#1E3146] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
                  Class {note.class} • {note.subject}
                </span>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40">
                  {note.type}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-black text-base text-[#002B66] dark:text-white m-0 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2 m-0">
                  {note.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {note.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-[9.5px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* PDF Document Chip */}
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                      {note.fileName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {note.fileSize} • Certified PDF Document
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloaded: ${note.fileName}`)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Footer Attribution & Action */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>By: <strong className="text-slate-700 dark:text-slate-300">{note.author}</strong></span>
                <span>{note.uploadDate}</span>
              </div>

              {/* Read / Preview PDF Button */}
              <button
                onClick={() => setReadingNote(note)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#002B66] to-[#0047AB] hover:from-[#001D45] hover:to-[#002B66] dark:from-amber-400 dark:to-amber-500 dark:text-slate-950 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Read & Preview PDF Notes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="p-12 text-center bg-white dark:bg-[#121F2F] rounded-3xl border border-slate-200/80 dark:border-[#1E3146] space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-700 dark:text-slate-200 text-base">
            No study notes for Class {selectedClassFilter} ({selectedSubjectFilter})
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload chapter notes, handwritten materials, or formula sheets for this grade.
          </p>
          {(currentUser.role === 'TEACHER' || currentUser.role === 'ADMIN') && (
            <button
              onClick={handleOpenUpload}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 cursor-pointer"
            >
              Upload Notes for Class {selectedClassFilter}
            </button>
          )}
        </div>
      )}

      {/* 4. Upload Study Notes Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white dark:bg-[#101D2C] rounded-3xl shadow-2xl w-full max-w-xl border border-slate-200 dark:border-[#1E3146] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-[#0B1724] dark:to-[#101D2C]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md font-bold">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#002B66] dark:text-white m-0">
                    Upload Chapter Study Notes
                  </h3>
                  <p className="text-xs text-slate-400 m-0">
                    Publish lecture notes and revision guides in PDF format
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setIsUploadModalOpen(false)} 
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 flex-1">
              
              {/* Class & Subject */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Class *
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  >
                    {['6', '7', '8', '9', '10', '11', '12'].map((c) => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subject *
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science (General)</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="English">English</option>
                    <option value="Sanskrit">Sanskrit & Vedic Studies</option>
                  </select>
                </div>
              </div>

              {/* Chapter Number & Material Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Chapter / Unit No.
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={formData.chapterNo}
                    onChange={(e) => setFormData({ ...formData, chapterNo: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Resource Category
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 text-xs font-bold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Handwritten Notes">Handwritten Notes</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                    <option value="Revision Guide">Revision Guide</option>
                    <option value="Question Bank">Question Bank</option>
                  </select>
                </div>
              </div>

              {/* Chapter Title */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Chapter / Document Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chapter 4: Linear Equations & Balance Method"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Topics Covered & Summary
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief synopsis of definitions, formulas, and proofs included in this PDF..."
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Handwritten Notes, CBSE Focus, Olympiad"
                  className="w-full px-3.5 py-2.5 text-xs border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] rounded-xl text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* PDF Document Upload Zone */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-rose-500" />
                    <span>Upload Notes PDF Document</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">PDF Support</span>
                </label>

                {uploadedPdf ? (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-200 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-800 dark:text-white truncate">
                          {uploadedPdf.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {uploadedPdf.size} • Verified PDF Ready to Publish
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUploadedPdf(null)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-200 dark:border-white/15 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 transition-colors bg-slate-50/50 dark:bg-white/5">
                    <Upload className="w-6 h-6 text-slate-400 mb-1" />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Click to choose or drag & drop Notes PDF
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      PDF documents up to 50MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleSimulateFile}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Publish to Class {formData.class}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. PDF Reader Modal Mockup */}
      <StudyNotesPdfModal
        isOpen={Boolean(readingNote)}
        onClose={() => setReadingNote(null)}
        note={readingNote}
      />

    </div>
  );
};
