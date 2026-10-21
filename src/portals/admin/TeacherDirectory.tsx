import React, { useState } from 'react';
import { Users, UserPlus, Mail, Phone, BookOpen, Shield, X, Check, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';

export const TeacherDirectory: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    designation: 'TGT Subject Teacher',
    assignedClass: '10',
    assignedSection: 'A',
    subject: 'Mathematics',
    status: 'Active' as 'Active' | 'On Leave' | 'Inactive'
  });

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormData({
      name: '',
      employeeId: `TCH-${Math.floor(100 + Math.random() * 900)}`,
      email: '',
      phone: '+91 98300 00000',
      designation: 'TGT Subject Teacher',
      assignedClass: '10',
      assignedSection: 'A',
      subject: 'Mathematics',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    const primaryClass = t.classesAssigned[0] || { class: '10', section: 'A', subject: 'General' };
    setFormData({
      name: t.name,
      employeeId: t.employeeId,
      email: t.email,
      phone: t.phone,
      designation: t.designation,
      assignedClass: primaryClass.class,
      assignedSection: primaryClass.section,
      subject: primaryClass.subject,
      status: t.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        name: formData.name,
        employeeId: formData.employeeId,
        email: formData.email,
        phone: formData.phone,
        designation: formData.designation,
        status: formData.status,
        classesAssigned: [
          { class: formData.assignedClass, section: formData.assignedSection, subject: formData.subject }
        ]
      });
    } else {
      addTeacher({
        name: formData.name,
        employeeId: formData.employeeId || `TCH-${Math.floor(100 + Math.random() * 900)}`,
        email: formData.email,
        phone: formData.phone || '+91 98300 00000',
        designation: formData.designation,
        classesAssigned: [
          { class: formData.assignedClass, section: formData.assignedSection, subject: formData.subject }
        ],
        status: formData.status
      });
    }

    setIsModalOpen(false);
    setEditingTeacher(null);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17324D] m-0">Faculty & Staff Directory</h2>
          <p className="text-xs text-[#687789] mt-0.5">Manage teaching staff allocations, subject assignments & profiles</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg text-sm font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Add Faculty Member
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          Faculty record saved and class assignment updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {teachers.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-[#E3EAF0] p-5 shadow-xs hover:border-teal-300 transition-all space-y-4 relative group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-base text-[#159D96]">
                  {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#17324D] m-0">{t.name}</h3>
                  <div className="text-[11px] text-teal-700 font-semibold">{t.designation}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{t.employeeId}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {t.status}
                </span>
                <div className="flex items-center">
                  <button
                    title="Edit Teacher"
                    onClick={() => handleOpenEdit(t)}
                    className="p-1 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="Delete Teacher"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove faculty member ${t.name} (${t.employeeId})?`)) {
                        deleteTeacher(t.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{t.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.phone}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Teaching Allocation:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {t.classesAssigned.map((a, i) => (
                  <span key={i} className="text-xs bg-[#F7F9FC] border border-[#E3EAF0] px-2 py-0.5 rounded text-slate-700 font-medium">
                    {a.subject} (Cl {a.class}-{a.section})
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-[#E3EAF0] overflow-hidden">
            <div className="p-5 border-b border-[#E3EAF0] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="font-bold text-base text-[#17324D] m-0">
                {editingTeacher ? `Edit Faculty: ${editingTeacher.name}` : 'Add Faculty Member'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#243447] block mb-1">Faculty Full Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alok Chatterjee"
                  className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Email ID *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alok.c@bhims.edu"
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    placeholder="TCH-120"
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98300 00000"
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="TGT Subject Teacher"
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Assigned Class</label>
                  <select
                    value={formData.assignedClass}
                    onChange={(e) => setFormData({ ...formData, assignedClass: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  >
                    <option value="10">Class 10</option>
                    <option value="9">Class 9</option>
                    <option value="8">Class 8</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E3EAF0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg cursor-pointer"
                >
                  {editingTeacher ? 'Update Faculty' : 'Save Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
