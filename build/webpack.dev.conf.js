'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// mock模拟后台数据
// 导入模板
const express=require('express')

const app=express()
// 导入json文件
const appData = require('../data.json') //加载本地数据文件
var business=appData.business;

function getdata(id,type){
	 // console.log(business[id-1])
	 // console.log(business[id-1][type])
	 // 注意:对于数组对象来说 对象.属性 =对象['属性字符串']，我们输入的是字符串，所以需要 对象['属性字符串']这种方法
	 return business[id-1][type];
}

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
		// '192.168.1.103' ||
    host: '10.201.252.158' || HOST || config.dev.host,
    port:  PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
		// 注意:这里的地址是http://localhost:8080/api/ratings 这样的，没有 # # # !!!
		before(app) {
			app.get('/api/alls',function(req,res){
				res.json({
					errno:0,
					data:business
				});
			});
      app.get('/api/seller' ,function (req, res) {
        res.json({
          errno: 0,  //错误数为0，有的数据错误数有限制
          data: getdata(req.query.id,'seller')  //接口返回json数据，将上面定义的数据seller赋值给data，然后调用
        })
      });
      app.get('/api/goods' ,function (req, res) {
        res.json({
          errno: 0,
          data: getdata(req.query.id,'goods')   //接口返回json数据，将上面定义的数据goods赋值给data，然后调用
        })
      });
      app.get('/api/ratings' ,function (req, res) {
        res.json({
          errno: 0,
          data: getdata(req.query.id,'ratings')   //接口返回json数据，将上面定义的数据ratings赋值给data，然后调用
        })
      });
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
