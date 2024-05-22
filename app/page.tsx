"use client";

import React, { useState, useEffect } from "react";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
