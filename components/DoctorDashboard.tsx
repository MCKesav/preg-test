
import React from 'react';
import { Activity, User, Bell, Clipboard, MessageSquare, AlertCircle, TrendingUp, Search } from 'lucide-react';
import VitalsChart from './VitalsChart';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Activity className="text-blue-600" />
          Clinical Dashboard
        </h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patient..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts (2)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Patient Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Active Patients</h3>
          <div className="space-y-2">
            <div className="p-3 bg-blue-50 border-r-4 border-blue-500 rounded-l-xl flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                <img src="https://picsum.photos/seed/user1/40/40" alt="patient" />
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm">Maya Sharma</p>
                <p className="text-[10px] text-slate-500">24 Weeks • High Risk</p>
              </div>
            </div>
            {[2, 3, 4].map(i => (
              <div key={i} className="p-3 hover:bg-slate-50 rounded-xl flex items-center gap-3 cursor-pointer transition-colors">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden grayscale opacity-50">
                  <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="patient" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">Patient {i}</p>
                  <p className="text-[10px] text-slate-500">Routine Checkup</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Insights Area */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <User className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Maya Sharma</h2>
                  <p className="text-sm text-slate-500">Age: 28 | LMP: April 12, 2024 | G1P0</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><MessageSquare className="w-6 h-6" /></button>
                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors"><Clipboard className="w-6 h-6" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="flex justify-between items-start mb-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">URGENT</span>
                </div>
                <h4 className="text-xs font-bold text-red-900 uppercase">Blood Sugar</h4>
                <p className="text-2xl font-bold text-red-900">125 <span className="text-sm">mg/dL</span></p>
                <p className="text-[10px] text-red-700 mt-1">Spike detected after lunch (Today)</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
                <h4 className="text-xs font-bold text-emerald-900 uppercase">Weight Gain</h4>
                <p className="text-2xl font-bold text-emerald-900">+4.2 <span className="text-sm">kg</span></p>
                <p className="text-[10px] text-emerald-700 mt-1">On track for trimester 2</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Activity className="w-5 h-5 text-blue-500 mb-2" />
                <h4 className="text-xs font-bold text-blue-900 uppercase">Avg Sleep</h4>
                <p className="text-2xl font-bold text-blue-900">7.5 <span className="text-sm">hrs</span></p>
                <p className="text-[10px] text-blue-700 mt-1">Consistent for last 7 days</p>
              </div>
            </div>

            <h3 className="font-bold text-slate-800 mb-4">Long-term Trend: Blood Sugar</h3>
            <VitalsChart type="SUGAR" />
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Medical Files & Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center font-bold text-xs">PDF</div>
                  <div>
                    <p className="text-sm font-bold text-slate-700">Level 2 Ultrasound Scan</p>
                    <p className="text-[10px] text-slate-500">Uploaded 2 days ago</p>
                  </div>
                </div>
                <button className="text-blue-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">View File</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
