
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, CheckCircle2, Bell, ExternalLink, CalendarDays, ShieldPlus } from 'lucide-react';

interface Event {
  id: string;
  date: number; // Day of month
  title: string;
  type: 'VACCINE' | 'CHECKUP' | 'PERSONAL';
  time: string;
}

const PregnancyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);

  // Mocked events for the current month (October/Month of pregnancy)
  // Current Week is 24, so we place milestones around this week.
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: 14, title: 'Obstetrician Checkup', type: 'CHECKUP', time: '10:00 AM' },
    { id: '2', date: 18, title: 'TT-1 (Tetanus Shot)', type: 'VACCINE', time: '11:30 AM' },
    { id: '3', date: 22, title: 'Glucose Challenge Test', type: 'CHECKUP', time: '09:00 AM' },
    { id: '4', date: 28, title: 'Flu Vaccination', type: 'VACCINE', time: '04:00 PM' },
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const handleLinkGoogle = () => {
    setIsGoogleLinked(true);
  };

  const getEventForDay = (day: number) => events.filter(e => e.date === day);

  return (
    <section className="surface-card p-8 rounded-[2.5rem] relative overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center">
              <CalendarDays className="text-rose-500 w-6 h-6" />
            </div>
            Pregnancy Calendar
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Week 24 • Trimester 2 Milestones</p>
        </div>

        <button 
          onClick={handleLinkGoogle}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all shadow-sm ${
            isGoogleLinked 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
            : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
          }`}
        >
          {isGoogleLinked ? <CheckCircle2 className="w-4 h-4" /> : <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_512dp.png" className="w-4 h-4" alt="Google" />}
          {isGoogleLinked ? 'Linked to Google' : 'Link Google Calendar'}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        {/* The Grid View */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-slate-800">{monthName} {currentDate.getFullYear()}</h3>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[9px] font-black text-slate-400 p-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} className="aspect-square" />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventForDay(day);
              const isToday = day === 14; // Mock today

              return (
                <div 
                  key={day} 
                  className={`aspect-square relative flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group ${
                    isToday 
                    ? 'rounded-full border-2 border-rose-500 shadow-sm text-rose-600 bg-rose-50/40' 
                    : 'rounded-xl border border-white/60 bg-white/40 text-slate-700'
                  }`}
                >
                  <span className={`text-[11px] font-bold ${isToday ? 'text-rose-600' : 'text-slate-600'}`}>{day}</span>
                  <div className="flex gap-0.5 mt-1">
                    {dayEvents.map(e => (
                      <div 
                        key={e.id} 
                        className={`w-1.5 h-1.5 rounded-full ${
                          e.type === 'VACCINE' ? 'bg-amber-400' : e.type === 'CHECKUP' ? 'bg-blue-400' : 'bg-rose-400'
                        }`} 
                      />
                    ))}
                  </div>
                  {/* Tooltip on hover simulation */}
                  {dayEvents.length > 0 && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
                      {dayEvents[0].title}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone & Event List */}
        <div className="w-full lg:w-72 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Milestones</h4>
            <button onClick={() => setShowAddEvent(true)} className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[300px] no-scrollbar pr-1">
            {events.sort((a,b) => a.date - b.date).map(event => (
              <div key={event.id} className="p-4 bg-white/60 border border-white rounded-[1.5rem] shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    event.type === 'VACCINE' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {event.type === 'VACCINE' ? <ShieldPlus className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{event.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{monthName} {event.date} • {event.time}</p>
                  </div>
                </div>
                {isGoogleLinked && (
                  <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[8px] font-black text-emerald-600 uppercase">Synced to Calendar</span>
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
            <p className="text-[9px] text-rose-800 font-bold leading-relaxed">
              <span className="text-rose-500 font-black">IMPORTANT:</span> Tetanus toxoid (TT-1) is crucial between 16-24 weeks. Flu shots can be taken anytime to protect your baby's early immunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PregnancyCalendar;
