import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "restaurant" | "ngo";

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const DEMO_CREDENTIALS = [
  { email: "restaurant@demo.com", password: "demo123", role: "restaurant" as UserRole, name: "Chennai Grand Kitchen" },
  { email: "ngo@demo.com", password: "demo123", role: "ngo" as UserRole, name: "Feed Chennai Foundation" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const found = DEMO_CREDENTIALS.find(c => c.email === email && c.password === password);
    if (found) {
      setUser({ email: found.email, role: found.role, name: found.name });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
