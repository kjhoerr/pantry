import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8080/graphql/schema.graphql",
  documents: "src/gql/**/*.ts",
  generates: {
    "./src/gql/conf/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
