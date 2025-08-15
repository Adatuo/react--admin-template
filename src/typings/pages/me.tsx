export interface UserInfo {
  name: string;
  position: string;
  email: string;
  account: string;
}

export interface BasicFormValues {
  name: string;
  email: string;
}

export interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}