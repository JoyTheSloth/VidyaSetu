import React, { useState } from 'react';
import { Building2, Save, Check, School, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SchoolSettingsView: React.FC = () => {
  const { school, updateSchool } = useApp();
  const [formData, setFormData] = useState({
    name: school.name,
    code: school.code,
    academicYear: school.academicYear,
    contactEmail: school.contactEmail,
    phone: school.phone,
    address: school.address
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchool(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#17324D] m-0">School Tenant Configuration</h2>
        <p className="text-xs text-[#687789] mt-0.5">Customize school details, academic session, and contact info (BHIMS)</p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          School settings updated dynamically across all portal banners and headers!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-[#E3EAF0] p-6 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#243447] block mb-1">School Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg focus:outline-hidden focus:border-[#159D96]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#243447] block mb-1">Tenant Code</label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-[#243447] block mb-1">Current Academic Year</label>
            <input
              type="text"
              required
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#243447] block mb-1">Official Email</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#243447] block mb-1">Helpline Phone</label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#243447] block mb-1">Campus Address</label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-[#E3EAF0] rounded-lg"
          />
        </div>

        <div className="pt-4 border-t border-[#E3EAF0] flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#159D96] hover:bg-[#11847e] text-white font-semibold text-sm rounded-lg shadow-xs"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
