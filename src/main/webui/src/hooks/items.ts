import { PantryItem } from "../model";
import { useDispatch } from "../store";
import { addItem, setItems } from "../store/reducers/items";

/**
 * Hook to dispatch a {@link SetItemsAction}.
 */
export const useSetItems = () => {
  const dispatch = useDispatch();

  return (items: PantryItem[]) => dispatch(setItems(items));
};

/**
 * Hook to dispatch an {@link AddItemAction}.
 */
export const useAddItem = () => {
  const dispatch = useDispatch();

  return (item: PantryItem) => dispatch(addItem(item));
};
