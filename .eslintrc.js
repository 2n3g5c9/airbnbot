module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended', 'plugin:jest/recommended'],
  plugins: ['import', 'jest', 'prettier'],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    'no-console': 0,
    'prettier/prettier': 'error',
  },
};
