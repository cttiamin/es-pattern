const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 2 edit
const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const productionConfig = require('./webpack.prod')
const developmentConfig = require('./webpack.dev')

const generateConfig = env => {

  const scriptLoader = ['babel-loader']
  .concat(env === 'production'
    ? []
    : [
      // {
      //   loader: 'eslint-loader',
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // }
    ]
  )

  const cssLoaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        sourceMap: env === 'development'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        sourceMap: env === 'development',
        plugins: [
          // require('postcss-cssnext')()
          require('postcss-preset-env')()
        ].concat(env === 'production'
          ? require('postcss-sprites')({
            spritePath: 'dist/assets/imgs/sprites',
            retina: true
          })
          : []
        )
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: env === 'development'
      }
    }
  ]

  const styleLoader = env === 'production'
  // ? extractLess.extract({
  //   fallback: 'style-loader',
  //   use: cssLoaders
  // })
  ? ['style-loader',
    MiniCssExtractPlugin.loader
  ].concat(cssLoaders)
  : [{
    loader: 'style-loader'
  }].concat(cssLoaders)

  const fileLoader = env === 'development'
  ? [{
    loader: 'file-loader',
    options: {
      // publicPath: '',
      // outputPath: 'dist/',
      // useRelativePath: true
      name: '[name]-[hash:5].[ext]',
      outputPath: 'assets/imgs/'
    }
  }]
  : [{
    loader: 'url-loader',
    options: {
      name: '[name]-[hash:5].[ext]',
      limit: 1000,
      outputPath: 'assets/imgs'
    }
  }]


  return {
    entry: {
      app: './src/main.js',
      page_v1: './client/wwyy/page_v1.js',
      index_v1: './client/wwyy/index_v1.js',
      page_v2: './client/wwyy/page_v2.js',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: 'js/[name].js'
      
    },
    // 定义别名
    resolve: {
      alias: {
        // jquery$: path.resolve(__dirname, '../src/assets/js/jquery3.3.1.js')
        "@src":path.resolve("src"),
        // "@component":path.resolve("src/component"),
        // "@pages":path.resolve("src/pages"),
        // "@utils":path.resolve("src/utils"),
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // for jsline jquery
          include: [path.resolve(__dirname, '../src')],
          exclude: [
            path.resolve(__dirname, '../src/assets/js'),
           /(node_modules)/
          ],
          use: scriptLoader
        },
        {
          test: /\.css$/,
          use: cssLoaders
        },
        {
          test: /\.less$/,
          use: styleLoader
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          use: fileLoader.concat(
            env === 'production'
              ? {
                loader: 'img-loader',
                options: {
                  pngquant: {
                    quality: 80
                  }
                }
              }
              : []
          )
        },
        {
          test: /\.(eot|woff2|ttf|svg)$/,
          use: fileLoader
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-bundle-[hash:5].css'
      }),
      new HtmlWebpackPlugin({
        title: '爱读首页',
        chunks: ['app'],
        // filename: 'index.html',
        template: 'build/index.html',
        inject: 'body'
      }),
      // new webpack.ProvidePlugin({
      //   $: 'jquery'
      // })
    ]
  }
}

module.exports = env => {
  let config = env === 'production'
    ? productionConfig
    : developmentConfig
  return merge(generateConfig(env), config)
}

