module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/prop-types': 0,
    'react/jsx-closing-bracket-location': 0,
    'arrow-parens': 'off',
    'no-unused-vars': [
      0,
      {
        ignoreRestSiblings: true,
      },
    ],
    'no-eval': 2,
    'no-console': 1,
    eqeqeq: 2,
    'one-var': [2, 'never'],
    'prefer-arrow-callback': [
      2,
      {
        allowNamedFunctions: true,
      },
    ],
  },
};
