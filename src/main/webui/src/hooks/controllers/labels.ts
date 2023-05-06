import { request } from "graphql-request";

import {
  PantryItemLabel,
  AllLabelsDocument,
  SyncLabelsDocument,
  SyncLabelsMutationVariables,
} from "../../gql/conf/graphql";
import { ApiError, errorHandler, GraphQLModelError } from "../../model";
import nullcheck from "../../util/nullcheck";
import { useToastAPIError } from "../toast";
import { GRAPHQL_ENDPOINT } from "../../config";
import { useSetLabels } from "..";

/**
 * Hook to issue query for `allLabels` to retrieve list of {@link PantryItemLabel}s.
 *
 * By default will issue the SET_PANTRY_ITEM_LABELS action with the list of labels.
 */
export const useAllLabelsController = (
  onSuccess?: (items: PantryItemLabel[]) => void,
  onError?: (error: ApiError) => void,
) => {
  const toastApiError = useToastAPIError();
  const setLabels = useSetLabels();

  /** Issue query for `allLabels` to retrieve list of {@link PantryItemLabel}s. */
  return () =>
    request(GRAPHQL_ENDPOINT, AllLabelsDocument)
      .then((data) => {
        if (nullcheck(data.allLabels)) {
          return data.allLabels
            .filter(nullcheck)
            .map(({ id, title, color }) => {
              // ensure object is uncoerced to model type
              return {
                id: id ?? undefined,
                title: title ?? undefined,
                color: color ?? undefined,
              };
            });
        } else {
          return Promise.reject(new GraphQLModelError());
        }
      })
      .then(onSuccess ?? setLabels)
      .catch(errorHandler(onError ?? toastApiError));
};

/**
 * Hook to issue a mutation for `syncLabels` to sync labels to the pantry.
 *
 * By default will not dispatch any actions.
 */
export const useSyncLabelsController = (
  onSuccess?: (item: PantryItemLabel[]) => void,
  onError?: (error: ApiError) => void,
) => {
  const toastApiError = useToastAPIError();
  const setLabels = useSetLabels();

  /**
   * Issue mutation for `syncLabels` to sync labels to the pantry.
   */
  return (variables: SyncLabelsMutationVariables) =>
    request(GRAPHQL_ENDPOINT, SyncLabelsDocument, variables)
      .then((data) => {
        if (nullcheck(data) && nullcheck(data?.syncLabels)) {
          return data.syncLabels.map(label => ({
            id: label?.id ?? undefined,
            color: label?.color ?? undefined,
            title: label?.title ?? undefined,
          }));
        } else {
          return Promise.reject(new GraphQLModelError());
        }
      })
      .then(onSuccess ?? setLabels)
      .catch(errorHandler(onError ?? toastApiError));
};
