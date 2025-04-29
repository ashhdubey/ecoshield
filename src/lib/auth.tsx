
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      setLoading(false);
      // Check if user is saved in localStorage for demo purposes
      const savedUser = localStorage.getItem('ecoshield_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          localStorage.removeItem('ecoshield_user');
        }
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const signIn = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo validation
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      const mockUser = { id: '123', email };
      setUser(mockUser);
      localStorage.setItem('ecoshield_user', JSON.stringify(mockUser));
      toast.success("Signed in successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signUp = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo validation
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      const mockUser = { id: '456', email };
      setUser(mockUser);
      localStorage.setItem('ecoshield_user', JSON.stringify(mockUser));
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      // Simulate API call delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('ecoshield_user');
      toast.success("Signed out successfully");
    } catch (error: any) {
      toast.error("Error signing out");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const value = {
    user,
    loading,
    signOut,
    signIn,
    signUp
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
