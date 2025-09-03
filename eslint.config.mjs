import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintPluginJest from "eslint-plugin-jest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/"],
  },
  { files: ["src/**/*.{js,mjs,cjs,ts}", "test/**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettier,
  {
    files: ["test/**/*.{js,mjs,cjs,ts}"],
    ...eslintPluginJest.configs["flat/recommended"],
    rules: {
      ...eslintPluginJest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertion": "off",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
