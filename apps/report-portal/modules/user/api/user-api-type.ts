export type RequestOtpPayload = {
  phoneNumber: {
    ext: number;
    number: number;
  };
};

export type RequestOtpResponse = {
  message: string;
  token?: string;
};

export type VerifyOtpPayload = { token: string } & RequestOtpPayload;

export type VerifyOtpResponse = {
  message: string;
  id: string;
  pcno: string;
  name: string;
};
