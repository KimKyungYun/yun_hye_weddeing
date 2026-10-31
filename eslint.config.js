import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import stylistic from '@stylistic/eslint-plugin';
import esImport from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '.next',
      '.yarn',
      'next-env.d.ts',
      'src/generated',
      'eslint.config.js',
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      import: esImport,
      '@typescript-eslint': tseslint.plugin,
      'jsx-a11y': jsxA11y,
      '@stylistic': stylistic,
      '@next/next': nextPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import-x/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      'no-console': 'error',
      'no-var': 'error',
      semi: 'error',
      'linebreak-style': 'off',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // spacing 규칙은 @stylistic 플러그인 버전 사용
      'space-infix-ops': 'off',
      'object-curly-spacing': 'off',
      'comma-spacing': 'off',
      'arrow-spacing': 'off',
      'key-spacing': 'off',

      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      'no-multi-spaces': 'error',
      '@stylistic/indent': ['error', 2],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../../*'],
              message: '절대경로(@/)로 변경해주세요.',
            },
          ],
        },
      ],

      'react/self-closing-comp': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' },
            { pattern: '**/*.module.scss', group: 'type', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: [],
        },
      ],
      'import/newline-after-import': ['error', { count: 1 }],

      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single'],
      'react/jsx-first-prop-new-line': 'off',
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-max-props-per-line': 'off',
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      'react/jsx-closing-bracket-location': 'off',
      '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      'react/jsx-closing-tag-location': 'off',
      '@stylistic/jsx-closing-tag-location': 'error',
      'react/button-has-type': 'error',
      'space-in-parens': 'off',
      'react/jsx-curly-spacing': 'off',
      '@stylistic/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'padded-blocks': ['error', 'never'],
      'object-shorthand': ['error', 'always'],
      radix: ['error', 'always'],
      'react/jsx-tag-spacing': 'off',
      '@stylistic/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always', beforeClosing: 'never' }],
      'jsx-a11y/label-has-associated-control': [2, { labelAttributes: ['htmlFor'], depth: 3 }],
      'comma-dangle': ['error', 'always-multiline'],
      '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
      '@stylistic/space-infix-ops': ['error'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      '@stylistic/space-in-parens': ['error', 'never'],
      'no-useless-rename': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_' }],
      '@typescript-eslint/dot-notation': 'error',
    },
  },

  // ── 서버 전용 코드가 공용 컴포넌트로 새지 않게 막는다 ──────────────
  // src/lib 은 Supabase 세션·쿼리를 품는다. 데이터는 화면(app/**)의 서버 컴포넌트가 조회해서
  // 공용 컴포넌트에는 props 로만 내려준다. (클라이언트 컴포넌트가 lib 를 import 하면
  // 'server-only' 가 빌드를 깨뜨린다)
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../../../*'], message: '절대경로(@/)로 변경해주세요.' },
            { group: ['@/lib/*', '@/lib'], message: '공용 컴포넌트는 props 만 받습니다. 데이터 조회는 화면(app)의 서버 컴포넌트에서 하세요.' },
            { group: ['@/app/*'], message: '화면(app) 내부는 그 화면만 씁니다. 공용이 필요하면 src/components 로 올리세요.' },
          ],
        },
      ],
    },
  },

  // 화면 내부는 private 모듈로 둔다 — app 밖에서 app 안을 들여다보지 않는다.
  // (flat config 는 같은 규칙을 뒤 블록이 통째로 덮어쓰므로 components·hooks 는 위 블록에 합쳐 두었다)
  {
    files: ['src/lib/**/*.{ts,tsx}', 'src/utils/**/*.{ts,tsx}', 'src/constants/**/*.{ts,tsx}', 'src/types/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['../../../*'], message: '절대경로(@/)로 변경해주세요.' },
            { group: ['@/app/*'], message: '화면(app) 내부는 그 화면만 씁니다. 공용이 필요하면 src/components 로 올리세요.' },
          ],
        },
      ],
    },
  },

  // 서버에서 도는 코드
  {
    files: ['src/lib/**/*.{ts,tsx}', 'src/app/**/actions.ts', '*.config.ts', 'src/proxy.ts'],
    languageOptions: { globals: globals.node },
  },
);
