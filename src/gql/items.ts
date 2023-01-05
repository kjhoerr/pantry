import request from "graphql-request";

import { graphql } from "../model/gql";
import { PantryItem, StoreItemMutationVariables } from "../model/graphql";
import { useAddItem, useSetItems, useToastAPIError } from "../store/actions";
import nullcheck from "../util/nullcheck";
import endpoint from "./endpoint";

export const queryAllItems = graphql(`
  query allItems {
    allItems {
      id
      name
      description
      quantity
      quantityUnitType
    }
  }
`);

export const mutationStoreItem = graphql(`
  mutation storeItem(
    $id: String
    $name: String
    $description: String
    $quantity: Float!
    $quantityUnitType: String
  ) {
    storeItem(
      item: {
        id: $id
        name: $name
        description: $description
        quantity: $quantity
        quantityUnitType: $quantityUnitType
      }
    ) {
      id
      name
      description
      quantity
      quantityUnitType
    }
  }
`);

/**
 * Issues query for `allItems` to retrieve list of {@link PantryItem}s.
 *
 * By default will issue the SET_PANTRY_ITEMS action with the list of items.
 */
export const useQueryAllItems = (
  onSuccess?: (items: PantryItem[]) => void,
  onError?: (error: Error) => void,
) => {
  const setItems = useSetItems();
  const toastApiError = useToastAPIError();

  const update = onSuccess ?? setItems;
  return request(endpoint, queryAllItems)
    .then(({ allItems }) =>
      update(
        (allItems ?? [])
          .filter(nullcheck)
          .map(({ id, name, description, quantity, quantityUnitType }) => {
            // ensure object is uncoerced to model type
            return {
              id: id ?? undefined,
              name: name ?? undefined,
              description: description ?? undefined,
              quantity,
              quantityUnitType: quantityUnitType ?? undefined,
            };
          }),
      ),
    )
    .catch(onError ?? toastApiError);
};

/**
 * Hook to issue a mutation for `storeItem` to add an item to the pantry.
 *
 * By default will dispatch the ADD_PANTRY_ITEM action with the received item.
 */
export const useMutationStoreItem = (
  onSuccess?: (item: PantryItem) => void,
  onError?: (error: Error) => void,
) => {
  const toastApiError = useToastAPIError();
  const addItem = useAddItem();

  const update = onSuccess ?? addItem;
  /**
   * Issue mutation for `storeItem` to add an item to the pantry.
   */
  return (variables: StoreItemMutationVariables) =>
    request(endpoint, mutationStoreItem, variables)
      .then(({ storeItem }) => {
        if (nullcheck(storeItem)) {
          update({
            id: storeItem.id ?? undefined,
            name: storeItem.name ?? undefined,
            description: storeItem.description ?? undefined,
            quantity: storeItem?.quantity,
            quantityUnitType: storeItem.quantityUnitType ?? undefined,
          });
        }
      })
      .catch(onError ?? toastApiError);
};
