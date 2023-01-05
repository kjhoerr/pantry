import { Action } from "redux";
import { v4 } from "uuid";

import { ToastMessage } from "../../model";
import { CloseMessageAction, ToastMessageAction } from "../actions";
import actionIds from "../actions/actionIds";

export type ToastState = Record<string, ToastMessage>;

const initialState: ToastState = {};

const toastReducer = (state: ToastState = initialState, action: Action) => {
  switch (action.type) {
    case actionIds.toastMessage: {
      const message = (action as ToastMessageAction).payload;
      const key = message.key ?? v4();

      return {
        ...state,
        [key]: {
          open: true,
          ...message,
          key,
        },
      };
    }

    case actionIds.closeMessage: {
      const { messageKey } = (action as CloseMessageAction).payload;

      return state[messageKey] !== undefined
        ? {
            ...state,
            [messageKey]: {
              ...state[messageKey],
              open: false,
            },
          }
        : state;
    }

    default:
      return state;
  }
};

export default toastReducer;
