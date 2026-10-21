import React, { useState } from 'react';
import { 
  X, Download, ZoomIn, ZoomOut, Maximize2, 
  FileText, CheckCircle2, Clock, AlertCircle, ChevronLeft, ChevronRight,
  Printer, Share2, Award, MessageSquare, Save, Check
} from 'lucide-react';

export interface StudentSubmission {
  id: string;
  studentName: string;
  rollNo: number;
  submittedAt: string;
  status: 'Submitted' | 'Late' | 'Pending';
  score?: number;
  feedback?: string;
  fileName: string;
  fileSize: string;
}

interface StudentPdfSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentTitle: string;
  className: string;
  section: string;
  subject: string;
  maxMarks: number;
}

const MOCK_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub_01',
    studentName: 'Anoop Awasthi',
    rollNo: 14,
    submittedAt: 'Today, 02:45 PM',
    status: 'Submitted',
    score: 24,
    feedback: 'Flawless step-by-step balance method in Problem 3. Neat graphs.',
    fileName: 'Anoop_Awasthi_Linear_Equations_Ch4.pdf',
    fileSize: '2.4 MB'
  },
  {
    id: 'sub_02',
    studentName: 'Priya Sharma',
    rollNo: 7,
    submittedAt: 'Today, 01:15 PM',
    status: 'Submitted',
    score: 22,
    feedback: 'Good work. Check sign changes when transposing terms.',
    fileName: 'Priya_Sharma_Maths_Assignment_Unit4.pdf',
    fileSize: '1.9 MB'
  },
  {
    id: 'sub_03',
    studentName: 'Rohan Gupta',
    rollNo: 21,
    submittedAt: 'Yesterday, 06:30 PM',
    status: 'Submitted',
    score: 25,
    feedback: '100% correct derivations and algebraic modeling.',
    fileName: 'Rohan_Gupta_Class7A_Maths_HW.pdf',
    fileSize: '3.1 MB'
  },
  {
    id: 'sub_04',
    studentName: 'Sneha Roy',
    rollNo: 28,
    submittedAt: 'Today, 04:10 PM',
    status: 'Late',
    score: 20,
    feedback: 'Submitted 1 hour past deadline. Solutions are accurate.',
    fileName: 'Sneha_Roy_Linear_Equations_Final.pdf',
    fileSize: '2.1 MB'
  },
  {
    id: 'sub_05',
    studentName: 'Kabir Verma',
    rollNo: 11,
    submittedAt: 'Pending',
    status: 'Pending',
    fileName: 'Pending Submission',
    fileSize: '0 KB'
  }
];

export const StudentPdfSubmissionModal: React.FC<StudentPdfSubmissionModalProps> = ({
  isOpen,
  onClose,
  assignmentTitle,
  className,
  section,
  subject,
  maxMarks = 25
}) => {
  const [selectedStudent, setSelectedStudent] = useState<StudentSubmission>(MOCK_SUBMISSIONS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [marks, setMarks] = useState<number>(selectedStudent.score || 24);
  const [feedback, setFeedback] = useState<string>(selectedStudent.feedback || '');
  const [isSavedToast, setIsSavedToast] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectStudent = (sub: StudentSubmission) => {
    setSelectedStudent(sub);
    setMarks(sub.score || 20);
    setFeedback(sub.feedback || '');
  };

  const handleSaveEvaluation = () => {
    selectedStudent.score = marks;
    selectedStudent.feedback = feedback;
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl h-[92vh] bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Assignment Title & Header */}
        <div className="px-5 py-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white m-0 truncate max-w-md">
                  {assignmentTitle}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Class {className}-{section} • {subject}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 m-0">
                Evaluating student PDF submissions • Max Score: {maxMarks} Marks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Split: Left (Student List) + Center (PDF Mockup) + Right (Grading) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* 1. Left Sidebar: Student Submissions Roster */}
          <div className="w-full lg:w-72 bg-slate-800/50 border-r border-slate-700/60 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-700/60 bg-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Student Submissions</span>
              <span className="text-[11px] font-bold text-emerald-400">
                {MOCK_SUBMISSIONS.filter(s => s.status !== 'Pending').length}/{MOCK_SUBMISSIONS.length} Submitted
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
              {MOCK_SUBMISSIONS.map((sub) => {
                const isSelected = sub.id === selectedStudent.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectStudent(sub)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-600/25 border-blue-400/60 shadow-md'
                        : 'bg-slate-800/40 border-slate-700/40 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">
                        {sub.studentName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Roll #{sub.rollNo}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-slate-400 truncate max-w-[120px]">
                        {sub.fileName}
                      </span>
                      <span className={`font-bold px-1.5 py-0.2 rounded ${
                        sub.status === 'Submitted'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : sub.status === 'Late'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {sub.status}
                      </span>
                    </div>

                    {sub.score !== undefined && (
                      <div className="mt-1 flex items-center justify-between text-[10px] text-amber-300 font-bold">
                        <span>Score: {sub.score}/{maxMarks}</span>
                        <span className="text-emerald-400">✓ Graded</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Center: Interactive PDF Document Viewer Canvas */}
          <div className="flex-1 flex flex-col bg-slate-950/80 overflow-hidden relative">
            
            {/* PDF Viewer Control Bar */}
            <div className="px-4 py-2 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between text-xs text-slate-300 shrink-0">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-white text-xs truncate max-w-[220px]">
                  {selectedStudent.fileName}
                </span>
                <span className="text-[10px] text-slate-400">({selectedStudent.fileSize})</span>
              </div>

              {/* Zoom & Page Controls */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-bold">Page {currentPage} of 2</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(2, p + 1))}
                  disabled={currentPage === 2}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-700 mx-1" />

                <button 
                  onClick={() => setZoomLevel(z => Math.max(75, z - 15))}
                  className="p-1 rounded hover:bg-slate-700 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono">{zoomLevel}%</span>
                <button 
                  onClick={() => setZoomLevel(z => Math.min(150, z + 15))}
                  className="p-1 rounded hover:bg-slate-700 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <div className="h-4 w-px bg-slate-700 mx-1" />

                <button 
                  onClick={() => alert(`Downloading official PDF submission: ${selectedStudent.fileName}`)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Rendered PDF Sheet Mockup */}
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-900/60">
              {selectedStudent.status === 'Pending' ? (
                <div className="text-center p-8 bg-slate-800/80 rounded-2xl border border-slate-700">
                  <Clock className="w-12 h-12 text-amber-400 mx-auto mb-2 animate-pulse" />
                  <h4 className="font-bold text-white text-base">Awaiting Student PDF Upload</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {selectedStudent.studentName} has not submitted their assignment yet. Due date is active.
                  </p>
                </div>
              ) : (
                <div 
                  className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 w-full max-w-[620px] transition-transform duration-200 border border-slate-200 relative select-none font-sans"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Watermark Logo Crest */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none text-9xl font-serif">
                    BHIMS
                  </div>

                  {/* PDF Institutional Header */}
                  <div className="border-b-2 border-slate-800 pb-3 mb-5 flex items-start justify-between">
                    <div>
                      <div className="text-[13px] font-black text-[#002B66] uppercase tracking-wide">
                        Bhaktivedanta Gurukula & International School
                      </div>
                      <div className="text-[10px] text-slate-600 font-semibold">
                        CBSE Affiliated Senior Secondary • Mathematics Department
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 mt-1">
                        Class 7-A Term Evaluation Worksheet — Linear Equations
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-600">
                      <div>Date: 21-Oct-2026</div>
                      <div>Max Marks: {maxMarks}</div>
                    </div>
                  </div>

                  {/* Student Signature Header on Paper */}
                  <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200 mb-5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-500">Student Name: </span>
                      <span className="font-extrabold text-[#002B66]">{selectedStudent.studentName}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500">Roll: </span>
                      <span className="font-mono font-bold text-slate-800">{selectedStudent.rollNo}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500">Class: </span>
                      <span className="font-bold text-slate-800">7-A</span>
                    </div>
                  </div>

                  {/* PDF Worksheet Content (Handwritten/Formatted Solutions) */}
                  <div className="space-y-6 text-xs text-slate-800">
                    
                    {/* Question 1 */}
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 flex justify-between items-center">
                        <span>Q1. Solve for variable x: 4(x - 3) + 8 = 28</span>
                        <span className="text-[10px] text-slate-500">[5 Marks]</span>
                      </div>
                      
                      <div className="pl-3 border-l-2 border-blue-400/80 font-mono text-[11px] space-y-1 bg-slate-50/70 p-2 rounded-r">
                        <div>Step 1: Expand brackets =&gt; 4x - 12 + 8 = 28</div>
                        <div>Step 2: Combine constants =&gt; 4x - 4 = 28</div>
                        <div>Step 3: Add 4 to both sides =&gt; 4x = 32</div>
                        <div>Step 4: Divide by 4 =&gt; x = 8</div>
                        <div className="font-bold text-blue-900 mt-1">Answer: x = 8 (Verified by substitution)</div>
                      </div>

                      {/* Teacher Red Annotation Stamp */}
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-300">
                        <span>✓ Correct derivation (+5)</span>
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 flex justify-between items-center">
                        <span>Q2. The sum of three consecutive multiples of 7 is 147. Find the multiples.</span>
                        <span className="text-[10px] text-slate-500">[8 Marks]</span>
                      </div>
                      
                      <div className="pl-3 border-l-2 border-blue-400/80 font-mono text-[11px] space-y-1 bg-slate-50/70 p-2 rounded-r">
                        <div>Let the consecutive multiples be 7x, 7(x + 1), and 7(x + 2).</div>
                        <div>Equation: 7x + 7x + 7 + 7x + 14 = 147</div>
                        <div>21x + 21 = 147 =&gt; 21x = 126 =&gt; x = 6</div>
                        <div>1st multiple = 7 * 6 = 42</div>
                        <div>2nd multiple = 7 * 7 = 49</div>
                        <div>3rd multiple = 7 * 8 = 56</div>
                        <div className="font-bold text-blue-900 mt-1">Check: 42 + 49 + 56 = 147 ✓</div>
                      </div>

                      {/* Teacher Annotation */}
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-300">
                        <span>✓ Excellent algebra formulation (+8)</span>
                      </div>
                    </div>

                  </div>

                  {/* PDF Footer Page stamp */}
                  <div className="mt-8 pt-4 border-t border-slate-300 flex justify-between text-[9px] text-slate-400">
                    <span>Bhaktivedanta Vidyasetu LMS • Verified Digital PDF Submission</span>
                    <span>Page {currentPage} of 2</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Right Sidebar: Teacher Grading & Evaluation Panel */}
          <div className="w-full lg:w-80 bg-slate-800/70 border-t lg:border-t-0 lg:border-l border-slate-700/80 p-5 flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-700">
                <Award className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-white m-0">Faculty Evaluation</h4>
              </div>

              {/* Score Input */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  Award Score (Max: {maxMarks} Marks)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={maxMarks}
                    value={marks}
                    onChange={(e) => setMarks(Number(e.target.value))}
                    className="w-24 px-3 py-2 text-base font-black text-center bg-slate-900 border border-slate-600 rounded-xl text-amber-300 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                  />
                  <span className="text-sm font-bold text-slate-400">/ {maxMarks}</span>
                </div>
              </div>

              {/* Feedback Textarea */}
              <div>
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>Teacher's Feedback & Comments</span>
                </label>
                <textarea
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide helpful commentary to the student..."
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-600 rounded-xl text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              {isSavedToast && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Grade recorded and notified to student!</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-700/80 space-y-2">
              <button
                type="button"
                onClick={handleSaveEvaluation}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Grade & Feedback</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Close Viewer
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
