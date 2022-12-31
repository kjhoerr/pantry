import { networkInterfaces } from "os";
import { Action } from "redux";
import { v4 } from "uuid";
import { useDispatch } from "..";
import { ErrorType } from "../../conf/mutator";
import { ToastMessage } from "../../model";
import actionIds from "./actionIds";

export type CloseMessageAction = Action & {
  payload: { messageKey: string };
};

export const closeMessage = (messageKey: string) => ({
  type: actionIds.closeMessage,
  payload: { messageKey },
});

/**
 * Hook to dispatch a {@link CloseMessageAction}.
 */
export const useCloseMessage = () => {
  const dispatch = useDispatch();

  return (key: string) => dispatch(closeMessage(key));
};

export type ToastMessageAction = Action & {
  payload: ToastMessage;
};

export const toastMessage = (message: ToastMessage) => ({
  type: actionIds.toastMessage,
  payload: message,
});

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
  return (error: ErrorType<unknown>) =>
    dispatch(
      toastMessage(
        error.message === "Network Error"
          ? {
              level: "network",
              message: "Could not communicate with API",
              detail: error.message,
            }
          : {
              level: "error",
              message: "API error occurred",
              detail: error.message,
            }
      )
    );
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
