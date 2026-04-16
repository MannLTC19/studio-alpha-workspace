import React from 'react';
import { X, MessageSquare as MessageSquareIcon, Settings as SettingsIcon, MapPin, Mail, Info, Award } from 'lucide-react';
import clsx from '../../utils/clsx';
import { useNavigation } from '../../context/NavigationContext';
import { useChat } from '../../context/ChatContext';
import { CURRENT_USER_NAME } from '../../utils/data';

export default function ProfileModal({ profile, onClose }) {
  const { navigate } = useNavigation();
  const { addDM } = useChat();

  const handleMessage = () => {
    const slug = addDM(profile.name);
    navigate(`/messaging?dm=${slug}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className={clsx("h-32 relative", profile.banner || 'bg-gradient-to-r from-blue-600 to-indigo-800')}>
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute top-16 left-6">
          {profile.avatar ? (
             <img src={profile.avatar} className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-sm bg-white" alt={profile.name} />
          ) : (
             <div className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center shadow-sm">
                <span className="text-3xl font-extrabold text-slate-400">{profile.name.charAt(0)}</span>
             </div>
          )}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
        </div>

        <div className="flex justify-end px-6 pt-4 pb-2">
          {profile.name !== CURRENT_USER_NAME && (
            <button onClick={handleMessage} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
              <MessageSquareIcon className="w-4 h-4" /> Message
            </button>
          )}
          {profile.name === CURRENT_USER_NAME && (
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-200 transition-colors flex items-center gap-2">
              <SettingsIcon className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        <div className="px-6 pb-8">
          <h2 className="text-2xl font-extrabold text-slate-900">{profile.name}</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{profile.role}</p>

          <div className="flex items-center gap-5 mt-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {profile.location}</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> Contact</span>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Info className="w-3.5 h-3.5"/> About</p>
            <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
          </div>

          <div className="mt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Award className="w-3.5 h-3.5"/> Skills & Expertise</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(s => (
                <span key={s} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
