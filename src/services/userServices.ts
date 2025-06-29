import type { UserType } from "../types/UserTypes";
import apiClient from "./apiClient";

export const getUsers = async (roleId: number | null = null): Promise<UserType[]> => {
  const response = await apiClient.get("/users", {
    params: { roleId },
  });
  return response.data;
};

