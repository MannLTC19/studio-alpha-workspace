import React, { useState, createContext, useContext } from 'react';
import { initialForums, initialMessageGroups, initialDirectMessages, getProfile } from '../utils/data';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [forums, setForums] = useState(initialForums);
  const [groups, setGroups] = useState(initialMessageGroups);
  const [dms, setDms] = useState(initialDirectMessages);
  
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddDM, setShowAddDM] = useState(false);
  const [showAddForum, setShowAddForum] = useState(false);

  const addForum = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setForums(prev => prev.some(f => f.slug === slug) ? prev : [...prev, { name, slug }]);
    return slug;
  };

  const addGroup = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setGroups(prev => prev.some(g => g.slug === slug) ? prev : [...prev, { name, slug }]);
    return slug;
  };

  const addDM = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const profile = getProfile(name);
    setDms(prev => prev.some(d => d.slug === slug) ? prev : [...prev, { name, slug, avatar: profile.avatar }]);
    return slug;
  };

  return (
    <ChatContext.Provider value={{ 
      forums, groups, dms, addForum, addGroup, addDM, 
      showAddGroup, setShowAddGroup, 
      showAddDM, setShowAddDM,
      showAddForum, setShowAddForum
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
