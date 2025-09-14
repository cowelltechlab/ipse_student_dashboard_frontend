import apiClient from "./apiClient";


export const postForgotPasswordRequest = async (email: string): Promise<void> => {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data;
};

export const postResetPasswordRequest = async (token: string, email: string, new_password: string): Promise<void> => {
  const response = await apiClient.post("/auth/reset-password", { token, email, new_password });
  return response.data;
};

export const postAdminResetPassword = async (studentId: number, newPassword: string): Promise<{ message: string }> => {
  const response = await apiClient.post("/auth/admin-reset-password", {
    student_id: studentId,
    new_password: newPassword
  });
  return response.data;
};