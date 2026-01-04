
import React, { useState } from 'react';
import { UserRole } from '../types';
import { NAV_ITEMS } from '../constants';
import { 
  User, Settings, ShieldCheck, HelpCircle, LogOut, X, Bell, 
  ChevronRight, Mail, Phone, Lock, ShieldAlert, CheckCircle2, 
  Clock, AlertCircle, Sparkles, MessageSquare, AlertTriangle,
  MapPin, PhoneCall
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'INFO' | 'ALERT' | 'SUCCESS' | 'MESSAGE';
  isRead: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, setActiveRole }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Vitals Reminder',
      description: 'Time to log your morning blood sugar levels.',
      time: '10m ago',
      type: 'ALERT',
      isRead: false
    },
    {
      id: '2',
      title: 'Partner Update',
      description: 'Rahul completed the task: "Buy iron supplements".',
      time: '1h ago',
      type: 'SUCCESS',
      isRead: false
    },
    {
      id: '3',
      title: 'Weekly Insight',
      description: 'Week 24: Your baby can now hear your heartbeat!',
      time: '3h ago',
      type: 'INFO',
      isRead: true
    },
    {
      id: '4',
      title: 'Doctor Message',
      description: 'Dr. Aditi shared your latest ultrasound report.',
      time: 'Yesterday',
      type: 'MESSAGE',
      isRead: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'ALERT': return <Clock className="w-4 h-4 text-rose-500" />;
      case 'SUCCESS': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'MESSAGE': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      default: return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'ALERT': return 'bg-rose-50';
      case 'SUCCESS': return 'bg-emerald-50';
      case 'MESSAGE': return 'bg-blue-50';
      default: return 'bg-amber-50';
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Role Navigation - Android 16 Glass Style */}
      <nav className="sticky top-0 z-40 bg-white/40 backdrop-blur-2xl border-b border-white/20 shadow-[0_1px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-rose-500 rounded-[1.25rem] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(244,63,94,0.3)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-xl font-serif font-bold text-rose-900 hidden sm:block">NurtureNet</span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-4 flex-1 justify-center max-w-lg overflow-x-auto mx-4 no-scrollbar">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveRole(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold transition-all flex-shrink-0 ${
                    activeRole === item.id 
                    ? 'bg-rose-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.2)]' 
                    : 'text-gray-500 hover:bg-white/50 hover:text-rose-600'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSOSActive(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500 text-white rounded-full text-[11px] font-black uppercase tracking-tight shadow-lg shadow-red-200 hover:bg-red-600 active:scale-95 transition-all"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span className="hidden xs:inline">SOS Emergency</span>
                <span className="xs:hidden">SOS</span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-all relative rounded-xl ${isNotificationsOpen ? 'bg-rose-100 text-rose-600' : 'text-gray-400 hover:text-rose-500'}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                  )}
                </button>

                {/* Notifications Popover */}
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white/95 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-[2rem] overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="p-5 border-b border-rose-50 flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">Notifications</h3>
                      <button 
                        onClick={markAllRead}
                        className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600"
                      >
                        Mark All Read
                      </button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-4 flex gap-4 hover:bg-rose-50/30 transition-colors cursor-pointer border-b border-rose-50/50 relative ${!notif.isRead ? 'bg-rose-50/20' : ''}`}
                          >
                            {!notif.isRead && (
                              <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1 h-8 bg-rose-500 rounded-full" />
                            )}
                            <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center ${getBg(notif.type)}`}>
                              {getIcon(notif.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-800 truncate">{notif.title}</p>
                              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{notif.description}</p>
                              <span className="text-[9px] font-bold text-slate-300 uppercase mt-1.5 block">{notif.time}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-slate-100 mx-auto mb-3" />
                          <p className="text-xs font-bold text-slate-400">All caught up!</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-slate-50/50 text-center">
                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500">View All Activity</button>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setIsProfileOpen(true)}
                className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-sm group ring-1 ring-rose-100/50"
              >
                <img 
                  src="https://picsum.photos/seed/maya/100/100" 
                  alt="Profile" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SOS EMERGENCY OVERLAY */}
      {isSOSActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-red-600/95 backdrop-blur-3xl animate-pulse" />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_32px_120px_rgba(220,38,38,0.5)] text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-red-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner border-2 border-red-50">
              <ShieldAlert className="w-12 h-12 text-red-600 animate-[bounce_1s_infinite]" />
            </div>
            
            <h2 className="text-3xl font-serif font-black text-slate-900 mb-4 tracking-tight leading-tight">
              EMERGENCY ALERT SENT
            </h2>
            
            <p className="text-slate-600 font-medium leading-relaxed mb-10 text-lg">
              Your partner and the rest of the family members have been alerted immediately. They are receiving your live location and status right now.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-5 bg-red-50 rounded-3xl border border-red-100">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm shrink-0">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-red-700 uppercase tracking-widest">Current Status</p>
                    <p className="text-sm font-bold text-slate-800">Live Location Sharing Active</p>
                 </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsSOSActive(false)}
                  className="flex-1 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  I am Safe
                </button>
                <button className="flex-1 py-5 bg-rose-50 text-rose-600 border-2 border-rose-100 rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-rose-100 transition-all active:scale-95">
                  <PhoneCall className="w-5 h-5" />
                  Call Support
                </button>
              </div>
            </div>

            <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Connecting you with help in 00:03...
            </p>
          </div>
        </div>
      )}

      {/* Global Click Handler to close notifications when clicking outside */}
      {isNotificationsOpen && (
        <div 
          className="fixed inset-0 z-50"
          onClick={() => setIsNotificationsOpen(false)}
        />
      )}

      {/* Profile Drawer Overlay */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-rose-900/10 backdrop-blur-md z-[60] transition-opacity"
          onClick={() => setIsProfileOpen(false)}
        />
      )}

      {/* Profile Drawer - Material You Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white/90 backdrop-blur-2xl z-[70] shadow-[-20px_0_40px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.07,1)] transform ${isProfileOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Account</h2>
            <button 
              onClick={() => setIsProfileOpen(false)}
              className="p-2 hover:bg-rose-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Account Profile Header */}
          <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-rose-50">
            <div className="relative mb-6">
              <div className="p-1 rounded-[2.5rem] bg-gradient-to-tr from-rose-400 to-amber-300">
                <img 
                  src="https://picsum.photos/seed/maya/150/150" 
                  alt="Maya Sharma" 
                  className="w-28 h-28 rounded-[2.25rem] object-cover border-4 border-white shadow-xl"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white p-2.5 rounded-2xl shadow-xl border border-rose-50 text-rose-500 hover:bg-rose-50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Maya Sharma</h3>
            <p className="text-sm text-rose-500 font-bold uppercase tracking-widest text-[10px] mt-1">Week 24 • Trimester 2</p>
          </div>

          {/* Menu Sections */}
          <div className="space-y-8">
            <section>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Identity</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-white/50 border border-white rounded-[1.5rem] shadow-sm">
                  <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Email</p>
                    <p className="text-sm font-semibold text-slate-700">maya.sharma@nurture.net</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/50 border border-white rounded-[1.5rem] shadow-sm">
                  <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Mobile</p>
                    <p className="text-sm font-semibold text-slate-700">+91 98765-43210</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Privacy Engine</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 hover:bg-white border border-transparent hover:border-white hover:shadow-sm rounded-[1.5rem] transition-all text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Health Data Sharing</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1" />
                </button>
                <button className="w-full flex items-center justify-between p-4 hover:bg-white border border-transparent hover:border-white hover:shadow-sm rounded-[1.5rem] transition-all text-left group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">Device Encryption</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1" />
                </button>
              </div>
            </section>

            <section>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Support Bridge</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-4 p-4 bg-indigo-500 text-white rounded-[1.75rem] font-bold text-sm shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98]">
                  <HelpCircle className="w-6 h-6" />
                  Talk to a Specialist
                </button>
                <div className="flex justify-center gap-6 mt-4">
                  <button className="text-[11px] font-bold text-slate-400 hover:text-rose-500 uppercase">Privacy</button>
                  <button className="text-[11px] font-bold text-slate-400 hover:text-rose-500 uppercase">Terms</button>
                  <button className="text-[11px] font-bold text-slate-400 hover:text-rose-500 uppercase">Help</button>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-rose-50">
            <button className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-bold hover:bg-red-50 rounded-[1.75rem] transition-all">
              <LogOut className="w-5 h-5" />
              Logout Securely
            </button>
            <p className="text-[10px] text-slate-300 text-center mt-6 font-medium">NurtureNet Dynamic Build v2.5.2</p>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      <footer className="bg-transparent border-t border-rose-200/20 py-8 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        <p>&copy; 2024 NurtureNet Unified Pregnancy Care • Built with Love & Privacy First</p>
      </footer>
    </div>
  );
};

export default Layout;
