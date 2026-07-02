import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create the client when both env vars are present. This avoids runtime
// errors during module import in environments where env vars aren't set
// (for example local development without .env.local).
let supabase: ReturnType<typeof createClient> | null = null
if (supabaseUrl && supabaseAnonKey) {
	supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
	// eslint-disable-next-line no-console
	console.warn("supabase client not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable it.")
}

export { supabase }
export default supabase
