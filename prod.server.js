var express=require('express');
var config=require('./config/index');

var port=process.env.PORT || config.build.port;
var app=express();
// 解决跨域问题,这个要放在最前面!!!
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Content-Length,Accept");
    next();
});
var router=express.Router();
function getdata(id,type){
	 return business[id-1][type];
}

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
		birth+=str[Math.floor(Math.random()*62)];
	}
	
	var appid = 1400261139;  // SDK AppID 以1400开头
	var appkey = "c34b02f020fd72eee0f11eac6739546a";
	var phoneNumbers = num;
	var templateId = 425593;  // NOTE: 这里的模板ID`7839`只是示例，真实的模板 ID 需要在短信控制台中申请
	var smsSign = "佛大导览";  // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
	var qcloudsms = QcloudSms(appid, appkey);
	
	var ssender = qcloudsms.SmsSingleSender();
	var params = [birth];
	ssender.sendWithParam("86", phoneNumbers, templateId, params, smsSign, "", "", callback);
	
	mycode=birth;
	mynum=num;
	return birth
}
// 接收表单数据，验证是否存在用户(不存在就创建)
function getverify(num, text){
	if(num==mynum && text==mycode){
		// 由于不存在实际的后端开发人员，所以就返回模拟数据
		return {nickname:'一叶',src:'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'};
	}
}


router.get('/',function(req,res,next){
	req.url='/index.html'
	next();
});


app.use(router);

var apiRouter=express.Router();
// 导入json文件
const appData = require('./data.json') //加载本地数据文件
const seller = appData.seller; //获取对应的本地数据
const goods = appData.goods; //获取对应的本地数据
const ratings = appData.ratings; //获取对应的本地数据
var business=appData.business;
apiRouter.get('/seller' ,function (req, res) {
	res.json({
	  errno: 0,  //错误数为0，有的数据错误数有限制
	  data: getdata(req.query.id,'seller')  //接口返回json数据，将上面定义的数据seller赋值给data，然后调用
	})
});
apiRouter.get('/goods' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: getdata(req.query.id,'goods') //接口返回json数据，将上面定义的数据goodsr赋值给data，然后调用
	})
});
apiRouter.get('/ratings' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: getdata(req.query.id,'ratings') //接口返回json数据，将上面定义的数据ratingsr赋值给data，然后调用
	})
});
apiRouter.get('/alls' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: appData.business  //接口返回json数据，将上面定义的数据ratingsr赋值给data，然后调用
	})
});
app.get('/validatecode',function(req,res){
	res.json({
		errno: 0,
		data: code(req.query.loginnum)
	})
});
app.get('/getverify', function(req,res){
  res.json({
	errno: 0,
	data: getverify(req.query.number,req.query.text)
  })
});
// 设置二级url地址，使用apiRouter的请求都自动加上api字符串
app.use('/api',apiRouter)	  

// 设置开始目录，也就是编译打包目录dist
app.use(express.static('./dist'))

// module.exports暴露成员方法，监听路由端口，在命令行界面返回结果
module.exports = app.listen(port,function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log('Listening in http://localhost:'+port+'\n')
})
