import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    settings: {
      react: {
        version: "19.0",
        defaultVersion: "19.0",
      },
    },
  },
  {
    ignores: [".yarn/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
];
