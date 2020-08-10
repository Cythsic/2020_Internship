// 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
export default {
	// 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
	setCurrentPageData: function(list, curPage, pageSize) {
		var  curPageData=[];
		let begin = (curPage - 1) * pageSize;
		let end = curPage * pageSize;
		curPageData = list.slice(begin, end);
		return curPageData;
	},
}
