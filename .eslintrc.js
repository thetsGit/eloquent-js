module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
  ],
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
    'import/no-unresolved': [2, { commonjs: true }],
  },
};
