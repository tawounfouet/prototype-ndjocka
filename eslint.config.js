import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  { files: ['**/*.{js,jsx}'], languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, ...globals.node } }, plugins: { react, 'react-hooks': reactHooks }, rules: { ...js.configs.recommended.rules, ...react.configs.recommended.rules, ...react.configs['jsx-runtime'].rules, ...reactHooks.configs.recommended.rules, 'react/prop-types': 'off', 'react/no-unescaped-entities': 'off', 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 'no-undef': 'off' }, settings: { react: { version: 'detect' } } }
];