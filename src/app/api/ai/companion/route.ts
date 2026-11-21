import { NextRequest, NextResponse } from "next/server";
import { getAICompanionResponse } from "@/lib/ai/provider";
import { AICompanionRequest, AIAction } from "@/lib/ai/types";

const ALLOWED_ACTIONS: AIAction[] = [
  "explain_simply",
  "explain_deeply",
  "real_world_example",
  "generate_quiz",
  "explain_mistake",
  "suggest_next",
  "chat",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Input validation
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. Expected JSON object." },
        { status: 400 }
      );
    }

    const { action, domain, currentSkillId, currentSkillName, masteryLevel, userMessage, context } = body;

    if (!action || !ALLOWED_ACTIONS.includes(action)) {
      return NextResponse.json(
        { error: `Invalid action. Must be one of: ${ALLOWED_ACTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    if (!userMessage || typeof userMessage !== "string" || userMessage.trim().length === 0) {
      return NextResponse.json(
        { error: "Field 'userMessage' is required and must be non-empty string." },
        { status: 400 }
      );
    }

    if (userMessage.length > 2000) {
      return NextResponse.json(
        { error: "User message exceeds maximum allowed length of 2000 characters." },
        { status: 400 }
      );
    }

    // Client identifier for rate-limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "localhost-client";

    const companionRequest: AICompanionRequest = {
      action,
      domain: domain || "machine-learning",
      currentSkillId,
      currentSkillName,
      masteryLevel: masteryLevel || "beginner",
      userMessage: userMessage.trim(),
      context,
    };

    const response = await getAICompanionResponse(companionRequest, clientIp);
    return NextResponse.json(response, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";

    if (errorMsg.includes("Rate limit")) {
      return NextResponse.json({ error: errorMsg }, { status: 429 });
    }

    console.error("AI Companion API Error:", err);
    return NextResponse.json(
      { error: "Failed to generate educational explanation. Please try again." },
      { status: 500 }
    );
  }
}
