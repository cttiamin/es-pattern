const path = require('path')
const webpack = require('webpack')
module.exports = {
	mode: 'production',
	entry: {
		// vendors: ['lodash', 'jquery']
		vendors: ['lodash'],
		jquery: ['jquery']
	},
	output: {
		filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 把文件库 通过 [name] 暴露出去, 挂在全局上
    library: '[name]'
  },
  plugins: [
  	// 分析库映射关系
  	new webpack.DllPlugin({
  		name: '[name]',
  		// 映射文件
  		path: path.resolve(__dirname, '../dll/[name].manifest.json')
  	})
  ]
}