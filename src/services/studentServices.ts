import apiClient from "./apiClient";

export const getStudents = async (
  searchTerm: string | null,
  year_id: number | null
) => {
  const params = new URLSearchParams();
  if (searchTerm && searchTerm.trim() !== "") {
    params.append("searchTerm", searchTerm);
  }

  if (year_id) {
    params.append("year_id", year_id as unknown as string);
  }

  const response = await apiClient.get("/students", {
    params: {
      searchTerm,
      year_id,
    },
  });

  console.log("getStudents response:", response.data);

  return response.data;
};



export const getStudentByUserId = async (user_id: number) => {
  const response = await apiClient.get(`/students/user/${user_id}`);
  // console.log("getStudentByUserId response:", response.data);
  return response.data;
}