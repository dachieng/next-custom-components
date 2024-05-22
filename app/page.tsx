"use client";

import React, { useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const Home = () => {
  const { toggleDarkMode, darkMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-bg-main dark:bg-primary-main text-primary-main dark:text-dark-primary-main p-4 h-screen">
      <Button color="blue" size="lg" onClick={toggleIsOpen}>
        Primary Button
      </Button>
      <Modal
        open={isOpen}
        onClose={toggleIsOpen}
        theme="dark"
        variant="md"
        hideCloseIcon={false}
      >
        <div className="p-4">this is a modal</div>
      </Modal>
    </div>
  );
};

export default Home;
