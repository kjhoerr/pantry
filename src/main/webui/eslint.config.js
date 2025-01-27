import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
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
  {
    // Waiting on 5.2.0 for flat config release -
    // this will become: `reactHooks.configs["recommended-latest"]`
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
];
