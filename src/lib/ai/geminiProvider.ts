/**
 * Google Gemini Server-Side Provider
 * Securely communicates with the Gemini REST API using server-side environment credentials.
 * Never exposes keys or internal system errors to the browser.
 */

import type { AICompanionRequest, AICompanionResponse } from "./types.ts";

export async function callGeminiAPI(
  req: AICompanionRequest,
  apiKey: string,
  timeoutMs: number = 12000
): Promise<AICompanionResponse> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are the BuddyStudy AI Learning Companion, an expert educational tutor.
Your mission is to help students understand difficult academic concepts and follow their personalized learning roadmap.
Adhere strictly to these pedagogical guidelines:
1. Explain with crystal clarity, adapting to the student's level (${req.masteryLevel || "beginner"}).
2. Distinguish intuitive mental models from formal mathematical formulations.
3. Use relevant, memorable analogies when requested.
4. Never fabricate sources, citations, credentials, or URLs.
5. If generating a quiz, provide 4 distinct options, the 0-based correct index, and a clear conceptual rationale.
6. Return your response as a valid JSON object matching this schema:
{
  "title": "string",
  "explanation": "string",
  "keyTakeaway": "string",
  "analogyOrExample": "string (optional)",
  "quiz": { "question": "string", "options": ["string"], "correctIndex": number, "explanation": "string" } (optional),
  "nextTopicSuggestion": { "skillId": "string", "skillName": "string", "reason": "string" } (optional)
}`;

  const userPrompt = `Student Context:
- Domain: ${req.domain}
- Current Skill: ${req.currentSkillName || "General Topic"} (${req.currentSkillId || "none"})
- Mastery Level: ${req.masteryLevel || "beginner"}
- Requested Action: ${req.action}
- Student Message / Query: "${req.userMessage}"

Respond in the required JSON format.`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          { text: userPrompt }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Gemini API returned empty response candidate.");
    }

    const parsed = JSON.parse(candidateText);

    return {
      action: req.action,
      title: parsed.title || `BuddyStudy Companion: ${req.currentSkillName || "Concept"}`,
      explanation: parsed.explanation || "No explanation provided.",
      keyTakeaway: parsed.keyTakeaway,
      analogyOrExample: parsed.analogyOrExample,
      quiz: parsed.quiz
        ? {
            question: parsed.quiz.question,
            options: parsed.quiz.options,
            correctIndex: parsed.quiz.correctIndex,
            explanation: parsed.quiz.explanation,
            conceptTag: req.currentSkillId || "general",
          }
        : undefined,
      nextTopicSuggestion: parsed.nextTopicSuggestion,
      modelUsed: "Google Gemini 1.5 Flash (Live Server API)",
      isMock: false,
      timestamp: new Date().toISOString(),
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    throw err;
  }
}
