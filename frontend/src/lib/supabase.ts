
// This is a mock file for frontend-only development
// In a real app, this would connect to a backend service

export const createClient = () => {
  console.log('Using mock Supabase client for frontend-only development');
  
  // Return a mock client with the methods we need
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => ({}),
      signInWithPassword: async () => ({ data: { user: { id: '123', email: 'demo@example.com' }, session: {} }, error: null }),
      signUp: async () => ({ data: { user: { id: '123', email: 'demo@example.com' }, session: {} }, error: null })
    }
  };
};
