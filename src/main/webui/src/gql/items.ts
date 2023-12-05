import { graphql } from "./conf/gql";

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
