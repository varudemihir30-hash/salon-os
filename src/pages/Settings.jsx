import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MapPin, CheckCircle, XCircle, Plus, KeyRound, X, Edit2, Trash2, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '../config/roles';

const MOCK_LOCATIONS = [
  { id: 1, name: 'Colaba Flagship', address: '14 Wodehouse Road, Colaba, Mumbai 400039', phone: '+91 22 2202 1234', status: 'Active', staff: 6, appointmentsToday: 14 },
  { id: 2, name: 'Bandra West', address: '8 Linking Road, Bandra West, Mumbai 400050', phone: '+91 22 2650 5678', status: 'Active', staff: 4, appointmentsToday: 9 },
  { id: 3, name: 'Lower Parel', address: 'High Street Phoenix, Level 2, Lower Parel, Mumbai 400013', phone: '+91 22 6662 3456', status: 'Coming Soon', staff: 0, appointmentsToday: 0 },
];

const MOCK_INTEGRATIONS = [
  { name: 'WhatsApp Business', desc: 'Automated appointment reminders & promotions.', icon: '💬', connected: true },
  { name: 'Google Calendar', desc: 'Sync all appointments to Google Calendar.', icon: '📅', connected: true },
  { name: 'Razorpay', desc: 'Accept UPI, Card, and NetBanking payments.', icon: '💳', connected: true },
  { name: 'Zoho CRM', desc: 'Sync client data and purchase history.', icon: '📊', connected: false },
  { name: 'Instagram', desc: 'Live booking widget on your Instagram profile.', icon: '📸', connected: false },
  { name: 'Mailchimp', desc: 'Advanced email marketing and automation.', icon: '✉️', connected: false },
];

const EMPTY_FORM = { name: '', email: '', password: '', role: 'receptionist' };

export default function Settings({ initialView = 'Locations' }) {
  const [view, setView] = useState(initialView);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPw, setShowPw] = useState(false);
  const { users, addUser, updateUser, deleteUser, currentUser } = useAuth();
  const tabs = ['Credentials', 'Locations', 'Integrations', 'Preferences'];

  const openAdd = () => { setEditUser(null); setForm(EMPTY_FORM); setShowPw(false); setShowModal(true); };
  const openEdit = (u) => { setEditUser(u); setForm({ name: u.name, email: u.email, password: u.password, role: u.role }); setShowPw(false); setShowModal(true); };
  const handleSave = () => {
    if (!form.name || !form.email || (!editUser && !form.password)) return;
    if (editUser) updateUser(editUser.id, form);
    else addUser(form);
    setShowModal(false);
  };

  const inputClass = 'w-full bg-elevated border border-border px-4 py-3 rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold transition-all';
  const labelClass = 'text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5';

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Settings</h2>
          <p className="text-sm text-secondary tracking-wide">Manage your salon configuration</p>
        </div>
        {view === 'Credentials' && <Button onClick={openAdd}><Plus className="w-4 h-4 mr-2" /> Add User</Button>}
        {view === 'Locations' && <Button><Plus className="w-4 h-4 mr-2" /> Add Location</Button>}
      </header>

      <div className="flex gap-8 border-b border-border mb-8 px-4">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setView(tab)}
            className={`pb-3 text-sm font-semibold tracking-wide uppercase transition-colors relative ${view === tab ? 'text-gold' : 'text-muted hover:text-primary'}`}>
            {tab}
            {view === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold rounded-t-sm shadow-[0_0_10px_rgba(201,168,76,0.5)]" />}
          </button>
        ))}
      </div>

      {/* ── Credentials ── */}
      {view === 'Credentials' && (
        <div className="space-y-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-3 bg-elevated/50 border border-border rounded-xl p-4 mb-2">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <p className="text-sm text-secondary">Manage who can access Salon OS. Roles control which pages each user can see.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            {[
              { label: 'Owner', desc: 'Full access to all pages and settings', color: 'border-t-gold' },
              { label: 'Manager', desc: 'Operations, staff, reports — no credentials', color: 'border-t-accent-mint' },
              { label: 'Receptionist', desc: 'Appointments, clients, and invoices only', color: 'border-t-accent-rose' },
            ].map(r => (
              <Card key={r.label} className={`border-t-2 ${r.color} py-4`}>
                <p className="font-semibold text-primary mb-1">{r.label}</p>
                <p className="text-xs text-muted">{r.desc}</p>
              </Card>
            ))}
          </div>

          {users.map(u => (
            <Card key={u.id} className="flex items-center gap-4 hover:border-gold/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-elevated border border-border flex items-center justify-center text-lg font-display text-gold shrink-0">
                {u.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-semibold text-primary">{u.name}</p>
                  {currentUser?.id === u.id && <Badge variant="gold" className="text-[9px]">YOU</Badge>}
                </div>
                <p className="text-xs text-muted">{u.email}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-pill border ${ROLE_COLORS[u.role]}`}>
                {ROLE_LABELS[u.role]}
              </span>
              <div className="flex gap-2">
                <button onClick={() => openEdit(u)} className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted hover:text-gold hover:border-gold/50 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => currentUser?.id !== u.id && deleteUser(u.id)}
                  disabled={currentUser?.id === u.id}
                  className="w-8 h-8 flex items-center justify-center border border-border rounded text-muted hover:text-accent-rose hover:border-accent-rose/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ── Locations ── */}
      {view === 'Locations' && (
        <div className="space-y-4 animate-in fade-in duration-500">
          {MOCK_LOCATIONS.map(loc => (
            <Card key={loc.id} className="flex items-center gap-6 hover:border-gold/30 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-display text-primary">{loc.name}</h3>
                  <Badge variant={loc.status === 'Active' ? 'success' : 'default'} className="text-[10px]">{loc.status}</Badge>
                </div>
                <p className="text-xs text-secondary">{loc.address}</p>
                <p className="text-xs text-muted mt-0.5">{loc.phone}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 text-center shrink-0">
                <div><p className="text-[10px] text-muted uppercase tracking-widest">Staff</p><p className="text-xl font-display text-primary">{loc.staff}</p></div>
                <div><p className="text-[10px] text-muted uppercase tracking-widest">Today</p><p className="text-xl font-display text-gold">{loc.appointmentsToday}</p></div>
              </div>
              <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto shrink-0">Manage</Button>
            </Card>
          ))}
        </div>
      )}

      {/* ── Integrations ── */}
      {view === 'Integrations' && (
        <div className="grid grid-cols-3 gap-4 animate-in fade-in duration-500">
          {MOCK_INTEGRATIONS.map(int => (
            <Card key={int.name} className={`flex flex-col hover:border-gold/30 transition-colors ${int.connected ? 'border-l-2 border-l-accent-mint' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{int.icon}</span>
                {int.connected
                  ? <div className="flex items-center gap-1 text-accent-mint text-xs font-semibold"><CheckCircle className="w-4 h-4" /> Connected</div>
                  : <div className="flex items-center gap-1 text-muted text-xs"><XCircle className="w-4 h-4" /> Not Connected</div>}
              </div>
              <h3 className="font-semibold text-primary mb-1">{int.name}</h3>
              <p className="text-xs text-secondary flex-1 mb-4">{int.desc}</p>
              <Button variant={int.connected ? 'secondary' : 'default'} className="w-full text-xs">{int.connected ? 'Configure' : 'Connect'}</Button>
            </Card>
          ))}
        </div>
      )}

      {/* ── Preferences ── */}
      {view === 'Preferences' && (
        <div className="space-y-4 animate-in fade-in duration-500 max-w-2xl">
          {[
            { label: 'Business Name', value: (() => { try { return JSON.parse(localStorage.getItem('salonos_setup') || '{}')?.salon?.name || 'Salon OS'; } catch { return 'Salon OS'; } })() },
            { label: 'Currency', value: '₹ INR (Indian Rupee)' },
            { label: 'Timezone', value: 'Asia/Kolkata (IST, UTC+5:30)' },
            { label: 'Default Appointment Duration', value: '60 minutes' },
            { label: 'Booking Buffer Time', value: '15 minutes' },
            { label: 'Tax Rate', value: '18% (GST)' },
          ].map(pref => (
            <Card key={pref.label} className="flex items-center justify-between py-4 px-5 hover:border-gold/20 transition-colors">
              <div><p className="text-[10px] text-muted tracking-widest uppercase font-semibold mb-1">{pref.label}</p><p className="text-sm text-primary font-medium">{pref.value}</p></div>
              <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">Edit</Button>
            </Card>
          ))}
        </div>
      )}

      {/* ── Add / Edit User Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-card border border-gold/20 rounded-2xl shadow-2xl border-t-[3px] border-t-gold animate-in slide-in-from-bottom-8 fade-in duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center"><KeyRound className="w-4 h-4 text-gold" /></div>
                <h2 className="text-xl font-display text-primary">{editUser ? 'Edit User' : 'Add New User'}</h2>
              </div>
              <button onClick={() => setShowModal(false)} className="text-secondary hover:text-primary transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} placeholder="e.g. Sunita Rao" />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="sunita@salon.com" />
              </div>
              <div>
                <label className={labelClass}>{editUser ? 'New Password (leave blank to keep)' : 'Password *'}</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className={inputClass + ' pr-12'} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelClass}>Role *</label>
                <select value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className={inputClass}>
                  <option value="owner">👑 Owner — Full access</option>
                  <option value="manager">🎯 Manager — Operations access</option>
                  <option value="receptionist">📋 Receptionist — Front desk access</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="secondary" className="w-1/3" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button className="w-2/3" onClick={handleSave}>{editUser ? 'Save Changes' : 'Create User'}</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
