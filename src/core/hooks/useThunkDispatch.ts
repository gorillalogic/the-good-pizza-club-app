import { HttpError } from '../../models/Error';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';

interface AsyncThunkConfig {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
}

type ThunkAction = AsyncThunkAction<unknown, void, AsyncThunkConfig>;

export const useThunkDispatch = (
  action: ThunkAction | ThunkAction[],
  onSuccess?: (data: unknown) => void,
  onError?: (error: HttpError) => void
) => {
  const [data, setData] = useState<unknown | undefined>(undefined);
  const [error, setError] = useState<HttpError | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let data: unknown;

        if (action instanceof Array) {
          data = await Promise.all(action.map((a) => dispatch(a).unwrap()));
        } else {
          data = await dispatch(action).unwrap();
        }
        setData(data);
        onSuccess && onSuccess(data);
      } catch (error) {
        setError(error as HttpError);
        onError && onError(error as HttpError);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, data };
};
