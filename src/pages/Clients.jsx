import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_CLIENTS, MOCK_TRANSACTIONS, MOCK_STAFF } from '../data/mockData';
import { Search, Filter, ChevronRight, Star, ArrowLeft, Clock, History, Package, CreditCard, IndianRupee } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState(null);

  if (selectedClient) {
    return <ClientDetail client={selectedClient} onBack={() => setSelectedClient(null)} />;
  }

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Client Profiles</h2>
          <p className="text-sm text-secondary tracking-wide">Manage your {MOCK_CLIENTS.length} clients</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search clients..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-pill text-sm text-primary focus:outline-none focus:border-gold w-64 transition-all" />
          </div>
          <Button variant="secondary" className="px-4"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button>Add Client</Button>
        </div>
      </header>

      <Card className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 bg-elevated/50 p-4 border-b border-border text-[10px] font-semibold text-muted tracking-widest uppercase items-center">
          <div className="col-span-3 pl-4">Client</div>
          <div className="col-span-2">Contact</div>
          <div className="col-span-2">Last Visit</div>
          <div className="col-span-2">Total Spend</div>
          <div className="col-span-2">Loyalty Tier</div>
          <div className="col-span-1 text-center">Action</div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {MOCK_CLIENTS.map((client, idx) => (
            <div key={client.id} className="grid grid-cols-12 p-4 border-b border-white/5 items-center hover:bg-white-[0.02] transition-colors group cursor-pointer" onClick={() => setSelectedClient(client)}>
              <div className="col-span-3 pl-4 flex items-center gap-3">
                <img src={client.avatar} alt="" className="w-10 h-10 rounded-full border border-border group-hover:border-gold/50 transition-colors" />
                <span className="font-medium text-primary text-sm">{client.name}</span>
              </div>
              <div className="col-span-2 text-sm text-secondary">{client.phone}</div>
              <div className="col-span-2 text-sm text-secondary">{format(parseISO(client.lastVisit), 'MMM dd, yyyy')}</div>
              <div className="col-span-2 font-mono text-primary text-sm">₹{client.totalSpend.toLocaleString()}</div>
              <div className="col-span-2">
                <Badge variant={client.tier === 'Platinum' ? 'default' : client.tier === 'Gold' ? 'gold' : 'default'} className={client.tier === 'Platinum' ? 'border-primary/30 text-primary' : ''}>
                  {client.tier}
                </Badge>
              </div>
              <div className="col-span-1 flex justify-center">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ClientDetail({ client, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'History', 'Products', 'Payments', 'Notes'];
  
  const clientTxns = MOCK_TRANSACTIONS.filter(t => t.clientId === client.id);
  const prefStylist = MOCK_STAFF.find(s => s.id === client.prefStylist);

  const favoriteServicesData = [
    { name: 'Keratin', value: 50 },
    { name: 'Color', value: 30 },
    { name: 'Blowout', value: 20 },
  ];
  const COLORS = ['var(--gold)', 'var(--accent-rose)', 'var(--accent-mint)'];

  return (
    <div className="animate-in slide-in-from-right-8 duration-500 h-full flex flex-col pb-6">
      <button onClick={onBack} className="text-secondary hover:text-gold flex items-center text-sm mb-6 transition-colors w-fit">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
      </button>

      {/* Header Banner */}
      <Card className="p-8 mb-6 relative overflow-hidden flex items-end gap-6 bg-gradient-to-tr from-card to-elevated via-card border-l-[4px] border-l-gold">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <img src={client.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-card shadow-2xl z-10" />
        <div className="z-10 flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl font-display text-primary">{client.name}</h2>
            <Badge variant={client.tier === 'Platinum' ? 'default' : client.tier === 'Gold' ? 'gold' : 'default'} className="px-3 py-1 text-xs">
              <Star className={`w-3 h-3 mr-1 ${client.tier === 'Platinum' ? 'text-primary' : 'text-gold'}`}/> {client.tier} Member
            </Badge>
          </div>
          <p className="text-sm text-secondary font-mono tracking-wide">{client.phone} • Joined {format(parseISO(client.joinedAt), 'MMMM yyyy')}</p>
        </div>
        <div className="z-10 flex gap-3">
          <Button variant="secondary">Book Appointment</Button>
          <Button>Send Message</Button>
        </div>
      </Card>

      {/* Tabs */}
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
          <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* Stats Row */}
            <div className="col-span-12 grid grid-cols-4 gap-6">
              <Card className="flex items-center p-5">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4"><History className="w-5 h-5"/></div>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Total Visits</p>
                  <p className="text-2xl font-display text-primary mt-1">{client.visits}</p>
                </div>
              </Card>
              <Card className="flex items-center p-5">
                <div className="w-12 h-12 rounded-full bg-accent-mint/10 flex items-center justify-center text-accent-mint mr-4"><IndianRupee className="w-5 h-5"/></div>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Total Spend</p>
                  <p className="text-2xl font-display text-primary mt-1">₹{client.totalSpend.toLocaleString()}</p>
                </div>
              </Card>
              <Card className="flex items-center p-5">
                <div className="w-12 h-12 rounded-full bg-accent-rose/10 flex items-center justify-center text-accent-rose mr-4"><Clock className="w-5 h-5"/></div>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Avg Session</p>
                  <p className="text-2xl font-display text-primary mt-1">1h 45m</p>
                </div>
              </Card>
              <Card className="flex items-center p-5">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4"><Star className="w-5 h-5"/></div>
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Loyalty Pts</p>
                  <p className="text-2xl font-display text-primary mt-1">{Math.floor(client.totalSpend / 100)}</p>
                </div>
              </Card>
            </div>

            <Card className="col-span-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6 w-full text-left">Favorite Services</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={favoriteServicesData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {favoriteServicesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 mt-2">
                 {favoriteServicesData.map((d,i) => (
                   <div key={d.name} className="flex items-center text-xs text-secondary"><div className="w-2 h-2 rounded-full mr-1.5" style={{backgroundColor: COLORS[i]}}></div>{d.name}</div>
                 ))}
              </div>
            </Card>

            <Card className="col-span-4 flex flex-col items-center justify-center text-center p-8">
              <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-6 w-full text-left">Preferred Stylist</h3>
              <img src={prefStylist?.avatar} className="w-20 h-20 rounded-full border-2 border-gold/30 mb-4" alt=""/>
              <p className="text-lg font-display text-primary mb-1">{prefStylist?.name}</p>
              <p className="text-xs text-secondary mb-4">{prefStylist?.role}</p>
              <span className="text-xs text-gold flex items-center bg-gold/10 px-3 py-1 rounded-pill">Requested {Math.floor(client.visits * 0.8)} times</span>
            </Card>

            <Card className="col-span-4">
              <h3 className="text-sm font-semibold text-muted tracking-widest uppercase mb-4">Client Notes</h3>
              <div className="bg-elevated border border-border rounded-lg p-4 h-[200px] text-sm text-secondary font-ui leading-relaxed">
                <p>Client prefers quiet sessions. Very sensitive scalp, use only sulfate-free shampoos.</p>
                <p className="mt-4">Allergic to macadamia nut oil.</p>
                <p className="mt-4 text-xs text-muted">Last updated 2 weeks ago</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'History' && (
          <Card className="p-0 overflow-hidden animate-in fade-in duration-500 min-h-[400px]">
            <div className="grid grid-cols-12 bg-elevated/50 p-4 border-b border-border text-[10px] font-semibold text-muted tracking-widest uppercase items-center">
              <div className="col-span-3 pl-4">Date</div>
              <div className="col-span-3">Service</div>
              <div className="col-span-2">Stylist</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-right pr-4">Method</div>
            </div>
            {clientTxns.map(txn => (
              <div key={txn.id} className="grid grid-cols-12 p-5 border-b border-white/5 items-center hover:bg-white-[0.02] transition-colors">
                <div className="col-span-3 pl-4 text-sm text-primary font-medium">{format(parseISO(txn.date), 'MMMM do, yyyy')}</div>
                <div className="col-span-3 text-sm text-secondary">{txn.serviceName}</div>
                <div className="col-span-2 text-sm text-secondary">{txn.staffName}</div>
                <div className="col-span-2 font-mono text-primary text-sm text-right">₹{txn.amount.toLocaleString()}</div>
                <div className="col-span-2 text-xs text-muted text-right pr-4">
                   <Badge variant="default" className="text-[10px]">{txn.method}</Badge>
                </div>
              </div>
            ))}
            {clientTxns.length === 0 && (
              <div className="p-8 text-center text-muted">No history found.</div>
            )}
          </Card>
        )}

        {(activeTab === 'Products' || activeTab === 'Payments' || activeTab === 'Notes') && (
           <div className="flex flex-col items-center justify-center min-h-[400px] bg-card rounded-card border border-border animate-in fade-in duration-500">
             <Package className="w-12 h-12 text-muted mb-4 opacity-20" />
             <p className="text-muted tracking-widest uppercase text-sm font-semibold mb-2">{activeTab} Info</p>
             <p className="text-xs text-secondary max-w-sm text-center">Detailed view for {activeTab.toLowerCase()} is being formulated for prototype phase 2.</p>
           </div>
        )}
      </div>
    </div>
  );
}
