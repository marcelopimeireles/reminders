module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
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
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['**/src/**/*.d.ts', '**/config/**/*.js', '**/scripts/**/*.js', '**/vendor/*.js'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js', '.ts', '.tsx'] }],
        'import/prefer-default-export': 'off',
    },
};
