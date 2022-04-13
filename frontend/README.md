# Frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Setup for dev mode

### 1. Install angular schematics

`ng add @angular-eslint/schematics`

### 2. Install additional libs

`npm install prettier eslint-plugin-prettier eslint-config-prettier prettier-plugin-import-sort import-sort-style-module --save-dev`
 
### 3. Config files
In `package.json` add next lines:

```
  "devDependencies": { ... }, // here some dev dependecies
  "importSort": { // insert this and what below!
    ".js, .ts": {
      "parser": "typescript",
      "style": "module"
    }
  }
```

Setup VSCode settings with next config:

```
{
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.organizeImports": true,
      "source.fixAll.format": true
    },
    "eslint.validate": ["javascript", "typescript"],
  
    "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": true,
    "editor.formatOnPaste": false
  }
  
```

Additional configs, for prettier:

`.prettierrc.json`:

```
{
  "printWidth": 120,
  "tabWidth": 2,
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "plugins": ["./node_modules/prettier-plugin-import-sort"]
}
```


`.eslintrc.json`:

```
{
  "root": true,
  "ignorePatterns": ["!**/*", "node_modules"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/ng-cli-compat",
        "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@angular-eslint/no-output-on-prefix": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            "accessibility": "no-public"
          }
        ],
        "@typescript-eslint/member-ordering": [
          "error",
          {
            // Adapted default config to ignore decorator ordering. Helpful for class-transformer annotations.
            // See: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
            "default": [
              // Index signature
              "signature",

              // Fields
              "public-static-field",
              "protected-static-field",
              "private-static-field",
              "public-instance-field",
              "protected-instance-field",
              "private-instance-field",
              "public-abstract-field",
              "protected-abstract-field",
              "private-abstract-field",
              "public-field",
              "protected-field",
              "private-field",
              "static-field",
              "instance-field",
              "abstract-field",
              "field",

              // Constructors
              "public-constructor",
              "protected-constructor",
              "private-constructor",
              "constructor",

              // Methods
              "public-static-method",
              "protected-static-method",
              "private-static-method",
              "public-instance-method",
              "protected-instance-method",
              "private-instance-method",
              "public-abstract-method",
              "protected-abstract-method",
              "private-abstract-method",
              "public-method",
              "protected-method",
              "private-method",
              "static-method",
              "instance-method",
              "abstract-method",
              "method"
            ]
          }
        ],
        // Reference: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": "default",
            "format": ["camelCase"],
            "leadingUnderscore": "forbid",
            "trailingUnderscore": "forbid",
            "filter": {
              "regex": "^(_)$", // Allow "_" in arrow functions
              "match": false
            }
          },
          {
            "selector": "typeLike",
            "format": ["PascalCase"]
          },
          {
            "selector": "enumMember",
            "format": ["StrictPascalCase"]
          },
          {
            // TODO: Discuss.
            // Currenly in use Lib: UPPER_CASE
            // Currently in use Website: camelCase
            // Maybe switch to PascalCase?
            "selector": "property",
            "modifiers": ["static", "readonly"],
            "format": ["UPPER_CASE", "camelCase"]
          },
          {
            "selector": "typeProperty",
            "format": ["camelCase", "snake_case"]
          },
          {
            // TODO: Discuss
            "selector": "variable",
            "types": ["boolean"],
            "format": ["PascalCase"],
            "prefix": ["is", "should", "has", "can", "did", "will"]
          },
          {
            // TODO: Discuss [Check Updates for https://github.com/typescript-eslint/typescript-eslint/issues/816]
            "selector": "property",
            "format": ["camelCase"],
            "modifiers": ["private"],
            "leadingUnderscore": "allow"
          }
        ],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/prefer-function-type": "off",
        "brace-style": ["error", "1tbs"],
        "id-blacklist": "off",
        "id-match": "off",
        "max-len": [
          "error",
          {
            "code": 120,
            "ignoreComments": true
          }
        ],
        "no-shadow": "off",
        "no-trailing-spaces": "off",
        "no-underscore-dangle": "off",
        "one-var": "off",
        "radix": ["error", "as-needed"],
        "prefer-arrow/prefer-arrow-functions": "off"
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    }
  ]
}
```