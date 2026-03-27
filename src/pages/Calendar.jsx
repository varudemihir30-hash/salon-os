import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_APPOINTMENTS, MOCK_STAFF } from '../data/mockData';
import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isSameDay, startOfWeek, endOfWeek } from 'date-fns';

const STATUS_COLORS = {
  confirmed: 'bg-accent-mint',
  pending: 'bg-gold',
  completed: 'bg-border-hover',
  cancelled: 'bg-accent-rose',
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('Month');
  const views = ['Month', 'Week', 'Day'];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calDays = eachDayOfInterval({ start: calStart, end: calEnd });

  const goBack = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const goForward = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const getDayAppts = (day) =>
    MOCK_APPOINTMENTS.filter((a) => {
      try { return isSameDay(parseISO(a.date), day); } catch { return false; }
    });

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase">Calendar</h2>
          <p className="text-sm text-secondary tracking-wide">Full operational calendar view</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-elevated rounded-pill p-1 border border-border">
            {views.map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-pill text-xs font-semibold uppercase tracking-wider transition-colors ${view === v ? 'bg-gold text-bg-base' : 'text-muted hover:text-primary'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <Button><Plus className="w-4 h-4 mr-2" /> New Appointment</Button>
        </div>
      </header>

      {/* Month navigator */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button onClick={goBack} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:border-gold hover:text-gold transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-xl font-display text-primary tracking-widest uppercase">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <button onClick={goForward} className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:border-gold hover:text-gold transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <Card className="flex-1 p-0 overflow-hidden flex flex-col">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-border bg-elevated/50">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <div key={d} className="p-3 text-center text-[10px] font-semibold text-muted tracking-widest uppercase">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-7 h-full" style={{ gridAutoRows: 'minmax(100px, 1fr)' }}>
            {calDays.map((day, idx) => {
              const dayAppts = getDayAppts(day);
              const outside = !isSameMonth(day, currentDate);
              const today = isToday(day);

              return (
                <div
                  key={idx}
                  className={`border-b border-r border-white/5 p-2 flex flex-col gap-1 transition-colors group ${outside ? 'opacity-30' : ''} ${today ? 'bg-gold/5' : 'hover:bg-white/[0.02]'}`}
                >
                  <span className={`text-xs font-mono self-end w-7 h-7 flex items-center justify-center rounded-full ${today ? 'bg-gold text-bg-base font-bold' : 'text-secondary'}`}>
                    {format(day, 'd')}
                  </span>
                  {dayAppts.slice(0, 3).map((a) => (
                    <div key={a.id} className={`text-[9px] px-1.5 py-0.5 rounded text-white truncate flex items-center gap-1 ${STATUS_COLORS[a.status] || 'bg-border-hover'}`}>
                      <Clock className="w-2 h-2 shrink-0" />
                      <span className="truncate">{a.time} {a.clientName?.split(' ')[0]}</span>
                    </div>
                  ))}
                  {dayAppts.length > 3 && (
                    <span className="text-[9px] text-muted pl-1">+{dayAppts.length - 3} more</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 px-1">
        {Object.entries(STATUS_COLORS).map(([key, cls]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-secondary capitalize">
            <div className={`w-2.5 h-2.5 rounded-sm ${cls}`} />
            {key}
          </div>
        ))}
      </div>
    </div>
  );
}
