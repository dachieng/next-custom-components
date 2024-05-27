import { Fragment, useState, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

//@ts-ignore
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface OptionProps<T> {
  value: T;
  [key: string]: any;
}

interface DropdownProps<T> {
  defaultOption?: OptionProps<T>;
  defaultValue?: string;
  selectedValue?: T;
  options: OptionProps<T>[];
  handleChange?: (value: T) => void;
  renderItem: (option: OptionProps<T>, optionIndex?: number) => ReactNode;
  buttonClass?: string;
  menuClass?: string;
  itemClass?: string;
}

const Dropdown = <T extends unknown>({
  defaultOption,
  defaultValue,
  selectedValue,
  options,
  handleChange,
  renderItem,
  buttonClass = "",
  menuClass = "",
  itemClass = "",
}: DropdownProps<T>) => {
  const [currentValue, setCurrentValue] = useState(
    selectedValue || defaultOption?.value || options[0].value
  );

  const onSelect = (value: T) => {
    setCurrentValue(value);
    handleChange?.(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-right w-full">
      <div>
        <MenuButton
          className={`w-full flex justify-between items-center rounded-md border border-secondary-light px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:border-secondary-dark ${buttonClass}`}
        >
          <span className="block">{defaultValue || String(currentValue)}</span>
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
          className={`origin-top-right absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClass}`}
        >
          <div className="py-1">
            {options.map((option, index) => (
              <MenuItem key={index}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
  );
};

export default Dropdown;
