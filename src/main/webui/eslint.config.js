import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".yarn/"],
  },
  // Waiting on 5.2.0 for flat config release -
  // this will become: `reactHooks.configs["recommended-latest"]`
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  js.configs.recommended,
  prettier,
);
