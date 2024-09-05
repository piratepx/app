import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import node from 'eslint-plugin-n'
import globals from 'globals'

export default [
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    ignores: ['web'],
  },
  js.configs.recommended,
  node.configs['flat/recommended'],
  prettier,
]
