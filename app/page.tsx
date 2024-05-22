"use client";

import React, { useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import Button from "@/components/Button";

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
    <div className="bg-bg-main dark:bg-primary-main text-primary-main dark:text-dark-primary-main p-4 h-screen">
      <Button
        color="blue"
        size="lg"
        onClick={() => alert("Primary Button Clicked!")}
        loading={true}
      >
        Primary Button
      </Button>
    </div>
  );
};

export default Home;
