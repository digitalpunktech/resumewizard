module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['jest'],
  env: {
    'jest/globals': true,
  },
  rules: {
    'import/extensions': [0], // Rule is off - no enforcing of providing extensions on import files (e.g. js or json, etc.)
    'prettier/prettier': 'error',
  },
};
