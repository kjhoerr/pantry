import { useDispatch } from "../store";
import { PantryItem } from "../model";
import { addItem, setItems } from "../store/actions";

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
