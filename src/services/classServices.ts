import apiClient from "./apiClient";

export const getClasses = async () => {
  const response = await apiClient.get("/classes");
  return response.data;
};
