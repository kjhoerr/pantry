import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql/schema.graphql",
  documents: "src/gql/*.ts",
  generates: {
    "./src/gql/conf/graphql.ts": {
      overwrite: true,
      plugins: ["typescript", "typescript-operations", {"typescript-rtk-query": {
        importBaseApiFrom: "../../hooks/api",
        exportHooks: true,
      }}],
    },
  },
};

export default config;
