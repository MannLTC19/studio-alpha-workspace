import React, { useState } from 'react';
import { Video, X, Info } from 'lucide-react';
import { useMeetings } from '../../context/MeetingsContext';

export default function NewMeetingModal({ onClose }) {
  const { addMeeting } = useMeetings();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('Tomorrow');
  const [time, setTime] = useState('11:00 AM - 12:00 PM');
  const [type, setType] = useState('Internal');

  const handleSubmit = () => {
    if (!title.trim()) return;
    addMeeting({
      id: Date.now(),
      title: title.trim(),
      date,
      time,
      attendees: 1, 
      type,
      agendas: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5B5FC7]/10 flex items-center justify-center text-[#5B5FC7]">
              <Video className="w-4 h-4" />
            </div>
            <p className="font-bold text-slate-900 text-sm">Schedule Teams Meeting</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:bg-slate-200 p-1 rounded-md"><X className="w-5 h-5" /></button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Meeting Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#5B5FC7] focus:ring-1 focus:ring-[#5B5FC7] outline-none" placeholder="e.g. Brainstorming Session" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Date</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#5B5FC7] outline-none" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Time</label>
              <input value={time} onChange={(e) => setTime(e.target.value)} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#5B5FC7] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Meeting Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#5B5FC7] outline-none bg-white">
              <option value="Internal">Internal Team</option>
              <option value="External">External / Client</option>
            </select>
          </div>

          <div className="bg-[#5B5FC7]/5 border border-[#5B5FC7]/20 p-3 rounded-lg mt-2 flex gap-3 items-start">
             <Info className="w-5 h-5 text-[#5B5FC7] flex-shrink-0 mt-0.5" />
             <p className="text-xs text-slate-600 leading-relaxed">A Microsoft Teams join link is generated automatically when you create this meeting.</p>
          </div>

          <button onClick={handleSubmit} disabled={!title.trim()} className="w-full mt-4 py-2.5 bg-[#5B5FC7] text-white rounded-lg font-bold disabled:opacity-50 hover:bg-[#4b4eb0] transition-colors flex justify-center items-center gap-2">
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
