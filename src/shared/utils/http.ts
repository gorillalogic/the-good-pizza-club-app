import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError && error.message) {
    return error.message;
  }

  if (error instanceof AxiosError && error.response?.data) {
    return error.response.data;
  }

  return {
    message: 'Something went wrong, plese try later.',
  };
}
