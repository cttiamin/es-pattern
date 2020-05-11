module.exports = {
  // parser: 'sugarss',
  // plugins: {
  //   'postcss-import': {},
  //   'postcss-preset-env': {},
  //   'cssnano': {}
  // }
  plugins: [
  	require('autoprefixer')({ /* ...options */ })
  ]
}