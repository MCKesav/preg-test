
import React from 'react';
import { Users, Heart, Gift, MessageCircle, Info, Calendar } from 'lucide-react';

const FamilyDashboard: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-slate-800">Welcome, Family!</h1>
        <p className="text-slate-500">Stay updated on Maya's journey and find ways to support.</p>
      </header>

      <section className="bg-rose-50 p-8 rounded-3xl border border-rose-100 text-center relative overflow-hidden">
        <Heart className="absolute -top-4 -left-4 w-24 h-24 text-rose-200/50 -rotate-12" />
        <Heart className="absolute -bottom-4 -right-4 w-24 h-24 text-rose-200/50 rotate-12" />
        <h2 className="text-xl font-bold text-rose-900 mb-2">Milestone Alert: 24 Weeks!</h2>
        <p className="text-rose-800 max-w-md mx-auto mb-6">
          The baby is now about the size of an ear of corn and can hear sounds from the outside world!
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-rose-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-rose-600 transition-all">Send Love</button>
          <button className="bg-white text-rose-600 px-6 py-2 rounded-xl font-bold shadow-sm border border-rose-200 hover:bg-rose-50 transition-all">Record Voice Note</button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Support Maya Today
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">1</span>
              <span>Ask about her sleep—third trimester is starting soon.</span>
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-[10px] font-bold">2</span>
              <span>Maya mentioned craving traditional homemade Makhana.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Family Events
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg">
              <span className="font-medium">Baby Shower Planning</span>
              <span className="text-xs text-slate-500">Nov 12</span>
            </div>
            <div className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg">
              <span className="font-medium">Hospital Visit (Maya)</span>
              <span className="text-xs text-slate-500">Dec 01</span>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Latest Shared Photos</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-sm">
              <img src={`https://picsum.photos/seed/preg${i}/200/200`} alt="Pregnancy memory" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      <div className="bg-indigo-900 text-white p-6 rounded-3xl flex items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-lg">Send a Care Package?</h3>
          <p className="text-indigo-200 text-sm">We've curated healthy snacks & wellness kits Maya will love.</p>
        </div>
        <Gift className="w-12 h-12 text-indigo-400 flex-shrink-0" />
      </div>
    </div>
  );
};

export default FamilyDashboard;
