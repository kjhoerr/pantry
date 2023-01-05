import { List } from "immutable";
import { Action } from "redux";

import { PantryItem } from "../../model/graphql";
import actionIds from "../actions/actionIds";
import { AddItemAction, SetItemsAction } from "../actions/items";

export type ItemState = List<PantryItem>;

const initialState: ItemState = List();

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
