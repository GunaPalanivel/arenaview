import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const RegisterPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/games" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
        <p className="text-center text-gray-600">
          Register form - to be implemented in Day 3 Evening
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
