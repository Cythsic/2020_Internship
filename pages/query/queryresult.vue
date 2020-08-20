<template>
	<view class="bg-white">
		<view>
			<navigator url="./index">
				<uni-nav-bar left-icon="back" left-text="返回" title="查询结果" fixed="true" backgroundColor="#3761b0" color="white"
				 class="navbar"></uni-nav-bar>
			</navigator>
		</view>
		<view class="result">
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item" :class="menuArrow?'arrow':''" v-for="(item,index) in QueryResultList" :key='index'>
					<view class="content">
						<view>
							<text class="text-grey text-bold">{{item.userName}}({{item.userID.slice(2)}})</text>
						</view>
						<text class="text-grey text-sm">{{item.workShift}}</text>
					</view>
					<view class="action">
						<view>
							<text class="text-grey text-bold">{{item.workDate}}</text>
						</view>
						<text class="text-grey text-bold">{{item.workTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
			</view>

			<view class="action" data-cur="about">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/about' + [PageCur == 'about'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">我的</view>
			</view>
		</view>

	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import api_config from '../../api_config.js';
	var _self, page = 1;
	var len = 0;
	var num;
	var startDate;
	var endDate;
	var duty;
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				key: 0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				QueryResultList: [],
				totalPage: 1, // 统共页数，默认为1
				currentPage: 1, //当前页数 ，默认为1
				pageSize: 10, // 每页显示数量
				PageCur: '',
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				modalName: null,
			};
		},
		onLoad: function(options) {
			_self = this;
			var formd=uni.getStorageSync('formdata')
			num = formd.number;
			startDate = formd.startDate;
			endDate = formd.endDate;
			duty = formd.duty;
			console.log(duty)
			console.log("Start:"+startDate)
			console.log("End:"+endDate)
			// console.log("Duty:"+formd.duty)
			// console.log("startdate:"+startDate)
			// if(startDate=='请选择'){
			// 	startDate=_self.GetTime(6);
			// }
			// if(endDate=='请选择'){
			// 	endDate=_self.GetTime(-1);
			// }
			// console.log(num)
			// console.log(startDate)
			let url=api_config.check_attendence1 + num + api_config.check_attendence2 + startDate + api_config.check_attendence3 +
					endDate + api_config.check_attendence4 + duty;
			
			uni.request({
				url: api_config.check_attendence1 + num + api_config.check_attendence2 + startDate + api_config.check_attendence3 +
					endDate + api_config.check_attendence4 + duty,
				method: 'GET',
				success: function(res) {
					console.log(res.data)
					_self.QueryResultList = res.data.slice(0, 10);
					uni.setStorageSync('resList',res.data);
				},
			});
		},

		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				uni.navigateTo({
					url: '../index/home'
				})
			},
			// 产品列表数据
			getNewsList: function(pages, list) { //第一次回去数据
				_self = this;
				_self.loadingType = 0;
				uni.showNavigationBarLoading();
				//let begin = (page - 1) * _self.pageSize;
				let end = page * _self.pageSize;
				_self.QueryResultList = list.slice(0, end);
			},
			// 上拉加载
			onReachBottom: function() {
				page++; //每触底一次 page +1
				// console.log(_self.QueryResultList.length);
				if (_self.loadingType != 0) { //loadingType!=0;直接返回
					return false;
				}
				_self.loadingType = 1;
				// console.log(page);
				uni.showNavigationBarLoading(); //显示加载动画
				// uni.request({
				// 	url: api_config.check_attendence1 + num + api_config.check_attendence2 + startDate + api_config.check_attendence3 +
				// 	endDate,
				// 	method: 'GET',
				// 	success: function(res) {
					var tempList=[];
					tempList=uni.getStorageSync('resList');
						let n;
						let len = 0;
						for (n in tempList) {
							if (tempList.hasOwnProperty(n)) {
								len++;
							}
						}
						var temp = Math.ceil(len / _self.pageSize);
						if (temp != null)
							_self.totalPage = temp;
						console.log(_self.totalPage);
						// 计算得0时设置为1
						_self.totalPage = _self.totalPage == 0 ? 1 : _self.totalPage;
						if (page > temp) { //没有数据
							_self.loadingType = 2;
							uni.showToast({
								title: '没有更多内容了',
								duration: 2000
							});
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						} else {
							_self.getNewsList(page, tempList);
						}
						_self.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
				// 	},
				// });
			},

		}


	}
</script>
<style scoped>
	/* .cu-list.menu {
		height: 80%;
		width: 100%;
		margin-top: 60px;
	} */

	#title {
		padding: 10px;
	}

	.navbar {
		width: 100%;
	}

	.box {
		margin: 20upx 0;
	}

	.cu-bar {
		/* padding: 17px; */
		position: fixed;
		width: 100%;
	}
	
	.result{
		padding-bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
	}
</style>
