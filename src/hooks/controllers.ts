import { SerializedError } from "@reduxjs/toolkit";
import { ErrorResponse } from "@rtk-query/graphql-request-base-query/dist/GraphqlBaseQueryTypes";
import { useEffect } from "react";

import {
  StoreItemMutationVariables,
  PantryItem,
  useAllItemsQuery,
  useStoreItemMutation,
  StoreItemMutation,
} from "../gql/conf/graphql";
import { UnknownApiError } from "../model";
import nullcheck from "../util/nullcheck";
import { useAddItem, useSetItems } from "./items";
import { useCloseMessage, useToastAPIError } from "./toast";

/**
 * Issue query for `allItems` to retrieve list of {@link PantryItem}s.
 *
 * By default will issue the SET_PANTRY_ITEMS action with the list of items.
 */
export const useAllItemsController = (
  onSuccess?: (items: PantryItem[]) => void,
  onError?: (error: SerializedError) => string,
) => {
  const { data, error, isError, isSuccess } = useAllItemsQuery();
  const toastApiError = useToastAPIError();
  const closeMessage = useCloseMessage();
  const setItems = useSetItems();

  const errorHandler = onError ?? toastApiError;
  useEffect(() => {
    if (isError) {
      const key = errorHandler(error ?? new UnknownApiError());
      return () => {
        closeMessage(key);
      };
    }
  }, [isError, error, toastApiError, closeMessage, errorHandler]);

  const updateHandler = onSuccess ?? setItems;
  useEffect(() => {
    if (isSuccess && nullcheck(data?.allItems)) {
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
  }, [isSuccess, data, setItems, updateHandler]);
};

/** Type to coerce Promise result */
type MutationResult =
  | { data: StoreItemMutation; error: undefined }
  | { data: undefined; error: ErrorResponse | SerializedError };

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
  const [mutate, _result] = useStoreItemMutation({});

  const update = onSuccess ?? addItem;
  /**
   * Issue mutation for `storeItem` to add an item to the pantry.
   */
  return (variables: StoreItemMutationVariables) =>
    mutate(variables)
      .then((res) => {
        const { data, error } = res as MutationResult;

        if (nullcheck(error)) {
          return Promise.reject(error);
        }

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
