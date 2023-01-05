import { Action } from "redux";
import { v4 } from "uuid";

import { ToastMessage } from "../../model";
import actionIds from "../actions/actionIds";
import { CloseMessageAction, ToastMessageAction } from "../actions";

export type ToastState = Record<string, ToastMessage>;

const initialState: ToastState = {};

const toastReducer = (state: ToastState = initialState, action: Action) => {
  switch (action.type) {
    case actionIds.toastMessage: {
      const message = (action as ToastMessageAction).payload;
      const key = message.key ?? v4();

      return {
        ...state,
        key: {
          open: true,
          ...message,
          key,
        },
      };
    }

    case actionIds.closeMessage: {
      const { messageKey } = (action as CloseMessageAction).payload;

      // mutable change - handled by Redux toolkit??
      state[messageKey].open = false;

      return state;
    }

    default:
      return state;
  }
};

export default toastReducer;
