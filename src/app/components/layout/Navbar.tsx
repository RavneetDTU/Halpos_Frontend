import { useState, useRef, useEffect } from "react";
import {
  FileText,
  BarChart3,
  ShoppingCart,
  Calculator,
  Cloud,
  Network,
  MessageCircle,
  Bell,
  Calendar,
  CreditCard,
  Flag,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-12 bg-[#3d3d3d] flex items-center justify-between px-2 gap-1">
      {/* Left side icons */}
      <div className="flex items-center gap-1">
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <FileText size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <FileText size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <FileText size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <BarChart3 size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Cloud size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Network size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <MessageCircle size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 transition-colors relative">
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold px-1 py-0.5 rounded leading-none">
            8973
          </span>
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Calculator size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Calendar size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <CreditCard size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center hover:bg-white/10 transition-colors">
          <Flag size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 transition-colors">
          <span className="text-white font-bold text-lg">⚠</span>
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-green-600 hover:bg-green-700 transition-colors">
          <ShoppingCart size={20} className="text-white" />
        </button>
        <button className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors">
          <span className="text-white font-bold text-lg">⚙</span>
        </button>
      </div>

      {/* Right side: User info + clickable profile avatar */}
      <div className="flex items-center gap-3 px-3">

        {/* User name & warehouse */}
        <div className="text-right">
          <div className="text-xs text-white font-medium leading-tight">{user?.name ?? "—"}</div>
          <div className="text-xs text-white/50 leading-tight">{user?.warehouse ?? ""}</div>
        </div>

        {/* Clickable profile avatar with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((v) => !v)}
            title="Account menu"
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-semibold shadow-lg border-2 border-white/20 hover:border-blue-300/60 transition-all flex-shrink-0 focus:outline-none"
          >
            {user?.initials ?? "?"}
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-[#2a2d3e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
              {/* User info header */}
              <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-white/40 truncate mt-0.5">{user?.email}</p>
                <p className="text-[10px] text-blue-400 truncate mt-0.5">{user?.warehouse}</p>
              </div>
              {/* Sign out */}
              <button
                id="logout-btn"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
