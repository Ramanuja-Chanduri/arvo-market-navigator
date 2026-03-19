import { useState, useRef, useCallback, useEffect } from "react";
import { ChatMessageData } from "@/components/ChatMessage";
import { streamChatResponse } from "@/services/chatStreamService";

export type StreamingStatus = "idle" | "waiting" | "streaming" | "error";

export interface UseChatReturn {
  messages: ChatMessageData[];
  streamingStatus: StreamingStatus;
  streamingContent: string;
  error: string | null;
  sendMessage: (text: string) => void;
  stopGeneration: () => void;
  retryLastMessage: () => void;
}

const FLUSH_INTERVAL_MS = 30;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [streamingStatus, setStreamingStatus] = useState<StreamingStatus>("idle");
  const [streamingContent, setStreamingContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const tokenBufferRef = useRef("");
  const flushIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamingMsgIdRef = useRef<string>("");

  const clearFlushInterval = useCallback(() => {
    if (flushIntervalRef.current) {
      clearInterval(flushIntervalRef.current);
      flushIntervalRef.current = null;
    }
  }, []);

  // Flush buffered tokens to state
  const startFlushing = useCallback(() => {
    clearFlushInterval();
    flushIntervalRef.current = setInterval(() => {
      if (tokenBufferRef.current) {
        const chunk = tokenBufferRef.current;
        tokenBufferRef.current = "";
        setStreamingContent((prev) => prev + chunk);
      }
    }, FLUSH_INTERVAL_MS);
  }, [clearFlushInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFlushInterval();
      abortControllerRef.current?.abort();
    };
  }, [clearFlushInterval]);

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    clearFlushInterval();

    // Flush any remaining tokens
    if (tokenBufferRef.current) {
      const remaining = tokenBufferRef.current;
      tokenBufferRef.current = "";
      setStreamingContent((prev) => prev + remaining);
    }
  }, [clearFlushInterval]);

  const finalizeMessage = useCallback(() => {
    clearFlushInterval();

    // Flush remaining buffer
    const remaining = tokenBufferRef.current;
    tokenBufferRef.current = "";

    setStreamingContent((prev) => {
      const finalContent = prev + remaining;

      if (finalContent.trim()) {
        const msgId = streamingMsgIdRef.current;
        setMessages((msgs) => [
          ...msgs,
          {
            id: msgId,
            role: "assistant" as const,
            content: finalContent,
          },
        ]);
      }

      return "";
    });

    setStreamingStatus("idle");
    abortControllerRef.current = null;
  }, [clearFlushInterval]);

  const sendMessage = useCallback(
    (text: string) => {
      // Abort any in-flight request
      abortControllerRef.current?.abort();

      const userMsg: ChatMessageData = {
        id: Date.now().toString(),
        role: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMsg]);
      setError(null);
      setStreamingContent("");
      setStreamingStatus("waiting");
      tokenBufferRef.current = "";
      streamingMsgIdRef.current = (Date.now() + 1).toString();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Build messages array including the new user message
      const allMessages = [...messages, userMsg];

      startFlushing();

      streamChatResponse(
        allMessages,
        {
          onToken: (token) => {
            setStreamingStatus("streaming");
            tokenBufferRef.current += token;
          },
          onDone: () => {
            finalizeMessage();
          },
          onError: (err) => {
            clearFlushInterval();
            // Flush partial content
            if (tokenBufferRef.current) {
              const partial = tokenBufferRef.current;
              tokenBufferRef.current = "";
              setStreamingContent((prev) => prev + partial);
            }
            setError(err.message);
            setStreamingStatus("error");
            abortControllerRef.current = null;
          },
        },
        controller.signal,
      );
    },
    [messages, startFlushing, finalizeMessage, clearFlushInterval],
  );

  const retryLastMessage = useCallback(() => {
    // Find the last user message
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;

    // Remove the failed assistant placeholder if any
    setError(null);
    setStreamingContent("");
    sendMessage(lastUserMsg.content);
  }, [messages, sendMessage]);

  return {
    messages,
    streamingStatus,
    streamingContent,
    error,
    sendMessage,
    stopGeneration,
    retryLastMessage,
  };
}
