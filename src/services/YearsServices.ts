import apiClient from "./apiClient";

export const getYears = async () => {
  const response = await apiClient.get("/years");
  return response.data;
};
