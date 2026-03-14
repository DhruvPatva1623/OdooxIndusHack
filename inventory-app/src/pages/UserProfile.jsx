import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';
import api from '../api';

export default function UserProfile() {
  const [user, setUser] = useState({ full_name: '', email: '', role: '', last_login_at: '' });
  const [form, setForm] = useState({ full_name: '', email: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get('/auth/me');
        const data = res.data;
        setUser(data);
        setForm({ full_name: data.full_name || '', email: data.email || '' });
      } catch (error) {
        showToast({ title: 'Profile Error', message: 'Could not fetch profile. Please sign in again.', type: 'error' });
      }
    };
    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.put('/auth/profile', { full_name: form.full_name, email: form.email });
      setUser(res.data);
      setForm({ full_name: res.data.full_name, email: res.data.email });
      showToast({ title: 'Saved', message: 'Your profile changes were saved.', type: 'success' });
    } catch (err) {
      showToast({ title: 'Save Failed', message: err.response?.data?.detail || 'Unable to save profile.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ full_name: user.full_name || '', email: user.email || '' });
    showToast({ title: 'Cancelled', message: 'Your edits were discarded.', type: 'info' });
  };

  const handleEditPhoto = () => {
    showToast({ title: 'Upload Photo', message: 'Photo upload coming soon.', type: 'info' });
  };

  return (
    <Layout>
      <div className="mb-12">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">My Profile</h2>
        <p className="text-on-surface-variant">Update your profile and contact details.</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center text-center shadow-[0px_10px_40px_rgba(115,69,182,0.06)] relative overflow-hidden">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary-container p-1">
                <img alt="User Portrait" className="w-full h-full rounded-full object-cover" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&q=75&fit=crop&w=400" />
              </div>
              <button onClick={handleEditPhoto} className="absolute bottom-2 right-2 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:bg-primary-fixed-dim transition-colors group">
                <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
              </button>
            </div>
            <h3 className="font-headline text-2xl font-bold text-on-surface">{user.full_name || 'Your Name'}</h3>
            <p className="text-on-surface-variant font-medium mb-6">{user.role || 'Warehouse Staff'}</p>
            <div className="w-full pt-6 border-t border-outline-variant/10 flex justify-center gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-primary">124</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Transfers</p>
              </div>
              <div className="w-px h-8 bg-outline-variant/20"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-primary">12</p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Workshops</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-lowest rounded-xl p-10 shadow-[0px_10px_40px_rgba(115,69,182,0.06)]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="font-headline text-xl font-bold text-on-surface">Personal Information</h4>
                <p className="text-on-surface-variant text-sm">Update your details and save permanently.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">info</span>
            </div>

            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    className="w-full no-border-input py-3 px-3 rounded-lg border border-outline-variant"
                    value={form.full_name}
                    onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    className="w-full no-border-input py-3 px-3 rounded-lg border border-outline-variant"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                <button className="px-4 py-2 rounded-lg border border-outline-variant text-sm font-medium" type="button" onClick={handleCancel}>Cancel</button>
                <button className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
