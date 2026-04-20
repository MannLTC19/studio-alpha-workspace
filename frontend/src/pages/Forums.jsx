import React, { useState } from 'react';
import { Plus, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useChat } from '../context/ChatContext';
import { useProfile } from '../context/ProfileContext';
import { getProfile } from '../utils/data';

export default function Forums() {
  const { params } = useNavigation();
  const { forums, getForumPostsByCategory, addForumPost, getCommentCountForPost } = useChat();
  const { viewProfile } = useProfile();
  const [showComposer, setShowComposer] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  
  const activeCategory = forums.find(f => f.slug === params.category);
  const defaultCategory = activeCategory || forums[0];
  const categoryName = defaultCategory ? defaultCategory.name : 'Architectural Discourse';
  const subtitle = defaultCategory ? 'Forum Category' : 'Professional Exchange';
  const posts = getForumPostsByCategory(defaultCategory?.slug);

  const formatTimeAgo = (isoString) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleSubmitPost = () => {
    if (!defaultCategory || !postTitle.trim() || !postContent.trim()) return;
    addForumPost({
      categorySlug: defaultCategory.slug,
      title: postTitle,
      content: postContent,
      author: 'You',
    });
    setPostTitle('');
    setPostContent('');
    setShowComposer(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-50/50">
      <div className="px-4 md:px-6 lg:px-12 py-8 lg:py-12 max-w-5xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-6">
          <div>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
              {subtitle}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
              {categoryName}
            </h1>
          </div>
          <button onClick={() => setShowComposer(true)} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all w-full md:w-auto">
            <Plus className="w-5 h-5" /> New Post
          </button>
        </div>

        {showComposer && (
          <div className="mb-6 bg-white p-5 lg:p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Create Post in {categoryName}</p>
            <input
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mb-3 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              placeholder="Post title"
            />
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm resize-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
              placeholder="Share details with your team..."
            />
            <div className="mt-3 flex gap-2 justify-end">
              <button onClick={() => setShowComposer(false)} className="px-4 py-2 text-sm font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmitPost} disabled={!postTitle.trim() || !postContent.trim()} className="px-4 py-2 text-sm font-bold rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors disabled:opacity-50">
                Publish
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4 md:space-y-6">
          {posts.map((post) => {
            const authorProfile = getProfile(post.author);

            return (
              <div key={post.id} className="group relative bg-white p-5 lg:p-8 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors duration-300 shadow-sm hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="bg-slate-100 text-slate-700 px-3 py-0.5 rounded-full text-xs font-semibold">{post.categoryName}</span>
                      <span className="text-slate-400 text-xs flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatTimeAgo(post.createdAt)}</span>
                    </div>
                    <h2 className="text-lg lg:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-6">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProfile(authorProfile);
                        }}
                      >
                        {authorProfile.avatar ? (
                          <img
                            src={authorProfile.avatar}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover hover:z-10 hover:ring-2 hover:ring-blue-400 transition-all"
                            title={authorProfile.name}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center text-xs font-bold">
                            {authorProfile.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-xs text-slate-500 font-medium">{authorProfile.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center justify-between md:justify-center md:min-w-[100px] gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-blue-700 leading-tight">{getCommentCountForPost(post.id)}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Replies</div>
                    </div>
                    <div className="hidden md:block w-full h-px bg-slate-200"></div>
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-blue-700 leading-tight">{post.views > 999 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Views</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {posts.length === 0 && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
              No posts yet in this category. Create the first one.
            </div>
          )}
        </div>

        <div className="mt-10 mb-8 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-500"><ChevronLeft className="w-5 h-5" /></button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-700 text-white font-bold shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-700">2</button>
          <span className="px-2 text-slate-400">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-slate-200 transition-colors text-slate-700"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
