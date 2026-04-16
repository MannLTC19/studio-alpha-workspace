import React from 'react';
import { MessageSquare as MessageSquareIcon, Eye, Video, ArrowRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export default function Dashboard() {
  const { navigate } = useNavigation();
  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 mt-2">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
              Workspace Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Good morning, <span className="text-blue-700">Studio Alpha</span>.
            </h2>
            <p className="mt-4 text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              Your workspace is bustling today. You have 2 upcoming meetings and 12 unread forum discussions across your active projects.
            </p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            <div className="p-6 bg-blue-700 rounded-xl text-white shadow-lg shadow-blue-700/20 min-w-[160px]">
              <p className="text-xs opacity-80 font-semibold uppercase tracking-wider">Active Projects</p>
              <p className="text-3xl font-bold mt-1">08</p>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl text-blue-700 shadow-sm min-w-[160px]">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Team Capacity</p>
              <p className="text-3xl font-bold mt-1">94%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Recent Forum Activity</h3>
              <button onClick={() => navigate('/forums')} className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
            </div>

            <div className="space-y-4">
              <div className="group bg-white p-5 md:p-6 rounded-xl border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">Concept Review</span>
                  </div>
                  <span className="text-xs text-slate-400">24m ago</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Alternative material palettes for the Riverside Pavilion project?
                </h4>
                <p className="mt-2 text-slate-600 line-clamp-2 text-sm leading-relaxed">
                  We've been looking at cedar vs. charred timber for the external cladding. Does anyone have experience with maintenance cycles for charred timber in high-humidity zones?
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="flex items-center gap-1 text-xs"><MessageSquareIcon className="w-4 h-4" /> 14</span>
                    <span className="flex items-center gap-1 text-xs"><Eye className="w-4 h-4" /> 208</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Upcoming Meetings</h3>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 p-4 rounded-xl relative overflow-hidden group hover:border-blue-300 transition-colors cursor-pointer shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5B5FC7]"></div>
                <div className="flex justify-between items-start pl-2">
                  <div>
                    <p className="text-xs font-bold text-[#5B5FC7] mb-1">09:30 AM - 10:30 AM</p>
                    <h5 className="font-bold text-slate-900">Weekly Design Sync</h5>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1"><Video className="w-3 h-3" /> Microsoft Teams</p>
                  </div>
                  <button onClick={() => navigate('/workspace')} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#5B5FC7] group-hover:bg-[#5B5FC7] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
