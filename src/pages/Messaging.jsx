import React, { useState, useEffect } from 'react';
import { Plus, Users, ChevronLeft, CalendarPlus, Phone, MessageSquare as MessageSquareIcon, Info, Smile, Paperclip, Image as ImageIcon, Send } from 'lucide-react';
import clsx from '../utils/clsx';
import { useNavigation } from '../context/NavigationContext';
import { useChat } from '../context/ChatContext';
import { useProfile } from '../context/ProfileContext';
import { getProfile } from '../utils/data';
import AgendaModal from '../components/modals/AgendaModal';

export default function Messaging() {
  const { params, navigate } = useNavigation();
  const { groups: messageGroups, dms: directMessages, setShowAddGroup, setShowAddDM } = useChat();
  const { viewProfile } = useProfile();

  const groupSlug = params.group;
  const dmSlug = params.dm;

  const [showAgendaModal, setShowAgendaModal] = useState(false);
  const [inputText, setInputText] = useState('');

  const activeGroup = groupSlug ? messageGroups.find((g) => g.slug === groupSlug) : null;
  const activeDM = dmSlug ? directMessages.find((d) => d.slug === dmSlug) : null;
  const conversationName = activeGroup?.name ?? activeDM?.name ?? null;
  const isChatActive = Boolean(groupSlug || dmSlug);

  const mockMessages = [
    { id: '1', sender: 'Sarah Chen', time: '10:24 AM', text: "I've updated the structural renders for the atrium. The glass curvature needs to be slightly more aggressive to maintain the architectural flow." },
    { id: '2', sender: 'You', time: '10:31 AM', text: "Looks stunning, Sarah. The way the light hits those curves at sunset will be phenomenal. I'll pass this to the engineering team.", isSelf: true },
    { id: '3', isSystem: true, text: 'Engineering Team joined the conversation' }
  ];

  useEffect(() => {
    if (!isChatActive && window.innerWidth >= 768) {
      navigate('/messaging?group=zenith');
    }
  }, [isChatActive, navigate]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-white relative">
      <aside className={clsx(
        "w-full md:w-72 flex-shrink-0 flex flex-col border-r border-slate-200 bg-slate-50 overflow-y-auto z-10",
        isChatActive ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-800 text-lg">Conversations</h2>
        </div>
        <div className="px-3 pt-4 pb-2 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Groups</p>
          <button onClick={() => setShowAddGroup(true)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-200 rounded transition-colors" title="Create Group">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="px-3 pb-2">
          {messageGroups.map((group) => {
            const active = groupSlug === group.slug;
            return (
              <button
                key={group.slug}
                onClick={() => navigate(`/messaging?group=${group.slug}`)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-colors',
                  active ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-200/50 text-slate-700'
                )}
              >
                <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", active ? "bg-blue-200 text-blue-700" : "bg-white border border-slate-200 text-slate-500")}>
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{group.name}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">Tap to view chat...</p>
                </div>
              </button>
            );
          })}
        </div>
        <div className="px-3 pt-2 pb-2 mt-2 flex items-center justify-between">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Direct Messages</p>
          <button onClick={() => setShowAddDM(true)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-200 rounded transition-colors" title="Connect">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="px-3 pb-5">
          {directMessages.map((dm) => {
            const active = dmSlug === dm.slug;
            const profile = getProfile(dm.name);
            return (
              <button
                key={dm.slug}
                onClick={() => navigate(`/messaging?dm=${dm.slug}`)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-left transition-colors',
                  active ? 'bg-blue-100' : 'hover:bg-slate-200/50'
                )}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} className="w-10 h-10 rounded-xl object-cover border border-slate-200" alt="" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center border border-slate-300">
                    <span className="text-slate-500 font-bold text-sm">{profile.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className={clsx('text-sm font-bold truncate', active ? 'text-blue-800' : 'text-slate-800')}>{profile.name}</p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className={clsx(
        "flex-1 flex flex-col min-w-0 bg-white h-full relative",
        !isChatActive ? "hidden md:flex" : "flex"
      )}>
        {conversationName ? (
          <>
            <div className="px-4 md:px-6 py-3 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-sm z-10 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/messaging')} className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                {activeGroup ? (
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shadow-inner">
                    <Users className="w-5 h-5 text-blue-700" />
                  </div>
                ) : activeDM?.avatar ? (
                  <img 
                    src={activeDM.avatar} 
                    onClick={() => viewProfile(getProfile(activeDM.name))}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all" 
                    alt="" 
                  />
                ) : (
                  <div 
                    onClick={() => activeDM && viewProfile(getProfile(activeDM.name))}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                  >
                    <span className="text-slate-500 font-bold">{activeDM?.name?.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 leading-tight text-sm md:text-base cursor-pointer hover:underline" onClick={() => !activeGroup && viewProfile(getProfile(activeDM.name))}>
                    {conversationName}
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-500 mt-0.5">
                    {activeGroup ? 'Project Team Channel' : 'Direct Message'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => setShowAgendaModal(true)}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" /> Agenda
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6 bg-slate-50/50">
              <div className="flex justify-center">
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                  Today
                </span>
              </div>

              {mockMessages.map((msg) => {
                if (msg.isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-lg">
                        <Info className="text-slate-500 w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-tight">{msg.text}</span>
                      </div>
                    </div>
                  );
                }

                const profile = getProfile(msg.sender);

                return (
                  <div key={msg.id} className={clsx("flex gap-3 max-w-[85%] md:max-w-2xl", msg.isSelf ? "ml-auto flex-row-reverse" : "")}>
                    {!msg.isSelf && (
                        profile.avatar ? (
                          <img 
                            src={profile.avatar} 
                            onClick={() => viewProfile(profile)}
                            className="w-8 h-8 rounded-full border border-slate-200 object-cover cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all flex-shrink-0" 
                            alt="" 
                          />
                        ) : (
                          <div 
                            onClick={() => viewProfile(profile)}
                            className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 border border-blue-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
                          >
                            <span className="text-xs font-bold text-blue-700">{msg.sender[0]}</span>
                          </div>
                        )
                    )}
                    <div className={clsx("space-y-1", msg.isSelf ? "text-right" : "text-left")}>
                      <div className={clsx("flex items-baseline gap-2", msg.isSelf && "justify-end")}>
                        <span 
                          onClick={() => viewProfile(profile)}
                          className={clsx("text-xs font-bold text-slate-800", !msg.isSelf && "cursor-pointer hover:underline")}
                        >
                          {msg.isSelf ? 'You' : msg.sender}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <div className={clsx(
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.isSelf 
                          ? "bg-blue-600 text-white rounded-tr-sm" 
                          : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 md:p-4 bg-white border-t border-slate-200 flex-shrink-0">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex flex-col">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-slate-700 text-sm p-2 resize-none h-[44px] placeholder:text-slate-400"
                  placeholder={`Message ${conversationName}...`}
                />
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Smile className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><ImageIcon className="w-4 h-4" /></button>
                  </div>
                  <button className="bg-blue-600 text-white p-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-2">
                    <span className="hidden md:inline text-sm font-bold">Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 p-6 text-center">
             <MessageSquareIcon className="w-16 h-16 mb-4 text-slate-300" />
             <p className="text-lg font-bold text-slate-600">No Conversation Selected</p>
             <p className="text-sm mt-2 max-w-sm">Select a group or direct message from the sidebar to start collaborating.</p>
          </div>
        )}
      </section>

      {showAgendaModal && conversationName && (
        <AgendaModal
          conversationName={conversationName}
          onClose={() => setShowAgendaModal(false)}
        />
      )}
    </div>
  );
}
