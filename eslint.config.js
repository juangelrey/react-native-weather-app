// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
	expoConfig,
	eslintPluginPrettierRecommended, // Keep this to maintain prettier integration
	{
		ignores: ['dist/*'],
	},
	{
		// Move extends into its own configuration object (fixing syntax error)
		extends: ['universe/shared/typescript-analysis'],
	},
]);
