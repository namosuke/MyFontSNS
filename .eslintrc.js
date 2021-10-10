module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true, // TODO:そのうちOverride（テストのみ）にした方がいい
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-console": [
      "warn",
      {
        allow: ["log", "error"],
      },
    ],
    "react/jsx-filename-extension": [
      "warn",
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "linebreak-style": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any":"off",
    "@typescript-eslint/explicit-module-boundary-types":"off",
    "@typescript-eslint/no-non-null-assertion":"off",
    "@typescript-eslint/ban-types":"off",
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-extraneous-dependencies": "off",
        "react/prop-types": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/no-unescaped-entities": "off",
      },
    },
  ],
};
