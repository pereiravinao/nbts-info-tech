import api from "./api";
import useAuthStore from "../stores/authStore";

interface LoginResponse {
    acces_token: string;
    refresh_token: string;
    token_type: string;
}

async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await api.post("/login", { email, password });

        useAuthStore.getState().loginStore(
            {
                email: response.data.user.email,
                name: response.data.user.name,
            },
            response.data.acces_token
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw new Error("Erro ao fazer login.");
    }
}

async function logout(): Promise<void> {
    try {
        await api.post("/logout");
        // Limpa o estado do usuário e o localStorage
        useAuthStore.getState().logoutStore();
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}

async function token(): Promise<void> {
    try {
        const response = await api.get("/token");
        useAuthStore.getState().loginStore(
            {
                email: response.data.user.email,
                name: response.data.user.name,
            },
            response.data.acces_token
        );
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}

export { login, logout, token };
