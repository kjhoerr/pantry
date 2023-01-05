import { SerializedError } from "@reduxjs/toolkit";

export class ApiError implements SerializedError {
  name: string | undefined;
  message: string | undefined;

  constructor(name?: string, message?: string) {
    this.name = name;
    this.message = message;
  }
}

/** Error returned during item mutation if item does not exist */
export class ItemNotFoundError extends ApiError {
  name = "ItemNotFoundError";
  message = "Item could not be found in pantry";
}

/** Catch-all error when error is undefined or unmatched */
export class UnknownApiError extends ApiError {
  name = "UnknownApiError";
  message = "An unknown error occurred while querying the GraphQL API";
}
