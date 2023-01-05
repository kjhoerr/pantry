import { api } from "../../hooks/api";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Mutation root */
export type Mutation = {
  __typename?: "Mutation";
  /** Remove an item from the pantry */
  deleteItem?: Maybe<Scalars["Boolean"]>;
  /** Store an item in the pantry */
  storeItem?: Maybe<PantryItem>;
};

/** Mutation root */
export type MutationDeleteItemArgs = {
  id?: InputMaybe<Scalars["String"]>;
};

/** Mutation root */
export type MutationStoreItemArgs = {
  item?: InputMaybe<PantryItemInput>;
};

export type PantryItem = {
  __typename?: "PantryItem";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  quantity: Scalars["Float"];
  quantityUnitType?: Maybe<Scalars["String"]>;
};

export type PantryItemInput = {
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  quantity: Scalars["Float"];
  quantityUnitType?: InputMaybe<Scalars["String"]>;
};

/** Query root */
export type Query = {
  __typename?: "Query";
  _service: _Service;
  /** Get all items stored in the pantry */
  allItems?: Maybe<Array<Maybe<PantryItem>>>;
  /** Get an item stored in the pantry */
  item?: Maybe<PantryItem>;
};

/** Query root */
export type QueryItemArgs = {
  itemId?: InputMaybe<Scalars["String"]>;
};

export type _Service = {
  __typename?: "_Service";
  sdl: Scalars["String"];
};

export type AllItemsQueryVariables = Exact<{ [key: string]: never }>;

export type AllItemsQuery = {
  __typename?: "Query";
  allItems?: Array<{
    __typename?: "PantryItem";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    quantity: number;
    quantityUnitType?: string | null;
  } | null> | null;
};

export type StoreItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  quantity: Scalars["Float"];
  quantityUnitType?: InputMaybe<Scalars["String"]>;
}>;

export type StoreItemMutation = {
  __typename?: "Mutation";
  storeItem?: {
    __typename?: "PantryItem";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    quantity: number;
    quantityUnitType?: string | null;
  } | null;
};

export const AllItemsDocument = `
    query allItems {
  allItems {
    id
    name
    description
    quantity
    quantityUnitType
  }
}
    `;
export const StoreItemDocument = `
    mutation storeItem($id: String, $name: String, $description: String, $quantity: Float!, $quantityUnitType: String) {
  storeItem(
    item: {id: $id, name: $name, description: $description, quantity: $quantity, quantityUnitType: $quantityUnitType}
  ) {
    id
    name
    description
    quantity
    quantityUnitType
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    allItems: build.query<AllItemsQuery, AllItemsQueryVariables | void>({
      query: (variables) => ({ document: AllItemsDocument, variables }),
    }),
    storeItem: build.mutation<StoreItemMutation, StoreItemMutationVariables>({
      query: (variables) => ({ document: StoreItemDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAllItemsQuery, useLazyAllItemsQuery, useStoreItemMutation } =
  injectedRtkApi;
