import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): { message: string } {
  if (error instanceof AxiosError && error.response) {
    return {
      message: error.response.data.message,
    };
  }

  if (error instanceof AxiosError && error.message) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'Something went wrong, plese try later.',
  };
}
