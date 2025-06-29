import type { UserType } from "../types/UserTypes";
import apiClient from "./apiClient";

export const getUsers = async (role_id: number | null = null): Promise<UserType[]> => {
  const response = await apiClient.get("/users", {
    params: { role_id },
  });
  return response.data;
};

