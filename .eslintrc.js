module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "arrow-body-style": ["warn"],
        "class-methods-use-this": ["off"],
        "import/no-named-as-default-member": ["off"],
        "import/no-named-as-default": ["off"],
        "indent": ["error", 4],
        "max-len": ["error", { "code": 160 }],
        "no-underscore-dangle": [2, { "allow": ["_self", "_id"] }],
        "semi": "error",
    },
    "env": {
        "browser": true,
        "jest": true
    }
};
