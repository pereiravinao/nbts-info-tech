import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './themes/defaultTheme';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ChatBotDetail from './pages/ChatBotDetail/ChatBotDetail';
import AuthGuard from './components/AuthGuard/AuthGuard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route
            path="/chatbot/:id"
            element={
              <AuthGuard>
                <ChatBotDetail />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
