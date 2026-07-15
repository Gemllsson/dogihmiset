// Jaettu Supabase-yhteys kaikille sivuille.
// Tämä tiedosto ladataan JOKAISELLA sivulla, aina supabase-js-CDN:n jälkeen.

const SUPABASE_URL = 'https://kudwsjgoykahanrfnqpr.supabase.co';
const SUPABASE_KEY = 'sb_publishable_nQsHrSlp5JFc3qYfQBJ2Ug_5LgV3YuZ';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
