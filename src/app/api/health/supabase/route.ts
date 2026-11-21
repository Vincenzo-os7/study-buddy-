import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

/**
 * Safe Supabase connection verification endpoint.
 * Performs lightweight health checks without exposing sensitive credentials or keys.
 */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase environment variables are missing or incomplete.",
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createServerClient();

    // Safe Check 1: Verify Supabase Auth / Gateway connectivity
    const { data: authData, error: authError } = await supabase.auth.getSession();

    if (authError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to establish connection to Supabase Auth endpoint.",
          details: authError.message,
          configured: true,
          connected: false,
        },
        { status: 502 }
      );
    }

    // Safe Check 2: Verify PostgREST database query engine
    // A query for a single row from any table or non-existent probe tests network & auth header validity
    const { error: dbError } = await supabase
      .from("learner_profiles")
      .select("id")
      .limit(1);

    // If table exists -> success (dbError is null).
    // If table doesn't exist yet -> PGRST205 / PGRST116 confirms PostgREST reached and authenticated successfully!
    const postgrestReachable = !dbError || dbError.code === "PGRST205" || dbError.code === "PGRST116" || dbError.code === "42P01";

    return NextResponse.json({
      status: "healthy",
      configured: true,
      connected: true,
      authService: "reachable",
      databaseGateway: postgrestReachable ? "reachable" : "error",
      databaseNote: dbError ? `Gateway reached (Table notice: ${dbError.message})` : "Tables active",
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown connection error";
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase connection check failed.",
        error: errorMsg,
        connected: false,
      },
      { status: 500 }
    );
  }
}
