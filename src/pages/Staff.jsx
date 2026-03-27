import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_STAFF, MOCK_APPOINTMENTS, MOCK_TRANSACTIONS } from '../data/mockData';
import { ArrowLeft, Star, Users, Phone, Mail, Calendar as CalendarIcon, Clock, TrendingUp, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { format, parseISO } from 'date-fns';

export default function Staff() {
  const [selectedStaff, setSelectedStaff] = useState(null);

  if (selectedStaff) {
    return <StaffDetail staff={selectedStaff} onBack={() => setSelectedStaff(null)} />;
  }

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Staff Management</h2>
          <p className="text-sm text-secondary tracking-wide">Manage your {MOCK_STAFF.length} team members</p>
        </div>
        <Button>Add Staff Member</Button>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {MOCK_STAFF.map(staff => (
          <Card key={staff.id} className="flex flex-col relative overflow-hidden group cursor-pointer hover:border-gold/50 transition-colors" onClick={() => setSelectedStaff(staff)}>
            <div className={`absolute top-0 left-0 w-full h-1 ${staff.status === 'Present' ? 'bg-accent-mint' : staff.status === 'On Break' ? 'bg-gold' : 'bg-accent-rose'}`}></div>
            <div className="absolute top-4 right-4">
              <Badge variant={staff.status === 'Present' ? 'success' : staff.status === 'On Break' ? 'gold' : 'danger'} className="text-[10px] px-2 py-0.5 border-none">
                {staff.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 mb-6 mt-2">
              <img src={staff.avatar} alt="" className="w-16 h-16 rounded-full border border-border group-hover:border-gold/50 transition-colors" />
              <div>
                <h3 className="text-xl font-display text-primary">{staff.name}</h3>
                <p className="text-xs text-muted font-semibold tracking-wider uppercase">{staff.role}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted text-xs tracking-wider uppercase">Rating</span>
                <span className="text-gold font-medium text-xs flex items-center font-mono"><Star className="w-3 h-3 fill-gold mr-1"/> {staff.rating}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted text-xs tracking-wider uppercase">Clients</span>
                <span className="text-primary font-medium text-xs font-mono">{staff.clientsServed} THIS MONTH</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted text-xs tracking-wider uppercase">Joined</span>
                <span className="text-secondary font-medium text-xs">{format(parseISO(staff.joinDate), 'MMM yyyy')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {staff.specializations.map(spec => (
                <div key={spec} className="bg-elevated border border-border px-2 py-1 rounded text-[10px] text-secondary">{spec}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StaffDetail({ staff, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Attendance', 'Clients', 'Earnings', 'Schedule'];

  // Mock Earnings Data
  const earningsData = [
    { name: 'Week 1', base: 5000, commission: 2400 },
    { name: 'Week 2', base: 5000, commission: 3100 },
    { name: 'Week 3', base: 5000, commission: 1800 },
    { name: 'Week 4', base: 5000, commission: 4200 },
  ];

  return (
    <div className="animate-in slide-in-from-right-8 duration-500 h-full flex flex-col pb-6">
      <button onClick={onBack} className="text-secondary hover:text-gold flex items-center text-sm mb-6 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Staff
      </button>

      <div className="flex gap-6 mb-6">
        <Card className="flex-1 p-6 relative overflow-hidden flex items-center gap-6 border-l-[3px] border-l-gold">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <img src={staff.avatar} alt="" className="w-20 h-20 rounded-full border-2 border-gold/30 shadow-xl z-10" />
          <div className="z-10 flex-1">
            <h2 className="text-3xl font-display text-primary mb-1">{staff.name}</h2>
            <p className="text-sm font-semibold text-gold tracking-widest uppercase mb-2">{staff.role}</p>
            <div className="flex gap-4 text-xs text-secondary">
              <span className="flex items-center"><Phone className="w-3 h-3 mr-1"/> +91 98XXX XXXXX</span>
              <span className="flex items-center"><Mail className="w-3 h-3 mr-1"/> {staff.name.split(' ')[0].toLowerCase()}@salonos.com</span>
            </div>
          </div>
          <div className="z-10 flex flex-col items-end gap-2">
            <Badge variant={staff.status === 'Present' ? 'success' : staff.status === 'On Break' ? 'gold' : 'danger'}>{staff.status}</Badge>
            <span className="text-xs text-muted flex items-center">Joined {format(parseISO(staff.joinDate), 'MMMM yyyy')}</span>
          </div>
        </Card>
      </div>

      <div className="flex gap-8 border-b border-border mb-6 px-4">
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
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-3 gap-6 animate-in fade-in duration-500">
             <Card className="flex flex-col gap-2 border-t-2 border-t-gold/50">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted flex items-center"><Users className="w-3 h-3 mr-1.5"/> Clients Served (Month)</span>
                <span className="text-3xl font-display text-primary">{staff.clientsServed}</span>
             </Card>
             <Card className="flex flex-col gap-2 border-t-2 border-t-accent-mint/50">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted flex items-center"><Star className="w-3 h-3 mr-1.5"/> Average Rating</span>
                <span className="text-3xl font-display text-primary">{staff.rating} <span className="text-sm text-muted font-ui">/ 5.0</span></span>
             </Card>
             <Card className="flex flex-col gap-2 border-t-2 border-t-accent-rose/50">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-muted flex items-center"><IndianRupee className="w-3 h-3 mr-1.5"/> Revenue Generated</span>
                <span className="text-3xl font-display text-primary">₹1.4L <span className="text-sm text-gold font-ui">THIS MONTH</span></span>
             </Card>
             
             <Card className="col-span-2">
                <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex gap-4 items-start relative">
                      {i !== 3 && <div className="absolute left-[11px] top-6 bottom-[-16px] w-[1px] bg-border"></div>}
                      <div className="w-6 h-6 rounded-full bg-elevated border border-border flex items-center justify-center shrink-0 z-10"><Clock className="w-3 h-3 text-secondary"/></div>
                      <div className="pt-0.5">
                        <p className="text-sm text-primary">Completed Hair Color appointment for Priya Sharma</p>
                        <p className="text-xs text-muted">{i * 2} hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
             </Card>

             <Card>
                <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {staff.specializations.map(spec => (
                    <div key={spec} className="bg-gold/10 border border-gold/30 text-gold px-3 py-1.5 rounded-pill text-xs font-medium">{spec}</div>
                  ))}
                </div>
             </Card>
          </div>
        )}

        {activeTab === 'Earnings' && (
          <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
            <Card className="col-span-8 flex flex-col min-h-[400px]">
              <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6">Monthly Earnings Breakdown</h3>
              <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData} margin={{top: 20, right: 0, left: -20, bottom: 0}}>
                    <XAxis dataKey="name" stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--border)" tick={{fill: 'var(--text-muted)', fontSize: 11}} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{fill: 'var(--bg-elevated)'}} contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }} />
                    <Bar dataKey="base" stackId="a" fill="var(--border-hover)" radius={[0, 0, 4, 4]} barSize={32} name="Base Salary" />
                    <Bar dataKey="commission" stackId="a" fill="var(--gold)" radius={[4, 4, 0, 0]} barSize={32} name="Commission" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="col-span-4 space-y-6">
              <Card className="bg-gradient-to-br from-card to-elevated">
                <h3 className="text-[10px] font-semibold text-muted tracking-widest uppercase mb-4">Total Earnings (This Month)</h3>
                <p className="text-5xl font-display text-gold mb-2">₹31,500</p>
                <div className="flex justify-between text-xs text-secondary border-t border-border pt-3 mt-4">
                  <span>Base: ₹20,000</span>
                  <span>Comm: ₹11,500</span>
                </div>
              </Card>

              <Card>
                <h3 className="text-[10px] font-semibold text-muted tracking-widest uppercase mb-4">Commission Rates</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center"><span className="text-primary">Hair Services</span><span className="font-mono text-gold">15%</span></div>
                  <div className="flex justify-between items-center"><span className="text-primary">Skin & Spa</span><span className="font-mono text-gold">10%</span></div>
                  <div className="flex justify-between items-center"><span className="text-primary">Product Sales</span><span className="font-mono text-gold">5%</span></div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {(activeTab === 'Attendance' || activeTab === 'Clients' || activeTab === 'Schedule') && (
           <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-card border border-border animate-in fade-in duration-500">
             <CalendarIcon className="w-12 h-12 text-muted mb-4 opacity-20" />
             <p className="text-muted tracking-widest uppercase text-sm font-semibold mb-2">{activeTab} Info</p>
             <p className="text-xs text-secondary max-w-sm text-center">Detailed view for {activeTab.toLowerCase()} is being formulated for prototype phase 2.</p>
           </div>
        )}
      </div>
    </div>
  )
}
