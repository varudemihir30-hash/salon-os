import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MOCK_STAFF, MOCK_APPOINTMENTS, MOCK_CLIENTS, MOCK_SERVICES } from '../data/mockData';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, X, Star, Clock, User, Check, Scissors } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedApp, setSelectedApp] = useState(null);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [newAppStep, setNewAppStep] = useState(1);

  // Filter appointments for selected date
  const dayApps = useMemo(() => {
    return MOCK_APPOINTMENTS.filter(a => isSameDay(parseISO(a.date), selectedDate));
  }, [selectedDate]);

  const hours = Array.from({length: 13}, (_, i) => i + 9); // 9 AM to 9 PM

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Appointments</h2>
          <div className="flex items-center gap-4">
            <button className="p-1 hover:text-gold transition-colors text-secondary leading-none"><ChevronLeft className="w-4 h-4"/></button>
            <p className="text-sm text-primary font-medium tracking-wide">{format(selectedDate, 'EEEE, MMMM do')}</p>
            <button className="p-1 hover:text-gold transition-colors text-secondary leading-none"><ChevronRight className="w-4 h-4"/></button>
          </div>
        </div>
        <Button onClick={() => setShowNewAppModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> New Booking
        </Button>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden relative min-h-[600px]">
        <Card className="flex-1 overflow-hidden flex flex-col p-0 border border-border shadow-2xl">
          {/* Calendar Header: Stylist columns */}
          <div className="flex border-b border-border bg-card sticky top-0 z-10">
            <div className="w-20 border-r border-border shrink-0 flex items-center justify-center text-[10px] text-muted font-mono tracking-widest bg-elevated/20">IST</div>
            {MOCK_STAFF.filter(s => s.status === 'Present').map(staff => (
              <div key={staff.id} className="flex-1 border-r border-border last:border-0 p-3 text-center flex flex-col items-center justify-center gap-2">
                <img src={staff.avatar} alt={staff.name} className="w-8 h-8 rounded-full border border-border" />
                <div>
                  <p className="text-xs font-semibold text-primary leading-tight">{staff.name}</p>
                  <p className="text-[10px] text-muted">{staff.role}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div className="flex-1 overflow-y-auto relative bg-base scrollbar-hide">
            <div className="flex min-h-[1200px]">
              {/* Time Column */}
              <div className="w-20 border-r border-border shrink-0 relative bg-elevated/10">
                {hours.map(hour => (
                  <div key={hour} className="h-24 border-b border-border text-center pt-2">
                    <span className="text-[10px] text-muted font-mono">
                      {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Stylist Columns */}
              {MOCK_STAFF.filter(s => s.status === 'Present').map((staff, idx) => {
                const staffApps = dayApps.filter(a => a.staffId === staff.id);
                return (
                  <div key={staff.id} className="flex-1 border-r border-border last:border-0 relative">
                    {/* Grid Lines */}
                    {hours.map((hour, i) => (
                      <div key={'line'+i} className="h-24 border-b border-white/[0.03] absolute w-full pointer-events-none" style={{top: `${i * 96}px`}}></div>
                    ))}
                    
                    {/* Appointments */}
                    {staffApps.map(app => {
                      const date = parseISO(app.date);
                      const startHour = date.getHours() + date.getMinutes() / 60;
                      const top = (startHour - 9) * 96; // 96px per hour (h-24)
                      const height = Math.max((app.durationMins / 60) * 96, 40); // min height 40px
                      
                      return (
                        <div 
                          key={app.id} 
                          onClick={() => setSelectedApp(app)}
                          className={`absolute w-[92%] left-[4%] rounded-card border bg-elevated p-2 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-glow hover:z-20 overflow-hidden flex flex-col group ${selectedApp?.id === app.id ? 'border-gold ring-1 ring-gold/50 z-20 shadow-glow' : 'border-border'}`}
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${app.serviceColor}`}></div>
                          <div className="flex items-center gap-2 mb-1 pl-1">
                            <img src={app.clientAvatar} alt="" className="w-5 h-5 rounded-full" />
                            <p className="text-xs font-semibold text-primary truncate leading-none">{app.clientName}</p>
                          </div>
                          <p className="text-[10px] text-muted truncate pl-1">{app.serviceName}</p>
                          {height > 60 && (
                            <div className="mt-auto pl-1 flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                              <span className="text-[9px] font-mono text-muted">{format(date, 'HH:mm')}</span>
                              <span className={`text-[9px] px-1 rounded bg-white/5`}>{app.status}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Side Panel or empty state */}
        <div className={`w-80 h-full transition-all duration-300 ${selectedApp ? 'translate-x-0 opacity-100 flex-shrink-0 relative' : 'translate-x-full opacity-0 absolute right-0 pointer-events-none'}`}>
          {selectedApp && (
            <AppointmentDetail app={selectedApp} onClose={() => setSelectedApp(null)} />
          )}
        </div>
      </div>
      
      {/* New Appointment Modal */}
      {showNewAppModal && (
        <NewAppointmentModal 
          step={newAppStep} 
          setStep={setNewAppStep} 
          onClose={() => { setShowNewAppModal(false); setNewAppStep(1); }} 
        />
      )}
    </div>
  );
}

function AppointmentDetail({ app, onClose }) {
  const client = MOCK_CLIENTS.find(c => c.id === app.clientId);
  
  return (
    <Card className="h-full flex flex-col p-0 overflow-hidden border-border bg-card shadow-2xl animate-in slide-in-from-right-8 duration-500 rounded-lg">
      <div className="relative p-6 px-5 border-b border-border bg-gradient-to-b from-elevated to-card/50">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-gold transition-colors"><X className="w-4 h-4"/></button>
        <div className="flex items-center gap-4 mt-2">
          <img src={client?.avatar} alt="" className="w-14 h-14 rounded-full border-2 border-gold/30 p-0.5" />
          <div>
            <h3 className="text-lg font-ui font-semibold text-primary leading-tight">{client?.name}</h3>
            <p className="text-xs text-gold flex items-center mt-1"><Star className="w-3 h-3 mr-1 fill-gold"/> {client?.tier} · {client?.visits} visits</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide text-sm">
        <div className="space-y-3">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-muted text-xs tracking-wider uppercase">Service</span>
            <span className="text-primary font-medium text-right text-xs">{app.serviceName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-muted text-xs tracking-wider uppercase">Stylist</span>
            <span className="text-primary font-medium text-xs">{app.staffName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-muted text-xs tracking-wider uppercase">Duration</span>
            <span className="text-primary font-medium text-xs">{Math.floor(app.durationMins / 60)}h {app.durationMins % 60 > 0 ? `${app.durationMins % 60}m` : ''}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-muted text-xs tracking-wider uppercase">Date/Time</span>
            <span className="text-primary font-medium text-xs">{format(parseISO(app.date), 'EEE do MMM, hh:mm a')}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-muted text-xs tracking-wider uppercase">Status</span>
            <span className="text-gold font-medium text-xs flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-gold mr-2 animate-pulse"></div>{app.status}</span>
          </div>
        </div>
        
        {/* Mock additional data */}
        <div>
          <h4 className="text-[10px] font-semibold text-muted tracking-widest uppercase mb-3">Products Used</h4>
          <ul className="space-y-1.5">
            <li className="text-secondary text-xs flex items-center before:content-[''] before:w-1 before:h-1 before:bg-gold-muted before:mr-2 before:rounded-full">L'Oréal Keratin Pro 200ml</li>
            <li className="text-secondary text-xs flex items-center before:content-[''] before:w-1 before:h-1 before:bg-gold-muted before:mr-2 before:rounded-full">Wella Serum 50ml</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-semibold text-muted tracking-widest uppercase mb-3">Client History</h4>
          <div className="bg-elevated/30 border border-border rounded-lg p-3 space-y-2">
            <div className="flex justify-between"><span className="text-secondary text-xs">Total Spent</span><span className="text-primary font-mono text-xs">₹{client?.totalSpend.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-secondary text-xs">Avg Session</span><span className="text-primary font-mono text-xs">2h 15m</span></div>
            <div className="flex justify-between"><span className="text-secondary text-xs">Pref. Method</span><span className="text-primary font-mono text-xs">UPI</span></div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-elevated/20 flex gap-3">
        <Button variant="secondary" className="flex-1 text-xs py-2 w-auto h-auto">Edit</Button>
        <Button className="flex-1 text-xs py-2 w-auto h-auto">{app.status === 'Confirmed' ? 'Check In' : 'Complete'}</Button>
      </div>
    </Card>
  )
}

function NewAppointmentModal({ step, setStep, onClose }) {
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '' });

  const handleAddClient = (e) => {
    e.preventDefault();
    if (newClient.name && newClient.phone) {
      setShowAddClient(false);
      setStep(2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <Card className="relative z-10 w-full max-w-lg shadow-2xl border-t-[3px] border-t-gold animate-in slide-in-from-bottom-10 fade-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-primary"><X className="w-5 h-5"/></button>
        
        <div className="mb-8">
          <h2 className="text-2xl font-display text-primary tracking-wide mb-5">New Booking</h2>
          <div className="h-1 bg-elevated rounded-full w-full overflow-hidden flex">
            <div className={`h-full bg-gold transition-all duration-500 ease-out ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
          </div>
          <div className="flex justify-between text-[10px] text-muted mt-2 px-1 font-semibold uppercase tracking-widest">
            <span className={step >= 1 ? 'text-gold' : ''}>Client</span>
            <span className={step >= 2 ? 'text-gold' : ''}>Details</span>
            <span className={step >= 3 ? 'text-gold' : ''}>Confirm</span>
          </div>
        </div>

        <div className="min-h-[280px]">
          {step === 1 && !showAddClient && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
              <input type="text" placeholder="Search client by name or phone..." className="w-full bg-elevated border border-border p-3.5 rounded-card text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-all font-ui" />
              <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-hide py-2">
                {MOCK_CLIENTS.slice(0, 3).map(c => (
                  <div key={c.id} onClick={() => setStep(2)} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-gold/30 hover:bg-elevated cursor-pointer group transition-all">
                    <img src={c.avatar} className="w-10 h-10 rounded-full border border-border" alt=""/>
                    <div>
                      <p className="text-sm font-medium text-primary group-hover:text-gold transition-colors">{c.name}</p>
                      <p className="text-xs text-muted">{c.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAddClient(true)} className="w-full border border-dashed border-gold/40 hover:border-gold hover:bg-gold/5 text-gold rounded-card py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                <User className="w-4 h-4"/> Add New Client
              </button>
            </div>
          )}

          {step === 1 && showAddClient && (
            <form onSubmit={handleAddClient} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <button type="button" onClick={() => setShowAddClient(false)} className="flex items-center text-xs text-secondary hover:text-gold transition-colors mb-2">
                <ChevronLeft className="w-3 h-3 mr-1" /> Back to search
              </button>
              <h3 className="text-base font-semibold text-primary">New Client Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5">Full Name *</label>
                  <input required value={newClient.name} onChange={e => setNewClient(p => ({...p, name: e.target.value}))} type="text" placeholder="e.g. Priya Sharma" className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold transition-all" />
                </div>
                <div>
                  <label className="text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5">Phone Number *</label>
                  <input required value={newClient.phone} onChange={e => setNewClient(p => ({...p, phone: e.target.value}))} type="tel" placeholder="+91 98xxx xxxxx" className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold transition-all" />
                </div>
                <div>
                  <label className="text-[10px] text-muted uppercase tracking-widest font-semibold block mb-1.5">Email</label>
                  <input value={newClient.email} onChange={e => setNewClient(p => ({...p, email: e.target.value}))} type="email" placeholder="optional" className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary placeholder:text-muted focus:outline-none focus:border-gold transition-all" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-2">Create Client & Continue</Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-muted uppercase tracking-widest font-semibold ml-1">Service</label>
                  <select className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary focus:outline-none focus:border-gold appearance-none">
                    {MOCK_SERVICES.map(s => <option key={s.id}>{s.name} - ₹{s.defaultPrice}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-muted uppercase tracking-widest font-semibold ml-1">Stylist</label>
                  <select className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-primary focus:outline-none focus:border-gold appearance-none">
                    {MOCK_STAFF.map(s => <option key={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-muted uppercase tracking-widest font-semibold ml-1">Date & Time</label>
                <div className="flex gap-4">
                  <input type="date" className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-secondary focus:outline-none focus:border-gold appearance-none" />
                  <input type="time" className="w-full bg-elevated border border-border p-3 rounded-card text-sm text-secondary focus:outline-none focus:border-gold appearance-none" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                <Button className="w-2/3" onClick={() => setStep(3)}>Continue to Confirmation</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-500 py-6">
              <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto text-gold mb-2 border border-gold/20">
                <Check className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-display text-primary mb-2">Confirm Booking</h3>
                <p className="text-sm text-secondary">Priya Sharma • Keratin Treatment</p>
                <p className="text-sm text-secondary mt-1">with <span className="text-primary">Meera K.</span></p>
                <p className="text-sm font-semibold text-gold mt-4 py-2 px-4 bg-gold/10 inline-block rounded-pill border border-gold/20">Tomorrow, 2:00 PM</p>
              </div>
              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="w-1/3" onClick={() => setStep(2)}>Back</Button>
                <Button className="w-2/3 shadow-[0_0_20px_rgba(201,168,76,0.2)]" onClick={onClose}>Confirm & Save</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
