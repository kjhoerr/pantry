import { SerializedError } from "@reduxjs/toolkit";

import {
  StoreItemMutationVariables,
  PantryItem,
  AllItemsDocument,
  StoreItemDocument,
} from "../gql/conf/graphql";
import { UnknownApiError } from "../model";
import nullcheck from "../util/nullcheck";
import { useAddItem, useSetItems } from "./items";
import { useToastAPIError } from "./toast";
import { request } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "http://localhost:8080/graphql";

/**
 * Issue query for `allItems` to retrieve list of {@link PantryItem}s.
 *
 * By default will issue the SET_PANTRY_ITEMS action with the list of items.
 */
export const useAllItemsController = (
  onSuccess?: (items: PantryItem[]) => void,
  onError?: (error: SerializedError) => string,
) => {
  const toastApiError = useToastAPIError();
  const setItems = useSetItems();

  const updateHandler = onSuccess ?? setItems;
  const errorHandler = onError ?? toastApiError;

  return request(endpoint, AllItemsDocument).then((data) => {
    if (nullcheck(data?.allItems)) {
      updateHandler(
        data.allItems
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
      );
    }
  }).catch((error) =>
    errorHandler(error ?? new UnknownApiError())
  );
};

/**
 * Hook to issue a mutation for `storeItem` to add an item to the pantry.
 *
 * By default will dispatch the ADD_PANTRY_ITEM action with the received item.
 */
export const useStoreItemController = (
  onSuccess?: (item: PantryItem) => void,
  onError?: (error: SerializedError) => string,
) => {
  const toastApiError = useToastAPIError();
  const addItem = useAddItem();

  const update = onSuccess ?? addItem;
  /**
   * Issue mutation for `storeItem` to add an item to the pantry.
   */
  return (variables: StoreItemMutationVariables) =>
    request(endpoint, StoreItemDocument, variables)
      .then((data) => {
        if (nullcheck(data) && nullcheck(data?.storeItem)) {
          const { storeItem } = data;
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
