import { axionInstance, getConfig } from "@/config";

export const getExpenses = async (pageParam: number) => {
  const { data } = await axionInstance.get(`/vehicle/expenses/summary?page=${pageParam}`, getConfig());
  return data;
};