import React, { useState } from 'react';
import { Users, Hash, Briefcase, X, Search } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useProfile } from '../../context/ProfileContext';
import { useNavigation } from '../../context/NavigationContext';
import { directoryUsers, getProfile } from '../../utils/data';

export default function WorkspaceModals() {
  const { 
    showAddGroup, setShowAddGroup, 
    showAddDM, setShowAddDM, 
    showAddForum, setShowAddForum,
    addGroup, addDM, addForum 
  } = useChat();
  const { viewProfile } = useProfile();
  const { navigate } = useNavigation();
  const [newInputName, setNewInputName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const isGroupOrForum = showAddGroup || showAddForum;

  const handleAddConversation = () => {
    if (!newInputName.trim()) return;
    if (showAddGroup) {
      const slug = addGroup(newInputName.trim());
      navigate(`/messaging?group=${slug}`);
    } else if (showAddForum) {
      const slug = addForum(newInputName.trim());
      navigate(`/forums?category=${slug}`);
    } else {
      const slug = addDM(newInputName.trim());
      navigate(`/messaging?dm=${slug}`);
    }
    closeModals();
  };

  const startDM = (name) => {
    const slug = addDM(name);
    navigate(`/messaging?dm=${slug}`);
    closeModals();
  };

  const closeModals = () => {
    setShowAddGroup(false);
    setShowAddDM(false);
    setShowAddForum(false);
    setNewInputName('');
    setSearchQuery('');
  };

  if (!showAddGroup && !showAddDM && !showAddForum) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={closeModals}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
            {showAddGroup ? <><Users className="w-4 h-4 text-blue-600"/> Create New Group</> 
             : showAddForum ? <><Hash className="w-4 h-4 text-blue-600"/> Create New Forum Category</> 
             : <><Briefcase className="w-4 h-4 text-blue-600"/> Connect Directory</>}
          </p>
          <button onClick={closeModals} className="text-slate-400 hover:bg-slate-200 p-1 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {isGroupOrForum ? (
          <div className="p-6">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">
              {showAddGroup ? 'Group Name' : 'Category Name'}
            </label>
            <input
              autoFocus
              value={newInputName}
              onChange={e => setNewInputName(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              placeholder={showAddGroup ? 'e.g. Design Team' : 'e.g. Structural Engineering'}
              onKeyDown={e => {
                if(e.key === 'Enter') handleAddConversation();
              }}
            />
            
            <label className="text-xs font-bold text-slate-500 uppercase block mt-5 mb-2">Invite Members</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
              {directoryUsers.map(user => (
                <label key={user.name} className="flex items-center gap-3 p-3 hover:bg-slate-50 border-b border-slate-100 last:border-0 cursor-pointer transition-colors">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  {user.avatar ? (
                     <img src={user.avatar} className="w-8 h-8 rounded-full object-cover border border-slate-200"/>
                  ) : (
                     <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">{user.name.charAt(0)}</div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{user.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user.role}</p>
                  </div>
                </label>
              ))}
            </div>

            <button onClick={handleAddConversation} disabled={!newInputName.trim()} className="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-blue-700 transition-colors shadow-sm">
              {showAddGroup ? 'Create Group' : 'Create Forum'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col bg-slate-50/50">
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="bg-slate-100 border border-slate-200 rounded-lg flex items-center px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                <input 
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search company directory..." 
                  className="bg-transparent text-sm w-full outline-none text-slate-700 placeholder:text-slate-400" 
                />
              </div>
            </div>
            <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Connections</p>
              {directoryUsers
                .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(user => {
                 const profile = getProfile(user.name);
                 return (
                  <div key={user.name} className="flex items-center gap-3 p-2.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl transition-all group cursor-default">
                    <div 
                      onClick={() => viewProfile(profile)} 
                      className="cursor-pointer hover:ring-2 hover:ring-blue-400 rounded-full transition-all flex-shrink-0"
                      title="View Profile"
                    >
                       {profile.avatar ? (
                          <img src={profile.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                       ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center">
                            <span className="text-sm font-bold text-slate-500">{user.name.charAt(0)}</span>
                          </div>
                       )}
                    </div>
                    <div 
                      className="flex-1 min-w-0 cursor-pointer" 
                      onClick={() => viewProfile(profile)} 
                    >
                      <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">{user.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate">{user.role}</p>
                    </div>
                    <button
                      onClick={() => startDM(user.name)}
                      className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex-shrink-0"
                    >
                      Message
                    </button>
                  </div>
                )})}
              {directoryUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No contacts found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
