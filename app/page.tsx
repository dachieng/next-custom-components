"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/Dropdown";

const MenuItems: any[] = [
  {
    label: "Home",
    value: "Home",
  },
  {
    label: "About",
    value: "About",
  },
  {
    label: "Contact",
    value: "Contact",
  },
];

const Home = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    amount: "",
    option: "",
  });

  const [menu, setMenu] = useState("");

  const handleChange = (data: any) => {
    setValues((prevInfo) => ({ ...prevInfo, ...data }));
  };

  const handleMenuChange = (value: string) => {
    setMenu(value);
    setValues((prevInfo) => ({ ...prevInfo, option: value }));
  };

  console.log("values", values);

  return (
    <div className="w-full h-screen bg-white p-4">
      <div className="container">
        {" "}
        <Input
          value={values.email}
          onChange={(value: string) => handleChange({ email: value })}
          label="Email"
          type="text"
          name="email"
        />
        <Input
          value={values.name}
          onChange={(value: string) => handleChange({ name: value })}
          label="Name"
          type="text"
          name="name"
        />
        <Dropdown
          selectedValue={menu}
          defaultValue={menu}
          options={MenuItems}
          handleChange={handleMenuChange}
        />
      </div>
    </div>
  );
};

export default Home;
