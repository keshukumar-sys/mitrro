import { createContext, useContext, useEffect, useState } from 'react';

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://mitrro-backend-mongodb.onrender.com";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: { name: string; email: string; phone: string; password: string }) => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const url = `${BACKEND_URL}/api/users/login`;
      console.log("[Auth] signIn → URL:", url);
      console.log("[Auth] signIn → email:", email);

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("[Auth] signIn → status:", res.status, "response:", data);

      if (!res.ok) {
        return { error: data.message || "Login failed" };
      }

      // Save user to localStorage AND update context state
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      console.error("[Auth] signIn → network error:", err);
      return { error: err.message || "Network error" };
    }
  };

  const signUp = async (signUpData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ error: string | null }> => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.message || "Signup failed" };
      }

      // Save user to localStorage AND update context state
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return { error: null };
    } catch (err: any) {
      return { error: err.message || "Network error" };
    }
  };

  const signOut = async (): Promise<{ error: string | null }> => {
    try {
      await fetch(`${BACKEND_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Even if backend call fails, still clear local state
      console.error("Logout backend call failed");
    }

    // Always clear local state
    localStorage.removeItem('user');
    setUser(null);
    return { error: null };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
