"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Icon } from "@iconify/react";

import type { ReactElement } from "react";

export interface ComboboxProps
  extends Omit<
    React.HTMLAttributes<HTMLLIElement | HTMLUListElement>,
    "color" | "onChange" | "children"
  > {}

type OptionProps<T = unknown> = T;

export interface ComboboxProps<T = unknown> {
  placeholder?: string;
  defaultOption?: OptionProps<T>;
  defaultValue?: string;
  disabled?: boolean;
  helperText?: string;
  keepDropdownOpen?: boolean;
  label?: string;
  options: OptionProps<T>[];
  required?: boolean;
  triggerRerender?: boolean;
  variant?: "primary" | "error" | "success";
  getSelectedOption?: (option: OptionProps<T>) => void;
  isActiveOption?: (
    option: OptionProps<T>,
    selectedOption: OptionProps<T>
  ) => boolean;
  renderOption: (option: OptionProps<T>, optionIndex: number) => ReactElement;
  renderOptionString: (option: T | null) => string;
  onChange: (value: string, option?: OptionProps<T>) => void;
  noOptionsText?: string;
}

function CustomCombobox<T = unknown>(props: ComboboxProps<T>) {
  const {
    options = [],
    defaultOption,
    placeholder,
    disabled,
    defaultValue,
    helperText,
    variant = "primary",
    keepDropdownOpen = false,
    label,
    required,
    triggerRerender,
    renderOption,
    renderOptionString,
    getSelectedOption,
    isActiveOption,
    onChange,
    noOptionsText = "No option matches your query",
    ...restProps
  } = props;

  const [value, setValue] = useState<string>(defaultValue || "");
  const [selectedItem, setSelectedItem] = useState<OptionProps<T> | null>(
    defaultOption || null
  );
  const [filteredOptions, setFilteredOptions] =
    useState<OptionProps<T>[]>(options);

  const handleChange = (option: OptionProps<T> | null) => {
    setSelectedItem(option);
    onChange(option ? renderOptionString(option) : "", option || undefined);
    if (option) {
      getSelectedOption?.(option);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value, selectedItem || undefined);
    setFilteredOptions(
      options.filter((option) =>
        renderOptionString(option)
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleChangeInputValue = useCallback(() => {
    setValue(defaultValue || "");
    setSelectedItem(defaultOption || null);
    setFilteredOptions(options);
  }, [defaultValue, defaultOption, options]);

  const renderCount = useRef(0);

  useEffect(() => {
    if (triggerRerender && renderCount.current > 2) {
      renderCount.current = 2;
    }

    if (renderCount.current <= 2) {
      renderCount.current += 1;
      handleChangeInputValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, triggerRerender]);

  return (
    <div className="my-2">
      {label ? (
        <label
          className={`block text-sm mb-1 ${
            disabled
              ? "text-secondary-dark"
              : variant === "error"
              ? "text-danger-main"
              : variant === "success"
              ? "text-success-main"
              : "text-secondary-dark"
          }`}
        >
          {label}
        </label>
      ) : null}
      <div className="block w-full relative mt-1">
        <Combobox
          value={selectedItem}
          onChange={handleChange}
          disabled={disabled}
        >
          <div className="relative w-full">
            <div
              className={`relative w-full flex items-center bg-white border rounded-md min-h-[2.25rem] overflow-hidden ${
                disabled ? "bg-secondary-light" : ""
              }`}
            >
              <ComboboxInput
                className="flex-1 w-full outline-none pl-4 pr-12 whitespace-nowrap text-secondary-dark cursor-pointer"
                placeholder={placeholder}
                onChange={handleInputChange}
                displayValue={renderOptionString}
              />
              <ComboboxButton className="absolute right-0 top-[0.313rem] bottom-[0.313rem] flex items-center justify-center px-1 bg-red border-l border-gray-300">
                <span className="w-[1.2rem] h-[1.2rem] text-[2rem] pr-[0.188rem]">
                  <Icon
                    icon="material-symbols:search-rounded"
                    width="1.2rem"
                    height="1.2rem"
                    style={{ color: "#6b7280" }}
                  />
                </span>
              </ComboboxButton>
            </div>
            <ComboboxOptions className="absolute top-auto z-10 w-full bg-white border rounded-md max-h-56 overflow-y-auto mt-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-gray-500">{noOptionsText}</div>
              ) : (
                filteredOptions.map((option, optionIndex) => (
                  <ComboboxOption
                    key={`listbox-option-${optionIndex}`}
                    value={option}
                    className={({ active, selected }) =>
                      `block px-3 py-2 cursor-pointer transition-all ${
                        active || selected
                          ? "bg-secondary-light text-secondary-dark"
                          : "bg-white text-secondary-dark"
                      }`
                    }
                  >
                    {({ active, selected }) => (
                      <>{renderOption?.(option, optionIndex)}</>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>
      {helperText && variant !== "primary" ? (
        <p
          className={`text-xs mt-1 ${
            variant === "success" ? "text-success-main" : "text-danger-main"
          }`}
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

export default CustomCombobox;
