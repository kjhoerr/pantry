import { OrderedMap } from "immutable";
import { Action } from "redux";
import { v4 } from "uuid";

import { ToastMessage } from "../../model/toastMessage";
import actionIds from "../actions/actionIds";
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
      const { messageKey } = (action as CloseMessageAction).payload;

      return state.setIn([messageKey, "open"], false);
    }

    default:
      return state;
  }
};

export default toastReducer;
