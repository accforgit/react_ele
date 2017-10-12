const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, './app/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: '/assets/'
  },
  resolve: {
    enforceExtension:false,
    extensions: ['.js', '.jsx'],
    alias: {
      'style': path.resolve(__dirname, 'app/static/css'),
      '@img': path.resolve(__dirname, 'app/static/img'),
      'util': path.resolve(__dirname, 'app/util'),
      '@config': path.resolve(__dirname, 'app/config'),
      '@fetch': path.resolve(__dirname, 'app/fetch'),
      'commonComponent': path.resolve(__dirname, 'app/components/Common')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /.svg$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      chunks: ['index'],
      template: __dirname + '/app/index.html'
    }),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:8080'
    }),
    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    // new webpack.DefinePlugin({
    //   __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV === 'dev') || 'false'))
    // }),

    // postcss
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => {
          return [
            require('autoprefixer')()
          ]
        }
      }
    }),

    // 抽离css
    new ExtractTextPlugin('[name].min.css')
  ],

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/api': {
        // 下面这个 target 的地址，如果直接写域名(例如 localhost)报错，那么就换成 ip
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true
      }
    },
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
}