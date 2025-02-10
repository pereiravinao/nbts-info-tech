import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './themes/defaultTheme';
import LoginPage from './pages/Login/Login';
import HomePage from './pages/Home/HomePage';
import ChatBotDetailPage from './pages/ChatBotDetail/ChatBotDetail';
import { LoadingProvider } from './utils/LoadingContext';
import GlobalLoading from './components/GlobalLoading';
import PrivateRoute from './components/PrivateRoute';
import { SnackbarProvider } from 'notistack';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LoadingProvider>
                <SnackbarProvider maxSnack={3}>
                    <Router>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/home"
                                element={
                                    <PrivateRoute element={<HomePage />} />
                                }
                            />
                            <Route
                                path="/chatbot/:id"
                                element={
                                    <PrivateRoute element={<ChatBotDetailPage />} />
                                }
                            />
                        </Routes>
                    </Router>
                    <GlobalLoading />
                </SnackbarProvider>
            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;