const path = require('path')
const webpack = require('webpack')
module.exports = {
	mode: 'production',
	entry: {
		// vendors: ['lodash', 'jquery']
		vendors: ['lodash'],
		jquery: ['jquery'],
		vue:	['vue']
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
			// 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
  		name: '[name]',
  		// 映射文件
  		path: path.resolve(__dirname, '../dll/[name].manifest.json')
  	})
  ]
}