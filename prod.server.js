var express=require('express');
var config=require('./config/index');

var port=process.env.PORT || config.build.port;

var app=express();

var router=express.Router();

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

apiRouter.get('/seller' ,function (req, res) {
	res.json({
	  errno: 0,  //错误数为0，有的数据错误数有限制
	  data: seller  //接口返回json数据，将上面定义的数据seller赋值给data，然后调用
	})
});
apiRouter.get('/goods' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: goods  //接口返回json数据，将上面定义的数据goodsr赋值给data，然后调用
	})
});
apiRouter.get('/ratings' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: ratings  //接口返回json数据，将上面定义的数据ratingsr赋值给data，然后调用
	})
});
apiRouter.get('/all' ,function (req, res) {
	res.json({
	  errno: 0,
	  data: appData  //接口返回json数据，将上面定义的数据ratingsr赋值给data，然后调用
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
