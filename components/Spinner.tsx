"use client";

import React from "react";

interface SpinnerProps {
  active?: boolean;
  variant?: "large" | "medium" | "small";
  className?: string;
}

const SpinnerVariants = {
  large: "w-12 h-12",
  medium: "w-8 h-8",
  small: "w-6 h-6",
};

const Spinner: React.FC<SpinnerProps> = ({
  active = false,
  variant = "small",
  className = "",
  ...props
}) => {
  if (!active) return null;

  return (
    <span
      className={`flex justify-center items-center ${className}`}
      {...props}
    >
      <span
        className={`inline-block ${SpinnerVariants[variant]} border-4 border-white border-t-primary-main border-b-primary-main rounded-full animate-spin`}
      />
    </span>
  );
};

export default Spinner;
