"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}

const QueryClientProvider: React.FC<Props> = ({ children }) => {
  return <Provider client={new QueryClient()}>{children}</Provider>;
};

export default QueryClientProvider;
