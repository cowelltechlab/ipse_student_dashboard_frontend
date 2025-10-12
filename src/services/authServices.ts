import apiClient from "./apiClient";


export const postForgotPasswordRequest = async (email: string): Promise<void> => {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data;
};

export const postResetPasswordRequest = async (token: string, email: string, new_password: string): Promise<void> => {
  const response = await apiClient.post("/auth/reset-password", { token, email, new_password });
  return response.data;
};

export const postAdminResetPassword = async (userId: number, newPassword: string): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/admin-reset-password", {
    user_id: userId,
    new_password: newPassword
  });
  return response.data;
};

export const postUpdateOwnPassword = async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/user/reset-password", {
    current_password: currentPassword,
    new_password: newPassword
  });
  return response.data;
};

export const patchUpdateOwnEmail = async (data: { email?: string; gt_email?: string }): Promise<{ message: string }> => {
  const response = await apiClient.patch("/auth/user/email", data);
  return response.data;
};