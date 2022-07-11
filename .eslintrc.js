// const OFF = 0;
// const WARN = 1;
const ERROR = 2;

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  plugins: ["@ts-gql", "simple-import-sort"],
  rules: {
    "@ts-gql/ts-gql": ERROR,
    "@typescript-eslint/consistent-type-imports": [
      ERROR,
      { disallowTypeAnnotations: false },
    ],
    "import/first": ERROR,
    "import/newline-after-import": ERROR,
    "import/no-duplicates": ERROR,
    "simple-import-sort/exports": ERROR,
    "simple-import-sort/imports": ERROR,
  },
};
