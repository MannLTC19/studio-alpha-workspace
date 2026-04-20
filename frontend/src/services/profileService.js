import { supabase } from '../utils/supabase';
import { profileFromSupabaseRow, profileToSupabaseInput } from '../utils/profileModel';

export async function fetchProfileById(userId, fallbackProfile) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url, bio, created_at, updated_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return {
    rowExists: Boolean(data),
    profile: profileFromSupabaseRow(data || {}, fallbackProfile),
  };
}

export async function upsertCurrentUserProfile(user, profilePayload) {
  if (!user?.id) {
    throw new Error('Missing authenticated user for profile update.');
  }

  const rowInput = profileToSupabaseInput(profilePayload, user);

  const { data, error } = await supabase
    .from('profiles')
    .upsert(rowInput, { onConflict: 'id' })
    .select('id, full_name, email, avatar_url, bio, created_at, updated_at')
    .single();

  if (error) throw error;
  return profileFromSupabaseRow(data || {}, profilePayload);
}
