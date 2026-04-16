import React, { useState } from 'react';
import { Compass, Plus, LayoutDashboard, Hash, ChevronDown, MessageSquare as MessageSquareIcon, Users, User, Calendar, HelpCircle, LogOut } from 'lucide-react';
import clsx from '../../utils/clsx';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

export default function SideNavBar() {
  const { path, params, navigate } = useNavigation();
  const { logout } = useAuth();
  const { forums, groups: messageGroups, dms: directMessages, setShowAddGroup, setShowAddDM, setShowAddForum } = useChat();
  const [forumsOpen, setForumsOpen] = useState(path === '/forums');
  const [messagingOpen, setMessagingOpen] = useState(path === '/messaging');

  const NavItem = ({ to, icon: Icon, children }) => {
    const isActive = path === to;
    return (
      <button
        onClick={() => navigate(to)}
        className={clsx(
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-all duration-200 hover:translate-x-1',
          isActive ? 'text-blue-700 bg-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-200/50'
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-sm">{children}</span>
      </button>
    );
  };

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-slate-50 border-r border-slate-200 flex-col py-6 px-4 z-40 overflow-y-auto">
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white flex-shrink-0 shadow-md">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">Studio Alpha</h2>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Workspace</p>
        </div>
      </div>

      <div className="px-2 mb-6">
        <button className="w-full py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Post</span>
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        <NavItem to="/" icon={LayoutDashboard}>Dashboard</NavItem>

        <div>
          <button
            onClick={() => { setForumsOpen(!forumsOpen); navigate('/forums'); }}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-all duration-200',
              path === '/forums' ? 'text-blue-700 bg-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-200/50'
            )}
          >
            <Hash className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm flex-1 text-left">Forums</span>
            <ChevronDown className={clsx('w-4 h-4 transition-transform duration-200 text-slate-400', forumsOpen && 'rotate-180')} />
          </button>
          {forumsOpen && (
            <div className="ml-4 mt-1 mb-1 border-l-2 border-slate-200 pl-3 space-y-0.5">
              <div className="flex items-center justify-between pr-2 mt-1">
                <p className="px-2 pt-1 pb-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Categories</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowAddForum(true); }}
                  className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
                  title="Create Forum"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {forums.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => navigate(`/forums?category=${cat.slug}`)}
                  className={clsx(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                    params.category === cat.slug ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  <Hash className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => { setMessagingOpen(!messagingOpen); navigate('/messaging'); }}
            className={clsx(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-all duration-200',
              path === '/messaging' ? 'text-blue-700 bg-white shadow-sm font-semibold' : 'text-slate-600 hover:bg-slate-200/50'
            )}
          >
            <MessageSquareIcon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm flex-1 text-left">Messaging</span>
            <ChevronDown className={clsx('w-4 h-4 transition-transform duration-200 text-slate-400', messagingOpen && 'rotate-180')} />
          </button>
          
          {messagingOpen && (
            <div className="ml-4 mt-1 mb-1 border-l-2 border-slate-200 pl-3 space-y-0.5">
              <div className="flex items-center justify-between pr-2 mt-1">
                <p className="px-2 pt-1 pb-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Groups</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowAddGroup(true); }}
                  className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
                  title="Create Group"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              
              {messageGroups.map(group => (
                <button
                  key={group.slug}
                  onClick={() => navigate(`/messaging?group=${group.slug}`)}
                  className={clsx(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                    params.group === group.slug ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{group.name}</span>
                </button>
              ))}

              <div className="flex items-center justify-between pr-2 mt-2">
                <p className="px-2 pt-1 pb-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Direct</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowAddDM(true); }}
                  className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-blue-600 transition-colors"
                  title="Connect"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {directMessages.map(dm => (
                <button
                  key={dm.slug}
                  onClick={() => navigate(`/messaging?dm=${dm.slug}`)}
                  className={clsx(
                    'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors',
                    params.dm === dm.slug ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  )}
                >
                  {dm.avatar ? <img src={dm.avatar} alt="" className="w-4 h-4 rounded-full object-cover flex-shrink-0" /> : <User className="w-3.5 h-3.5 flex-shrink-0" />}
                  <span className="truncate">{dm.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <NavItem to="/workspace" icon={Calendar}>Meetings</NavItem>
      </nav>

      <div className="pt-6 mt-auto border-t border-slate-200 space-y-1">
        <button 
          onClick={() => navigate('/help')}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
            path === '/help' ? "text-blue-700 bg-white shadow-sm font-semibold" : "text-slate-600 hover:bg-slate-200/50"
          )}
        >
          <HelpCircle className="w-5 h-5 flex-shrink-0" /> <span>Help</span>
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-200/50 text-sm rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
