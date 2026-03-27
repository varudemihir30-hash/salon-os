import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_TRANSACTIONS, MOCK_CLIENTS } from '../data/mockData';
import { FileText, Download, Plus, Search, Eye, Send, CheckCircle, Clock, XCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const STATUS = {
  paid: { label: 'Paid', icon: CheckCircle, class: 'text-accent-mint' },
  pending: { label: 'Pending', icon: Clock, class: 'text-gold' },
  overdue: { label: 'Overdue', icon: XCircle, class: 'text-accent-rose' },
};

export default function Invoices() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Paid', 'Pending', 'Overdue'];

  // Build invoice list from transactions
  const invoices = MOCK_TRANSACTIONS.slice(0, 15).map((t, i) => ({
    id: `INV-${String(1000 + i).padStart(4, '0')}`,
    client: MOCK_CLIENTS.find(c => c.id === t.clientId)?.name || 'Walk-in',
    service: t.serviceName,
    date: t.date,
    amount: t.amount,
    method: t.method,
    status: i % 5 === 0 ? 'overdue' : i % 3 === 0 ? 'pending' : 'paid',
    tax: Math.round(t.amount * 0.18),
  }));

  const filtered = activeFilter === 'All' ? invoices : invoices.filter(inv => inv.status === activeFilter.toLowerCase());

  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Invoices & Billing</h2>
          <p className="text-sm text-secondary tracking-wide">Manage and track all client invoices</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search invoices..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-pill text-sm text-primary focus:outline-none focus:border-gold w-56 transition-all" />
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> Create Invoice</Button>
        </div>
      </header>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="text-center border-t-2 border-t-accent-mint">
          <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-2">Total Collected</p>
          <p className="text-4xl font-display text-primary">₹{totalRevenue.toLocaleString()}</p>
        </Card>
        <Card className="text-center border-t-2 border-t-gold">
          <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-2">Pending</p>
          <p className="text-4xl font-display text-gold">₹{totalPending.toLocaleString()}</p>
        </Card>
        <Card className="text-center border-t-2 border-t-accent-rose">
          <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-2">Overdue</p>
          <p className="text-4xl font-display text-accent-rose">₹{totalOverdue.toLocaleString()}</p>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-pill text-xs font-semibold uppercase tracking-wider transition-colors border ${activeFilter === f ? 'bg-gold/10 text-gold border-gold/40' : 'border-border text-muted hover:text-primary hover:border-border-hover'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 bg-elevated/50 p-4 border-b border-border text-[10px] font-semibold text-muted tracking-widest uppercase">
          <div className="col-span-2 pl-4">Invoice #</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-2">Service</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1 text-right">Tax</div>
          <div className="col-span-1 text-right">Total</div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filtered.map((inv) => {
            const s = STATUS[inv.status];
            const Icon = s.icon;
            return (
              <div key={inv.id} className="grid grid-cols-12 p-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-2 pl-4 font-mono text-xs text-gold">{inv.id}</div>
                <div className="col-span-3 text-sm font-medium text-primary">{inv.client}</div>
                <div className="col-span-2 text-xs text-secondary truncate pr-3">{inv.service}</div>
                <div className="col-span-1 text-xs text-muted">{format(parseISO(inv.date), 'MMM dd')}</div>
                <div className="col-span-1 font-mono text-xs text-muted text-right">₹{inv.tax}</div>
                <div className="col-span-1 font-mono text-sm text-primary text-right">₹{(inv.amount + inv.tax).toLocaleString()}</div>
                <div className="col-span-1 flex justify-center">
                  <Badge variant="default" className={`text-[9px] flex items-center gap-1 ${s.class} border-current/30 bg-current/10`}>
                    <Icon className="w-2.5 h-2.5" /> {s.label}
                  </Badge>
                </div>
                <div className="col-span-1 flex justify-center gap-1">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted hover:text-gold hover:border-gold/50 transition-colors"><Eye className="w-3 h-3" /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted hover:text-gold hover:border-gold/50 transition-colors"><Send className="w-3 h-3" /></button>
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-border text-muted hover:text-gold hover:border-gold/50 transition-colors"><Download className="w-3 h-3" /></button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
