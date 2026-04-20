import React, { useState } from 'react';
import { Video, Clock, ClipboardList, Users, Share2 } from 'lucide-react';
import { useMeetings } from '../context/MeetingsContext';
import NewMeetingModal from '../components/modals/NewMeetingModal';

export default function Workspace() {
  const { meetings } = useMeetings();
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [openedMeetingId, setOpenedMeetingId] = useState(null);

  const openMeetingInNewTab = (meeting) => {
    window.open(meeting.link, '_blank', 'noopener,noreferrer');
    setOpenedMeetingId(meeting.id);
    window.setTimeout(() => setOpenedMeetingId(null), 1800);
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto pb-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Meetings
            </h1>
            <p className="mt-2 text-slate-600 text-sm md:text-base max-w-xl">
              Manage and join your scheduled Microsoft Teams meetings. Agendas created in chat appear here automatically.
            </p>
          </div>
          <button 
            onClick={() => setShowNewMeeting(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all flex-shrink-0"
          >
            <Video className="w-4 h-4" /> Schedule Meeting
          </button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200">
                      {meeting.date}
                    </span>
                    <span className="text-sm text-slate-600 flex items-center gap-1 font-semibold">
                      <Clock className="w-4 h-4 text-slate-400" /> {meeting.time}
                    </span>
                    {meeting.agendas.length > 0 && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <ClipboardList className="w-3.5 h-3.5" />
                        {meeting.agendas.length} agenda{meeting.agendas.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">{meeting.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {meeting.attendees} Attendees</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> {meeting.type}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => openMeetingInNewTab(meeting)}
                    className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-4 py-3 rounded-lg font-bold transition-all shadow-sm border border-slate-300"
                  >
                    <Share2 className="w-4 h-4" /> {openedMeetingId === meeting.id ? 'Opened' : 'Open Link'}
                  </button>
                  <button
                    onClick={() => openMeetingInNewTab(meeting)}
                    className="flex items-center justify-center gap-2 bg-[#5B5FC7] hover:bg-[#4b4eb0] text-white px-6 py-3.5 rounded-lg font-bold transition-all w-full md:w-auto flex-shrink-0 shadow-sm hover:shadow-md active:scale-95 border border-[#4b4eb0]"
                  >
                    <Video className="w-5 h-5" /> Join Teams Meeting
                  </button>
                </div>
              </div>

              {meeting.agendas.length > 0 && (
                <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4 space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Meeting Agendas</p>
                  {meeting.agendas.map((agenda) => (
                    <div key={agenda.id} className="bg-white rounded-lg border border-slate-200 p-4 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-bold text-slate-800 text-sm">{agenda.title}</p>
                        <p className="text-[10px] text-slate-400 flex flex-col items-end whitespace-nowrap">
                          <span>{agenda.createdAt}</span>
                          <span>from {agenda.createdFrom}</span>
                        </p>
                      </div>
                      {agenda.items.length > 0 && (
                        <ol className="space-y-1 mt-2">
                          {agenda.items.map((item, i) => (
                            <li key={item.id} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="text-blue-600 font-bold text-xs w-4 mt-0.5">{i + 1}.</span> {item.text}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showNewMeeting && <NewMeetingModal onClose={() => setShowNewMeeting(false)} />}
    </div>
  );
}
