module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'no-plusplus': 0,
    'no-continue': 0,
    'class-methods-use-this': 0,
    'consistent-return': 0,
    'import/no-unresolved ': 0,
    'no-unused-vars': 0,
    semi: ['error', 'always'],
    'import/extensions': 0,
    'no-console': 0,
    'no-named-as-default': 3,
  },
};
