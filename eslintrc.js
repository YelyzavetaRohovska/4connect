/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",

    // Enforces no extra curly braces around string props or children
    "react/jsx-curly-brace-presence": [
      2,
      {
        props: "never",
        children: "never",
        propElementValues: "always",
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/*.[t|j}sx?"],
    },
  ],
  ignorePatterns: ["node_modules/*", ".github/*", ".git/*"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    ecmaVersion: "latest",
  },
}
