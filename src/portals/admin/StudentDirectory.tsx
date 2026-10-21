import React, { useState } from 'react';
import { Plus, Search, Filter, Trash2, Edit2, Download, UserPlus, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

export const StudentDirectory: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    admissionNo: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    class: '10',
    section: 'A',
    rollNo: 1,
    guardianName: '',
    guardianPhone: '',
    feeStatus: 'Paid' as 'Paid' | 'Partial' | 'Pending',
    totalFee: 48000,
    paidFee: 48000
  });

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      admissionNo: student.admissionNo,
      gender: student.gender,
      class: student.class,
      section: student.section,
      rollNo: student.rollNo,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      feeStatus: student.feeStatus,
      totalFee: student.totalFee,
      paidFee: student.paidFee
    });
    setIsAddModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      name: '',
      admissionNo: `ADM-2026-0${students.length + 1}`,
      gender: 'Male',
      class: '10',
      section: 'A',
      rollNo: students.length + 1,
      guardianName: '',
      guardianPhone: '',
      feeStatus: 'Paid',
      totalFee: 48000,
      paidFee: 48000
    });
    setIsAddModalOpen(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'ALL' || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.admissionNo) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        ...formData,
        rollNo: Number(formData.rollNo),
        totalFee: Number(formData.totalFee),
        paidFee: Number(formData.paidFee)
      });
    } else {
      addStudent({
        ...formData,
        status: 'Active',
        attendanceRate: 98,
        rollNo: Number(formData.rollNo),
        totalFee: Number(formData.totalFee),
        paidFee: Number(formData.paidFee)
      });
    }

    setIsAddModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17324D] dark:text-white m-0">Student Directory & Admissions</h2>
          <p className="text-xs text-[#687789] dark:text-slate-400 mt-0.5">Manage admissions, fee records, sections and active profiles</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const headers = "Admission No,Name,Gender,Class,Section,Roll No,Guardian,Phone,Attendance,Fee Status\n";
              const rows = filteredStudents.map(s => 
                `"${s.admissionNo}","${s.name}","${s.gender}","${s.class}","${s.section}","${s.rollNo}","${s.guardianName}","${s.guardianPhone}","${s.attendanceRate}%","${s.feeStatus}"`
              ).join("\n");
              const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", `vidyasetu_students_${new Date().toISOString().slice(0, 10)}.csv`);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Admit New Student
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAF0] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, admission no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-[#F7F9FC] border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-[#687789] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Class:
          </span>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-[#F7F9FC] border border-[#E3EAF0] rounded-lg focus:outline-hidden"
          >
            <option value="ALL">All Classes</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
          </select>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-xl border border-[#E3EAF0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F7F9FC] text-xs font-semibold text-[#687789] uppercase border-b border-[#E3EAF0]">
              <tr>
                <th className="px-5 py-3">Adm. No</th>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Class & Sec</th>
                <th className="px-5 py-3">Guardian</th>
                <th className="px-5 py-3">Contact</th>
                <th className="px-5 py-3">Attendance</th>
                <th className="px-5 py-3">Fee Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAF0]">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-slate-700">
                    {s.admissionNo}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-[#17324D]">{s.name}</div>
                    <div className="text-[11px] text-[#687789]">{s.gender} • Roll No: {s.rollNo}</div>
                  </td>
                  <td className="px-5 py-3.5 font-medium">
                    Class {s.class}-{s.section}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">
                    {s.guardianName}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                    {s.guardianPhone}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-emerald-600">{s.attendanceRate}%</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold ${
                        s.feeStatus === 'Paid' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : s.feeStatus === 'Partial'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {s.feeStatus}
                      </span>
                      {s.feeStatus !== 'Paid' && (
                        <button
                          onClick={() => {
                            updateStudent(s.id, { feeStatus: 'Paid', paidFee: s.totalFee });
                          }}
                          title="Mark Dues as Fully Paid"
                          className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded border border-emerald-300 transition-colors cursor-pointer"
                        >
                          Collect
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="Edit Student"
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        title="Delete Student"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to remove ${s.name} (${s.admissionNo}) from the student registry?`)) {
                            deleteStudent(s.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-500 text-sm">
                    No students match your query. Try resetting filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-[#E3EAF0] overflow-hidden">
            <div className="p-5 border-b border-[#E3EAF0] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="font-bold text-base text-[#17324D] m-0">
                {editingStudent ? `Edit Student: ${editingStudent.name}` : 'Admit New Student'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Student Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                    placeholder="e.g. Diya Sen"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Admission Number *</label>
                  <input
                    required
                    type="text"
                    value={formData.admissionNo}
                    onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                    placeholder="ADM-2026-xxx"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  >
                    <option value="10">Class 10</option>
                    <option value="9">Class 9</option>
                    <option value="8">Class 8</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Roll No</label>
                  <input
                    type="number"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Guardian Name</label>
                  <input
                    type="text"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                    placeholder="Parent or Guardian"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Guardian Phone</label>
                  <input
                    type="text"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                    placeholder="+91 9xxxx xxxxx"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E3EAF0]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
