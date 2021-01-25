module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2020',
    project: './tsconfig.json',
    sourceType: 'module',
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    curly: ['error'],
    'no-shadow': 'off',
    'max-depth': ['warn', 4],
    'id-length': ['warn', { exceptions: ['i', 'j'], min: 2 }],
    'no-lonely-if': ['error'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
    'jsx-a11y/href-no-hash': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],
    'react/state-in-constructor': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/static-property-placement': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'import/prefer-default-export': 'off',
  },
};
