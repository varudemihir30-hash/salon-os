import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Download, AlertCircle, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { format } from 'date-fns';

export default function Sales() {
  const [payPeriod, setPayPeriod] = useState('Today');

  // Mock Data
  const paymentMethods = [
    { method: 'UPI', percent: 48, amount: 13632, color: 'bg-gold' },
    { method: 'Cash', percent: 28, amount: 7952, color: 'bg-accent-mint' },
    { method: 'Card', percent: 24, amount: 6816, color: 'bg-accent-rose' },
  ];

  const salesByCategory = [
    { name: 'Mon', Hair: 12000, Skin: 4000, Nails: 1500, Spa: 3000 },
    { name: 'Tue', Hair: 14000, Skin: 3500, Nails: 1200, Spa: 2800 },
    { name: 'Wed', Hair: 11000, Skin: 5000, Nails: 2000, Spa: 4000 },
    { name: 'Thu', Hair: 16000, Skin: 4500, Nails: 1800, Spa: 3500 },
    { name: 'Fri', Hair: 22000, Skin: 7000, Nails: 3000, Spa: 5000 },
    { name: 'Sat', Hair: 28000, Skin: 9000, Nails: 4500, Spa: 8000 },
    { name: 'Sun', Hair: 32000, Skin: 11000, Nails: 5000, Spa: 9500 },
  ];

  const salesByStylist = [
    { name: 'Meera K.', revenue: 84500 },
    { name: 'Sunita R.', revenue: 62300 },
    { name: 'Pooja D.', revenue: 45800 },
    { name: 'Raj S.', revenue: 38200 },
    { name: 'Anita B.', revenue: 29400 },
  ];

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Sales & Payments</h2>
          <p className="text-sm text-secondary tracking-wide">Revenue hub and financial breakdown</p>
        </div>
        <Button variant="secondary"><Download className="w-4 h-4 mr-2" /> Export Report</Button>
      </header>

      {/* Top KPIs */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="flex flex-col gap-2 relative overflow-hidden group border-t-2 border-t-gold text-center">
          <span className="text-[10px] font-semibold text-muted tracking-widest uppercase">Today's Total</span>
          <span className="text-5xl font-display text-gold mt-2">₹28,400</span>
          <div className="mt-2 text-xs text-accent-mint flex items-center justify-center"><ArrowUpRight className="w-3 h-3 mr-1"/> 18% vs Last Tuesday</div>
        </Card>
        <Card className="flex flex-col gap-2 relative overflow-hidden group border-t-2 border-t-accent-mint text-center">
          <span className="text-[10px] font-semibold text-muted tracking-widest uppercase">This Month</span>
          <span className="text-5xl font-display text-primary mt-2">₹4,82k</span>
          <div className="mt-2 text-xs text-secondary">Target: ₹6.5L (74% achieved)</div>
        </Card>
        <Card className="flex flex-col gap-2 relative overflow-hidden group border-t-2 border-t-accent-rose text-center">
          <span className="text-[10px] font-semibold text-muted tracking-widest uppercase">Outstanding / Pending</span>
          <span className="text-5xl font-display text-accent-rose mt-2">₹12,400</span>
          <div className="mt-2 text-xs text-accent-rose flex items-center justify-center"><AlertCircle className="w-3 h-3 mr-1"/> 4 Pending Invoices</div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* Payment Breakdown Panel */}
        <Card className="col-span-4 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-muted tracking-widest uppercase">Payment Methods</h3>
            <div className="bg-elevated rounded-pill p-1 flex">
              {['Today', 'This Week', 'Month'].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPayPeriod(p)}
                  className={`px-3 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-pill transition-colors ${payPeriod === p ? 'bg-card text-gold shadow-glow' : 'text-secondary hover:text-primary'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {paymentMethods.map(pm => (
              <div key={pm.method} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-primary flex items-center w-24">{pm.method}</span>
                  <span className="text-muted tracking-widest text-[10px] font-mono mt-1">{pm.percent}%</span>
                  <span className="font-mono text-gold text-right w-24">₹{pm.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${pm.color} rounded-full transition-all duration-1000 ease-out group-hover:brightness-125`} 
                    style={{width: `${pm.percent}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sales By Category Stacked Bar */}
        <Card className="col-span-8 flex flex-col">
          <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Revenue by Category</h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <XAxis dataKey="name" stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} tickFormatter={v => `₹${v/1000}k`} />
                <Tooltip cursor={{fill: 'var(--bg-elevated)'}} contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', color: 'var(--text-secondary)' }} />
                <Bar dataKey="Hair" stackId="a" fill="var(--gold)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Skin" stackId="a" fill="var(--accent-mint)" />
                <Bar dataKey="Nails" stackId="a" fill="var(--accent-rose)" />
                <Bar dataKey="Spa" stackId="a" fill="var(--border-hover)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Daily Earnings Log */}
        <Card className="col-span-8 overflow-hidden p-0 flex flex-col h-[300px]">
          <div className="p-5 border-b border-border flex justify-between items-center bg-elevated/50">
            <h3 className="text-sm font-semibold text-muted tracking-widest uppercase">Daily Earnings Log</h3>
            <Button variant="ghost" className="h-8 px-3 py-1 text-xs"><Download className="w-3 h-3 mr-1"/> CSV</Button>
          </div>
          <div className="overflow-y-auto scrollbar-hide flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-elevated/20 text-[10px] text-muted tracking-widest uppercase sticky top-0 z-10">
                <tr>
                  <th className="font-semibold p-4">Date</th>
                  <th className="font-semibold p-4">Services</th>
                  <th className="font-semibold p-4">Products</th>
                  <th className="font-semibold p-4">Tax (18%)</th>
                  <th className="font-semibold p-4 text-right">Net Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[1,2,3,4,5].map(i => {
                  const srv = 18000 + (Math.random() * 10000);
                  const prd = 2000 + (Math.random() * 3000);
                  const tax = (srv + prd) * 0.18;
                  const total = srv + prd + tax;
                  
                  return (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-primary font-medium">{format(new Date(Date.now() - i*86400000), 'MMM dd, yy')}</td>
                      <td className="p-4 text-secondary font-mono">₹{Math.floor(srv).toLocaleString()}</td>
                      <td className="p-4 text-secondary font-mono">₹{Math.floor(prd).toLocaleString()}</td>
                      <td className="p-4 text-muted font-mono">₹{Math.floor(tax).toLocaleString()}</td>
                      <td className="p-4 text-gold font-mono text-right">₹{Math.floor(total).toLocaleString()}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Sales by Stylist */}
        <Card className="col-span-4 flex flex-col h-[300px]">
          <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Revenue by Stylist</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByStylist} layout="vertical" margin={{top: 0, right: 0, left: -10, bottom: 0}}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: 'var(--text-secondary)', fontSize: 11}} width={80} />
                <Tooltip cursor={{fill: 'var(--bg-elevated)'}} contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)' }} formatter={v => `₹${v.toLocaleString()}`} />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={12}>
                  {salesByStylist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--gold)' : 'var(--border-hover)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
