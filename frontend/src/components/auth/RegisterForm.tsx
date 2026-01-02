import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof RegisterFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      showToast("Account created successfully!", "success");
      navigate("/games");
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message ||
        "Registration failed. Please try again.";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your full name"
        autoComplete="name"
        disabled={isLoading}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        autoComplete="email"
        disabled={isLoading}
      />

      <div>
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Create a password"
          autoComplete="new-password"
          disabled={isLoading}
        />

        {formData.password && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium text-slate-600">
              Password requirements:
            </p>
            <ul className="space-y-1">
              {passwordRequirements.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${
                      req.met
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {req.met ? "✓" : "○"}
                  </span>
                  <span
                    className={req.met ? "text-green-700" : "text-slate-500"}
                  >
                    {req.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isLoading}
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-cyan-400 hover:text-cyan-500 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
