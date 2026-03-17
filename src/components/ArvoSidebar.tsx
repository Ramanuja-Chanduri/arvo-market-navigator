import { useState } from "react";
import { Plus, Settings, Zap, MessageSquare, PanelLeftClose, PanelLeft } from "lucide-react";
import AuroraBackground from "./AuroraBackground";

const chatHistory = {
  Today: [
    "NVIDIA earnings analysis",
    "S&P 500 market outlook",
    "Fed rate decision impact",
  ],
  Yesterday: [
    "AAPL vs MSFT comparison",
    "Crypto market overview",
  ],
  "This Week": [
    "Tesla delivery numbers",
    "Bond yield analysis",
    "Oil price forecast",
  ],
};

interface ArvoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArvoSidebar = ({ isOpen, onClose }: ArvoSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed left-0 top-0 h-full z-50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          collapsed ? "w-16" : "w-72"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Aurora behind the glass */}
        <AuroraBackground />

        {/* Glass panel */}
        <div className="relative flex flex-col h-full glass-surface rounded-r-2xl lg:rounded-r-none">
          {/* Logo + collapse toggle */}
          <div className="flex items-center gap-2.5 px-4 pt-6 pb-2">
            <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center glow-shadow shrink-0">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold tracking-tight text-foreground flex-1">
                Arvo
              </span>
            )}
            <button
              onClick={() => setCollapsed((p) => !p)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 text-muted-foreground hover:text-foreground"
            >
              {collapsed ? (
                <PanelLeft className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* New Chat */}
          <div className="px-3 py-4">
            <button
              className={`w-full flex items-center justify-center gap-2 rounded-xl gradient-cta text-primary-foreground text-sm font-medium glow-shadow hover:brightness-110 transition-all duration-300 ${
                collapsed ? "px-2 py-2.5" : "px-4 py-2.5"
              }`}
            >
              <Plus className="w-4 h-4 shrink-0" />
              {!collapsed && "New Chat"}
            </button>
          </div>

          {/* Chat History */}
          {!collapsed ? (
            <div className="flex-1 overflow-y-auto px-3 space-y-5">
              {Object.entries(chatHistory).map(([period, chats]) => (
                <div key={period}>
                  <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {period}
                  </p>
                  <div className="space-y-0.5">
                    {chats.map((chat) => (
                      <button
                        key={chat}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-left truncate"
                      >
                        <MessageSquare className="w-3.5 h-3.5 shrink-0 opacity-50" />
                        <span className="truncate">{chat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-2 space-y-1 pt-2">
              {Object.values(chatHistory)
                .flat()
                .map((chat) => (
                  <button
                    key={chat}
                    title={chat}
                    className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                  >
                    <MessageSquare className="w-3.5 h-3.5 opacity-50" />
                  </button>
                ))}
            </div>
          )}

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-luminous flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground shrink-0">
              A
            </div>
            {!collapsed && (
              <span className="text-sm text-muted-foreground flex-1">Analyst</span>
            )}
            <button className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ArvoSidebar;
