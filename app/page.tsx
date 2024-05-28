/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";

import { Dropdown, Input } from "@/components";

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
          placeholder="Enter your email"
          required
        />
        <Input
          value={values.name}
          onChange={(value: string) => handleChange({ name: value })}
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
        />
        <Input
          value={values.amount}
          onChange={(value: string) => handleChange({ amount: value })}
          label="Amount"
          type="amount"
          name="amount"
          placeholder="Enter amount"
          required
        />
        <Dropdown<any>
          variant="success"
          disabled={false}
          label="Select user"
          selectedValue={menu}
          defaultValue={menu}
          options={users}
          handleChange={handleMenuChange}
          renderItem={(option) => (
            <div className="flex items-center">
              <img
                className="w-6 h-6 rounded-full mr-2"
                src={option.avatar}
                alt={option.name}
              />
              <span className="text-sm">{option.name}</span>
            </div>
          )}
          renderSelectedItem={(option) => (
            <div className="flex items-center">
              <img
                className="w-5 h-5 rounded-full mr-2"
                src={option.avatar}
                alt={option.name}
              />
              <span className="text-sm">{option.name}</span>
            </div>
          )}
          placeholder="Select an option"
          clearable
          aria-label="Select user dropdown"
        />
      </div>
    </div>
  );
};

export default Home;
