import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "admin" | "user";

interface User {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: Role;
  warehouse: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Simulated backend user store ─────────────────────────────────────────────
// Replace this with a real API call to your backend (e.g. fetch('/api/auth/login'))
const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: 1,
    name: "Joshua Blatter",
    email: "admin@hearingaidlab.co.za",
    password: "admin123",
    initials: "JB",
    role: "admin",
    warehouse: "HEAD OFFICE",
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily@hearingaidlab.co.za",
    password: "user123",
    initials: "ED",
    role: "user",
    warehouse: "BRANCH 1",
  },
  {
    id: 3,
    name: "Robert Lee",
    email: "robert@hearingaidlab.co.za",
    password: "user123",
    initials: "RL",
    role: "user",
    warehouse: "BRANCH 2",
  },
];

// Simulate a backend login API call
async function apiLogin(email: string, password: string): Promise<User> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 800));

  const found = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!found) {
    throw new Error("Invalid email or password. Please try again.");
  }

  // Return only the safe user fields (no password)
  const { password: _pw, ...safeUser } = found;
  return safeUser;
}

const SESSION_KEY = "hal_pos_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message ?? "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
