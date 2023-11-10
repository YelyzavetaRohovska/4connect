/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  plugins: [],
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
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};