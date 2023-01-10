import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql/schema.graphql",
  documents: "src/gql/*.ts",
  generates: {
    "./src/gql/conf/": {
      overwrite: true,
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
