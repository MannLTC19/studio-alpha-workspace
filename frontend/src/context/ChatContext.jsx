import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { initialForums, initialMessageGroups, initialDirectMessages, getProfile } from '../utils/data';
import {
  createForumPost,
  createForumComment,
  normalizeForumPost,
  normalizeForumComment,
} from '../utils/forumModels';

export const ChatContext = createContext(null);

const CHAT_STORAGE_KEYS = {
  forums: 'studio-alpha.forums',
  groups: 'studio-alpha.groups',
  dms: 'studio-alpha.dms',
  forumPosts: 'studio-alpha.forumPosts',
  forumComments: 'studio-alpha.forumComments',
  messageThreads: 'studio-alpha.messageThreads',
};

const initialForumPosts = [
  normalizeForumPost({
    id: 'post-1',
    categorySlug: 'urban-planning',
    categoryName: 'Urban Planning',
    title: 'Reimagining Brutalist Interiors in Sustainable Residential Design',
    content:
      'Discussion on how we can adapt existing concrete structures to meet modern energy efficiency standards without losing their raw aesthetic integrity.',
    author: 'Sarah Chen',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    views: 1200,
  }),
];

const initialForumComments = [
  normalizeForumComment({
    id: 'comment-1',
    postId: 'post-1',
    author: 'Marcus Thorne',
    content: 'We should compare thermal retrofit cost against embodied carbon reduction for each material option.',
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  }),
  normalizeForumComment({
    id: 'comment-2',
    postId: 'post-1',
    author: 'Jamie Liu',
    content: 'I can add a landscape-driven cooling strategy section to complement this discussion.',
    createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
  }),
];

const initialMessageThreads = {
  'group:zenith': [
    {
      id: 'm-1',
      sender: 'Sarah Chen',
      text: "I've updated the structural renders for the atrium. The glass curvature needs to be slightly more aggressive to maintain the architectural flow.",
      createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
      type: 'message',
    },
    {
      id: 'm-2',
      sender: 'You',
      text: "Looks stunning, Sarah. The way the light hits those curves at sunset will be phenomenal. I'll pass this to the engineering team.",
      createdAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
      type: 'message',
    },
    {
      id: 'm-3',
      sender: 'System',
      text: 'Engineering Team joined the conversation',
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      type: 'system',
    },
  ],
};

const readStored = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export function ChatProvider({ children }) {
  const [forums, setForums] = useState(() => readStored(CHAT_STORAGE_KEYS.forums, initialForums));
  const [groups, setGroups] = useState(() => readStored(CHAT_STORAGE_KEYS.groups, initialMessageGroups));
  const [dms, setDms] = useState(() => readStored(CHAT_STORAGE_KEYS.dms, initialDirectMessages));
  const [forumPosts, setForumPosts] = useState(() => readStored(CHAT_STORAGE_KEYS.forumPosts, initialForumPosts));
  const [forumComments, setForumComments] = useState(() =>
    readStored(CHAT_STORAGE_KEYS.forumComments, initialForumComments)
  );
  const [messageThreads, setMessageThreads] = useState(() =>
    readStored(CHAT_STORAGE_KEYS.messageThreads, initialMessageThreads)
  );
  
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [showAddDM, setShowAddDM] = useState(false);
  const [showAddForum, setShowAddForum] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.forums, JSON.stringify(forums));
  }, [forums]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.groups, JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.dms, JSON.stringify(dms));
  }, [dms]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.forumPosts, JSON.stringify(forumPosts));
  }, [forumPosts]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.forumComments, JSON.stringify(forumComments));
  }, [forumComments]);

  useEffect(() => {
    window.localStorage.setItem(CHAT_STORAGE_KEYS.messageThreads, JSON.stringify(messageThreads));
  }, [messageThreads]);

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

  const addForumPost = ({ categorySlug, title, content, author = 'You' }) => {
    const category = forums.find((f) => f.slug === categorySlug);
    const post = createForumPost({
      categorySlug,
      categoryName: category?.name || 'General',
      title,
      content,
      author,
    });
    setForumPosts((prev) => [post, ...prev]);
    return post;
  };

  const getForumPostsByCategory = (categorySlug) => {
    if (!categorySlug) return forumPosts;
    return forumPosts.filter((post) => post.categorySlug === categorySlug);
  };

  const addForumComment = ({ postId, content, author = 'You', parentCommentId = null }) => {
    const comment = createForumComment({ postId, content, author, parentCommentId });
    setForumComments((prev) => [...prev, comment]);
    return comment;
  };

  const getCommentsByPostId = (postId) => {
    if (!postId) return [];
    return forumComments.filter((comment) => comment.postId === postId);
  };

  const getCommentCountForPost = (postId) => {
    return getCommentsByPostId(postId).length;
  };

  const getConversationKey = (groupSlug, dmSlug) => {
    if (groupSlug) return `group:${groupSlug}`;
    if (dmSlug) return `dm:${dmSlug}`;
    return null;
  };

  const getMessagesForConversation = (groupSlug, dmSlug) => {
    const key = getConversationKey(groupSlug, dmSlug);
    if (!key) return [];
    return messageThreads[key] || [];
  };

  const sendMessage = ({ groupSlug, dmSlug, text, sender = 'You' }) => {
    const key = getConversationKey(groupSlug, dmSlug);
    if (!key || !text.trim()) return;
    const message = {
      id: `m-${Date.now()}`,
      sender,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      type: 'message',
    };
    setMessageThreads((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), message],
    }));
  };

  const value = useMemo(() => ({
    forums,
    groups,
    dms,
    forumPosts,
    forumComments,
    addForum,
    addGroup,
    addDM,
    addForumPost,
    addForumComment,
    getForumPostsByCategory,
    getCommentsByPostId,
    getCommentCountForPost,
    getMessagesForConversation,
    sendMessage,
    showAddGroup,
    setShowAddGroup,
    showAddDM,
    setShowAddDM,
    showAddForum,
    setShowAddForum,
  }), [
    forums,
    groups,
    dms,
    forumPosts,
    forumComments,
    showAddGroup,
    showAddDM,
    showAddForum,
    messageThreads,
  ]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
