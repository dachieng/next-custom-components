import { Fragment, useState, ReactNode, useEffect } from "react";
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface OptionProps<T> {
  value: T;
  [key: string]: any;
}

interface DropdownProps<T> {
  placeholder?: string;
  defaultOption?: OptionProps<T>;
  defaultValue?: string;
  selectedValue?: T;
  options: OptionProps<T>[];
  buttonClass?: string;
  menuClass?: string;
  itemClass?: string;
  clearable?: boolean;
  label?: string;
  disabled?: boolean;
  variant?: "primary" | "error" | "success";
  helperText?: string | React.ReactNode;
  handleChange?: (value: T | string) => void;
  renderItem: (option: OptionProps<T>, optionIndex?: number) => ReactNode;
  renderSelectedItem?: (option: OptionProps<T>) => ReactNode;
}

const Dropdown = <T extends unknown>({
  placeholder = "Select an option",
  defaultOption,
  defaultValue,
  selectedValue,
  options,
  label,
  handleChange,
  renderItem,
  renderSelectedItem,
  buttonClass = "",
  menuClass = "",
  itemClass = "",
  clearable = false,
  disabled = false,
  variant,
  helperText,
}: DropdownProps<T>) => {
  const [currentValue, setCurrentValue] = useState<T | string>(
    selectedValue || defaultOption?.value || defaultValue || ""
  );

  useEffect(() => {
    if (selectedValue !== undefined) {
      setCurrentValue(selectedValue);
    } else if (defaultOption) {
      setCurrentValue(defaultOption.value);
    } else if (defaultValue) {
      setCurrentValue(defaultValue);
    }
  }, [selectedValue, defaultOption, defaultValue]);

  const onSelect = (value: T | string) => {
    setCurrentValue(value);
    handleChange?.(value);
  };

  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

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
      <Menu as="div" className="relative inline-block text-right w-full">
        <div>
          <MenuButton
            disabled={disabled}
            className={classNames(
              "w-full flex justify-between items-center rounded-md border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-0",
              disabled
                ? "bg-secondary-light border-secondary-light text-secondary-dark cursor-not-allowed"
                : variant === "error"
                ? "bg-white border-danger-main text-secondary-dark"
                : variant === "success"
                ? "bg-white border-success-main text-secondary-dark"
                : "bg-white border-secondary-light text-secondary-dark hover:bg-gray-50 focus:border-secondary-dark",
              buttonClass
            )}
          >
            <span className="block">
              {selectedOption
                ? renderSelectedItem
                  ? renderSelectedItem(selectedOption)
                  : selectedOption.label
                : placeholder}
            </span>
            <ChevronDownIcon
              className="block -mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 z-50 focus:outline-none ${menuClass}`}
          >
            <div className="py-1">
              {clearable && (
                <MenuItem>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active
                          ? "bg-secondary-light text-secondary-dark"
                          : "text-secondary-dark",
                        "block w-full text-left px-4 py-2 text-sm",
                        itemClass
                      )}
                      onClick={() => onSelect("")}
                    >
                      {placeholder ?? "Select an option"}
                    </div>
                  )}
                </MenuItem>
              )}
              {options.map((option, index) => (
                <MenuItem key={index}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active
                          ? "bg-gray-100 text-secondary-dark"
                          : "text-secondary-dark",
                        "block w-full text-left px-4 py-2 text-sm",
                        itemClass
                      )}
                      onClick={() => onSelect(option.value)}
                    >
                      {renderItem(option, index)}
                    </div>
                  )}
                </MenuItem>
              ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
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

export default Dropdown;
