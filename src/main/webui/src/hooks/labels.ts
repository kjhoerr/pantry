import { PantryItemLabel } from "../model";
import { useDispatch } from "../store";
import { addLabel, setLabels } from "../store/reducers/labels";

/**
 * Hook to dispatch a {@link SetLabelsAction}.
 */
export const useSetLabels = () => {
  const dispatch = useDispatch();

  return (Labels: PantryItemLabel[]) => dispatch(setLabels(Labels));
};

/**
 * Hook to dispatch an {@link AddLabelAction}.
 */
export const useAddLabel = () => {
  const dispatch = useDispatch();

  return (Label: PantryItemLabel) => dispatch(addLabel(Label));
};
