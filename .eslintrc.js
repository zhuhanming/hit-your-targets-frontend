module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true,
    fetch: false,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'import', 'prettier'],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'no-underscore-dangle': 0,
    'no-shadow': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
    // 'import/extensions': ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    },
    // {
    //   typescript: {
    //     directory: './tsconfig.json'
    //   },
    //   node: {
    //     paths: ['src'],
    //     moduleDirectory: ['node_modules', 'src/'],
    //     extensions: ['.js', '.jsx', '.ts', '.tsx']
    //   }
    // },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
