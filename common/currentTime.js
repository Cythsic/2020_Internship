export function getTime(){
	let hh
	let slogan_ch='++';
	let date = new Date();
	hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
	// const minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
	// const seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
	
	if (hours < 11) {
		slogan_ch = "上午好！";
	} else if (hours >= 11 & hours < 14) {
		slogan_ch = "中午好！";
	} else if (hours >= 14 && hours < 18) {
		slogan_ch = "下午好！";
	} else {
		slogan_ch = "晚上好！";
	}
	console.log(slogan_ch);
	return slogan_ch;
}
