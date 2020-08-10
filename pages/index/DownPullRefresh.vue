<template>
	<view>x
		<div class="padding bg-white">
			<div id="table" class="flex flex-wrap">
				<table cellpadding="0" cellspacing="0" class="basis-xs margin-xs padding-sm radius">
					<thead>
						<tr>
							<th style="width: 5px;">工号</th>
							<th style="width: 200px;">姓名</th>
							<th style="width: 200px;">班次</th>
							<th>打卡日期</th>
							<th style="width: 5px;">打卡时间</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in currentPageData" :key='index'>
							<td>{{item.userID}}</td>
							<td>{{item.userName}}</td>
							<td>{{item.workShift}}</td>
							<td>{{item.workDate}}</td>
							<td>{{item.workTime}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<span style="text-align: center; margin-left: 90%;">{{currentPage}}/{{totalPage}}</span>
			<br><br>
			<button class="cu-btn bg-red margin-tb-sm lg" style="align-items: center; margin-left: 16%;" @click="navBack">返回</button>
			<button class="cu-btn bg-white margin-tb-sm lg" style="align-items: center; margin-left: 16%;" @click="refresh">刷新</button>
			<uni-load-more :status="loadingStatus" @clickLoadMore="LoadMore"></uni-load-more>
			<!-- </div> -->
			<!-- </div> -->
			<hr>
			<br>
			<view class="list" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
				<!-- ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn" 此三个必须写 -->
				<sib-list ref="sibList" @isRefresh='isRefresh' @scrolltolowerFn="scrolltolowerFn">
					<!-- 内部block可自定义 -->
					<block class="" slot="sibScrollList">
						<view class="" v-for="(item, index) in list" :key="index">
							<view class="" style="height: 100px;">{{item}}
							</view>
							</view>
					</block>
				</sib-list>
			</view>

		</div>
	</view>
</template>

<script>
	import helper from '../../common/helper.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import sibList from '@/components/sib-list/sib-list.vue';
	var duty;
	var len = 0;
	var arr = [];
	// var temp = 0; //当前在结果列表中的位置
	export default {
		name: "tables1",
		comments: {
			uniLoadMore,
			sibList
		},
		data() {
			return {
				key: 0,
				newsList: [],
				totalPage: 1, // 统共页数，默认为1
				currentPage: 1, //当前页数 ，默认为1
				pageSize: 10, // 每页显示数量
				currentPageData: [], //当前页显示内容
				loadingStatus: "more",
			}
		},

		onLoad: function(options) {
			let that = this;
			if (options.duty == 1) {
				duty = "上班";
			} else if (options.duty == 2) {
				duty = "下班";
			} else
				duty = null;

			//调用数据库接口获得查询结果
			uni.request({
				//url: 'http://www.suitdo.cn/api/login/getattendance?userid=' + options.number + '&startdtime=' +
				//	options.startDate + '&enddtime=' + options.endDate, //数据库接口，代入参数查询
				//url: 'http://www.suitdo.cn/api/login/getattendance?userid=00075043&startdtime=2020-7-1&enddtime=2020-7-20', //数据库接口
				url: 'http://www.suitdo.cn/api/login/getattendance',
				method: 'GET',
				data: {
					userid: '00075043',
					startdtime: '2020-7-1',
					enddtime: '2020-7-20',
				},
				success: function(res_post) {
					that.$data.newsList = res_post.data;
					var n;
					for (n in res_post.data) {
						if (res_post.data.hasOwnProperty(n)) {
							len++;
						}
					}
					//console.log(len);
					// 计算一共有几页
					var temp = Math.ceil(len / that.$data.pageSize);
					if (temp != null)
						that.$data.totalPage = temp;

					// 计算得0时设置为1
					that.$data.totalPage = that.$data.totalPage == 0 ? 1 : that.$data.totalPage;
					console.log(that.$data.totalPage);
					that.$data.currentPageData = res_post.data.slice(0, 10);
				},
				fail: function(res_post) {
					console.log("失败:" + res_post);
				},
			});
		},

		onPullDownRefresh() {
			let that = this;
			console.log(this.$data.totalPage);
			console.log(that.$data.newsList);
			if (that.$data.currentPage < that.$data.totalPage) {
				that.$data.currentPage++;
			} else uni.stopPullDownRefresh();
			let begin = (that.$data.currentPage - 1) * that.$data.pageSize;
			let end = that.$data.currentPage * that.$data.pageSize;
			that.$data.currentPageData = that.$data.newsList.slice(begin, end);

		},

		methods: {
			//返回主页面
			navBack() {
				uni.navigateTo({
					url: './query'
				});
				len = 0;
			},
			refresh() {
				uni.startPullDownRefresh(); //下拉刷新
			},
			LoadMore() {
				uni.startPullDownRefresh();
			}
		},
		touchstart: function(e) {
			this.$refs.sibList.refreshStart(e);
		},
		touchmove: function(e) {
			this.$refs.sibList.refreshMove(e);
		},
		touchend: function(e) {
			this.$refs.sibList.refreshEnd(e);
		},
		isRefresh: function() {
			const _this = this
			setTimeout(() => {
				uni.showToast({
					icon: 'success',
					title: '刷新成功,数据恢复初始值'
				})
				const defaultData = [
					'初始数据1', '初始数据2', '初始数据3', '初始数据4',
					'初始数据5', '初始数据6'
				]
				_this.list = defaultData
				// 刷新结束调用
				this.$refs.sibList.endAfter()
			}, 1000)
		},
		scrolltolowerFn: function() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			// 模拟请求
			const _this = this
			setTimeout(() => {
				// 请求成功
				const newData = [
					'新数据1', '新数据2', '新数据3', '新数据4'
				]
				_this.list = _this.list.concat(newData)
				console.log(_this.list)
				uni.hideLoading()
			}, 1000)
		}

	}
</script>
<style scoped>
	#table table {
		width: 90%;
		font-size: 14px;
		border: 2px solid #e2e0e4;
		margin-left: 7%;
		margin-right: 5%;
	}

	#table {
		padding: 0px 10px;
		margin-top: 50px;
		margin-left: 7%;
		margin-right: 20px;
		width: 100%;

	}

	table thead th {
		background: #8b0000;
		padding: 15px;
		text-align: center;
		color: white;
	}

	table tbody td {
		padding: 10px;
		text-align: center;
		border-bottom: 1px solid #eee;
		border-right: 1px solid #eee;
	}

	table tbody td span {
		margin: 0 10px;
		cursor: pointer;
	}


	input {
		border: 1px solid #ccc;
		padding: 5px;
		border-radius: 3px;
		margin-right: 15px;
	}

	button {
		background: #840000;
		border: 0;
		padding: 4px 15px;
		border-radius: 3px;
		width: 90%;
		/* height: 60px; */
		/* margin-left: 10%;
		margin-right: 10%; */
		color: #fff;
	}

	span {
		padding: 15px 20px;
		border-radius: 3px;
		margin-left: 10px;
		margin-right: 10px;
	}

	#mask {
		background: rgba(0, 0, 0, .5);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 4;
		top: 0;
		left: 0;
	}

	.mask {
		width: 300px;
		height: 250px;
		background: rgba(255, 255, 255, 1);
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 47;
		border-radius: 5px;
	}

	.title {
		padding: 10px;
		border-bottom: 1px solid #eee;
	}

	.title span {
		float: right;
		cursor: pointer;
	}

	.content {
		padding: 10px;
	}

	.content input {
		width: 270px;
		margin-bottom: 15px;
	}
</style>
