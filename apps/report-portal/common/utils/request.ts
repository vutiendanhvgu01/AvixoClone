const getErrorMessage = (message: string) => {
  const newMessage =
    {
      'SMS sending failed': 'Invalid phone number. Please contact your administrator.',
    }[message] ?? message;

  return newMessage;
};

// eslint-disable-next-line import/prefer-default-export
export const getApiError = (apiError: any) => {
  const error = apiError?.message || apiError?.split('Error: ')[1];
  return getErrorMessage(error);
};
