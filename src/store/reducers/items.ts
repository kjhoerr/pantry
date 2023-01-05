import { Action } from "redux";

import { PantryItem } from "../../model";
import actionIds from "../actions/actionIds";
import { AddItemAction, SetItemsAction } from "../actions";

export type ItemState = PantryItem[];

const initialState: ItemState = [];

const itemsReducer = (state: ItemState = initialState, action: Action) => {
  switch (action.type) {
    case actionIds.setItems:
      return (action as SetItemsAction).payload.items;

    case actionIds.addItem:
      const { item } = (action as AddItemAction).payload;

      return state.concat(item);

    default:
      return state;
  }
};

export default itemsReducer;
