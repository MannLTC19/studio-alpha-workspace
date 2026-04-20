import React, { useState } from 'react';
import { Compass, Search, Bell, BellRing, Settings as SettingsIcon } from 'lucide-react';
import clsx from '../../utils/clsx';
import { useNavigation } from '../../context/NavigationContext';
import { useProfile } from '../../context/ProfileContext';
import { getProfile } from '../../utils/data';

export default function TopNavBar() {
  const { navigate } = useNavigation();
  const { viewProfile, currentUserProfile } = useProfile();
  const userProfile = currentUserProfile || getProfile('You');
  const [showNotifs, setShowNotifs] = useState(false);

  const notifications = [
    { id: 1, title: 'Sarah Chen mentioned you', desc: 'in Concept Review forum.', time: '10m ago', unread: true },
    { id: 2, title: 'Upcoming Meeting', desc: 'Weekly Design Sync in 15 mins.', time: '15m ago', unread: true },
    { id: 3, title: 'New Direct Message', desc: 'Marcus Thorne sent you a message.', time: '1h ago', unread: false },
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex justify-between items-center px-4 md:px-6 py-3 lg:px-8 lg:py-4 flex-shrink-0">
      <div className="flex items-center gap-6 flex-1">
        <h1 className="text-xl font-bold tracking-tighter text-blue-800 md:hidden flex items-center gap-2">
          <Compass className="w-5 h-5" /> Studio Alpha
        </h1>
        <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-xl w-full max-w-md border border-slate-200">
          <Search className="text-slate-400 w-5 h-5 mr-2" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-sm text-slate-700 w-full placeholder:text-slate-400"
            placeholder="Search workspace..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 text-slate-500 hover:bg-slate-100 transition-colors rounded-full relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
          </button>
          
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <p className="font-bold text-slate-800 text-sm flex items-center gap-2"><BellRing className="w-4 h-4 text-blue-600"/> Notifications</p>
                <button className="text-xs font-bold text-blue-600 hover:underline">Mark all read</button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className={clsx("px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors", notif.unread ? "bg-blue-50/50" : "")}>
                    <p className="text-sm font-bold text-slate-800 flex items-start justify-between gap-2">
                      {notif.title}
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1.5"></span>}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{notif.desc}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">View All Notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => navigate('/settings')}
          className="p-2 text-slate-500 hover:bg-slate-100 transition-colors rounded-full hidden sm:block"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        <div 
          className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded-xl transition-all"
          onClick={() => viewProfile({ ...userProfile, isCurrentUser: true })}
        >
          <img
            src={userProfile.avatar}
            alt="User profile"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-transparent group-hover:border-blue-300 group-hover:shadow-sm transition-all"
          />
          <div className="hidden lg:block text-right">
            <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-blue-700 transition-colors">{userProfile.name}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{userProfile.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
