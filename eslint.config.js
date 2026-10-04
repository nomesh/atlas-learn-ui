import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

// Scoped on purpose: the only enforced rules are the React hooks rules. Rules-of-Hooks is an
// error because a conditional early return before a hook crashed lesson/topic switching.
export default tseslint.config(
  { ignores: ['dist/**', 'tests/dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { parser: tseslint.parser },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
);
