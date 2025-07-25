import type { ClassSelectionType } from "../types/ClassTypes";
import type { StudentProfileUpdatePayload } from "../types/StudentProfileTypes";
import apiClient from "./apiClient";

export const getStudentProfile = async (student_id: string) => {
  const response = await apiClient.get(`/profile/${student_id}`);
  return response.data;
};

export const getPrefillStudentProfile = async (user_id: string) => {
  const response = await apiClient.get(`/profile/by-user/${user_id}`);
  return response.data;
};

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

  best_ways_to_help_string: string,

  reading_level_list: string[],
  writing_level_list: string[]
) => {
  const reading_level = reading_level_list[0];
  const writing_level = writing_level_list[0];

  const best_ways_to_help: string[] = best_ways_to_help_string
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const response = await apiClient.post(`/profile/${user_id}`, {
    user_id: Number(user_id),
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

export const postProfilePicture = async (
  student_id: number | unknown,
  profilePictureUrl: string | null,
  profilePictureUpload: File | null
) => {
  const formData = new FormData();

  if (profilePictureUpload) {
    formData.append("profile_picture", profilePictureUpload);
  } else if (profilePictureUrl) {
    formData.append("existing_blob_url", profilePictureUrl);
  }

  const response = await apiClient.post(
    `/profile/profile-picture/${student_id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const putStudentProfile = async (
  user_id: number,
  updatePayload: StudentProfileUpdatePayload
) => {
  const response = await apiClient.put(`/profile/${user_id}`, updatePayload);
  return response.data;
};

export const postEmbedUrl = async (
  user_id: number,
  embed_url: string,
  edit_url: string
) => {
  const response = await apiClient.post(
    `/profile/achievements-urls/${user_id}`,
    {
      embed_url,
      edit_url
    }
  );
  return response.data;
};
