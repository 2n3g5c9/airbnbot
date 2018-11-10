module.exports = {
  parser: 'typescript-eslint-parser',
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['import', 'jest'],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    'no-console': 0,
  },
};
