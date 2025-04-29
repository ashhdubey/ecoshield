
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
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          })
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      }),
      insert: () => ({
        select: () => Promise.resolve({ data: null, error: null })
      }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ error: null })
      })
    })
  };
};
