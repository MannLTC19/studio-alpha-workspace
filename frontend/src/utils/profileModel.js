const DEFAULT_PROFILE = {
  name: 'Team Member',
  role: 'Team Member',
  avatar: null,
  bio: 'Collaborator at Studio Alpha.',
  skills: ['Architecture', 'Design', 'Collaboration'],
  location: 'Remote',
  banner: 'bg-gradient-to-r from-slate-400 to-slate-600',
};

export function normalizeProfile(source = {}) {
  return {
    ...DEFAULT_PROFILE,
    ...source,
    name: source.name || DEFAULT_PROFILE.name,
    role: source.role || DEFAULT_PROFILE.role,
    avatar: source.avatar || null,
    bio: source.bio || DEFAULT_PROFILE.bio,
    skills: Array.isArray(source.skills) && source.skills.length > 0 ? source.skills : DEFAULT_PROFILE.skills,
    location: source.location || DEFAULT_PROFILE.location,
    banner: source.banner || DEFAULT_PROFILE.banner,
  };
}

export function profileFromSupabaseRow(row = {}, fallback = {}) {
  const base = normalizeProfile(fallback);
  return {
    ...base,
    id: row.id || base.id,
    email: row.email || base.email || null,
    name: row.full_name || base.name,
    avatar: row.avatar_url || base.avatar,
    bio: row.bio || base.bio,
  };
}

export function profileToSupabaseInput(profile = {}, user = null) {
  return {
    id: user?.id,
    full_name: profile.name,
    email: user?.email || profile.email || null,
    avatar_url: profile.avatar || null,
    bio: profile.bio || null,
    updated_at: new Date().toISOString(),
  };
}
