import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { AppShell } from "@/components/layout/AppShell";

// Pages (to be created)
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import GamesPage from "@/pages/GamesPage";
import FavoritesPage from "@/pages/FavoritesPage";

// Components (to be created)
import AuthGuard from "@/components/auth/AuthGuard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with AppShell layout */}
            <Route
              path="/games"
              element={
                <AuthGuard>
                  <AppShell>
                    <GamesPage />
                  </AppShell>
                </AuthGuard>
              }
            />
            <Route
              path="/favorites"
              element={
                <AuthGuard>
                  <AppShell>
                    <FavoritesPage />
                  </AppShell>
                </AuthGuard>
              }
            />

            {/* Default route */}
            <Route path="/" element={<Navigate to="/games" replace />} />
            <Route path="*" element={<Navigate to="/games" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
