import axios from "axios";
import useAuthStore from "../stores/authStore";
import { enqueueSnackbar } from "notistack"; // Biblioteca para snackbar

const api = axios.create({
    baseURL: "http://localhost:9880",
    withCredentials: true, // Permite enviar cookies
});

let refreshAttempts = 0; // Contador de tentativas de refresh token

// Interceptor para lidar com respostas
api.interceptors.response.use(
    (response) => {
        localStorage.clear();
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (refreshAttempts < 1) {
                refreshAttempts++;
                originalRequest._retry = true;

                try {
                    // Chama a API de refresh token
                    await api.post("/refresh");
                    return api(originalRequest);
                } catch (refreshError) {
                    console.log("refreshError = ", refreshError);
                    // Se falhar após 3 tentativas, faz logout
                    useAuthStore.getState().logoutStore();
                    enqueueSnackbar("Sessão expirada. Faça login novamente.", {
                        variant: "error",
                    });
                }
            } else {
                // Limpa o contador e faz logout após 3 tentativas
                refreshAttempts = 0;
                useAuthStore.getState().logoutStore();
                enqueueSnackbar("Sessão expirada. Faça login novamente.", {
                    variant: "error",
                });
            }
        } else if (error.response?.status) {
            enqueueSnackbar(
                `${error.response?.status} - ${error.response?.message}`,
                {
                    variant: "error",
                }
            );
        } else {
            enqueueSnackbar("Erro desconhecido.", {
                variant: "error",
            });
        }

        return Promise.reject(error);
    }
);

export default api;
