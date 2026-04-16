import React from 'react';
import { Plus, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useChat } from '../context/ChatContext';
import { useProfile } from '../context/ProfileContext';
import { getProfile } from '../utils/data';

export default function Forums() {
  const { params } = useNavigation();
  const { forums, setShowAddForum } = useChat();
  const { viewProfile } = useProfile();
  
  const activeCategory = forums.find(f => f.slug === params.category);
  const categoryName = activeCategory ? activeCategory.name : 'Architectural Discourse';
  const subtitle = activeCategory ? 'Forum Category' : 'Professional Exchange';

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="px-4 md:px-6 lg:px-12 py-8 lg:py-12 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-6">
          <div>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {subtitle}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              {categoryName}
            </h1>
          </div>
          <button onClick={() => setShowAddForum?.(true)} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all w-full md:w-auto">
            <Plus className="w-5 h-5" /> New Post
          </button>
        </div>

        <div className="flex flex-col space-y-4 md:space-y-6">
          <div className="group relative bg-white p-5 lg:p-8 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors duration-300 shadow-sm hover:shadow-md">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-slate-100 text-slate-700 px-3 py-0.5 rounded-full text-xs font-semibold">Urban Planning</span>
                  <span className="text-slate-400 text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2h ago</span>
                </div>
                <h2 className="text-lg lg:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 cursor-pointer leading-snug">
                  Reimagining Brutalist Interiors in Sustainable Residential Design
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
                  Discussion on how we can adapt existing concrete structures to meet modern energy efficiency standards without losing their raw aesthetic integrity...
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                  <div className="flex -space-x-2">
                    <img 
                      src={getProfile('Sarah Chen').avatar} 
                      onClick={(e) => { e.stopPropagation(); viewProfile(getProfile('Sarah Chen')); }}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover cursor-pointer hover:z-10 hover:ring-2 hover:ring-blue-400 transition-all" 
                      title="Sarah Chen"
                    />
                    <img 
                      src={getProfile('Marcus Thorne').avatar} 
                      onClick={(e) => { e.stopPropagation(); viewProfile(getProfile('Marcus Thorne')); }}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover cursor-pointer hover:z-10 hover:ring-2 hover:ring-blue-400 transition-all" 
                      title="Marcus Thorne"
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">+12 responding</span>
                </div>
              </div>
              <div className="flex md:flex-col items-center justify-between md:justify-center md:min-w-[100px] gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-center">
                  <div className="text-xl font-extrabold text-blue-700 leading-tight">48</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Replies</div>
                </div>
                <div className="hidden md:block w-full h-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-extrabold text-blue-700 leading-tight">1.2k</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Views</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 mb-8 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-500"><ChevronLeft className="w-5 h-5" /></button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-700 text-white font-bold shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-700">2</button>
          <span className="px-2 text-slate-400">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-700"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
