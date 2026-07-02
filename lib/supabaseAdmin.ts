import { createClient } from "@supabase/supabase-js"

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY || ""

let supabaseAdmin: ReturnType<typeof createClient> | null = null

if (url && serviceRoleKey) {
  supabaseAdmin = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
} else {
  // Leave as null — route handlers should check and fail-safe.
  // eslint-disable-next-line no-console
  console.warn(
    "supabaseAdmin: SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/SERVICE_ROLE_KEY not set"
  )
}

export default supabaseAdmin
