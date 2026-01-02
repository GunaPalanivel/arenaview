import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/games" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />
        </div>

        <p className="text-center mt-6 text-sm text-slate-500">
          ArenaView &copy; 2026
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
