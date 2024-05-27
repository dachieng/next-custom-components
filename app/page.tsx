/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import { Icon } from "@iconify/react";
import Dropdown from "@/components/Dropdown";

const users = [
  {
    value: "1",
    name: "John Doe",
    avatar: "https://picsum.photos/200",
    phone: "123-456-7890",
  },
  {
    value: "2",
    name: "Jane Smith",
    avatar: "https://picsum.photos/200",
    phone: "987-654-3210",
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
        <Dropdown<any>
          selectedValue={menu}
          defaultValue={menu}
          options={users}
          handleChange={handleMenuChange}
          renderItem={(option) => (
            <div className="flex items-center">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={option.avatar}
                alt={option.name}
              />
              <span>{option.name}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
