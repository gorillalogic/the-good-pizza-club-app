import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      return error.response.data;
    }

    return {
      message: 'Something went wrong, plese try later.',
    };
  }
}
