import { List } from "immutable";
import { PantryItem } from "../../model/graphql";
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

/**
 * Hook to dispatch a {@link SetItemsAction}.
 */
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

/**
 * Hook to dispatch an {@link AddItemAction}.
 */
export const useAddItem = () => {
  const dispatch = useDispatch();

  return (item: PantryItem) => dispatch(addItem(item));
};
