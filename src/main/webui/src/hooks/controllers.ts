import { request } from "graphql-request";

import {
  StoreItemMutationVariables,
  PantryItem,
  AllItemsDocument,
  StoreItemDocument,
} from "../gql/conf/graphql";
import { ApiError, errorHandler, GraphQLModelError } from "../model";
import nullcheck from "../util/nullcheck";
import { useAddItem, useSetItems } from "./items";
import { useToastAPIError } from "./toast";

const endpoint =
  process.env.GRAPHQL_ENDPOINT ?? "http://localhost:8080/graphql";

/**
 * Hook to issue query for `allItems` to retrieve list of {@link PantryItem}s.
 *
 * By default will issue the SET_PANTRY_ITEMS action with the list of items.
 */
export const useAllItemsController = (
  onSuccess?: (items: PantryItem[]) => void,
  onError?: (error: ApiError) => void,
) => {
  const toastApiError = useToastAPIError();
  const setItems = useSetItems();

  /** Issue query for `allItems` to retrieve list of {@link PantryItem}s. */
  return () =>
    request(endpoint, AllItemsDocument)
      .then((data) => {
        if (nullcheck(data.allItems)) {
          return data.allItems
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
            });
        } else {
          return Promise.reject(new GraphQLModelError());
        }
      })
      .then(onSuccess ?? setItems)
      .catch(errorHandler(onError ?? toastApiError));
};

/**
 * Hook to issue a mutation for `storeItem` to add an item to the pantry.
 *
 * By default will dispatch the ADD_PANTRY_ITEM action with the received item.
 */
export const useStoreItemController = (
  onSuccess?: (item: PantryItem) => void,
  onError?: (error: ApiError) => void,
) => {
  const toastApiError = useToastAPIError();
  const addItem = useAddItem();

  /**
   * Issue mutation for `storeItem` to add an item to the pantry.
   */
  return (variables: StoreItemMutationVariables) =>
    request(endpoint, StoreItemDocument, variables)
      .then((data) => {
        if (nullcheck(data) && nullcheck(data?.storeItem)) {
          return {
            id: data.storeItem.id ?? undefined,
            name: data.storeItem.name ?? undefined,
            description: data.storeItem.description ?? undefined,
            quantity: data.storeItem?.quantity,
            quantityUnitType: data.storeItem.quantityUnitType ?? undefined,
          };
        } else {
          return Promise.reject(new GraphQLModelError());
        }
      })
      .then(onSuccess ?? addItem)
      .catch(errorHandler(onError ?? toastApiError));
};
