interface CodedError extends Error {
  code?: string;
}

/**
 * Produces an {@link ApiError} from an any-typed error object.
 */
export const inferError = (error: Error): ApiError => {
  if (
    error instanceof GraphQLModelError ||
    error instanceof ItemNotFoundError ||
    error instanceof UnknownApiError
  ) {
    return error;
  } else if ((error as CodedError).code === "item-not-found") {
    return new ItemNotFoundError();
  } else {
    return new UnknownApiError(error);
  }
};

/**
 * Wrapper for {@link inferError} to pass error callee with extrapolated error type {@link ApiError} into a `Promise.catch()` call.
 *
 * @example
 * request(endpoint, AllItemsDocument)
 *   .then(onSuccess)
 *   .catch(errorHandler(toastApiError))
 */
export const errorHandler =
  (onError: (error: ApiError) => void) => (error: Error) =>
    onError(inferError(error));

export interface ApiError {
  name: string | undefined;
  message: string | undefined;
  detail?: string;
}

/** Error returned during item mutation if item does not exist */
export class ItemNotFoundError implements ApiError {
  name = "ItemNotFoundError";
  message = "Item could not be found in pantry";
}

/** Error while mapping the return type from a query or mutation */
export class GraphQLModelError implements ApiError {
  name = "GraphQLModelError";
  message = "Response from API server did not match expected response type";
}

/** Catch-all error when error is undefined or unmatched */
export class UnknownApiError implements ApiError {
  name = "UnknownApiError";
  message = "An unknown error occurred while querying the GraphQL API";
  detail?: string;

  constructor(error: Error) {
    this.detail = error?.message;
  }
}
