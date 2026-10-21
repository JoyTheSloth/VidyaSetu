import React, { useState } from 'react';
import { 
  X, Camera, Save, User as UserIcon, Mail, Phone, 
  GraduationCap, BookOpen, MapPin, Sparkles, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_AVATARS = [
  { label: 'Mrs. Sunita (Default)', url: '/assets/teacher_sunita.jpg' },
  { label: 'Dr. Rajesh (Admin)', url: '/assets/principal_matthew.jpg' },
  { label: 'Anoop (Student)', url: '/assets/anoop_avatar.jpg' },
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUser } = useApp();

  const [name, setName] = useState(currentUser.name || 'Mrs. Sunita Mukherjee');
  const [email, setEmail] = useState(currentUser.email || 'teacher@bhaktivedanta.edu');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98301 24567');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || '/assets/teacher_sunita.jpg');
  const [employeeId, setEmployeeId] = useState(currentUser.details?.employeeId || 'TCH-101');
  const [classId, setClassId] = useState(currentUser.details?.classId || 'Class 10-A');
  const [qualification, setQualification] = useState(currentUser.details?.qualification || 'M.Sc. Pure Mathematics, B.Ed (Gold Medalist)');
  const [cabin, setCabin] = useState(currentUser.details?.cabin || 'Faculty Block B, Room 204');
  const [bio, setBio] = useState(
    currentUser.details?.bio || 
    'Senior Faculty & Class 10-A Mentor with 14+ years of teaching excellence, national mathematics olympiad mentoring, and Vedic mathematics research.'
  );
  const [subjects, setSubjects] = useState(
    currentUser.details?.subjects?.join(', ') || 'Mathematics, Vedic Mathematics'
  );

  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectList = subjects
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateCurrentUser({
      name,
      email,
      phone,
      avatarUrl,
      details: {
        employeeId,
        classId,
        qualification,
        cabin,
        bio,
        subjects: subjectList
      }
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] bg-white dark:bg-[#101D2C] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#1E3146] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white dark:from-[#0B1724] dark:to-[#101D2C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#002B66] dark:text-white m-0">
                Edit Faculty Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                Update personal details, photo, and academic credentials
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Scrollable Content */}
        <form onSubmit={handleSave} className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#0B1A2C] border border-slate-100 dark:border-white/5">
            <div className="relative group shrink-0">
              <img
                src={avatarUrl}
                alt={name}
                className="w-24 h-24 rounded-2xl object-cover object-top border-3 border-amber-400 shadow-md ring-4 ring-amber-400/20"
              />
              <label 
                htmlFor="teacher-photo-upload" 
                className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer"
              >
                <Camera className="w-5 h-5 mb-0.5 text-amber-300" />
                <span>Upload</span>
              </label>
              <input 
                id="teacher-photo-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div>
                <h4 className="font-extrabold text-sm text-[#002B66] dark:text-white m-0">
                  Profile Photograph
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 m-0">
                  Square JPG, PNG (Max 5MB). Visible across faculty register and homework authoring.
                </p>
              </div>

              {/* Quick Preset Selector */}
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                {PRESET_AVATARS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(preset.url)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      avatarUrl === preset.url
                        ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-xs'
                        : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <UserIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mrs. Sunita Mukherjee"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span>Institutional Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@bhaktivedanta.edu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Phone / Contact</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98301 24567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-400 transition-all"
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <span>Employee Code</span>
              </label>
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="TCH-101"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-mono font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
              />
            </div>

            {/* Assigned Mentorship Class */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                <span>Mentorship / Class Teacher</span>
              </label>
              <input
                type="text"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                placeholder="Class 10-A"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-400 transition-all"
              />
            </div>

            {/* Faculty Room / Cabin */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Cabin / Department Room</span>
              </label>
              <input
                type="text"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                placeholder="Faculty Block B, Room 204"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-rose-400 transition-all"
              />
            </div>
          </div>

          {/* Subjects Taught */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-500" />
              <span>Assigned Subjects (comma separated)</span>
            </label>
            <input
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="Mathematics, Vedic Mathematics, Statistics"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-teal-400 transition-all"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>Academic Degrees & Certifications</span>
            </label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="M.Sc. Pure Mathematics, B.Ed (Gold Medalist)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          {/* Bio / Philosophy */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
              Faculty Biography & Vision
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a brief mentor bio..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1A2C] text-xs font-medium text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 transition-all resize-none"
            />
          </div>

          {/* Success Notification Banner */}
          {isSaved && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Faculty profile details successfully updated and synced across portals!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
