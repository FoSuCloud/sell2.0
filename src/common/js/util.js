/* 
 解析url参数
 @example ?id=12345&a=b
 @return Object {id:12345,a:b}
 */

export function urlParse(url){
	let reg=new RegExp(/[?&][^?&]+=[^?&]+/g);
	//分别对应 ?  id = 12345
	let arr=url.match(reg);
	// [?id=12345,&a=b]
	let obj={}
	if(arr){
		arr.forEach((item) => {
			let temp=item.substr(1).split('=')
			// ['id','12345']
			// obj[decodeURIComponent(temp[0])]=decodeURIComponent(temp[1]);
			obj[temp[0]]=temp[1];
		})
	}
	return obj;
}

// localStorage 存储
export function saveToLocal(id, key, value){
	// 开辟命名空间
	let seller=window.localStorage.__seller__;
	// 刚开辟seller命名空间时，建立seller对象
	if(!seller){
		seller={};
	}
	
	
	// 解析为JSON格式(此时的seller是取自localStorge的，是字符串格式，但是下面的代码是针对JSON格式的，所以先转为JSON格式)
	seller=JSON.parse(seller);
	// console.log(seller)
	// 还不存在seller['22'],seller['2424']这些其他id时，创建该id
	if(!seller[id]){
		seller[id]={};
		// seller {id:{}}
	}
	// 存在/不存在该id,要添加键,或者要修改键的值
	seller[id][key]=[value]
	// seller {id:{key:value}}

	// 存储字符串的值
	localStorage.__seller__=JSON.stringify(seller)
	// console.log(localStorage)
	// __seller__: "{"12345":{"favorite":["true"]}}"
}

export function loadFromLocal(id, key, def){
	let seller=window.localStorage.__seller__;
	// 如果不存在命名空间
	if(!seller){
		return def;
	}
	seller=JSON.parse(seller);
	// 不存在想读取的id时就返回默认值
	if(!seller[id]){
		return def;
	}
	let value=seller[id][key];
	// 返回的是一个数组对象，我们需要只取第一个值
	// console.log(value[0])
	// 如果存在键就返回想要的值
	return value[0]||def;
}