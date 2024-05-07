import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import cypressPlugin from 'eslint-plugin-cypress'
import tseslint from '@typescript-eslint/eslint-plugin'
import jsPlugin from '@eslint/js'
import tsParser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'bin/**', 'build/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.cypress,
        ...globals.react,
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        it: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      cypress: cypressPlugin,
    },
    rules: {
      ...jsPlugin.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...cypressPlugin.configs.recommended.rules,
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: [
        'warn',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],
      'jsx-quotes': ['error', 'prefer-double'],
      // if we use == instead of ===
      eqeqeq: 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
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
  },
]
