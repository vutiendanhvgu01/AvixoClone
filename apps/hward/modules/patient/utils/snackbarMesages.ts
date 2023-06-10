const snackbarMessages = {
  success: (name: string, caseId: string) =>
    `<strong>${name}</strong> successfully enrolled into case ID <strong>${caseId}</strong>`,
  error: '<strong>Something went wrong.</strong> Please contact your system <strong>administrator.</strong>',
  duplicate: (name: string) => `<strong>${name}</strong> already exists.`,
};

export default snackbarMessages;
