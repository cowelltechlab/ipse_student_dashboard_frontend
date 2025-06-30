import type { UserType } from "../types/UserTypes";
import apiClient from "./apiClient";

export const getUsers = async (
  role_id: number | null = null
): Promise<UserType[]> => {
  const response = await apiClient.get("/users", {
    params: { role_id },
  });
  return response.data;
};


export const postUserInvite = async (userData: {
  schoolEmail: string;
  googleEmail: string;
  roles: string[];
}): Promise<UserType> => {
  const response = await apiClient.post("/users/invite", userData);
  return response.data;
};


export const deleteUser = async (userId: number): Promise<void> => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};
