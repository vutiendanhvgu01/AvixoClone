export interface PayloadUser {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  doctor: number;
  active: number;
  name: string;
  contact: string;
  email: string;
  role: number;
  isNew: number;
  verifyCode: string;
  isDefault: number;
  homepage: string;
  languageCode: string;
  photo: string;
  isShowActivityLog: number;
  loginAttempts: number;
  locationID: number;
  isDeleted: number;
}
