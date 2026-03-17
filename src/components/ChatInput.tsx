import { useState } from "react";
import { ArrowUp, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const ChatInput = ({ onSend, value, onChange }: ChatInputProps) => {
  const handleSubmit = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    onChange("");
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-6">
      <div className="relative flex items-center gap-1 p-1.5 rounded-2xl bg-secondary border border-luminous focus-within:border-primary/40 focus-within:shadow-[0_0_20px_-5px_hsl(221,83%,53%,0.2)] transition-all duration-300">
        <button className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300">
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          className="flex-1 bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Ask about stocks, markets, or financial news..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        />
        <button className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300">
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="p-2.5 rounded-xl gradient-cta text-primary-foreground glow-shadow hover:brightness-110 transition-all duration-300 disabled:opacity-30 disabled:hover:brightness-100"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
