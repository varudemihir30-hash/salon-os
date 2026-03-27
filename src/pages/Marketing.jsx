import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Gift, Megaphone, Users, CreditCard, Send, Plus, Award, X } from 'lucide-react';

export default function Marketing({ initialTab = 'Campaigns' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showModal, setShowModal] = useState(false);
  const tabs = ['Campaigns', 'Loyalty', 'Gift Cards', 'Memberships'];

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Marketing & Loyalty</h2>
          <p className="text-sm text-secondary tracking-wide">Engage clients and grow your business</p>
        </div>
        <Button onClick={() => setShowModal(true)}><Plus className="w-4 h-4 mr-2"/> Create Campaign</Button>
      </header>

      {showModal && <CreateCampaignModal onClose={() => setShowModal(false)} />}

      <div className="flex gap-8 border-b border-border mb-8 px-4">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold tracking-wide uppercase transition-colors relative ${activeTab === tab ? 'text-gold' : 'text-muted hover:text-primary'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold rounded-t-sm shadow-[0_0_10px_rgba(201,168,76,0.5)]"></div>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'Campaigns' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-3 gap-6">
              <Card className="flex flex-col border-t-2 border-t-gold">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="gold" className="text-[10px]">SCHEDULED</Badge>
                  <Megaphone className="w-5 h-5 text-gold"/>
                </div>
                <h3 className="text-lg font-display text-primary mb-1">Diwali Festive Offer</h3>
                <p className="text-sm text-secondary mb-4">20% off all Hair Spa services. Targeting: VIP Segment</p>
                <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center">
                   <span className="text-xs text-muted">Via SMS & Email</span>
                   <span className="text-xs text-primary font-medium">Oct 24, 10:00 AM</span>
                </div>
              </Card>
              <Card className="flex flex-col border-t-2 border-t-accent-mint">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="success" className="text-[10px]">SENT</Badge>
                  <Send className="w-5 h-5 text-accent-mint"/>
                </div>
                <h3 className="text-lg font-display text-primary mb-1">Spring Rejuvenation</h3>
                <p className="text-sm text-secondary mb-4">Buy 1 Get 1 on Facials. Targeting: All Clients</p>
                <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-center">
                   <span className="text-xs text-muted flex gap-3"><span className="text-accent-mint">68% Open</span><span>4% Click</span></span>
                   <span className="text-xs text-secondary font-medium">Last Week</span>
                </div>
              </Card>
              <Card onClick={() => setShowModal(true)} className="flex flex-col border-t-2 border-border border-dashed bg-elevated/30 items-center justify-center text-center cursor-pointer hover:border-gold hover:bg-elevated/80 transition-all group">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center mb-3 group-hover:border-gold group-hover:text-gold transition-colors">
                  <Plus className="w-5 h-5 text-muted group-hover:text-gold"/>
                </div>
                <h3 className="text-sm font-semibold text-primary uppercase tracking-widest group-hover:text-gold transition-colors">New Campaign</h3>
                <p className="text-xs text-secondary mt-1">Start from scratch or template</p>
              </Card>
            </div>
            
            <Card className="p-0 overflow-hidden mt-6">
               <div className="p-5 border-b border-border bg-elevated/50">
                 <h3 className="text-sm font-semibold text-muted tracking-widest uppercase">Automated Engagements</h3>
               </div>
               <div className="divide-y divide-white/5">
                 <div className="p-5 flex items-center justify-between hover:bg-white/[0.02]">
                   <div>
                     <p className="text-sm font-semibold text-primary">Birthday Greetings</p>
                     <p className="text-xs text-secondary mt-1">Sends an automated SMS with ₹500 discount code on client's birthday.</p>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-xs text-muted">Sent to 42 clients this month</span>
                     <div className="w-10 h-5 bg-gold rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-card rounded-full absolute right-1 top-1"></div></div>
                   </div>
                 </div>
                 <div className="p-5 flex items-center justify-between hover:bg-white/[0.02]">
                   <div>
                     <p className="text-sm font-semibold text-primary">We Miss You (60+ Days No Visit)</p>
                     <p className="text-xs text-secondary mt-1">Sends a re-engagement email to clients who haven't visited in 2 months.</p>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-xs text-muted">Sent to 14 clients this month</span>
                     <div className="w-10 h-5 bg-gold rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-card rounded-full absolute right-1 top-1"></div></div>
                   </div>
                 </div>
                 <div className="p-5 flex items-center justify-between hover:bg-white/[0.02]">
                   <div>
                     <p className="text-sm font-semibold text-primary">Appointment Reminders</p>
                     <p className="text-xs text-secondary mt-1">Sends confirmation / 24h reminder / follow-up feedback request.</p>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-xs text-muted">Active</span>
                     <div className="w-10 h-5 bg-gold rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-card rounded-full absolute right-1 top-1"></div></div>
                   </div>
                 </div>
               </div>
            </Card>
          </div>
        )}

        {(activeTab === 'Loyalty' || activeTab === 'Gift Cards' || activeTab === 'Memberships') && (
           <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-card border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
             {activeTab === 'Loyalty' && <Award className="w-16 h-16 text-muted mb-4 opacity-20" />}
             {activeTab === 'Gift Cards' && <CreditCard className="w-16 h-16 text-muted mb-4 opacity-20" />}
             {activeTab === 'Memberships' && <Users className="w-16 h-16 text-muted mb-4 opacity-20" />}
             <h3 className="text-xl font-display text-primary mb-2">{activeTab} Module</h3>
             <p className="text-sm text-secondary max-w-sm text-center border border-dashed border-border p-4 bg-elevated/30 rounded-lg">
               The detailed UI logic for {activeTab} is scoped for the next iteration of the prototype. Structure and routing are successfully implemented.
             </p>
           </div>
        )}
      </div>
    </div>
  );
}

function CreateCampaignModal({ onClose }) {
  const [form, setForm] = useState({ name: '', type: 'Promotional', target: 'All Clients', offer: '', channel: 'SMS', date: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  const inputClass = 'w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold transition-all';
  const labelClass = 'text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-card border border-gold/20 rounded-card shadow-2xl border-t-[3px] border-t-gold animate-in slide-in-from-bottom-10 fade-in duration-300 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center"><Megaphone className="w-4 h-4 text-gold" /></div>
            <h2 className="text-xl font-display text-primary tracking-wide">Create Campaign</h2>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors"><X className="w-5 h-5" /></button>
        </div>

        {submitted ? (
          <div className="p-10 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center border border-gold/30">
              <Send className="w-7 h-7 text-gold" />
            </div>
            <h3 className="text-2xl font-display text-primary">Campaign Created!</h3>
            <p className="text-sm text-secondary">Your campaign <span className="text-gold font-semibold">"{form.name}"</span> has been scheduled and saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className={labelClass}>Campaign Name *</label>
              <input required value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} type="text" placeholder="e.g. Diwali Festive Special" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Campaign Type</label>
                <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className={inputClass}>
                  {['Promotional', 'Seasonal', 'Re-engagement', 'Referral', 'Loyalty'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Target Audience</label>
                <select value={form.target} onChange={e => setForm(p => ({...p, target: e.target.value}))} className={inputClass}>
                  {['All Clients', 'VIP Only', 'New Clients', 'Inactive (60+ days)', 'Gold Members'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Offer / Message *</label>
              <textarea required value={form.offer} onChange={e => setForm(p => ({...p, offer: e.target.value}))} placeholder="e.g. Get 20% off all Hair Spa services this week only!" rows={3} className={inputClass + ' resize-none'} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Channel</label>
                <select value={form.channel} onChange={e => setForm(p => ({...p, channel: e.target.value}))} className={inputClass}>
                  {['SMS', 'WhatsApp', 'Email', 'SMS + Email'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Schedule Date</label>
                <input value={form.date} onChange={e => setForm(p => ({...p, date: e.target.value}))} type="datetime-local" className={inputClass} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" className="w-1/3" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="w-2/3 shadow-[0_0_20px_rgba(201,168,76,0.2)]"><Send className="w-4 h-4 mr-2" /> Schedule Campaign</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
