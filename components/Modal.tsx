"use client";

import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Icon } from "@iconify/react";

type ModalVariant = "xs" | "sm" | "md" | "lg" | "xl" | "xl2";

type ModalTheme = "light" | "light-dark" | "dark";

interface ModalProps {
  open: boolean;
  hideCloseIcon?: boolean;
  backgroundBlurIntent?: number;
  children?: React.ReactNode;
  theme?: ModalTheme;
  variant?: ModalVariant;
  showCloseText?: boolean;
  onClose: () => void;
}

const overlayBg: Record<ModalTheme, string> = {
  light: "bg-black/20",
  "light-dark": "bg-black/50",
  dark: "bg-gray-700/70",
};

const modalVariants: Record<ModalVariant, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  xl2: "max-w-2xl",
};

const Modal: React.FC<ModalProps> = ({
  backgroundBlurIntent,
  open,
  hideCloseIcon,
  children,
  theme = "light-dark",
  variant = "sm",
  showCloseText,
  onClose,
}) => (
  <Transition appear show={open} as={Fragment}>
    <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
      <TransitionChild
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={`fixed inset-0 ${overlayBg[theme]}`}
          style={
            backgroundBlurIntent
              ? { backdropFilter: `blur(${backgroundBlurIntent}px)` }
              : undefined
          }
        />
      </TransitionChild>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DialogPanel
              className={`w-full ${modalVariants[variant]} transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all`}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                {!hideCloseIcon ? (
                  <button
                    type="button"
                    className={`rounded-full bg-white py-1 px-2 text-gray-500 hover:text-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none`}
                    onClick={onClose}
                    title="Close"
                    aria-label="close modal"
                    aria-hidden={hideCloseIcon}
                    aria-labelledby="close modal"
                  >
                    <Icon
                      style={{ fontSize: "1.2rem" }}
                      icon="material-symbols:cancel-outline"
                    />
                  </button>
                ) : null}
              </div>
              <div className="p-2">{children}</div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default Modal;
