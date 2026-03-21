import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, Activity, Square, ArrowDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ArvoSidebar from "@/components/ArvoSidebar";
import ChatMessage, { ChatMessageData } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import SuggestionChips from "@/components/SuggestionChips";
import LivePulsePanel from "@/components/LivePulsePanel";
import StreamingSkeleton from "@/components/StreamingSkeleton";
import StreamError from "@/components/StreamError";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mobilePulseOpen, setMobilePulseOpen] = useState(false);

  const {
    messages,
    streamingStatus,
    streamingContent,
    error,
    sendMessage,
    stopGeneration,
    retryLastMessage,
  } = useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userScrolledRef = useRef(false);
  const [showJumpButton, setShowJumpButton] = useState(false);

  const isActive = streamingStatus === "waiting" || streamingStatus === "streaming";

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    chatEndRef.current?.scrollIntoView({ behavior });
  }, []);

  // Detect user scroll-up during streaming
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const scrolledUp = distanceFromBottom > 100;

      if (isActive) {
        userScrolledRef.current = scrolledUp;
        setShowJumpButton(scrolledUp);
      } else {
        setShowJumpButton(false);
        userScrolledRef.current = false;
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isActive]);

  // Auto-scroll on new messages and streaming content
  useEffect(() => {
    if (!userScrolledRef.current) {
      scrollToBottom("smooth");
    }
  }, [messages, streamingContent, streamingStatus, scrollToBottom]);

  const handleJumpToLatest = () => {
    userScrolledRef.current = false;
    setShowJumpButton(false);
    scrollToBottom("smooth");
  };

  const handleSend = (text: string) => {
    userScrolledRef.current = false;
    setShowJumpButton(false);
    sendMessage(text);
    // Instant scroll for user's own message
    requestAnimationFrame(() => scrollToBottom("instant"));
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
  };

  const isEmpty = messages.length === 0 && streamingStatus === "idle";

  return (
    <div className="h-screen flex overflow-hidden relative">
      <AnimatedBackground />
      <ArvoSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(p => !p)} />

      {/* Main Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-72"}`}>
        {/* Header */}
        <header className="flex items-center h-12 px-4 border-b border-luminous shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors duration-300"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="text-sm text-muted-foreground ml-2 lg:ml-0">
            {isEmpty ? "New conversation" : "NVIDIA earnings analysis"}
          </span>
        </header>

        {/* Chat Body */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto relative">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
                Market intelligence, <span className="text-gradient">distilled.</span>
              </h1>
              <p className="text-sm text-muted-foreground mb-10">
                Ask Arvo anything about stocks, markets, or financial news.
              </p>
              <SuggestionChips onSelect={handleSuggestion} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-8">
              {messages.map((msg, i) => (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  index={i}
                  onRegenerate={msg.role === "assistant" ? retryLastMessage : undefined}
                  isRegenerating={isActive}
                />
              ))}

              {/* Streaming AI response */}
              <AnimatePresence mode="wait">
                {streamingStatus === "waiting" && (
                  <StreamingSkeleton key="skeleton" />
                )}
              </AnimatePresence>

              {streamingStatus === "streaming" && streamingContent && (
                <ChatMessage
                  key="streaming"
                  message={{
                    id: "streaming",
                    role: "assistant",
                    content: streamingContent,
                  }}
                  index={messages.length}
                  isStreaming
                />
              )}

              {streamingStatus === "error" && error && (
                <StreamError error={error} onRetry={retryLastMessage} />
              )}

              <div ref={chatEndRef} />
            </div>
          )}

          {/* Jump to latest button */}
          <AnimatePresence>
            {showJumpButton && (
              <button
                onClick={handleJumpToLatest}
                className="fixed bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-luminous text-xs text-muted-foreground hover:text-foreground transition-colors shadow-lg"
              >
                <ArrowDown className="w-3 h-3" />
                Jump to latest
              </button>
            )}
          </AnimatePresence>
        </div>

        {/* Stop generating button */}
        <AnimatePresence>
          {isActive && (
            <div className="flex justify-center -mb-1">
              <button
                onClick={stopGeneration}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-secondary border border-luminous text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Square className="w-3 h-3 fill-current" />
                Stop generating
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>

      {/* Right Panel — desktop */}
      <div className="hidden lg:block">
        <LivePulsePanel />
      </div>

      {/* Right Panel — mobile overlay */}
      {mobilePulseOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobilePulseOpen(false)}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full z-50 lg:hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobilePulseOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <LivePulsePanel className="!w-[300px]" />
      </div>

      {/* Mobile floating Pulse button */}
      <button
        onClick={() => setMobilePulseOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-30 w-12 h-12 rounded-full gradient-cta glow-shadow flex items-center justify-center text-primary-foreground shadow-lg"
      >
        <Activity className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Index;
