/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

import { Dropdown, Input, Spinner, TextArea } from "@/components";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/services";
import CustomCombobox from "@/components/Combox";

const options = [
  { id: 1, name: "Option 1", label: "Option 1" },
  { id: 2, name: "Option 2", label: "Option 2" },
  { id: 3, name: "Option 3", label: "Option 3" },
];

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
    description: "",
    vehicle: "",
  });

  const [menu, setMenu] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleComboboxChange = (value: any, option: any) => {
    setSelectedOption(option);
    setValues((prevInfo) => ({ ...prevInfo, vehicle: value }));
  };

  const handleChange = (data: any) => {
    setValues((prevInfo) => ({ ...prevInfo, ...data }));
  };

  const handleMenuChange = (value: string) => {
    setMenu(value);
    setValues((prevInfo) => ({ ...prevInfo, option: value }));
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["vehiclesExpensesSummary"],
    queryFn: ({ pageParam = 1 }) => {
      return getExpenses(pageParam);
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? (lastPage.currentPage ?? 0) + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const flattenedExpenses =
    data?.pages
      .flatMap((page) => page?.content)
      .map((item) => ({
        id: item.id,
        name: item.vehicle,
        value: item.id,
        avatar: item.image,
      })) ?? [];

  const renderOption = (option: any) => {
    return <span className="text-yellow">{option.name}</span>;
  };

  const renderOptionString = (option: any) => {
    return option ? option.name : "";
  };

  if (isPending) {
    return <Spinner />;
  }

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
          placeholder="Select or search an option"
          clearable
          aria-label="Select user dropdown"
        />
        <TextArea
          label="Description"
          value={values.description}
          onChange={(value: string) => handleChange({ description: value })}
          name="description"
          placeholder="Enter description"
        />
        <CustomCombobox
          options={flattenedExpenses}
          defaultValue="Option 1"
          placeholder="Select or search an option..."
          renderOption={renderOption}
          renderOptionString={renderOptionString}
          onChange={handleComboboxChange}
          getSelectedOption={(option) =>
            console.log("Selected tehjdsd option:", option)
          }
          label="Vehicle"
          helperText="Please select an option."
          required
        />
      </div>
    </div>
  );
};

export default Home;
