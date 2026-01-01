import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthGuard } from "./components/auth/AuthGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<div className="p-8 text-center">Login Page (Phase 2)</div>}
        />
        <Route
          path="/register"
          element={
            <div className="p-8 text-center">Register Page (Phase 2)</div>
          }
        />

        <Route
          path="/"
          element={
            <AuthGuard>
              <div className="p-8 text-center">
                <h1 className="text-4xl font-bold text-primary-500 mb-4">
                  ArenaView
                </h1>
                <p className="text-dark-400">
                  Phase 1 Complete - Protected Route
                </p>
              </div>
            </AuthGuard>
          }
        />

        <Route
          path="/games"
          element={
            <AuthGuard>
              <div className="p-8 text-center">Games Page (Phase 2)</div>
            </AuthGuard>
          }
        />

        <Route
          path="/favorites"
          element={
            <AuthGuard>
              <div className="p-8 text-center">Favorites Page (Phase 2)</div>
            </AuthGuard>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
