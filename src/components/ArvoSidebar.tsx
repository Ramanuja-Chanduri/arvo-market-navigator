import { useState, useRef, useEffect } from "react";
import { Plus, Settings, Zap, PanelLeftClose, PanelLeft, MoreVertical, Pencil, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuroraBackground from "./AuroraBackground";

const initialChatHistory: Record<string, string[]> = {
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

const menuStyle: React.CSSProperties = {
  background: "rgba(15, 18, 30, 0.95)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  padding: 6,
};

interface ArvoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

/* ── Chat Item with hover menu ── */
const ChatItem = ({
  chat,
  onRename,
  onDelete,
}: {
  chat: string;
  onRename: (newName: string) => void;
  onDelete: () => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editValue, setEditValue] = useState(chat);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setConfirmDelete(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const commitRename = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== chat) onRename(trimmed);
    else setEditValue(chat);
    setEditing(false);
  };

  return (
    <div className="group relative flex items-center">
      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") { setEditValue(chat); setEditing(false); }
          }}
          className="w-full px-3 py-2 rounded-lg text-sm text-foreground bg-[rgba(255,255,255,0.07)] border border-primary/50 outline-none"
        />
      ) : (
        <button className="w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-left truncate pr-8">
          {chat}
        </button>
      )}

      {/* 3-dot icon */}
      {!editing && (
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen((p) => !p); setConfirmDelete(false); }}
          className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in hover:bg-[rgba(255,255,255,0.08)] text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Context menu */}
      {menuOpen && (
        <div ref={menuRef} className="absolute right-0 top-full mt-1 z-[60]" style={menuStyle}>
          {confirmDelete ? (
            <div className="w-[160px] p-2">
              <p className="text-xs text-muted-foreground mb-2">Delete this chat?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => { onDelete(); setMenuOpen(false); }}
                  className="flex-1 text-xs py-1 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 text-xs py-1 rounded-md bg-[rgba(255,255,255,0.06)] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => { setMenuOpen(false); setEditing(true); }}
                className="flex items-center gap-2 w-[160px] h-8 px-3 rounded-md text-[13px] text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" /> Rename
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-2 w-[160px] h-8 px-3 rounded-md text-[13px] text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Main Sidebar ── */
const ArvoSidebar = ({ isOpen, onClose, collapsed, onToggleCollapse }: ArvoSidebarProps) => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [settingsOpen]);

  const handleRename = (period: string, idx: number, newName: string) => {
    setChatHistory((prev) => {
      const updated = { ...prev };
      updated[period] = [...updated[period]];
      updated[period][idx] = newName;
      return updated;
    });
  };

  const handleDelete = (period: string, idx: number) => {
    setChatHistory((prev) => {
      const updated = { ...prev };
      updated[period] = updated[period].filter((_, i) => i !== idx);
      if (updated[period].length === 0) delete updated[period];
      return updated;
    });
  };

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
        <AuroraBackground />

        <div className="relative flex flex-col h-full glass-surface rounded-r-2xl lg:rounded-r-none">
          {/* Logo + collapse toggle */}
          <div className={`flex items-center pt-6 pb-2 ${collapsed ? "flex-col gap-2 px-2" : "gap-2.5 px-4"}`}>
            <div className="w-8 h-8 rounded-lg gradient-cta flex items-center justify-center glow-shadow shrink-0">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold tracking-tight text-foreground flex-1">
                Arvo
              </span>
            )}
            <button
              onClick={onToggleCollapse}
              className={`hidden lg:flex p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300 text-muted-foreground hover:text-foreground ${collapsed ? "mt-1" : ""}`}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
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
                    {chats.map((chat, idx) => (
                      <ChatItem
                        key={`${period}-${idx}`}
                        chat={chat}
                        onRename={(newName) => handleRename(period, idx, newName)}
                        onDelete={() => handleDelete(period, idx)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Bottom */}
          <div className={`px-3 py-4 border-t border-luminous flex items-center ${collapsed ? "flex-col gap-2" : "gap-3"}`}>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground shrink-0">
              A
            </div>
            {!collapsed && (
              <span className="text-sm text-muted-foreground flex-1">Analyst</span>
            )}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setSettingsOpen((p) => !p)}
                className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors duration-300"
              >
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
              {settingsOpen && (
                <div className="absolute bottom-full mb-2 right-0 z-[60]" style={menuStyle}>
                  <button
                    onClick={() => { setSettingsOpen(false); navigate("/"); }}
                    className="flex items-center gap-2 w-[160px] h-8 px-3 rounded-md text-[13px] text-[#f1f5f9] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#ef4444] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ArvoSidebar;
