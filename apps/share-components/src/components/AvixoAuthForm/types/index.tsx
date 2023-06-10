export type AuthPhase = 'login' | 'resetPassword' | 'requiresTwoFA';

export interface AuthType {
  isInvalid: boolean;
  isInvalidOTP: boolean;
  sessionId: string | null;
  contact: string;
  requiresTwoFa: boolean | null;
  resetPassword: boolean | null;
}
