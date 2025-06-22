import apiClient from "./apiClient";

export const getAssignments = async (
  dateRange: [Date, Date] | null,
  searchTerm: string | null,
) => {
  const params = new URLSearchParams();
  if (dateRange) {
    params.append("startDate", dateRange[0].toISOString());
    params.append("endDate", dateRange[1].toISOString());
  }
  if (searchTerm && searchTerm.trim() !== "") {
    params.append("searchTerm", searchTerm);
  }

  const response = await apiClient.get("/assignments", {
    params: params,
  });
  return response.data;
};
