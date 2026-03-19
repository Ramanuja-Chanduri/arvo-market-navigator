import { ChatMessageData } from "@/components/ChatMessage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export interface StreamCallbacks {
  onToken: (token: string) => void;
  onDone: () => void;
  onError: (error: Error) => void;
}

/**
 * Parse a single SSE data line and extract the text token.
 * Supports both simple { delta: "..." } and OpenAI-style
 * { choices: [{ delta: { content: "..." } }] } shapes.
 */
function extractToken(jsonStr: string): string | null {
  try {
    const parsed = JSON.parse(jsonStr);

    // Simple shape: { delta: "token" }
    if (typeof parsed.delta === "string") return parsed.delta;

    // OpenAI shape: choices[0].delta.content
    const content = parsed?.choices?.[0]?.delta?.content;
    if (typeof content === "string") return content;

    return null;
  } catch {
    return null;
  }
}

/**
 * Send a chat request and stream the response token-by-token.
 * Returns an AbortController so the caller can cancel mid-stream.
 */
export async function streamChatResponse(
  messages: ChatMessageData[],
  callbacks: StreamCallbacks,
  signal: AbortSignal,
): Promise<void> {
  const { onToken, onDone, onError } = callbacks;

  try {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
      signal,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status} ${res.statusText}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      throw new Error("No readable stream in response");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      // Keep the last (possibly incomplete) line in the buffer
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith("data:")) {
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") {
            onDone();
            return;
          }
          const token = extractToken(payload);
          if (token !== null) {
            onToken(token);
          }
        }
      }
    }

    // Stream ended without [DONE] — still mark complete
    onDone();
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      // User-initiated abort — not an error
      onDone();
      return;
    }
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
