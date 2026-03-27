import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_APPOINTMENTS, MOCK_TRANSACTIONS, MOCK_STAFF } from '../data/mockData';
import { ArrowUpRight, ArrowDownRight, IndianRupee, Clock, Users, Scissors } from 'lucide-react';
import { format, isToday, parseISO, subDays } from 'date-fns';

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState('Weekly');
  
  // KPI Calculations
  const todayTxns = MOCK_TRANSACTIONS.filter(t => isToday(parseISO(t.date)));
  const todayRevenue = todayTxns.reduce((sum, t) => sum + t.amount, 0);
  
  const todayApps = MOCK_APPOINTMENTS.filter(a => isToday(parseISO(a.date)));
  const activeApps = todayApps.filter(a => a.status === 'Confirmed' || a.status === 'Checked In').length;

  const staffOnDuty = MOCK_STAFF.filter(s => s.status === 'Present').length;

  // Chart Data Preparation
  const chartData = useMemo(() => {
    // Generate last 14 days for a nice curve
    const data = [];
    for(let i=13; i>=0; i--) {
      const d = subDays(new Date(), i);
      const dayTxns = MOCK_TRANSACTIONS.filter(t => new Date(t.date).toDateString() === d.toDateString());
      data.push({
        name: format(d, 'MMM dd'),
        revenue: dayTxns.reduce((sum, t) => sum + t.amount, 0)
      });
    }
    return data;
  }, []);

  const topServicesData = [
    { name: 'Keratin Treatment', value: 45 },
    { name: 'Hair Color', value: 32 },
    { name: 'Balayage', value: 28 },
    { name: 'Advanced Facial', value: 15 },
  ];

  return (
    <div className="animate-in fade-in duration-700 pb-12">
      <header className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase">Overview</h2>
          <p className="text-secondary mt-1">{format(new Date(), 'EEEE, MMMM do, yyyy')}</p>
        </div>
        <div className="flex gap-2">
           {/* Actions */}
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted tracking-widest uppercase">Today's Revenue</span>
            <Badge variant="success" className="bg-accent-mint/10 border-none px-1.5 text-accent-mint"><ArrowUpRight className="w-3 h-3 mr-1"/> 12%</Badge>
          </div>
          <span className="text-4xl font-display text-gold">₹{todayRevenue.toLocaleString()}</span>
          <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <IndianRupee className="w-16 h-16 text-gold"/>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted tracking-widest uppercase">Appointments</span>
            <Badge variant="danger" className="bg-accent-rose/10 border-none px-1.5 text-accent-rose"><ArrowDownRight className="w-3 h-3 mr-1"/> 2</Badge>
          </div>
          <span className="text-4xl font-display text-primary">{activeApps}</span>
          <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Clock className="w-16 h-16 text-primary"/>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted tracking-widest uppercase">New Clients</span>
            <Badge variant="success" className="bg-accent-mint/10 border-none px-1.5 text-accent-mint"><ArrowUpRight className="w-3 h-3 mr-1"/> 8%</Badge>
          </div>
          <span className="text-4xl font-display text-primary">24</span>
          <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-16 h-16 text-primary"/>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted tracking-widest uppercase">Staff On Duty</span>
            <Badge variant="gold" className="border-none px-1.5">Live</Badge>
          </div>
          <span className="text-4xl font-display text-primary">{staffOnDuty} <span className="text-sm text-muted font-ui">/ {MOCK_STAFF.length}</span></span>
          <div className="absolute bottom-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Scissors className="w-16 h-16 text-primary"/>
          </div>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        <Card className="col-span-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-display text-primary">Revenue Trend</h3>
              <p className="text-sm text-muted">Last 14 Days</p>
            </div>
            <div className="bg-elevated rounded-pill p-1 flex">
              {['Daily', 'Weekly', 'Monthly'].map(p => (
                <button 
                  key={p} 
                  onClick={() => setChartPeriod(p)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-pill transition-colors ${chartPeriod === p ? 'bg-card text-gold shadow-glow' : 'text-secondary hover:text-primary'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[300px] w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} tickFormatter={v => `₹${v/1000}k`}/>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }}
                  itemStyle={{ color: 'var(--gold)' }}
                  labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-4 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-display text-primary">Today's Schedule</h3>
            <button className="text-xs text-gold hover:text-gold-light transition-colors">View Calendar</button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
            {todayApps.slice(0, 5).map(app => (
              <div key={app.id} className="p-3 rounded-lg border border-border bg-elevated/50 hover:border-gold/30 transition-colors flex items-center gap-3">
                <div className={`w-1 h-10 rounded-full ${app.serviceColor}`}></div>
                <img src={app.clientAvatar} alt="" className="w-10 h-10 rounded-full border border-border"/>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary truncate">{app.clientName}</p>
                  <p className="text-xs text-muted truncate">{app.serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-secondary">{format(parseISO(app.date), 'HH:mm')}</p>
                  <p className="text-[10px] text-gold">{app.staffName}</p>
                </div>
              </div>
            ))}
            {todayApps.length === 0 && (
              <div className="text-center text-muted py-8 text-sm">No more appointments today.</div>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <h3 className="text-lg font-display text-primary mb-6">Top Services</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {topServicesData.map((svc, idx) => (
              <div key={svc.name} className="space-y-1.5 group">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-primary font-medium">{svc.name}</span>
                  <span className={`font-mono text-xs ${idx === 0 ? 'text-gold' : 'text-muted'}`}>{svc.value} appts</span>
                </div>
                <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-125 ${idx === 0 ? 'bg-gold' : 'bg-border-hover'}`}
                    style={{ width: `${(svc.value / topServicesData[0].value) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-lg font-display text-primary mb-6">Leaderboard</h3>
          <div className="space-y-4">
            {MOCK_STAFF.sort((a,b) => b.clientsServed - a.clientsServed).slice(0,4).map((staff, idx) => (
              <div key={staff.id} className="flex items-center gap-4">
                <div className="w-6 text-center text-sm font-display text-muted">{idx + 1}</div>
                <img src={staff.avatar} alt="" className="w-8 h-8 rounded-full border border-border"/>
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary">{staff.name}</p>
                  <p className="text-[10px] text-muted">{staff.clientsServed} clients</p>
                </div>
                <div className="text-sm font-mono text-gold">★ {staff.rating}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-lg font-display text-primary mb-6">Recent Transactions</h3>
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.slice(0, 4).map(txn => (
              <div key={txn.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary">{txn.clientName}</p>
                  <p className="text-[10px] text-muted">{txn.serviceName} • {txn.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-primary">₹{txn.amount}</p>
                  <p className="text-[10px] text-accent-mint">{txn.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
