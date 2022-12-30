import { List } from "immutable";
import { Action } from "redux";
import { ToastMessage } from "../../model";
import actionIds from "../actions/actionIds";
import { v4 } from "uuid";
import { CloseMessageAction, ToastMessageAction } from "../actions/toast";

export type ToastState = List<ToastMessage>;

const initialState: ToastState = List();

const toastReducer = (state: ToastState = initialState, action: Action) => {
  switch (action.type) {
    case actionIds.toastMessage:
      const message = (action as ToastMessageAction).payload;
      return state.concat({
        key: v4(),
        open: true,
        ...message,
      });
    case actionIds.closeMessage:
      return state.map((message) =>
        message.key === (action as CloseMessageAction).payload.messageKey
          ? { ...message, open: false }
          : message
      );
    default:
      return state;
  }
};

export default toastReducer;
