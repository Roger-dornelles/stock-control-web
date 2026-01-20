import nextPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importX from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

console.log("ESLint config carregada com sucesso!");

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
      "import-x": importX,
      react: reactPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // --- REGRAS DE CÓDIGO ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-unused-vars": "off",

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: ["function", "class", "multiline-const"],
          next: "*",
        },
        { blankLine: "always", prev: "*", next: "export" },
      ],

      // --- ORGANIZAÇÃO DE IMPORTS ---
      "import-x/no-unused-modules": "error",
      "import-x/no-duplicates": "error",
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "type",
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],

      // --- REGRAS DE TYPESCRIPT ---
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",

      // --- REGRAS DO NEXT.JS ---
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/self-closing-comp": "error",
    },
  },
  {
    ignores: [".next/*", "node_modules/*", "components/ui/*"],
  },
  eslintConfigPrettier,
];
