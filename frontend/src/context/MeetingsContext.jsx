import React, { useState, createContext, useContext } from 'react';
import { initialMeetings } from '../utils/data';

export const MeetingsContext = createContext(null);

export function MeetingsProvider({ children }) {
  const [meetings, setMeetings] = useState(initialMeetings);

  const addAgendaToMeeting = (meetingId, agenda) => {
    setMeetings((prev) =>
      prev.map((m) =>
        m.id === meetingId ? { ...m, agendas: [...m.agendas, agenda] } : m
      )
    );
  };

  const addMeeting = (meeting) => {
    setMeetings((prev) => [...prev, meeting].sort((a, b) => b.id - a.id));
  };

  return (
    <MeetingsContext.Provider value={{ meetings, addAgendaToMeeting, addMeeting }}>
      {children}
    </MeetingsContext.Provider>
  );
}

export function useMeetings() {
  return useContext(MeetingsContext);
}
