const DEFAULT_POST = {
  id: '',
  categorySlug: 'general',
  categoryName: 'General',
  title: '',
  content: '',
  author: 'You',
  createdAt: new Date().toISOString(),
  views: 1,
};

const DEFAULT_COMMENT = {
  id: '',
  postId: '',
  author: 'You',
  content: '',
  createdAt: new Date().toISOString(),
  parentCommentId: null,
};

export function normalizeForumPost(input = {}) {
  return {
    ...DEFAULT_POST,
    ...input,
    id: input.id || `post-${Date.now()}`,
    title: String(input.title || '').trim(),
    content: String(input.content || '').trim(),
    author: String(input.author || DEFAULT_POST.author).trim(),
    createdAt: input.createdAt || new Date().toISOString(),
    views: Number.isFinite(Number(input.views)) ? Number(input.views) : DEFAULT_POST.views,
  };
}

export function createForumPost({ categorySlug, categoryName, title, content, author = 'You' }) {
  return normalizeForumPost({
    id: `post-${Date.now()}`,
    categorySlug,
    categoryName,
    title,
    content,
    author,
    createdAt: new Date().toISOString(),
    views: 1,
  });
}

export function normalizeForumComment(input = {}) {
  return {
    ...DEFAULT_COMMENT,
    ...input,
    id: input.id || `comment-${Date.now()}`,
    postId: String(input.postId || '').trim(),
    author: String(input.author || DEFAULT_COMMENT.author).trim(),
    content: String(input.content || '').trim(),
    createdAt: input.createdAt || new Date().toISOString(),
    parentCommentId: input.parentCommentId || null,
  };
}

export function createForumComment({ postId, author = 'You', content, parentCommentId = null }) {
  return normalizeForumComment({
    id: `comment-${Date.now()}`,
    postId,
    author,
    content,
    parentCommentId,
    createdAt: new Date().toISOString(),
  });
}
