"use client";

import React from "react";
import Spinner from "./Spinner";

const paddingSize = {
  xs: "px-2.5 py-1.5",
  sm: "px-3 py-2",
  md: "px-4 py-2",
  lg: "px-4 py-2",
  xl: "px-6 py-3",
};

const textSize = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-sm",
  lg: "text-base",
  xl: "text-base",
};

const colorsVariant = {
  primary: {
    bg: "bg-primary-main",
    hover: "hover:bg-primary-dark",
    hoverLight: "hover:bg-primary-light",
    text: "text-white",
  },
  blue: {
    bg: "bg-blue-main",
    hover: "hover:bg-blue-main-100",
    hoverLight: "hover:bg-blue-light",
    text: "text-white",
  },
  secondary: {
    bg: "bg-secondary-dark",
    hover: "hover:bg-secondary-dark-100",
    hoverLight: "hover:bg-secondary-light",
    text: "text-white",
  },
  success: {
    bg: "bg-success-main",
    hover: "hover:bg-success-dark",
    hoverLight: "hover:bg-success-light",
    text: "text-white",
  },
  danger: {
    bg: "bg-danger-main",
    hover: "hover:bg-danger-dark",
    hoverLight: "hover:bg-danger-light",
    text: "text-white",
  },
  default: {
    bg: "bg-white",
    hover: "hover:bg-secondary-light",
    hoverLight: "hover:bg-primary-main-100",
    text: "text-gray-800",
  },
};

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color?: "primary" | "secondary" | "default" | "success" | "danger" | "blue";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "button" | "submit" | "reset";
  hoverVariant?: boolean;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  color = "default",
  size = "md",
  type = "button",
  hoverVariant = false,
  disabled = false,
  loading = false,
  loadingText = "",
  children,
  ...props
}) => {
  const colorClasses = colorsVariant[color];
  const sizeClasses = paddingSize[size];
  const textSizeClass = textSize[size];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded ${
        colorClasses.bg
      } ${colorClasses.text} ${sizeClasses} ${textSizeClass} ${
        hoverVariant ? colorClasses.hoverLight : colorClasses.hover
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner active={true} className="mr-2" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
