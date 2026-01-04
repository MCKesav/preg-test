
import React from 'react';
import { ShoppingCart, ChefHat, Heart, Calendar, CheckSquare, MessageCircle, ArrowRight } from 'lucide-react';
import { MOCK_TASKS } from '../constants';
import { UserRole } from '../types';

const PartnerDashboard: React.FC = () => {
  const partnerTasks = MOCK_TASKS.filter(t => t.assignedTo === UserRole.PARTNER);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="md:col-span-2 lg:col-span-2 space-y-6">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <CheckSquare className="text-blue-500" />
              Your Support Checklist
            </h2>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">4 Tasks Pending</span>
          </div>
          
          <div className="space-y-4">
            {partnerTasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-blue-500'}`}>
                  {task.completed && <CheckSquare className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{task.title}</p>
                  <p className="text-xs text-slate-500">Due: {task.dueDate}</p>
                </div>
                <button className="text-slate-400 hover:text-blue-500">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-blue-600 text-sm font-semibold">+ Add Task for Yourself</button>
        </section>

        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl font-serif font-bold mb-4">Tonight's Goal: Iron-Rich Dinner</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Maya's latest blood test showed iron levels are slightly on the lower side. Doctors suggest adding more spinach or lentils to her diet.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center gap-2">
                <ChefHat className="w-5 h-5" /> View Recipes
              </button>
              <button className="bg-blue-500/50 hover:bg-blue-500/70 border border-white/20 px-6 py-2 rounded-xl font-bold transition-colors">
                Order Groceries
              </button>
            </div>
          </div>
          <ChefHat className="absolute -bottom-6 -right-6 w-48 h-48 text-white/10 rotate-12" />
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50 flex gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Shopping List</h4>
              <p className="text-sm text-slate-500">Dates, Spinach, Walnut, Milk</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-50 flex gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Support Chat</h4>
              <p className="text-sm text-slate-500">Ask nutritionists or mentors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-amber-600 w-5 h-5" />
            <h3 className="font-bold text-amber-900 uppercase text-xs tracking-wider">Partner Tip of the Day</h3>
          </div>
          <p className="text-sm text-amber-800 italic leading-relaxed">
            "At 24 weeks, many mothers experience back pain. Offer a 10-minute foot or lower back massage tonight before bed. It goes a long way in mental wellness."
          </p>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Maya's Appointments</h3>
          <p className="text-xs text-slate-500 mb-4">Ensure you've blocked your calendar for these:</p>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs font-bold text-blue-600">IN 4 DAYS</p>
              <p className="text-sm font-bold text-slate-800">Anomaly Scan</p>
              <p className="text-xs text-slate-500">City Hospital • 11:30 AM</p>
            </div>
          </div>
        </section>

        <div className="p-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-3xl">
          <section className="bg-white p-6 rounded-[calc(1.5rem-2px)] h-full">
            <h3 className="font-bold text-slate-800 mb-2">Learning Module</h3>
            <p className="text-xs text-slate-500 mb-4">How to prepare for the third trimester transition.</p>
            <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
              <button className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
