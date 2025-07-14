import type { ClassSelectionType } from "../types/ClassTypes";
import apiClient from "./apiClient";

export const getStudentProfile = async (student_id: string) => {
  const response = await apiClient.get(`/profile/${student_id}`)
  return response.data
}

export const postStudentProfile = async (
  user_id: string,

  first_name: string,
  last_name: string,
  year_id: number,
  classes: ClassSelectionType[],

  long_term_goals: string,
  strengths: string[],
  challenges: string[],

  likes_and_hobbies: string,
  short_term_goals: string,

  best_ways_to_help: string,

  reading_level_list: string[],
  writing_level_list: string[]
) => {
  const reading_level = reading_level_list[0];
  const writing_level = writing_level_list[0];

  const response = await apiClient.post(`/students/profile/${user_id}`, {
    user_id,
    year_id,
    first_name,
    last_name,
    classes,
    long_term_goals,
    strengths,
    challenges,
    likes_and_hobbies,
    short_term_goals,
    best_ways_to_help,
    reading_level,
    writing_level,
  });

  return response.data;
};
