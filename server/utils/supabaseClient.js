import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ✅ service role key

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and service role key must be provided");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
