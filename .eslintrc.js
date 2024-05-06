module.exports = {
  env: {
    node: true,
    es2021: true,
    'cypress/globals': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: '2018',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react', 'jest', 'cypress', '@typescript-eslint'
  ],
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'warn',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-double'
    ],
    // if we use == instead of ===
    'eqeqeq': 'error',
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    // deactivate a recommended rule
    'no-console': 0,
    'no-unused-vars': 0,
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/prop-types': 0,

    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-extra-semi': 0,
  },
};
