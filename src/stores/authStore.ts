import { create } from 'zustand';
import { AuthStore } from '../interfaces/AuthStore';

function clearCookies() {
  const cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    const [name] = cookie.split("=");
    console.log("name = ", name);
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  });
}


const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loginStore: (user, token) => {
    set({ user, token, isAuthenticated: true });
    // localStorage.setItem("auth", JSON.stringify(({"authToken": token, "user": user, "isAuthenticated": true})));
  },
  logoutStore: () => {
    // Limpa o localStorage e o estado do usuário
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("auth");
    clearCookies();
    window.location.href = '/login';
  },
}));

export default useAuthStore;