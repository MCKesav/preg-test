
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  Bell,
  ExternalLink,
  CalendarDays,
  ShieldPlus,
  Loader2,
  RefreshCw,
  Trash2,
  LogOut,
  CloudOff,
  Cloud,
  AlertCircle
} from 'lucide-react';
import { signInWithGoogle, getSession, onAuthStateChange, signOut } from '../services/supabase';
import { syncEventsToCalendar, deleteCalendarEvent, getEventsForMonth, createAndMapEvent } from '../services/googleCalendar';
import AddEventModal from './AddEventModal';

interface Event {
  id: string;
  date: number; // Day of month
  title: string;
  type: 'VACCINE' | 'CHECKUP' | 'PERSONAL';
  time: string;
  description?: string;
  googleEventId?: string; // Maps to Google Calendar event ID
  syncStatus?: 'synced' | 'pending' | 'error' | 'not-synced';
}

interface GoogleEvent {
  id: string;
  title: string;
  date: Date;
  isFromGoogle: boolean;
}

const PregnancyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | undefined>();
  const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Local events with sync status
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: 14, title: 'Obstetrician Checkup', type: 'CHECKUP', time: '10:00 AM', syncStatus: 'not-synced' },
    { id: '2', date: 18, title: 'TT-1 (Tetanus Shot)', type: 'VACCINE', time: '11:30 AM', syncStatus: 'not-synced' },
    { id: '3', date: 22, title: 'Glucose Challenge Test', type: 'CHECKUP', time: '09:00 AM', syncStatus: 'not-synced' },
    { id: '4', date: 28, title: 'Flu Vaccination', type: 'VACCINE', time: '04:00 PM', syncStatus: 'not-synced' },
  ]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession();
      if (session?.provider_token) {
        setIsGoogleLinked(true);
        setAccessToken(session.provider_token);
        // Load Google Calendar events
        await loadGoogleEvents(session.provider_token);
      }
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.provider_token) {
        setIsGoogleLinked(true);
        setAccessToken(session.provider_token);
        await loadGoogleEvents(session.provider_token);
      } else if (event === 'SIGNED_OUT') {
        setIsGoogleLinked(false);
        setAccessToken(null);
        setGoogleEvents([]);
        // Reset sync status
        setEvents(prev => prev.map(e => ({ ...e, syncStatus: 'not-synced', googleEventId: undefined })));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load Google Calendar events when month changes
  useEffect(() => {
    if (accessToken) {
      loadGoogleEvents(accessToken);
    }
  }, [currentDate, accessToken]);

  const loadGoogleEvents = async (token: string) => {
    try {
      const events = await getEventsForMonth(token, currentDate.getFullYear(), currentDate.getMonth());
      setGoogleEvents(events);
    } catch (err) {
      console.error('Error loading Google events:', err);
    }
  };

  const handleLinkGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        console.error('Error linking Google:', error);
        alert('Failed to link Google Calendar. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await signOut();
      setIsGoogleLinked(false);
      setAccessToken(null);
      setGoogleEvents([]);
      setEvents(prev => prev.map(e => ({ ...e, syncStatus: 'not-synced', googleEventId: undefined })));
    } catch (err) {
      console.error('Error disconnecting:', err);
    }
  };

  const handleSyncAll = async () => {
    if (!accessToken) return;
    setIsSyncing(true);

    try {
      const unsyncedEvents = events.filter(e => e.syncStatus !== 'synced');

      for (const event of unsyncedEvents) {
        setEvents(prev => prev.map(e =>
          e.id === event.id ? { ...e, syncStatus: 'pending' } : e
        ));

        const result = await createAndMapEvent(accessToken, {
          localId: event.id,
          title: event.title,
          description: event.description,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), event.date),
          time: event.time,
          type: event.type,
        });

        setEvents(prev => prev.map(e =>
          e.id === event.id
            ? {
              ...e,
              syncStatus: result.success ? 'synced' : 'error',
              googleEventId: result.googleEventId || undefined
            }
            : e
        ));
      }

      // Refresh Google events
      await loadGoogleEvents(accessToken);
    } catch (err) {
      console.error('Error syncing events:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddEvent = async (newEvent: {
    title: string;
    date: number;
    time: string;
    type: 'VACCINE' | 'CHECKUP' | 'PERSONAL';
    description?: string;
  }) => {
    const id = `local-${Date.now()}`;
    const event: Event = {
      id,
      ...newEvent,
      syncStatus: isGoogleLinked ? 'pending' : 'not-synced',
    };

    setEvents(prev => [...prev, event]);

    // Auto-sync if connected
    if (accessToken && isGoogleLinked) {
      try {
        const result = await createAndMapEvent(accessToken, {
          localId: id,
          title: newEvent.title,
          description: newEvent.description,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), newEvent.date),
          time: newEvent.time,
          type: newEvent.type,
        });

        setEvents(prev => prev.map(e =>
          e.id === id
            ? {
              ...e,
              syncStatus: result.success ? 'synced' : 'error',
              googleEventId: result.googleEventId || undefined
            }
            : e
        ));

        if (result.success) {
          await loadGoogleEvents(accessToken);
        }
      } catch (err) {
        setEvents(prev => prev.map(e =>
          e.id === id ? { ...e, syncStatus: 'error' } : e
        ));
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // If synced to Google, delete from Google too
    if (event.googleEventId && accessToken) {
      try {
        await deleteCalendarEvent(accessToken, event.googleEventId);
      } catch (err) {
        console.error('Error deleting from Google:', err);
      }
    }

    setEvents(prev => prev.filter(e => e.id !== eventId));
    setShowDeleteConfirm(null);

    // Refresh Google events
    if (accessToken) {
      await loadGoogleEvents(accessToken);
    }
  };

  const getEventForDay = (day: number) => events.filter(e => e.date === day);

  const getGoogleEventForDay = (day: number) =>
    googleEvents.filter(e => e.date.getDate() === day);

  const getSyncStatusIcon = (status?: string) => {
    switch (status) {
      case 'synced':
        return <Cloud className="w-3 h-3 text-emerald-500" />;
      case 'pending':
        return <Loader2 className="w-3 h-3 text-amber-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <CloudOff className="w-3 h-3 text-slate-300" />;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <section className="surface-card p-8 rounded-[2.5rem] relative overflow-hidden h-full flex flex-col">
      {/* Header */}
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

        <div className="flex items-center gap-2">
          {/* Sync Button - only show when connected */}
          {isGoogleLinked && (
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync All'}
            </button>
          )}

          {/* Connect/Disconnect Button */}
          {isGoogleLinked ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Connected
              </span>
              <button
                onClick={handleDisconnect}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Disconnect Google Calendar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLinkGoogle}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all shadow-sm bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <img src="https://www.gstatic.com/images/branding/product/1x/calendar_2020q4_512dp.png" className="w-4 h-4" alt="Google" />
              )}
              {isLoading ? 'Connecting...' : 'Link Google Calendar'}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-slate-800">{monthName} {currentDate.getFullYear()}</h3>
            <div className="flex gap-1">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={`${d}-${i}`} className="text-center text-[9px] font-black text-slate-400 p-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} className="aspect-square" />)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventForDay(day);
              const dayGoogleEvents = getGoogleEventForDay(day);
              const isToday = day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setShowAddEvent(true);
                  }}
                  className={`aspect-square relative flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 group ${isToday
                    ? 'rounded-full border-2 border-rose-500 shadow-sm text-rose-600 bg-rose-50/40'
                    : 'rounded-xl border border-white/60 bg-white/40 text-slate-700'
                    }`}
                >
                  <span className={`text-[11px] font-bold ${isToday ? 'text-rose-600' : 'text-slate-600'}`}>{day}</span>
                  <div className="flex gap-0.5 mt-1">
                    {dayEvents.map(e => (
                      <div
                        key={e.id}
                        className={`w-1.5 h-1.5 rounded-full ${e.type === 'VACCINE' ? 'bg-amber-400' : e.type === 'CHECKUP' ? 'bg-blue-400' : 'bg-rose-400'
                          }`}
                      />
                    ))}
                    {dayGoogleEvents.map(e => (
                      <div key={e.id} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    ))}
                  </div>
                  {/* Tooltip */}
                  {(dayEvents.length > 0 || dayGoogleEvents.length > 0) && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 shadow-xl">
                      {dayEvents[0]?.title || dayGoogleEvents[0]?.title}
                      {(dayEvents.length + dayGoogleEvents.length > 1) && ` +${dayEvents.length + dayGoogleEvents.length - 1} more`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              <div className="w-2 h-2 rounded-full bg-blue-400" /> Checkup
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              <div className="w-2 h-2 rounded-full bg-amber-400" /> Vaccine
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              <div className="w-2 h-2 rounded-full bg-rose-400" /> Personal
            </div>
            {isGoogleLinked && (
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                <div className="w-2 h-2 rounded-full bg-purple-400" /> Google Calendar
              </div>
            )}
          </div>
        </div>

        {/* Event List */}
        <div className="w-full lg:w-80 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medical Milestones</h4>
            <button
              onClick={() => setShowAddEvent(true)}
              className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[300px] no-scrollbar pr-1">
            {events.sort((a, b) => a.date - b.date).map(event => (
              <div key={event.id} className="p-4 bg-white/60 border border-white rounded-[1.5rem] shadow-sm hover:shadow-md transition-all group relative">
                {/* Delete button (shows on hover) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirm(event.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2 rounded-xl shrink-0 ${event.type === 'VACCINE' ? 'bg-amber-50 text-amber-600' :
                    event.type === 'PERSONAL' ? 'bg-rose-50 text-rose-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                    {event.type === 'VACCINE' ? <ShieldPlus className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{event.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{monthName} {event.date} • {event.time}</p>
                  </div>
                  {/* Sync status indicator */}
                  <div className="shrink-0" title={`Status: ${event.syncStatus || 'not synced'}`}>
                    {getSyncStatusIcon(event.syncStatus)}
                  </div>
                </div>

                {event.syncStatus === 'synced' && (
                  <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[8px] font-black text-emerald-600 uppercase">Synced to Calendar</span>
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium">No events this month</p>
                <p className="text-[10px]">Click + to add an event</p>
              </div>
            )}
          </div>

          <div className="mt-4 p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
            <p className="text-[9px] text-rose-800 font-bold leading-relaxed">
              <span className="text-rose-500 font-black">IMPORTANT:</span> Tetanus toxoid (TT-1) is crucial between 16-24 weeks. Flu shots can be taken anytime to protect your baby's early immunity.
            </p>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={showAddEvent}
        onClose={() => {
          setShowAddEvent(false);
          setSelectedDay(undefined);
        }}
        onAdd={handleAddEvent}
        selectedDay={selectedDay}
        currentMonth={`${monthName} ${currentDate.getFullYear()}`}
      />

      {/* Delete Confirmation */}
      {showDeleteConfirm && createPortal(
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Event?</h3>
            <p className="text-sm text-slate-500 mb-4">
              This will remove the event from your calendar.
              {events.find(e => e.id === showDeleteConfirm)?.googleEventId && (
                <span className="block mt-1 text-rose-500 font-medium">
                  It will also be deleted from Google Calendar.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEvent(showDeleteConfirm)}
                className="flex-1 py-2.5 px-4 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default PregnancyCalendar;
