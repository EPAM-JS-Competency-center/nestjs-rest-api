module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  extends: [
    'standard-with-typescript',
  ],
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-inferrable-types": [
      "error",
      {
        "ignoreParameters": true
      }
    ],
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        "allowTernary": true
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ],
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "@typescript-eslint/quotes": [
      "error",
      "single"
    ],
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/typedef": [
      "error"
    ],
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/comma-dangle": [
      "error",
      "always-multiline"
    ],
    "array-bracket-spacing": [
      "error",
      "always"
    ],
    "arrow-body-style": "off",
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "arrow-spacing": "error",
    "brace-style": [
      "error",
      "1tbs"
    ],
    "computed-property-spacing": [
      "error",
      "always"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "constructor-super": "error",
    "curly": "error",
    "eol-last": "error",
    "keyword-spacing": [
      "error",
      {
        "before": true
      }
    ],
    "max-classes-per-file": "off",
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreTemplateLiterals": true,
        "ignoreStrings": true,
        "ignoreComments": true
      }
    ],
    "no-console": [
      "error"
    ],
    "no-duplicate-imports": "error",
    "no-empty": "off",
    "no-eval": "error",
    "no-fallthrough": "error",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2
      }
    ],
    "no-multi-spaces": "error",
    "no-new-wrappers": "error",
    "no-trailing-spaces": "error",
    "no-undef-init": "error",
    "no-underscore-dangle": "off",
    "no-unsafe-finally": "error",
    "no-unused-labels": "error",
    "no-unused-vars": "off",
    "no-var": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-shorthand": "off",
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      }
    ],
    "prefer-arrow/prefer-arrow-functions": "off",
    "prefer-const": [
      "error",
      {
        "destructuring": "all"
      }
    ],
    "semi": ["error", "always"],
    "@typescript-eslint/semi": ["error", "always"],
    "semi-spacing": "error",
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-before-blocks": [
      "error",
      {
        "functions": "always",
        "keywords": "always",
        "classes": "always"
      }
    ],
    "template-curly-spacing":  [
      "error",
      "always"
    ]
  }
}
