export function JSDate(mydate, format){
	// RegExp会把字符串转换为/ /格式
	var regYear=new RegExp('y+');
	if(regYear.test(format)){
		// substr(4-regYear.length)的原因是2019,19等区别
		format=format.replace(regYear, (mydate.getFullYear()+'')).substr(4-regYear.length)
	}
	let o={
		'M+':mydate.getMonth()+1,
		'd+':mydate.getDate(),
		'h+':mydate.getHours(),
		'm+':mydate.getMinutes(),
		's+':mydate.getSeconds()
	}
	for(let k in o){
		let f=new RegExp(`${k}`);
		if(f.test(format)){
			let w=o[k]+"";
			format=format.replace(f, f.length===2?w:padLength(w))
		}
	}
	return format;
}
// 补零
function padLength(w){
	return ('00'+w).substr(w.length)
}