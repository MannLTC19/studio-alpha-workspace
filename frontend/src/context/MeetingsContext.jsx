import React, { useEffect, useState, createContext, useContext } from 'react';
import { initialMeetings } from '../utils/data';

export const MeetingsContext = createContext(null);

const STORAGE_KEY = 'studio-alpha.meetings';

const readStoredMeetings = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialMeetings;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialMeetings;
  } catch {
    return initialMeetings;
  }
};

export function MeetingsProvider({ children }) {
  const [meetings, setMeetings] = useState(readStoredMeetings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  }, [meetings]);

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
