import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

// Get the display count for the frontend (actual count + 5 offset for social proof)
// When actual count reaches 20, display resets to 15 (20 - 5 = 15)
export async function getWaitlistDisplayCount(): Promise<number> {
  if (!isSupabaseConfigured) {
    // Return a static demo number if not configured
    return 5;
  }

  try {
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    const actualCount = count || 0;
    
    // If actual count is 20 or more, show 15 (reset the illusion)
    // Otherwise show actual count + 5 offset
    if (actualCount >= 20) {
      return 15;
    }
    
    return actualCount + 5;
  } catch (err) {
    console.error('Error fetching waitlist count:', err);
    return 5; // Fallback
  }
}
