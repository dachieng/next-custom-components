"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import { Icon } from "@iconify/react";

const Home = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (data: any) => {
    setValues((prevInfo) => ({ ...prevInfo, ...data }));
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
          disabled
        />
      </div>
    </div>
  );
};

export default Home;
