import type { ClassSelectionType } from "../types/ClassTypes";
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

export const postStudentProfile = async (
  user_id: number,

  first_name: string,
  last_name: string,
  classes: ClassSelectionType[],

  long_term_goal: string,
  strengths: string[],
  weaknesses: string[],

  likes_and_hobbies: string,
  short_term_goal: string,

  best_way_to_help: string,

  reading_level_list: string[],
  writing_level_list : string[]
) => {

  const reading_level = reading_level_list[0]
  const writing_level = writing_level_list[0]

  const response = await apiClient.post(`/students/profile/${user_id}`, {
    first_name,
    last_name,
    classes,
    long_term_goal,
    strengths,
    weaknesses,
    likes_and_hobbies,
    short_term_goal,
    best_way_to_help,
    reading_level,
    writing_level
  })

  return response.data
}