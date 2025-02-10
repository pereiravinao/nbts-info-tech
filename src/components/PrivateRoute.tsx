import { ReactElement, useEffect, useMemo, useRef } from "react";
import { Navigate } from "react-router-dom";
import { token } from "../services/authApi";
import { useLoading } from "../utils/LoadingContext";

const PrivateRoute = ({ element }: { element: ReactElement }) => {
    const { setIsLoading } = useLoading();
    const hasFetchedToken = useRef(false);

    const handleAuthentication = async () => {
        try {
            setIsLoading(true);
            await token();
        } catch (error) {
            console.error('Erro ao buscar token:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!hasFetchedToken.current) {
            hasFetchedToken.current = true;
            handleAuthentication();
        }
    }, []);
    return useMemo(() => !hasFetchedToken.current  ? element : <Navigate to="/login" />, [element]);
};

export default PrivateRoute;