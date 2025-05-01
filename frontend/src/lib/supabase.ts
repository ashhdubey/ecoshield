
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
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => 
        ({ data: { user: { id: '123', email }, session: {} }, error: null }),
      signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => 
        ({ data: { user: { id: '123', email }, session: {} }, error: null })
    },
    from: (table: string) => ({
      select: (columns: string = '*') => ({
        eq: (column: string, value: any) => ({
          single: async () => ({ data: null, error: null }),
          order: (column: string, { ascending = true }: { ascending: boolean }) => ({
            limit: (limit: number) => Promise.resolve({ data: [], error: null })
          })
        }),
        order: (column: string, { ascending = true }: { ascending: boolean }) => ({
          limit: (limit: number) => Promise.resolve({ data: [], error: null })
        })
      }),
      insert: (values: any) => ({
        select: (columns: string = '*') => Promise.resolve({ data: null, error: null })
      }),
      update: (values: any) => ({
        eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: (column: string, value: any) => Promise.resolve({ error: null })
      })
    })
  };
};
