import React, { useState } from 'react';
import { Bell, Plus, Pin, Calendar, User, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AnnouncementsView: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Notice' as 'Notice' | 'Event' | 'Holiday' | 'Emergency',
    content: '',
    audience: 'All' as 'All' | 'Teachers' | 'Students' | 'Class 10',
    isPinned: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    addAnnouncement({
      ...formData,
      publishedDate: '2026-10-20',
      author: currentUser.name
    });

    setIsModalOpen(false);
    setFormData({
      title: '',
      category: 'Notice',
      content: '',
      audience: 'All',
      isPinned: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#17324D] m-0">Institutional Notices & Circulars</h2>
          <p className="text-xs text-[#687789] mt-0.5">Publish circulars targeted to staff, parents, or specific grades</p>
        </div>
        {currentUser.role === 'ADMIN' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg text-sm font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Publish Notice
          </button>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="bg-white rounded-xl border border-[#E3EAF0] p-5 shadow-xs relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-[#159D96] border border-teal-200">
                  {ann.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Audience: <strong className="text-slate-700">{ann.audience}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-mono">{ann.publishedDate}</span>
                {currentUser.role === 'ADMIN' && (
                  <button
                    title="Delete Notice"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove notice "${ann.title}"?`)) {
                        deleteAnnouncement(ann.id);
                      }
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <h3 className="font-bold text-base text-[#17324D] m-0 flex items-center gap-2">
              {ann.title}
              {ann.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{ann.content}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Author: <strong className="text-slate-600">{ann.author}</strong></span>
              <span className="text-emerald-600 font-medium">Broadcast Active</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg border border-[#E3EAF0] overflow-hidden">
            <div className="p-5 border-b border-[#E3EAF0] flex items-center justify-between bg-[#F7F9FC]">
              <h3 className="font-bold text-base text-[#17324D] m-0">Publish New Notice</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#243447] block mb-1">Notice Title *</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2026 Date Announcement"
                  className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  >
                    <option value="Notice">Official Notice</option>
                    <option value="Event">Event</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Emergency">Urgent Notification</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value as any })}
                    className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
                  >
                    <option value="All">All School (Staff & Students)</option>
                    <option value="Teachers">Faculty Staff Only</option>
                    <option value="Students">All Students</option>
                    <option value="Class 10">Class 10 Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#243447] block mb-1">Notice Message Body</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write announcement text here..."
                  className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#E3EAF0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold bg-[#159D96] hover:bg-[#11847e] text-white rounded-lg"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
