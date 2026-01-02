import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, className = "", type = "text", ...props },
    ref
  ) => {
    const inputId = props.id || props.name || `input-${Math.random()}`;
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-900 mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`
            w-full px-4 py-3 
            bg-white border rounded-lg
            text-slate-900 text-base
            placeholder:text-slate-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            ${
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-400"
                : "border-slate-300 focus:border-cyan-400 focus:ring-cyan-400"
            }
            ${className}
          `}
          {...(hasError && { "aria-invalid": "true" })}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-600 animate-slide-up"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-slate-600">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
