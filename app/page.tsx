"use client";

import React, { useState, useEffect } from "react";
import useStore from "../hooks/useStore";

const Home = () => {
  const { toggleDarkMode, darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-bg-main dark:bg-primary-main text-primary-main dark:text-dark-primary-main p-4 min-h-screen flex flex-col">
      <button
        onClick={toggleDarkMode}
        className="bg-primary-main dark:bg-blue-dark text-white p-2 rounded"
      >
        Toggle Dark Mode
      </button>
    </div>
  );
};

export default Home;
