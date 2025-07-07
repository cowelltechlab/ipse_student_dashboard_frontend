import apiClient from "./apiClient";

export const getAssignments = async () => {
  // const params = new URLSearchParams();
  // if (dateRange) {
  //   params.append("startDate", dateRange[0].toISOString());
  //   params.append("endDate", dateRange[1].toISOString());
  // }
  // if (searchTerm && searchTerm.trim() !== "") {
  //   params.append("searchTerm", searchTerm);
  // }

  const response = await apiClient.get("/assignments");
  return response.data;
};
