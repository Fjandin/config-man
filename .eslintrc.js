module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json'
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:promise/recommended',
        'prettier'
    ],
    plugins: ['@typescript-eslint', 'prettier', 'promise'],
    rules: {
        'eol-last': [2, 'always'],
        'no-console': 2,
        quotes: [2, 'single', {avoidEscape: true}],
        radix: 2,
        'prettier/prettier': 1,
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/no-namespace': [0],
        '@typescript-eslint/explicit-function-return-type': [0],
        '@typescript-eslint/ban-ts-comment': [2],
        '@typescript-eslint/no-floating-promises': [2],
        '@typescript-eslint/naming-convention': [
            2,
            {
                selector: 'variableLike',
                leadingUnderscore: 'allow',
                format: ['strictCamelCase']
            },
            {
                selector: 'variable',
                format: ['strictCamelCase', 'UPPER_CASE']
            }
        ],
        '@typescript-eslint/member-delimiter-style': [
            2,
            {
                multiline: {delimiter: 'none', requireLast: true},
                singleline: {delimiter: 'semi', requireLast: false}
            }
        ],
        '@typescript-eslint/no-use-before-define': [
            2,
            {
                functions: false,
                classes: false
            }
        ],
        '@typescript-eslint/no-unused-vars': [
            2,
            {
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-use-before-define': 0
    }
}
