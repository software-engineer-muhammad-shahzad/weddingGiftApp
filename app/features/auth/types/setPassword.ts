export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
}