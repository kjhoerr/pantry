import { Action } from "redux";
import { useDispatch } from "..";
import { ErrorType } from "../../conf/mutator";
import { ToastMessage } from "../../model/toastMessage";
import actionIds from "./actionIds";

export type CloseMessageAction = Action & {
  payload: { messageKey: string };
};

export const closeMessage = (messageKey: string) => ({
  type: actionIds.closeMessage,
  payload: { messageKey },
});

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

export const useToastAPIError = () => {
  const dispatch = useDispatch();

  return (error: ErrorType<unknown>) =>
    dispatch(
      toastMessage({
        level: "error",
        message: "API error occurred",
        detail: error.message,
      } as ToastMessage)
    );
};

export const useToastMessage = () => {
  const dispatch = useDispatch();

  return (message: ToastMessage, duration?: number) => {
    const { key } = message;
    if (duration !== undefined && key !== undefined) {
      setTimeout(() => dispatch(closeMessage(key)), duration * 1000);
    }
    dispatch(toastMessage(message));
  };
};
