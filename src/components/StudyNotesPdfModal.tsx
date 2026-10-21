import React, { useState } from 'react';
import { 
  X, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, 
  FileText, BookOpen, Printer, Share2, Sparkles, CheckCircle2,
  Bookmark, Highlighter, Search
} from 'lucide-react';
import { StudyNote } from '../types';

interface StudyNotesPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  note: StudyNote | null;
}

export const StudyNotesPdfModal: React.FC<StudyNotesPdfModalProps> = ({
  isOpen,
  onClose,
  note
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[92vh] bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Note Title & Metadata */}
        <div className="px-5 py-3.5 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white m-0 truncate max-w-md">
                  {note.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Class {note.class} • {note.subject}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 m-0">
                Author: <strong>{note.author}</strong> • {note.type} • {note.fileSize}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close reader"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Reader Toolbar */}
        <div className="px-5 py-2.5 bg-slate-800/60 border-b border-slate-700/60 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-3 shrink-0">
          
          {/* File Name & Tag */}
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="font-bold text-white truncate max-w-[280px]">
              {note.fileName}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-700/80 text-amber-300 font-sans font-bold text-[10px]">
              {note.type}
            </span>
          </div>

          {/* Controls: Page + Zoom + Download */}
          <div className="flex items-center gap-2.5">
            {/* Page Navigation */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-0.5 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-bold px-1.5 font-mono">
                {currentPage} / {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-0.5 rounded hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
              <button 
                onClick={() => setZoomLevel(z => Math.max(75, z - 15))}
                className="p-0.5 rounded hover:bg-slate-700 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(z => Math.min(150, z + 15))}
                className="p-0.5 rounded hover:bg-slate-700 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Download PDF Button */}
            <button 
              onClick={() => alert(`Downloaded study material: ${note.fileName}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

        </div>

        {/* Main Document Canvas View */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center bg-slate-950/90">
          
          <div 
            className="bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-12 w-full max-w-[660px] transition-transform duration-200 border border-slate-200 select-none font-sans min-h-[750px] flex flex-col justify-between"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Page Header */}
            <div>
              {/* Institutional Banner */}
              <div className="border-b-2 border-slate-800 pb-3 mb-6 flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-black text-[#002B66] uppercase tracking-wide">
                    Bhaktivedanta Gurukula & International School
                  </div>
                  <div className="text-[10px] text-slate-600 font-semibold">
                    CBSE Affiliated Senior Secondary • Department of {note.subject}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1">
                    Class {note.class} Academic Resource Pack • {note.title}
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono text-slate-600">
                  <div className="font-bold text-[#002B66]">Unit: 0{note.chapterNo}</div>
                  <div>Published: {note.uploadDate}</div>
                </div>
              </div>

              {/* Author Attribution Strip */}
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 mb-5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-600">Prepared by: </span>
                  <span className="font-black text-[#002B66]">{note.author}</span>
                  <span className="text-[10px] text-slate-500 ml-1">(Senior Faculty)</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>CBSE Syllabus Verified</span>
                </div>
              </div>

              {/* Page Content Variations Based on Current Page */}
              {currentPage === 1 && (
                <div className="space-y-5 text-xs text-slate-800">
                  {/* Topic Overview */}
                  <div>
                    <h4 className="font-black text-sm text-[#002B66] border-b border-slate-200 pb-1 mb-2">
                      1. Core Theoretical Foundations & Definitions
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-[11.5px]">
                      A <strong>Linear Equation in One Variable</strong> is an algebraic equality involving only one variable with maximum exponent 1. The general mathematical form is:
                    </p>
                    <div className="my-2 p-2.5 bg-blue-50/80 rounded-lg border border-blue-200 text-center font-mono font-bold text-xs text-blue-900">
                      ax + b = 0 &nbsp;&nbsp;(where a ≠ 0 and a, b ∈ ℝ)
                    </div>
                  </div>

                  {/* Golden Rules */}
                  <div>
                    <h4 className="font-black text-sm text-[#002B66] border-b border-slate-200 pb-1 mb-2">
                      2. Golden Rules of Equation Balancing (The Weighing Scale Analogy)
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-900 block mb-0.5">Rule 1: Transposition</span>
                        <span>When moving a positive term across =, it becomes negative: (+ ⇒ -) and vice versa.</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="font-bold text-slate-900 block mb-0.5">Rule 2: Multiplication</span>
                        <span>Multiplying or dividing both sides by the same non-zero number preserves equality.</span>
                      </div>
                    </div>
                  </div>

                  {/* High Yield Exam Notes */}
                  <div className="p-3 bg-amber-50/60 rounded-xl border-l-4 border-amber-400 space-y-1">
                    <span className="font-black text-xs text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Teacher's High-Yield Exam Tip:
                    </span>
                    <p className="text-[11px] text-slate-700 m-0">
                      Always substitute your calculated value of variable x back into the Left-Hand Side (L.H.S.) to verify equality with the Right-Hand Side (R.H.S.) before completing the answer.
                    </p>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="space-y-5 text-xs text-slate-800">
                  <h4 className="font-black text-sm text-[#002B66] border-b border-slate-200 pb-1 mb-2">
                    3. Fully Worked Exemplar Problems (Step-by-Step)
                  </h4>

                  {/* Example 1 */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-[11.5px]">
                      Example 4.1: Solve for y: &nbsp; 5y - 7 = 3y + 11
                    </div>
                    <div className="pl-3 border-l-2 border-blue-500 font-mono text-[11px] space-y-1 bg-white p-2 rounded">
                      <div>Step 1: Transpose 3y to L.H.S =&gt; 5y - 3y - 7 = 11</div>
                      <div>Step 2: Simplify =&gt; 2y - 7 = 11</div>
                      <div>Step 3: Transpose -7 to R.H.S =&gt; 2y = 11 + 7 = 18</div>
                      <div>Step 4: Divide both sides by 2 =&gt; y = 9</div>
                      <div className="font-bold text-blue-900 mt-1">Verification: L.H.S: 5(9) - 7 = 38 | R.H.S: 3(9) + 11 = 38 ✓</div>
                    </div>
                  </div>

                  {/* Example 2 */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="font-bold text-slate-900 text-[11.5px]">
                      Example 4.2: Rational Fraction Equations: &nbsp; (x + 2)/3 + (x - 1)/2 = 5
                    </div>
                    <div className="pl-3 border-l-2 border-emerald-500 font-mono text-[11px] space-y-1 bg-white p-2 rounded">
                      <div>Step 1: Find L.C.M of denominators (3 and 2) = 6</div>
                      <div>Step 2: Multiply entire equation by 6 =&gt; 2(x + 2) + 3(x - 1) = 30</div>
                      <div>Step 3: Expand brackets =&gt; 2x + 4 + 3x - 3 = 30</div>
                      <div>Step 4: Combine like terms =&gt; 5x + 1 = 30 =&gt; 5x = 29 =&gt; x = 5.8</div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className="space-y-5 text-xs text-slate-800">
                  <h4 className="font-black text-sm text-[#002B66] border-b border-slate-200 pb-1 mb-2">
                    4. Chapter 4 Practice Questions & Vedic Math Shortcut
                  </h4>

                  <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-300 space-y-1.5">
                    <span className="font-black text-xs text-amber-900">
                      ⚡ Vedic Sutra: "Paravartya Yojayet" (Transpose & Apply)
                    </span>
                    <p className="text-[11px] text-slate-700 m-0">
                      For equations of the form ax + b = cx + d, the value of x is directly evaluated in mental math as:
                    </p>
                    <div className="p-2 bg-white rounded border border-amber-200 font-mono text-center font-bold text-xs text-amber-900">
                      x = (d - b) / (a - c)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-[11.5px]">Self-Study Checkpoint Questions:</div>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-700 pl-1">
                      <li>The perimeter of a rectangular swimming pool is 154 m. Its length is 2 m more than twice its breadth. Find the dimensions.</li>
                      <li>Two numbers are in the ratio 5:3. If they differ by 18, what are the numbers?</li>
                      <li>Solve for m: 3m = 5m - 8/5.</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Document Bottom Stamp */}
            <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[9px] text-slate-400">
              <span>Bhaktivedanta Vidyasetu LMS • Certified Official Academic Notes</span>
              <span className="font-mono">Page {currentPage} of {totalPages}</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
