/**
 * BuddyStudy AI Provider Abstraction Layer
 * Handles rate-limiting, timeouts, provider selection (Gemini vs Mock), and fallback mechanics.
 */

import type { AICompanionRequest, AICompanionResponse } from "./types.ts";
import { generateMockAIResponse } from "./mockProvider.ts";
import { callGeminiAPI } from "./geminiProvider.ts";

// In-memory sliding window rate limiter
interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitBucket>();
const MAX_REQUESTS_PER_MINUTE = 25;
const WINDOW_MS = 60 * 1000;

export function checkRateLimit(clientIdentifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = rateLimitMap.get(clientIdentifier);

  if (!bucket || now > bucket.resetAt) {
    rateLimitMap.set(clientIdentifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_MINUTE - 1 };
  }

  if (bucket.count >= MAX_REQUESTS_PER_MINUTE) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_MINUTE - bucket.count };
}

/**
 * Main AI generation dispatcher:
 * - Checks rate limit
 * - Attempts Gemini API if GEMINI_API_KEY is configured
 * - Gracefully falls back to high-fidelity Mock provider if key is absent or request fails/times out
 */
export async function getAICompanionResponse(
  req: AICompanionRequest,
  clientIdentifier: string = "default-client"
): Promise<AICompanionResponse> {
  const rateLimit = checkRateLimit(clientIdentifier);
  if (!rateLimit.allowed) {
    throw new Error("Rate limit exceeded. Please wait a moment before sending another message.");
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0) {
    try {
      return await callGeminiAPI(req, apiKey, 10000);
    } catch (err) {
      console.warn("Gemini API call failed or timed out. Gracefully falling back to Educational Mock Provider:", err);
      // Fallback seamlessly to mock
      return generateMockAIResponse(req);
    }
  }

  // Use deterministic educational mock when no external key is configured
  return generateMockAIResponse(req);
}
