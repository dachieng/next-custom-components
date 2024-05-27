"use client";

import React, { useEffect, useState } from "react";

export interface InputProps
  extends Omit<
    React.HTMLAttributes<HTMLInputElement>,
    "color" | "value" | "onChange"
  > {
  inputRef?: React.Ref<HTMLInputElement>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string | number | readonly string[];
  type?: React.HTMLInputTypeAttribute | "amount";
  name?: string;
  label?: string;
  width?: string;
  height?: string;
  variant?: "primary" | "error" | "success";
  iconBackground?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  helperText?: string | React.ReactNode;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  type: inputType = "text",
  width = "w-full",
  height,
  endIcon,
  startIcon,
  helperText,
  variant = "primary",
  children,
  inputRef,
  required,
  value: initialValue,
  onChange,
  iconBackground,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.disabled) {
      if (inputType === "amount") {
        if (e.target.value.split(".").length < 3) {
          const targetValue = e.target.value.replace(/[^0-9.,]/g, "");
          setValue(targetValue);
          onChange?.(targetValue);
        }
      } else {
        setValue(e.target.value);
        onChange?.(e.target.value);
      }
    }
  };

  useEffect(() => setValue(initialValue), [initialValue]);

  const type: React.HTMLInputTypeAttribute =
    inputType === "amount" ? "text" : inputType;

  return (
    <div className={`flex-1 ${height} ${width}`}>
      {label ? (
        <label
          className={`block text-sm mb-1 ${
            props.disabled
              ? "text-secondary-dark"
              : variant === "error"
              ? "text-danger-600"
              : variant === "success"
              ? "text-success-main"
              : "text-secondary-dark"
          }`}
        >
          {label}
        </label>
      ) : null}

      <div
        className={`relative py-0 px-0 h-9 mb-2 rounded  ${
          props.disabled
            ? "border border-secondary-main bg-secondary-light"
            : "border border-secondary-light"
        } ${
          variant === "error"
            ? "border-danger-600"
            : variant === "success"
            ? "border-success-main"
            : "border-secondary-main"
        } ${
          props.disabled
            ? ""
            : "focus-within:border-2 focus-within:border-seondary-main"
        }`}
      >
        <div className="flex h-full items-center p-0 m-0 ">
          {startIcon && (
            <div
              className={`px-2 h-full flex items-center m-0 rounded-tl rounded-bl  ${
                iconBackground ? iconBackground : ""
              } ${
                props.disabled
                  ? "text-secondary-main"
                  : variant === "error"
                  ? "text-danger-main"
                  : variant === "success"
                  ? "text-success-main"
                  : "text-secondary-main"
              }`}
            >
              {startIcon}
            </div>
          )}
          <input
            name={name}
            id={id}
            className={`block border-0 py-0.5 flex-1 outline-none text-secondary-dark text-sm rounded ${
              startIcon ? "" : "px-3"
            } ${
              props.disabled
                ? "bg-secondary-light cursor-default"
                : "bg-initial"
            }`}
            type={type}
            ref={inputRef}
            value={value}
            onChange={handleChange}
            readOnly={props.disabled}
            {...props}
          />
          {endIcon && (
            <div
              className={`px-2 h-full z-2 flex items-center m-0 rounded-tr rounded-br  ${
                iconBackground ? iconBackground : ""
              } ${
                props.disabled
                  ? "text-secondary-main"
                  : variant === "error"
                  ? "text-danger-main"
                  : variant === "success"
                  ? "text-success-main"
                  : "text-secondary-main"
              }`}
            >
              {endIcon}
            </div>
          )}
        </div>
      </div>
      {helperText && variant !== "primary" && (
        <p
          className={`text-xs mt-1 leading-4 ${
            variant === "success" ? "text-success-main" : "text-danger-600"
          }`}
        >
          {helperText}
        </p>
      )}
      {children}
    </div>
  );
};

export default React.memo(Input);
