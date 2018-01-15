module.exports = {
    // Enabled by default all recommended ESLint rules (http://eslint.org/docs/rules/) - (Recommended)
    "extends": [
        "eslint:recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": false,
            "impliedStrict": true,
            "async": false
        }
    },
    "env": {
        "node": true,
        "es6": true
    },
    "rules": {
        "no-console": "error",        
        // Best Practices (http://eslint.org/docs/rules/#best-practices)
        "block-scoped-var": "error",
        "consistent-return": "error",
        "curly": "error",
        "dot-location": ["error", "property"],
        "eqeqeq": "error",
        "no-caller": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-implied-eval": "error",
        "no-invalid-this": "error",
        "no-iterator": "error",
        "no-labels": "error",
        "no-native-reassign": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-new": "error",
        "no-proto": "error",
        "no-return-assign": "error",
        "no-script-url": "error",
        "no-sequences": "error",
        "no-useless-call": "error",
        "no-with": "error",
        "radix": "error",
        "wrap-iife": ["error", "inside"],
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"}],

        "dot-notation": "warn",
        "guard-for-in": "warn",
        "no-alert": "warn",
        "no-else-return": "warn",
        "no-floating-decimal": "warn",
        "no-lone-blocks": "warn",
        "no-loop-func": "warn",
        "no-multi-spaces": "warn",
        "no-multi-str": "warn",
        "no-octal-escape": "warn",
        "no-param-reassign": ["warn", {"props": false}],
        "no-self-compare": "warn",
        "no-throw-literal": "warn",
        "no-unused-expressions": ["warn", {"allowShortCircuit": true }],
        "no-useless-concat": "warn",
        "no-void": "warn",
        "no-warning-comments": "error",
        "vars-on-top": "warn",
        "yoda": "warn",

        // Strict (http://eslint.org/docs/rules/#strict-mode)

        "strict": ["error", "global"],

        // Variables (http://eslint.org/docs/rules/#variables)
        "no-catch-shadow": "error",
        "no-shadow-restricted-names": "error",
        "no-shadow": "error",
        "no-undef-init": "error",

        "no-use-before-define": ["warn", "nofunc"],

        // Nodejs (http://eslint.org/docs/rules/#nodejs-and-commonjs)
        "no-path-concat": "error",

        // Stylistic Issues (http://eslint.org/docs/rules/#stylistic-issues)
        "max-nested-callbacks": ["error", 3],
        "new-cap": "error",
        "new-parens": "error",
        "no-array-constructor": "error",

        "camelcase": ["warn", {"properties": "never"}],
        "array-bracket-spacing": ["warn", "never"],
        "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
        "comma-spacing": ["warn", {"before": false, "after": true}],
        "comma-style": ["warn", "last"],
        "computed-property-spacing": ["warn", "never"],
        "eol-last": "warn",
        "func-names": "warn",
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "jsx-quotes": ["warn", "prefer-double"],
        "key-spacing": ["warn", {"beforeColon": false, "afterColon": true}],
        "linebreak-style": ["warn", "unix"],
        "no-lonely-if": "warn",
        "no-nested-ternary": "warn",
        "no-spaced-func": "warn",
        "no-trailing-spaces": "warn",
        "no-unneeded-ternary": "warn",
        "object-curly-spacing": ["warn", "never"],
        "one-var": ["warn", "never"],
        "quote-props": ["warn", "as-needed"],
        "quotes": ["warn", "single", "avoid-escape"],
        "semi-spacing": ["warn", {"before": false, "after": true}],
        "semi": ["warn", "always"],
        "keyword-spacing": "warn",
        "space-before-blocks": ["warn", "always"],
        "space-in-parens": ["warn", "never"],
        "space-infix-ops": "warn",
        "space-unary-ops": ["warn", { "words": true, "nonwords": false }],
        "spaced-comment": "warn",
        "wrap-regex": "warn",

        // ES6 (http://eslint.org/docs/rules/#ecmascript-6)

        "arrow-spacing": "error",
        "constructor-super": "error",
        "no-class-assign": "error",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-this-before-super": "error",
        "arrow-parens": "error",
        "no-var": "error",
        "prefer-spread": "error",
        "prefer-arrow-callback": "warn"
    }
}
