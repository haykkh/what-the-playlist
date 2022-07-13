module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "@nuxtjs/eslint-config-typescript"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: [
    "vue",
    "@typescript-eslint"
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
    indent: ["error", 2],
    "no-multi-spaces": ["error"],
    "vue/multi-word-component-names": 0,
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ]
  }
}
