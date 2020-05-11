module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html'
  ],
  env: {
    browser: true,
    node: true
  },
  globals: {
    $: true
  },
  rules: {
    // 2 个缩进
    indent: ['error', 2],
    // 结尾不需要换行
    // 'eol-last': 0,
    // 'eol-last': ['error', 'never']

    // allow paren-less arrow functions
    'arrow-parens': 0,

    // allow async-await
    // 'generator-star-spacing': 'off',
    'generator-star-spacing': 0,

    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 函数前空格
    'space-before-function-paren': 0
  }
}