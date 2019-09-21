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
var QcloudSms = require("qcloudsms_js");//腾讯云短信

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

// 设置发送手机验证码的回调函数
// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
	  console.log("err: ", err);
  } else {
	  console.log("request data: ", res.req);
	  console.log("response data: ", resData);
  }
}

var mycode;
var mynum;

// 生成验证码
function code(num){
	var birth='';
	var str='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	for(var i=0;i<4;i++){
		// 由于birth是字符串，所以会发生字符串拼接
		birth+=str[Math.floor(Math.random()*62)];
	}
	
	// 参数
	// 短信应用 SDK AppID
	var appid = 1400261139;  // SDK AppID 以1400开头
	// 短信应用 SDK AppKey
	var appkey = "c34b02f020fd72eee0f11eac6739546a";
	// 需要发送短信的手机号码
	var phoneNumbers = num;
	// 短信模板 ID，需要在短信控制台中申请
	var templateId = 425593;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
	// 签名
	var smsSign = "佛大导览";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
	// 实例化 QcloudSms
	var qcloudsms = QcloudSms(appid, appkey);
	
	var ssender = qcloudsms.SmsSingleSender();
	var params = [birth];
	ssender.sendWithParam("86", phoneNumbers, templateId, params, smsSign, "", "", callback);
	
	// 把生成的验证码保存到服务器了！
	mycode=birth;
	// 把号码保存到服务器
	mynum=num;
	return birth
}
// 接收表单数据，验证是否存在用户(不存在就创建)
function getverify(num, text){
	// console.log(mynum, mycode);
	// console.log(num, text);
	if(num==mynum && text==mycode){
		// 由于不存在实际的后端开发人员，所以就返回模拟数据
		return {nickname:'一叶',src:'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'};
	}
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
	  app.get('/api/validatecode',function(req,res){
		res.json({
			errno: 0,
			data: code(req.query.loginnum)
		})
	  });
	  app.get('/api/getverify', function(req,res){
		  res.json({
		  	errno: 0,
		  	data: getverify(req.query.number,req.query.text)
		  })
	  })
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
      inject: true,
	  favicon: path.resolve(__dirname, '../static/favicon.ico')
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
