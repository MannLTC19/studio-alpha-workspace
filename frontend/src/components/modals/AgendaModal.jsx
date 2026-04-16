import React, { useState } from 'react';
import { CalendarPlus, Check, X } from 'lucide-react';
import { useMeetings } from '../../context/MeetingsContext';

export default function AgendaModal({ conversationName, onClose }) {
  const { meetings, addAgendaToMeeting } = useMeetings();
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(['']);
  const [linkedMeetingId, setLinkedMeetingId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !linkedMeetingId) return;
    const agenda = {
      id: Date.now().toString(),
      title: title.trim(),
      createdFrom: conversationName,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: items.filter((t) => t.trim()).map((t, i) => ({ id: String(i), text: t.trim() })),
    };
    addAgendaToMeeting(Number(linkedMeetingId), agenda);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Add Meeting Agenda</p>
              <p className="text-[10px] text-slate-500">from {conversationName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:bg-slate-200 p-1 rounded-md"><X className="w-5 h-5" /></button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="font-bold text-slate-900 text-lg">Agenda Linked!</p>
            <button onClick={onClose} className="mt-6 w-full py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200">Done</button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Agenda Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. Design Review" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Link to Meeting</label>
              <select value={linkedMeetingId} onChange={(e) => setLinkedMeetingId(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                <option value="">Select meeting...</option>
                {meetings.map((m) => <option key={m.id} value={m.id}>{m.date} - {m.title}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Items</label>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={item} onChange={(e) => setItems(items.map((v, idx) => idx === i ? e.target.value : v))} type="text" className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none" placeholder={`Item ${i + 1}`} />
                  </div>
                ))}
              </div>
              <button onClick={() => setItems([...items, ''])} className="mt-2 text-xs text-blue-600 font-bold hover:underline">+ Add Item</button>
            </div>
            <button onClick={handleSubmit} disabled={!title || !linkedMeetingId} className="w-full mt-4 py-2.5 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50 hover:bg-blue-700">Save Agenda</button>
          </div>
        )}
      </div>
    </div>
  );
}
