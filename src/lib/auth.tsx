
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    try {
      const supabase = createClient();
      
      // Check for an existing session
      const getInitialSession = async () => {
        try {
          setLoading(true);
          const { data } = await supabase.auth.getSession();
          setSession(data.session);
          setUser(data.session?.user ?? null);
        } catch (error) {
          console.error('Error getting initial session:', error);
          toast.error('There was an error connecting to the authentication service');
        } finally {
          setLoading(false);
        }
      };
      
      getInitialSession();
      
      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          setLoading(false);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('Error initializing auth provider:', error);
      setLoading(false);
      toast.error('Failed to initialize authentication service');
    }
  }, []);
  
  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
      throw error;
    }
  };
  
  const value = {
    user,
    session,
    loading,
    signOut
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
