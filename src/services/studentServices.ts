import apiClient from "./apiClient";

export const getStudents = async (
  searchTerm: string | null,
  year_id: string | null
) => {
  const params = new URLSearchParams();
  if (searchTerm && searchTerm.trim() !== "") {
    params.append("searchTerm", searchTerm);
  }

  if (year_id) {
    params.append("year_id", year_id);
  }

  const response = await apiClient.get("/students", {
    params: {
      searchTerm,
      year_id,
    },
  });
  return response.data;
};
