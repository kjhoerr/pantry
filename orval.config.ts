import { defineConfig } from 'orval';

export default defineConfig({
  pantry: {
    input: './src/conf/openapi-pantry.yaml',
    output: {
        mode: "tags",
        workspace: "./src",
        target: "./util/pantry.ts",
        schemas: "./model",
        client: "react-query",
        prettier: true,
        override: {
            useDates: true,
            mutator: {
                path: "./conf/mutator.ts",
                name: "useMutator",
            },
            query: {
                useQuery: true,
            },
        },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});