import { graphql } from "./conf/gql";

export const queryAllLabels = graphql(`
  query allLabels {
    allLabels {
      id
      title
      color
    }
  }
`);

export const mutationSyncLabels = graphql(`
  mutation syncLabels($labels: [PantryItemLabelInput]) {
    syncLabels(labels: $labels) {
      id
      title
      color
    }
  }
`);
