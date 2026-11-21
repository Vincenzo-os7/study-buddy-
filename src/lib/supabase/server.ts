import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

interface ServerClientOptions {
  useServiceRole?: boolean;
}

/**
 * Creates a server-side Supabase client for Server Components, Server Actions,
 * and API Route Handlers.
 *
 * Security:
 * - Keeps service-role credentials strictly on the server.
 * - Throws descriptive errors if required environment variables are absent.
 */
export function createServerClient(
  options: ServerClientOptions = {}
): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // For administrative or privileged server-side operations, use service role if explicitly requested.
  // Otherwise use the public publishable/anon key.
  const supabaseKey = options.useServiceRole
    ? process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase server environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are configured in .env.local."
    );
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
