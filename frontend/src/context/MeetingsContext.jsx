import React, { useEffect, useState, createContext, useContext } from 'react';
import { initialMeetings } from '../utils/data';

export const MeetingsContext = createContext(null);

const STORAGE_KEY = 'studio-alpha.meetings';

const generateFallbackMeetingId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const generateTeamsMeetingLink = (title = 'Studio Alpha Meeting') => {
  const meetingId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : generateFallbackMeetingId();

  const context = encodeURIComponent(
    JSON.stringify({
      Tid: meetingId,
      Oid: meetingId,
    })
  );

  return `https://teams.microsoft.com/l/meetup-join/19%3ameeting_${meetingId}%40thread.v2/0?context=${context}`;
};

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
    const normalizedMeeting = {
      ...meeting,
      link: meeting.link?.trim() || generateTeamsMeetingLink(meeting.title),
    };

    setMeetings((prev) => [...prev, normalizedMeeting].sort((a, b) => b.id - a.id));
  };

  return (
    <MeetingsContext.Provider
      value={{ meetings, addAgendaToMeeting, addMeeting, generateTeamsMeetingLink }}
    >
      {children}
    </MeetingsContext.Provider>
  );
}

export function useMeetings() {
  return useContext(MeetingsContext);
}
