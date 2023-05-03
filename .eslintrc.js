module.exports = {
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	plugins: ['unicorn'],
	rules: {
		// Base
		'no-shadow': 'error',
		'no-warning-comments': 'off',
		'no-console': 'warn', // doesn't seem to be enabled in any preset
		'no-restricted-imports': [
			'error',
			{
				name: '@supabase/auth-helpers-react',
				importNames: ['useSupabaseClient'],
				message: 'Please import from `hooks/useSupabaseClient` instead.',
			},
		],

		// React
		'react/jsx-no-undef': 'off',
		'react/self-closing-comp': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-boolean-value': 'error',
		'react/no-unknown-property': 'off', // started to report many weird errors recently

		// Import
		'import/newline-after-import': 'error',
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],
		'import/consistent-type-specifier-style': ['error', 'prefer-inline'],

		// Unicorn
		'unicorn/no-for-loop': 'error',
		'unicorn/no-array-for-each': 'error',
		'unicorn/no-array-reduce': 'error',
	},

	overrides: [
		// TypeScript
		{
			files: ['**/*.ts?(x)'],
			parserOptions: {
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},

			/*
			 * Linting with Type Information only for TS files:
			 * https://typescript-eslint.io/docs/linting/typed-linting/#i-get-errors-telling-me-the-file-must-be-included-in-at-least-one-of-the-projects-provided
			 */
			extends: [
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:@typescript-eslint/strict',
			],
			rules: {
				'@typescript-eslint/array-type': [
					'warn',
					{
						default: 'generic',
					},
				],
				'@typescript-eslint/consistent-type-exports': [
					'error',
					{
						fixMixedExportsWithInlineTypeSpecifier: true,
					},
				],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{
						fixStyle: 'inline-type-imports',
					},
				],

				'@typescript-eslint/no-misused-promises': [
					'error',
					{
						checksVoidReturn: {
							arguments: false,
							attributes: false,
						},
					},
				],

				// Disabling because of index errors on interfaces,
				// which works fine in type aliases:
				// https://bobbyhadz.com/blog/typescript-index-signature-for-type-is-missing-in-type
				'@typescript-eslint/consistent-type-definitions': 'off',

				// Disabling because it's too strict:
				// we are interested in using || operator multiple times to avoid empty strings.
				'@typescript-eslint/prefer-nullish-coalescing': 'off',
			},
		},
	],
}
