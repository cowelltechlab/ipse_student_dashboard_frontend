import type { ProfilePictureType, UserDetailsResponseType, UserType } from "../types/UserTypes";
import apiClient from "./apiClient";

export const getUsers = async (
  role_id: number | null = null
): Promise<UserType[]> => {
  const response = await apiClient.get("/users/", {
    params: { role_id },
  });
  return response.data;
};

export const getUser = async (
  user_id: number
): Promise<UserType> => {
  const response = await apiClient.get(`/users/${user_id}`)
  return response.data
}

export const getDefaultProfilePictures = async (): Promise<ProfilePictureType[]> => {
  const response = await apiClient.get("/users/profile-picture-defaults");
  return response.data;
}


export const postUserInvite = async (userData: {
  google_email: string;
  school_email: string;
  role_ids: string[];
  student_type?: "A" | "B";
}): Promise<UserType> => {
  const response = await apiClient.post("/users/invite", userData);
  return response.data;
};

export const postCompleteUserRegistry = async (userData: {
  token: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_picture: File | null;
  existingBlobUrl: string | null;
}): Promise<UserType> => {
  const formData = new FormData();
  formData.append("token", userData.token);
  formData.append("first_name", userData.first_name);
  formData.append("last_name", userData.last_name);
  formData.append("password", userData.password);
  if (userData.profile_picture) {
    formData.append("profile_picture", userData.profile_picture);
  }
  if (userData.existingBlobUrl) {
    formData.append("existing_blob_url", userData.existingBlobUrl);
  }

  const response = await apiClient.post("/users/complete-invite", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}


export const deleteUser = async (userId: number): Promise<void> => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};



export const updateUserEmails = async (
  user_id: number,
  data: { email?: string; gt_email?: string }
): Promise<UserDetailsResponseType> => {
  const response = await apiClient.patch(
    `/users/${user_id}/email`,
    data
  );

  return response.data;
};
