import { List } from "immutable";
import { PantryItem } from "../../model";
import actionIds from "./actionIds";
import { Action } from "redux";

export type SetItemsAction = Action & {
  payload: { items: List<PantryItem> };
};

export const setItems = (items: List<PantryItem>) => ({
  type: actionIds.setItems,
  payload: { items },
});

export type AddItemAction = Action & {
  payload: { item: PantryItem };
};

export const addItem = (item: PantryItem) => ({
  type: actionIds.addItem,
  payload: { item },
});
