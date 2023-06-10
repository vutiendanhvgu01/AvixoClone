// eslint-disable-next-line import/prefer-default-export
export const getAlertMessage = (message?: string | null, title?: string | null) => ({
  message: message ?? null,
  titleMessage: title ?? null,
});
