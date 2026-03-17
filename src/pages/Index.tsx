import { useState } from "react";
import { Menu, Activity } from "lucide-react";
import ArvoSidebar from "@/components/ArvoSidebar";
import ChatMessage, { ChatMessageData } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import SuggestionChips from "@/components/SuggestionChips";
import LivePulsePanel from "@/components/LivePulsePanel";

const mockResponse: ChatMessageData = {
  id: "2",
  role: "assistant",
  content: `NVIDIA (NVDA) reported a strong Q3, beating analyst expectations across the board. Revenue came in at $18.12B vs. the $16.18B estimate — a 206% YoY increase driven primarily by Data Center demand for H100 GPUs.\n\nKey highlights:\n• Data Center revenue: $14.51B (+279% YoY)\n• Gaming revenue: $2.86B (+81% YoY)\n• Gross margin: 74% (up from 53.6% YoY)\n\nSentiment across major outlets is overwhelmingly bullish at 84%. Analysts are raising price targets, with a median of $950.`,
  tickers: [
    { symbol: "NVDA", name: "NVIDIA Corp", price: "875.24", change: 2.41 },
    { symbol: "AMD", name: "Adv Micro Dev", price: "178.52", change: -0.87 },
    { symbol: "SMCI", name: "Super Micro", price: "1,012.30", change: 5.12 },
  ],
  citations: [
    { source: "Reuters", headline: "Nvidia Q3 earnings crush Wall Street estimates on AI chip demand" },
    { source: "Bloomberg", headline: "Nvidia's data center revenue surges 279% in AI-driven boom" },
  ],
};

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [mobilePulseOpen, setMobilePulseOpen] = useState(false);

  const handleSend = (text: string) => {
    const userMsg: ChatMessageData = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { ...mockResponse, id: (Date.now() + 1).toString() },
      ]);
    }, 600);
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <ArvoSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col lg:ml-72 min-w-0">
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
        <div className="flex-1 overflow-y-auto">
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
                <ChatMessage key={msg.id} message={msg} index={i} />
              ))}
            </div>
          )}
        </div>

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
