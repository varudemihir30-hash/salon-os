import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, AlertCircle, RefreshCw } from 'lucide-react';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Revenue');
  const tabs = ['Revenue', 'Services', 'Staff', 'Retention'];

  // Mock Data
  const revenueData = [
    { month: 'Jan', rev: 320, prevRev: 280 },
    { month: 'Feb', rev: 380, prevRev: 310 },
    { month: 'Mar', rev: 420, prevRev: 330 },
    { month: 'Apr', rev: 480, prevRev: 370 },
    { month: 'May', rev: 450, prevRev: 400 },
    { month: 'Jun', rev: 520, prevRev: 440 },
  ];

  const retentionData = [
    { name: 'New Clients', value: 35 },
    { name: 'Returning', value: 65 },
  ];
  const RETENTION_COLORS = ['var(--border-hover)', 'var(--gold)'];

  const retentionCurve = [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 71 },
    { month: 'Apr', rate: 70 },
    { month: 'May', rate: 74 },
    { month: 'Jun', rate: 78 },
  ];

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Reports & Analytics</h2>
          <p className="text-sm text-secondary tracking-wide">Deep dive into your salon's performance</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary"><RefreshCw className="w-4 h-4 mr-2" /> Refresh Data</Button>
          <Button><Download className="w-4 h-4 mr-2" /> Export All</Button>
        </div>
      </header>

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
        {activeTab === 'Revenue' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-display text-primary">Revenue Growth</h3>
                  <p className="text-xs text-muted">Year over Year Comparison (in thousands)</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center text-gold"><div className="w-3 h-3 bg-gold mr-2 rounded-sm border border-gold/50"></div>This Year</span>
                  <span className="flex items-center text-muted"><div className="w-3 h-3 bg-border-hover mr-2 rounded-sm"></div>Last Year</span>
                </div>
              </div>
              
              <div className="h-[350px] w-full -ml-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevCurve" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--gold)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="var(--border)" tick={{fill: 'var(--text-muted)'}} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--border)" tick={{fill: 'var(--text-muted)'}} tickLine={false} axisLine={false} tickFormatter={v => `₹${v}k`} />
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }} itemStyle={{ color: 'var(--gold)' }} />
                    <Area type="monotone" dataKey="prevRev" stroke="var(--border-hover)" strokeWidth={2} fillOpacity={0} />
                    <Area type="monotone" dataKey="rev" stroke="var(--gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevCurve)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
              <Card>
                <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-4">Best Revenue Days (This Month)</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-primary text-sm">Saturday, 12th Mar</span><span className="font-mono text-gold text-sm">₹42,500</span></div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-primary text-sm">Sunday, 13th Mar</span><span className="font-mono text-gold text-sm">₹38,200</span></div>
                   <div className="flex justify-between items-center"><span className="text-primary text-sm">Friday, 11th Mar</span><span className="font-mono text-gold text-sm">₹34,100</span></div>
                </div>
              </Card>
              <Card>
                <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-4">Slowest Days (This Month)</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-primary text-sm">Tuesday, 8th Mar</span><span className="font-mono text-muted text-sm">₹12,400</span></div>
                   <div className="flex justify-between items-center border-b border-white/5 pb-2"><span className="text-primary text-sm">Monday, 7th Mar</span><span className="font-mono text-muted text-sm">₹14,500</span></div>
                   <div className="flex justify-between items-center"><span className="text-primary text-sm">Wednesday, 9th Mar</span><span className="font-mono text-muted text-sm">₹15,200</span></div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'Services' && (
          <Card className="p-0 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-border bg-elevated/50 flex justify-between items-center">
              <h3 className="text-lg font-display text-primary">Service Performance Matrix</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-card text-[10px] text-muted tracking-widest uppercase">
                <tr>
                  <th className="font-semibold p-4 pl-6">Service Name</th>
                  <th className="font-semibold p-4">Times Performed</th>
                  <th className="font-semibold p-4">Total Revenue</th>
                  <th className="font-semibold p-4">Avg Duration</th>
                  <th className="font-semibold p-4 pr-6">Top Stylist</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02] transition-colors relative">
                  <td className="p-4 pl-6 text-primary font-medium flex items-center gap-3">
                    Keratin Treatment <Badge variant="gold" className="text-[9px]">BEST SELLER</Badge>
                  </td>
                  <td className="p-4 text-secondary">142</td>
                  <td className="p-4 text-gold font-mono">₹6,39,000</td>
                  <td className="p-4 text-secondary">2h 30m</td>
                  <td className="p-4 text-primary">Meera K.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Hair Color (Global)</td>
                  <td className="p-4 text-secondary">98</td>
                  <td className="p-4 text-gold font-mono">₹3,43,000</td>
                  <td className="p-4 text-secondary">2h</td>
                  <td className="p-4 text-primary">Meera K.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Advanced Facial</td>
                  <td className="p-4 text-secondary">115</td>
                  <td className="p-4 text-gold font-mono">₹2,30,000</td>
                  <td className="p-4 text-secondary">1h</td>
                  <td className="p-4 text-primary">Sunita R.</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Hair Spa</td>
                  <td className="p-4 text-secondary">164</td>
                  <td className="p-4 text-gold font-mono">₹2,46,000</td>
                  <td className="p-4 text-secondary">1h</td>
                  <td className="p-4 text-primary">Pooja D.</td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'Staff' && (
          <Card className="p-0 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-border bg-elevated/50 flex justify-between items-center">
              <h3 className="text-lg font-display text-primary">Staff Productivity</h3>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-card text-[10px] text-muted tracking-widest uppercase">
                <tr>
                  <th className="font-semibold p-4 pl-6">Stylist</th>
                  <th className="font-semibold p-4">Clients / Day (Avg)</th>
                  <th className="font-semibold p-4">Revenue Generated</th>
                  <th className="font-semibold p-4">Hours Worked</th>
                  <th className="font-semibold p-4">Revenue / Hour</th>
                  <th className="font-semibold p-4 pr-6">Efficiency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Meera K.</td>
                  <td className="p-4 text-secondary">4.8</td>
                  <td className="p-4 text-gold font-mono">₹1,42,000</td>
                  <td className="p-4 text-secondary">160h</td>
                  <td className="p-4 text-primary font-mono cursor-help" title="High value services">₹887 / h</td>
                  <td className="p-4 pr-6 text-2xl">🥇</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Sunita R.</td>
                  <td className="p-4 text-secondary">5.2</td>
                  <td className="p-4 text-gold font-mono">₹1,12,000</td>
                  <td className="p-4 text-secondary">145h</td>
                  <td className="p-4 text-primary font-mono">₹772 / h</td>
                  <td className="p-4 pr-6 text-2xl">🥈</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 pl-6 text-primary font-medium">Pooja D.</td>
                  <td className="p-4 text-secondary">6.5</td>
                  <td className="p-4 text-gold font-mono">₹85,000</td>
                  <td className="p-4 text-secondary">150h</td>
                  <td className="p-4 text-primary font-mono">₹566 / h</td>
                  <td className="p-4 pr-6 text-2xl">🥉</td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {activeTab === 'Retention' && (
          <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="col-span-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6 w-full text-left">New vs Returning</h3>
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={retentionData} innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                      {retentionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={RETENTION_COLORS[index % RETENTION_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }} cursor={{fill: 'transparent'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-display text-gold">65%</span>
                  <span className="text-[10px] text-muted uppercase tracking-widest">Retention</span>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                 {retentionData.map((d,i) => (
                   <div key={d.name} className="flex items-center text-xs text-secondary"><div className="w-2 h-2 rounded-full mr-1.5" style={{backgroundColor: RETENTION_COLORS[i]}}></div>{d.name} ({d.value}%)</div>
                 ))}
              </div>
            </Card>

            <Card className="col-span-8 flex flex-col">
               <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Retention Rate Trend</h3>
               <div className="h-[250px] w-full -ml-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={retentionCurve}>
                     <XAxis dataKey="month" stroke="var(--border)" tick={{fill: 'var(--text-muted)'}} tickLine={false} axisLine={false} />
                     <YAxis stroke="var(--border)" tick={{fill: 'var(--text-muted)'}} tickLine={false} axisLine={false} domain={[50, 100]} tickFormatter={v => `${v}%`} />
                     <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }} itemStyle={{ color: 'var(--gold)' }} formatter={v => `${v}%`} />
                     <Line type="monotone" dataKey="rate" stroke="var(--gold)" strokeWidth={3} dot={{ fill: 'var(--gold)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: 'white' }} />
                   </LineChart>
                 </ResponsiveContainer>
               </div>
            </Card>

            <Card className="col-span-12 p-0 overflow-hidden">
               <div className="p-6 border-b border-border bg-elevated/50 flex justify-between items-center">
                 <h3 className="text-lg font-display text-accent-rose flex items-center"><AlertCircle className="w-5 h-5 mr-2" /> Churn Risk Clients</h3>
                 <span className="text-xs text-secondary">Clients who haven't visited in 60+ days</span>
               </div>
               <table className="w-full text-left text-sm">
                 <thead className="bg-card text-[10px] text-muted tracking-widest uppercase">
                   <tr>
                     <th className="font-semibold p-4 pl-6">Client Name</th>
                     <th className="font-semibold p-4">Last Visit</th>
                     <th className="font-semibold p-4">Total Visits</th>
                     <th className="font-semibold p-4">Lifetime Spend</th>
                     <th className="font-semibold p-4 text-right pr-6">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="p-4 pl-6 text-primary font-medium">Kriti Desai</td>
                     <td className="p-4 text-accent-rose">75 days ago (Jan 10)</td>
                     <td className="p-4 text-secondary">12</td>
                     <td className="p-4 text-gold font-mono">₹28,500</td>
                     <td className="p-4 pr-6 text-right"><Button variant="secondary" className="text-[10px] py-1 px-3 h-auto">Send Re-engagement</Button></td>
                   </tr>
                   <tr className="hover:bg-white/[0.02] transition-colors">
                     <td className="p-4 pl-6 text-primary font-medium">Rajiv Menon</td>
                     <td className="p-4 text-accent-rose">82 days ago (Jan 3)</td>
                     <td className="p-4 text-secondary">8</td>
                     <td className="p-4 text-gold font-mono">₹15,200</td>
                     <td className="p-4 pr-6 text-right"><Button variant="secondary" className="text-[10px] py-1 px-3 h-auto">Send Re-engagement</Button></td>
                   </tr>
                 </tbody>
               </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
