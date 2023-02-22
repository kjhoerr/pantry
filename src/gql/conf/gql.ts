/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as types from "./graphql";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\n  query allItems {\n    allItems {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n":
    types.AllItemsDocument,
  "\n  mutation storeItem(\n    $id: String\n    $name: String\n    $description: String\n    $quantity: Float!\n    $quantityUnitType: String\n  ) {\n    storeItem(\n      item: {\n        id: $id\n        name: $name\n        description: $description\n        quantity: $quantity\n        quantityUnitType: $quantityUnitType\n      }\n    ) {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n":
    types.StoreItemDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query allItems {\n    allItems {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n",
): (typeof documents)["\n  query allItems {\n    allItems {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation storeItem(\n    $id: String\n    $name: String\n    $description: String\n    $quantity: Float!\n    $quantityUnitType: String\n  ) {\n    storeItem(\n      item: {\n        id: $id\n        name: $name\n        description: $description\n        quantity: $quantity\n        quantityUnitType: $quantityUnitType\n      }\n    ) {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n",
): (typeof documents)["\n  mutation storeItem(\n    $id: String\n    $name: String\n    $description: String\n    $quantity: Float!\n    $quantityUnitType: String\n  ) {\n    storeItem(\n      item: {\n        id: $id\n        name: $name\n        description: $description\n        quantity: $quantity\n        quantityUnitType: $quantityUnitType\n      }\n    ) {\n      id\n      name\n      description\n      quantity\n      quantityUnitType\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
