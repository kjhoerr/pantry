import { v4 } from "uuid";

import { ApiError, ToastMessage } from "../model";
import { useDispatch } from "../store";
import { closeMessage, toastMessage } from "../store/reducers/toast";

/**
 * Hook to dispatch a {@link CloseMessageAction}.
 */
export const useCloseMessage = () => {
  const dispatch = useDispatch();

  return (key: string) => dispatch(closeMessage(key));
};

/**
 * Hook to dispatch a {@link ToastMessageAction} based on an error response from the
 * API. Will dispatch different messages based on the error context.
 */
export const useToastAPIError = () => {
  const dispatch = useDispatch();

  /**
   * Dispatch a {@link ToastMessageAction} based on an error response from the API.
   * Will dispatch different messages based on the error context.
   */
  return (error: ApiError) => {
    console.error("Error occurred while querying the GraphQL API", error);
    const key = v4();
    dispatch(
      toastMessage(
        error.message === "Network Error"
          ? {
              key,
              level: "network",
              message: "Could not communicate with API",
              detail: error.message,
            }
          : {
              key,
              level: "error",
              message: "API error occurred",
              detail: error.message,
            },
      ),
    );
    return key;
  };
};

/**
 * Hook to dispatch a {@link ToastMessageAction}. If a duration is defined, an
 * additional action ({@link CloseMessageAction}) is dispatched after the set timeout.
 */
export const useToastMessage = () => {
  const dispatch = useDispatch();

  /**
   * Dispatch a {@link ToastMessageAction}. If a duration is defined, an additional
   * action ({@link CloseMessageAction}) is dispatched after the set timeout.
   */
  return (message: ToastMessage) => {
    const { duration } = message;
    const key = message.key ?? v4();
    if (duration !== undefined) {
      setTimeout(() => dispatch(closeMessage(key)), duration * 1000);
    }
    dispatch(toastMessage({ ...message, key }));
  };
};
