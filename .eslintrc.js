module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  env: {
    node: true,
    es2024: true,
  },
  rules: {
    'no-unused-vars': 'warn',
  },
};
