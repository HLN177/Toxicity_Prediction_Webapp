module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-multi-str": ["error"],
    // stylistic issues
    "array-bracket-spacing": ["error", "never"], //数组里面有多余的空格
    "indent": ["error", 2, { SwitchCase: 1, ignoredNodes: ["TemplateLiteral"] }], //代码缩进
    "key-spacing": ["error", { beforeColon: false, afterColon: true}], //对象的键和冒号之间的空格
    "keyword-spacing": ["error", { before: true, after: true }], //条件语句和括号之间的空格
    "semi": ["error", "always"], //语句强制分号结尾
    "space-before-blocks": ["error", "always"], //条件判断语句块和{之间不要有空格
    "space-in-parens": ["error", "never"], //小括号里要不要有空格
    "no-trailing-spaces": ["error", { skipBlankLines: true }], //一行结束后面不要有空格
  }
};
