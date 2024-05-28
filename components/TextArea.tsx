import React from "react";

export interface TextAreaProps
  extends Omit<
    React.HTMLAttributes<HTMLTextAreaElement>,
    "color" | "onChange"
  > {
  inputRef?: React.Ref<HTMLTextAreaElement>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  value?: string | number | readonly string[];
  name?: string;
  label?: string;
  width?: string;
  height?: string;
  cols?: number;
  rows?: number;
  variant?: "primary" | "danger" | "success";
  helperText?: string | React.ReactNode;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  inputRef,
  required,
  disabled,
  readOnly,
  placeholder,
  value,
  name,
  label,
  width = "w-full",
  height = "h-auto",
  cols,
  rows,
  variant = "primary",
  helperText,
  onChange,
  ...rest
}) => {
  const variantClasses = {
    primary: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    danger: "border-red-300 focus:border-red-500 focus:ring-red-500",
    success: "border-green-300 focus:border-green-500 focus:ring-green-500",
  };

  const labelClasses = {
    primary: "text-secondary-dark",
    danger: "text-danger-main",
    success: "text-success-main",
  };

  return (
    <div className={`flex-1 ${height} ${width}`}>
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm mb-1 ${
            disabled ? "text-secondary-dark" : labelClasses[variant] ?? ""
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative py-0 px-0 mb-2 rounded ${
          disabled
            ? "border border-secondary-dark bg-secondary-light"
            : "border border-secondary-light"
        } ${
          disabled ? "" : `focus-within:border-2 ${variantClasses[variant]}`
        }`}
      >
        <textarea
          ref={inputRef}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          value={value}
          name={name}
          cols={cols}
          rows={rows}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`resize text-secondary-dark w-full h-full p-2 border-none outline-none bg-transparent ${
            disabled ? "bg-secondary-light" : ""
          }`}
          style={{
            resize: "both",
            overflow: "auto",
            minHeight: "100px",
            minWidth: "100%",
            boxSizing: "border-box",
          }}
          {...rest}
        />
      </div>

      {helperText && variant !== "primary" && (
        <p
          className={`text-xs mt-1 leading-4 ${
            variant === "success" ? "text-success-main" : "text-danger-main"
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextArea;
