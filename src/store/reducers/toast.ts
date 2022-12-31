import { OrderedMap } from "immutable";
import { Action } from "redux";
import { ToastMessage } from "../../model";
import actionIds from "../actions/actionIds";
import { v4 } from "uuid";
import { CloseMessageAction, ToastMessageAction } from "../actions/toast";

export type ToastState = OrderedMap<string, ToastMessage>;

const initialState: ToastState = OrderedMap();

const toastReducer = (state: ToastState = initialState, action: Action) => {
  switch (action.type) {
    case actionIds.toastMessage: {
      const message = (action as ToastMessageAction).payload;
      const key = message.key ?? v4();
      return state.set(key, {
        open: true,
        ...message,
        key,
      });
    }
    case actionIds.closeMessage: {
      const key = (action as CloseMessageAction).payload.messageKey;
      return state.setIn([key, "open"], false);
    }
    default:
      return state;
  }
};

export default toastReducer;
