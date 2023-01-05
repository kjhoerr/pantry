import { Action } from "redux";

import { useDispatch } from "..";
import { PantryItem } from "../../model";
import actionIds from "./actionIds";

export type SetItemsAction = Action & {
  payload: { items: PantryItem[] };
};

export const setItems = (items: PantryItem[]) => ({
  type: actionIds.setItems,
  payload: { items },
});

/**
 * Hook to dispatch a {@link SetItemsAction}.
 */
export const useSetItems = () => {
  const dispatch = useDispatch();

  return (items: PantryItem[]) => dispatch(setItems(items));
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
