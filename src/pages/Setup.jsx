import React, { useState } from 'react';
import { Check, ChevronRight, Plus, Trash2, Scissors, Phone, Mail, MapPin, Target, IndianRupee, Users, Tag } from 'lucide-react';

const SETUP_KEY = 'salonos_setup';

const STEP_CONFIG = [
  { id: 1, title: 'Salon Info', icon: Scissors, desc: 'Tell us about your salon' },
  { id: 2, title: 'Communication', icon: Phone, desc: 'Client messaging setup' },
  { id: 3, title: 'Monthly Targets', icon: Target, desc: 'Set your revenue & booking goals' },
  { id: 4, title: 'Services', icon: Tag, desc: 'Add services you offer' },
  { id: 5, title: 'Team', icon: Users, desc: 'Add your staff members' },
];

const SERVICE_CATEGORIES = ['Hair', 'Skin', 'Nails', 'Spa', 'Makeup', 'Other'];

const inputClass = 'w-full bg-elevated border border-border px-4 py-3 rounded-lg text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all';
const labelClass = 'text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5';

export default function Setup({ onComplete }) {
  const [step, setStep] = useState(1);
  const [salon, setSalon] = useState({ name: '', city: '', address: '', gst: '', phone: '', website: '' });
  const [comms, setComms] = useState({ whatsapp: '', senderName: '', email: '' });
  const [targets, setTargets] = useState({ monthlyRevenue: '', bookingsTarget: '', avgTicket: '' });
  const [services, setServices] = useState([{ name: '', category: 'Hair', price: '', duration: '60' }]);
  const [staff, setStaff] = useState([{ name: '', role: '', phone: '' }]);
  const [done, setDone] = useState(false);

  const goNext = () => setStep(s => Math.min(s + 1, 5));
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  const addService = () => setServices(s => [...s, { name: '', category: 'Hair', price: '', duration: '60' }]);
  const removeService = (i) => setServices(s => s.filter((_, idx) => idx !== i));
  const updateService = (i, key, val) => setServices(s => s.map((svc, idx) => idx === i ? { ...svc, [key]: val } : svc));

  const addStaff = () => setStaff(s => [...s, { name: '', role: '', phone: '' }]);
  const removeStaff = (i) => setStaff(s => s.filter((_, idx) => idx !== i));
  const updateStaff = (i, key, val) => setStaff(s => s.map((m, idx) => idx === i ? { ...m, [key]: val } : m));

  const handleFinish = () => {
    const config = { salon, comms, targets, services, staff, setupAt: new Date().toISOString() };
    localStorage.setItem(SETUP_KEY, JSON.stringify(config));
    setDone(true);
    setTimeout(() => onComplete(config), 1800);
  };

  const loadDemoData = () => {
    const config = { 
      salon: { name: 'Maison de Beauté', city: 'Mumbai', address: '14 Wodehouse Road, Colaba', gst: '27AADCB2230M1Z2', phone: '+91 98200 12345', website: 'maisondebeaute.com' },
      comms: { whatsapp: '+91 98200 12345', senderName: 'Maison de Beauté', email: 'hello@maisondebeaute.com' },
      targets: { monthlyRevenue: '850000', bookingsTarget: '400', avgTicket: '2100' },
      services: [
        { name: 'Signature Balayage', category: 'Hair', price: '4500', duration: '120' },
        { name: 'Keratin Treatment', category: 'Hair', price: '6000', duration: '150' },
        { name: 'Bridal Makeup', category: 'Makeup', price: '12000', duration: '180' }
      ],
      staff: [
        { name: 'Meera K.', role: 'Senior Stylist', phone: '+91 98111 22222' },
        { name: 'Sunita R.', role: 'Colorist', phone: '+91 98111 33333' }
      ],
      setupAt: new Date().toISOString()
    };
    localStorage.setItem(SETUP_KEY, JSON.stringify(config));
    setDone(true);
    setTimeout(() => onComplete(config), 1800);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-base flex flex-col items-center justify-center gap-6 animate-in zoom-in-95 duration-700">
        <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.3)]">
          <Check className="w-10 h-10 text-gold" />
        </div>
        <h2 className="text-4xl font-display text-primary tracking-widest">Setup Complete!</h2>
        <p className="text-secondary">Welcome to Salon OS, {salon.name || 'your salon'}. Loading your dashboard…</p>
        <div className="flex gap-1 mt-2">
          {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-gold tracking-[0.2em] uppercase mb-2">Salon OS</h1>
          <p className="text-secondary text-sm">Let's set up your salon in 5 quick steps</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center mb-8">
          {STEP_CONFIG.map((s, i) => {
            const Icon = s.icon;
            const active = step === s.id;
            const done = step > s.id;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5 shrink-0">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${done ? 'bg-gold border-gold text-bg-base' : active ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]' : 'border-border text-muted'}`}>
                    {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[9px] font-semibold uppercase tracking-wider ${active ? 'text-gold' : done ? 'text-primary' : 'text-muted'}`}>{s.title}</span>
                </div>
                {i < STEP_CONFIG.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 mt-[-12px] rounded transition-all duration-500 ${done ? 'bg-gold' : 'bg-border'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-display text-primary mb-1">{STEP_CONFIG[step - 1].title}</h2>
          <p className="text-sm text-secondary mb-6">{STEP_CONFIG[step - 1].desc}</p>

          {/* ── Step 1: Salon Info ── */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
              <div>
                <label className={labelClass}>Salon Name *</label>
                <input required value={salon.name} onChange={e => setSalon(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Maison de Beauté" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>City *</label>
                  <input value={salon.city} onChange={e => setSalon(p => ({ ...p, city: e.target.value }))} placeholder="e.g. Mumbai" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input value={salon.phone} onChange={e => setSalon(p => ({ ...p, phone: e.target.value }))} placeholder="+91 98xxx xxxxx" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <input value={salon.address} onChange={e => setSalon(p => ({ ...p, address: e.target.value }))} placeholder="Street, Area, City, PIN" className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GST Number</label>
                  <input value={salon.gst} onChange={e => setSalon(p => ({ ...p, gst: e.target.value }))} placeholder="27XXXXX..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Website (optional)</label>
                  <input value={salon.website} onChange={e => setSalon(p => ({ ...p, website: e.target.value }))} placeholder="https://yoursalon.com" className={inputClass} />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Communication ── */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
              <div className="bg-elevated/50 border border-border rounded-xl p-4 mb-2">
                <p className="text-sm text-secondary">📱 <span className="text-primary font-semibold">WhatsApp Integration</span> — Messages (reminders, promos) will be sent from this number to your clients.</p>
              </div>
              <div>
                <label className={labelClass}>WhatsApp Business Number *</label>
                <input value={comms.whatsapp} onChange={e => setComms(p => ({ ...p, whatsapp: e.target.value }))} placeholder="+91 98765 43210" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sender Display Name</label>
                <input value={comms.senderName} onChange={e => setComms(p => ({ ...p, senderName: e.target.value }))} placeholder="e.g. Maison de Beauté" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Notification Email</label>
                <input type="email" value={comms.email} onChange={e => setComms(p => ({ ...p, email: e.target.value }))} placeholder="hello@yoursalon.com" className={inputClass} />
              </div>
            </div>
          )}

          {/* ── Step 3: Targets ── */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-400">
              <div className="bg-elevated/50 border border-border rounded-xl p-4 mb-2">
                <p className="text-sm text-secondary">🎯 These targets appear on your <span className="text-primary font-semibold">Dashboard & Reports</span> to track monthly progress.</p>
              </div>
              <div>
                <label className={labelClass}>Monthly Revenue Target (₹)</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="number" value={targets.monthlyRevenue} onChange={e => setTargets(p => ({ ...p, monthlyRevenue: e.target.value }))} placeholder="e.g. 500000" className={inputClass + ' pl-10'} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Monthly Bookings Target</label>
                <input type="number" value={targets.bookingsTarget} onChange={e => setTargets(p => ({ ...p, bookingsTarget: e.target.value }))} placeholder="e.g. 300" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Average Ticket Size (₹)</label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                  <input type="number" value={targets.avgTicket} onChange={e => setTargets(p => ({ ...p, avgTicket: e.target.value }))} placeholder="e.g. 2500" className={inputClass + ' pl-10'} />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 4: Services ── */}
          {step === 4 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-400">
              <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1 scrollbar-hide">
                {services.map((svc, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 p-3 border border-border rounded-xl bg-elevated/30 hover:border-gold/20 transition-colors">
                    <div className="col-span-4">
                      <label className={labelClass}>Service Name</label>
                      <input value={svc.name} onChange={e => updateService(i, 'name', e.target.value)} placeholder="e.g. Balayage" className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-3">
                      <label className={labelClass}>Category</label>
                      <select value={svc.category} onChange={e => updateService(i, 'category', e.target.value)} className={inputClass + ' py-2 text-xs'}>
                        {SERVICE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className={labelClass}>Price ₹</label>
                      <input type="number" value={svc.price} onChange={e => updateService(i, 'price', e.target.value)} placeholder="2500" className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-2">
                      <label className={labelClass}>Mins</label>
                      <input type="number" value={svc.duration} onChange={e => updateService(i, 'duration', e.target.value)} placeholder="60" className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-1 flex items-end pb-1">
                      <button onClick={() => removeService(i)} disabled={services.length === 1} className="w-8 h-8 flex items-center justify-center text-muted hover:text-accent-rose rounded transition-colors disabled:opacity-30">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addService} className="w-full border border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 text-gold rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                <Plus className="w-4 h-4" /> Add Another Service
              </button>
              <p className="text-xs text-muted">Add {services.filter(s => !s.name).length > 0 ? 'at least the service names' : 'more or'} continue. You can edit services later in Settings.</p>
            </div>
          )}

          {/* ── Step 5: Staff ── */}
          {step === 5 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-400">
              <div className="max-h-[320px] overflow-y-auto space-y-3 pr-1 scrollbar-hide">
                {staff.map((m, i) => (
                  <div key={i} className="grid grid-cols-12 gap-2 p-3 border border-border rounded-xl bg-elevated/30 hover:border-gold/20 transition-colors">
                    <div className="col-span-4">
                      <label className={labelClass}>Full Name</label>
                      <input value={m.name} onChange={e => updateStaff(i, 'name', e.target.value)} placeholder="e.g. Meera K." className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-4">
                      <label className={labelClass}>Role / Position</label>
                      <input value={m.role} onChange={e => updateStaff(i, 'role', e.target.value)} placeholder="e.g. Senior Stylist" className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-3">
                      <label className={labelClass}>Phone</label>
                      <input value={m.phone} onChange={e => updateStaff(i, 'phone', e.target.value)} placeholder="+91 98xxx" className={inputClass + ' py-2 text-xs'} />
                    </div>
                    <div className="col-span-1 flex items-end pb-1">
                      <button onClick={() => removeStaff(i)} disabled={staff.length === 1} className="w-8 h-8 flex items-center justify-center text-muted hover:text-accent-rose rounded transition-colors disabled:opacity-30">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={addStaff} className="w-full border border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 text-gold rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                <Plus className="w-4 h-4" /> Add Another Team Member
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className={`flex gap-3 mt-8 ${step > 1 ? 'justify-between' : 'justify-end'}`}>
            {step > 1 && (
              <button onClick={goBack} className="px-6 py-3 border border-border rounded-xl text-sm text-secondary hover:text-primary hover:border-border-hover transition-all">
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={goNext}
                disabled={step === 1 && !salon.name}
                className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light text-bg-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light text-bg-base font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.35)]"
              >
                <Check className="w-4 h-4" /> Finish Setup & Launch
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-center text-xs text-muted">All data is saved locally. You can update everything from Settings → Preferences.</p>
          <button onClick={loadDemoData} className="text-xs font-semibold text-gold border border-gold/30 hover:bg-gold/10 px-5 py-2.5 rounded-pill transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
            <span>⚡️ Skip Setup & Load Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
