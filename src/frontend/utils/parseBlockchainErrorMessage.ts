export const parseBlockchainErrorMessage = (error: any) => {
  try {
    if (error.error && typeof error.error.data.message === 'string') {
      const messageMatch = error.error.data.message.match(/reverted with reason string '([^']+)'/);
      if (messageMatch && messageMatch[1]) {
        return messageMatch[1];
      }
    }

    if (error.message) {
      return error.message;
    }

    if (error.reason) {
      return error.reason;
    }

    return 'An unknown error occurred';
  } catch (parseError) {
    console.error('Error parsing error message:', parseError);
    return 'Error parsing error message';
  }
};
