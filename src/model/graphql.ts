/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

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

export const AllItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "allItems" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allItems" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "quantity" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "quantityUnitType" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AllItemsQuery, AllItemsQueryVariables>;
export const StoreItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "storeItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "quantity" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "quantityUnitType" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "storeItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "item" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "id" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "name" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "name" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "description" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "description" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "quantity" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "quantity" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "quantityUnitType" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "quantityUnitType" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "quantity" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "quantityUnitType" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StoreItemMutation, StoreItemMutationVariables>;
