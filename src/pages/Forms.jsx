import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ClipboardList, Star, ThumbsUp, MessageSquare, Plus, BarChart2, Eye, Copy } from 'lucide-react';

const MOCK_FORMS = [
  {
    id: 1,
    title: 'Post-Visit Feedback',
    type: 'Survey',
    responses: 142,
    avgRating: 4.7,
    status: 'Active',
    lastUpdated: '2 days ago',
    questions: 5,
  },
  {
    id: 2,
    title: 'New Client Intake Form',
    type: 'Form',
    responses: 88,
    avgRating: null,
    status: 'Active',
    lastUpdated: '1 week ago',
    questions: 12,
  },
  {
    id: 3,
    title: 'Staff Satisfaction Survey',
    type: 'Survey',
    responses: 9,
    avgRating: 4.2,
    status: 'Draft',
    lastUpdated: '3 days ago',
    questions: 8,
  },
  {
    id: 4,
    title: 'Allergy & Sensitivity Disclosure',
    type: 'Form',
    responses: 203,
    avgRating: null,
    status: 'Active',
    lastUpdated: '2 weeks ago',
    questions: 7,
  },
];

const RECENT_RESPONSES = [
  { name: 'Priya Sharma', form: 'Post-Visit Feedback', rating: 5, comment: 'Absolutely loved the Keratin treatment! Meera is magic.', time: '2h ago' },
  { name: 'Anjali Mehta', form: 'Post-Visit Feedback', rating: 4, comment: 'Great experience as always. Could be a bit faster.', time: '4h ago' },
  { name: 'Sunita Rao', form: 'New Client Intake', rating: null, comment: 'Completed intake form.', time: 'Yesterday' },
  { name: 'Kavya Pillai', form: 'Post-Visit Feedback', rating: 5, comment: 'My hair has never looked better!', time: 'Yesterday' },
];

export default function Forms() {
  const [activeTab, setActiveTab] = useState('Forms & Surveys');
  const tabs = ['Forms & Surveys', 'Responses', 'Analytics'];

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Forms & Surveys</h2>
          <p className="text-sm text-secondary tracking-wide">Collect client & staff feedback with precision</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> Create Form</Button>
      </header>

      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="flex flex-col gap-1 border-t-2 border-t-gold">
          <span className="text-[10px] text-muted uppercase tracking-widest font-semibold">Total Forms</span>
          <span className="text-3xl font-display text-primary">{MOCK_FORMS.length}</span>
        </Card>
        <Card className="flex flex-col gap-1 border-t-2 border-t-accent-mint">
          <span className="text-[10px] text-muted uppercase tracking-widest font-semibold">Total Responses</span>
          <span className="text-3xl font-display text-primary">{MOCK_FORMS.reduce((s, f) => s + f.responses, 0)}</span>
        </Card>
        <Card className="flex flex-col gap-1 border-t-2 border-t-accent-rose">
          <span className="text-[10px] text-muted uppercase tracking-widest font-semibold">Avg. Rating</span>
          <span className="text-3xl font-display text-gold flex items-center gap-2">4.6 <Star className="w-5 h-5 fill-gold text-gold" /></span>
        </Card>
        <Card className="flex flex-col gap-1 border-t-2 border-t-border-hover">
          <span className="text-[10px] text-muted uppercase tracking-widest font-semibold">Active Forms</span>
          <span className="text-3xl font-display text-primary">{MOCK_FORMS.filter(f => f.status === 'Active').length}</span>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-border mb-6 px-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold tracking-wide uppercase transition-colors relative ${activeTab === tab ? 'text-gold' : 'text-muted hover:text-primary'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold rounded-t-sm shadow-[0_0_10px_rgba(201,168,76,0.5)]" />}
          </button>
        ))}
      </div>

      {activeTab === 'Forms & Surveys' && (
        <div className="grid grid-cols-2 gap-6 animate-in fade-in duration-500">
          {MOCK_FORMS.map(form => (
            <Card key={form.id} className="flex flex-col group hover:border-gold/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  {form.type === 'Survey' ? <Star className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                </div>
                <Badge variant={form.status === 'Active' ? 'success' : 'default'} className="text-[10px]">{form.status}</Badge>
              </div>
              <h3 className="text-lg font-display text-primary mb-1">{form.title}</h3>
              <p className="text-xs text-muted mb-4">{form.type} • {form.questions} questions • Updated {form.lastUpdated}</p>

              <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 mb-4">
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-widest">Responses</p>
                  <p className="text-xl font-display text-primary">{form.responses}</p>
                </div>
                {form.avgRating !== null && (
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-widest">Avg. Rating</p>
                    <p className="text-xl font-display text-gold flex items-center gap-1">{form.avgRating} <Star className="w-3 h-3 fill-gold" /></p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-auto">
                <Button variant="secondary" className="flex-1 py-1.5 text-xs"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
                <Button variant="secondary" className="flex-1 py-1.5 text-xs"><BarChart2 className="w-3.5 h-3.5 mr-1" /> Results</Button>
                <Button variant="secondary" className="py-1.5 px-3 text-xs"><Copy className="w-3.5 h-3.5" /></Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Responses' && (
        <div className="space-y-4 animate-in fade-in duration-500">
          {RECENT_RESPONSES.map((r, i) => (
            <Card key={i} className="flex items-start gap-4 hover:border-gold/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center shrink-0 text-secondary font-display text-lg">
                {r.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-primary text-sm">{r.name}</span>
                  <div className="flex items-center gap-3">
                    {r.rating && (
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <Star key={si} className={`w-3.5 h-3.5 ${si < r.rating ? 'fill-gold text-gold' : 'text-muted'}`} />
                        ))}
                      </div>
                    )}
                    <span className="text-xs text-muted">{r.time}</span>
                  </div>
                </div>
                <p className="text-xs text-muted mb-1">{r.form}</p>
                <p className="text-sm text-secondary italic">"{r.comment}"</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Analytics' && (
        <Card className="flex flex-col items-center justify-center min-h-[300px] animate-in fade-in duration-500">
          <BarChart2 className="w-12 h-12 text-muted opacity-20 mb-4" />
          <p className="text-muted tracking-widest uppercase text-sm font-semibold mb-2">Response Analytics</p>
          <p className="text-xs text-secondary max-w-sm text-center">Detailed charts and breakdowns for survey responses are being implemented in Phase 2.</p>
        </Card>
      )}
    </div>
  );
}
