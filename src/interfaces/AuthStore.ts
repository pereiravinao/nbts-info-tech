interface AuthStore {
  user: null | UserStore;
  token: null | string;
  isAuthenticated: boolean;
  loginStore: (user: UserStore, token: string) => void;
  logoutStore: () => void;
}

interface UserStore {
    email: string;
    name: string;
    avatar?: string;
}

export type { AuthStore, UserStore };