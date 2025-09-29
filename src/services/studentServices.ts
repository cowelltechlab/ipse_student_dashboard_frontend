import apiClient from "./apiClient";

export const getStudents = async (
  searchTerm?: string | null,
  year_id?: number | null
) => {
  const params = new URLSearchParams();
  if (searchTerm && searchTerm.trim() !== "") {
    params.append("searchTerm", searchTerm);
  }

  if (year_id) {
    params.append("year_id", year_id as unknown as string);
  }

  const response = await apiClient.get("/students/", {
    params: {
      searchTerm,
      year_id,
    },
  });


  return response.data;
};

export const getStudentByUserId = async (user_id: number) => {
  const response = await apiClient.get(`/students/user/${user_id}`);
  return response.data;
};


export const getStudentProfile = async (student_id: string) => {
  const response = await apiClient.get(`/profile/${student_id}`)
  return response.data
}
