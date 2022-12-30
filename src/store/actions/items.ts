import { List } from "immutable";
import { PantryItem } from "../../model";
import actionIds from "./actionIds";
import { Action } from "redux";
import { useDispatch } from "..";

export type SetItemsAction = Action & {
  payload: { items: List<PantryItem> };
};

export const setItems = (items: List<PantryItem>) => ({
  type: actionIds.setItems,
  payload: { items },
});

export const useSetItems = () => {
  const dispatch = useDispatch();

  return (items: PantryItem[]) => dispatch(setItems(List(items)));
};

export type AddItemAction = Action & {
  payload: { item: PantryItem };
};

export const addItem = (item: PantryItem) => ({
  type: actionIds.addItem,
  payload: { item },
});

export const useAddItem = () => {
  const dispatch = useDispatch();

  return (item: PantryItem) => dispatch(addItem(item));
};
