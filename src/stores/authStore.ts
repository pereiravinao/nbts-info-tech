import { create } from 'zustand';

interface AuthStore {
  user: null | { email: string; name: string };
  token: null | string;
  isAuthenticated: boolean;
  login: (user: { email: string; name: string }, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
