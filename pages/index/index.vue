<template>
	<view class="body">
		<view id="top-bg">
			<view class="info-all">
				<view id="touxiang" class="cu-avatar xl round" :style="{backgroundImage: 'url(' + portrait +')'}"></view>
				<view class="info-details">
					<h1 class="text-white" id="en_font">Welcome!</h1>
					<!-- <text class="text-white" style="font-size: small;" id="ch_font">code：{{code}}</text> -->
					<text class="text-white" style="font-size: small;" id="ch_font">姓名：{{usrName}}</text>
					<text class="text-white" style="font-size: small;" id="ch_font"> 工号:{{num}}</text>
					<!-- <text class="text-white" style="font-size: small;" id="ch_font">当前地址：{{local_path}}</text> -->
				</view>
			</view>
			<view class="application">
				<view class="cu-list grid no-border col-3" id="grid1">
					<view class="cu-item">
						<navigator url="../query/index">
							<view class="cuIcon-search text-green"></view>
							<text>打卡查询</text>
						</navigator>
					</view>
					<view class="cu-item">
						<navigator url="">
							<view class="cuIcon-taxi text-black"></view>
							<text>交通</text>
						</navigator>
					</view>
					<view class="cu-item">
						<view class="cuIcon-favor text-orange"></view>
						<text>收藏</text>
					</view>
					<view class="cu-item">
						<view class="cuIcon-mail text-cyan"></view>
						<text>邮件</text>
					</view>
					<view class="cu-item">
						<view class="cuIcon-edit text-pink"></view>
						<text>调查问卷</text>
					</view>
					<view class="cu-item">
						<view class="cuIcon-radiobox text-brown"></view>
						<text>其他</text>
					</view>
				</view>
			</view>


			<br>
			<view class="list-content">
				<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
					<view class="cu-item " :class="menuArrow?'arrow':''">
						<button class="cu-btn content " open-type="contact">
							<navigator url="index">
								<text class="cuIcon-circlefill text-grey"></text>
								<text class="text_list text-grey"> 通知公告</text>
							</navigator>
						</button>
					</view>
					<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
						<view class="cu-item" :class="menuArrow?'arrow':''">
							<button class="cu-btn content" open-type="contact">
								<navigator url="index">
									<text class="cuIcon-ellipse text-blue"></text>
									<text class="text_list text-grey">考试中心</text>
								</navigator>
							</button>
						</view>
						<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
							<view class="cu-item" :class="menuArrow?'arrow':''">
								<button class="cu-btn content" open-type="contact">
									<navigator url="index">
										<text class="cuIcon-btn text-olive"></text>
										<text class="text_list text-grey">备忘录</text>
									</navigator>
								</button>
							</view>
							<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
								<view class="cu-item" :class="menuArrow?'arrow':''">
									<button class="cu-btn content" open-type="contact">
										<navigator url="index">
											<text class="cuIcon-discoverfill text-orange"></text>
											<text class="text_list text-grey"> 工会活动</text>
										</navigator>
									</button>
								</view>
								<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
									<view class="cu-item" :class="menuArrow?'arrow':''">
										<button class="cu-btn content" open-type="contact">
											<navigator url="index">
												<text class="cuIcon-emojiflashfill text-pink"></text>
												<text class="text-grey">头像组</text>
											</navigator>
										</button>
									</view>
								</view>
							</view>
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

				<view class="action" @click="NavChange" data-cur="plugin">
					<view class='cuIcon-cu-image'>
						<image :src="'/static/tabbar/plugin' + [PageCur == 'plugin'?'_cur':''] + '.png'"></image>
					</view>
					<view :class="PageCur=='plugin'?'text-green':'text-gray'">我的</view>
				</view>
			</view>

		</view>
	</view>
</template>

<style>
	.body.show {
		overflow: hidden;
		height: 100%;
	}

	.text_list {
		font-size: 17px;
	}

	#top-bg {
		background-color: #3761b0;
		height: 200px;
		width: 100%;
	}

	.info-all {
		display: flex;
		flex-direction: row;
	}

	#touxiang {
		margin-top: 30px;
		margin-left: 10%;
	}

	.info-details {
		display: flex;
		flex-direction: column;
		margin-top: 7%;
		margin-left: 5%;
	}

	.application {
		display: flexbox;
		width: 95%;
		margin: auto;
		margin-top: 10%;
	}

	.list-content {
		margin-bottom: calc(100upx + env(safe-area-inset-bottom) / 2);
	}

	#grid1 {
		border-radius: 10%;
	}

	.bar-bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 1000;
	}

	#ch_font {
		font-family: "微软雅黑", "黑体", "宋体";
	}

	#en_font {
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
		font-style: oblique;
	}
</style>


<script>
	import helper from '../../common/helper.js';
	var corpid = 'wx9320d37828f8e3fc';
	var secrete = 'Y_JZZKnBrp3hiUoUC-SA7hBU0C-IvS1abbys2QuA3w0';
	var num;
	var usrName;
	export default {
		data() {
			return {
				portrait: '',
				num: '',
				usrName: '',
				PageCur: 'basics',
				menuBorder: false,
				menuArrow: true,
				menuCard: false,
				code: '',
				local_path: '',
				txt: '',
				token: '',
				usrid: ''
			};
		},

		onLoad: function(options) {
			let that = this;
			var name;
			var str = 'www.baidu.com?code=23456';
			//var str=location.href;
			var num = str.indexOf("?")
			let param = "code";
			str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
			var arr = str.split("&"); //各个参数放到数组里
			for (var i = 0; i < arr.length; i++) {
				num = arr[i].indexOf("=");
				if (num > 0) {
					name = arr[i].substring(0, num);
					if (name == param) {
						helper.usrCode = arr[i].substr(num + 1);
					}
				}
			}
			that.local_path = str;
			that.code = helper.usrCode;
			uni.getStorage({
				key: 'wxuser_info',
				success: (res) => {
					that.$data.usrName = res.data.data.name;
					that.$data.num = res.data.data.extattr.attrs[0].value;
					that.$data.portrait = res.data.data.avatar;
				},
				fail: () => {
					uni.request({
						url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wx9320d37828f8e3fc&corpsecret=Y_JZZKnBrp3hiUoUC-SA7hBU0C-IvS1abbys2QuA3w0',
						success: (res1) => {
							helper.token = res1.data.access_token;
							that.token = helper.token;
							console.log("success:" + JSON.stringify(res1));
							uni.showToast({
								title: "success:" + JSON.stringify(res1)
							});
							uni.request({
								url: 'https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=' + helper.token + '&userid=TengdaZhu',
								success: (res2) => {
									console.log(res2)
									that.$data.usrName = res2.data.name;
									that.$data.num = res2.data.extattr.attrs[0].value;
									that.$data.portrait = res2.data.avatar;
									uni.setStorage({
										key: "wxuser_info",
										data: res2
									});
									uni.getStorage({
										key: 'wxuser_info',
										success: (res) => {
											that.$data.usrName = res.data.data.name;
											that.$data.num = res.data.data.extattr.attrs[0].value;
											that.$data.portrait = res.data.data.avatar;
										}

									});
								},
								fail: (res1) => {
									that.token = res1;
									console.log("fail:" + JSON.stringify(res1));
									uni.showToast({
										title: "fail:" + JSON.stringify(res1)
									})
								}
							});
						}
					});
					// uni.getStorage({
					// 	key:'code',
					// 	success:function(res){
					// 		that.code=res.data;
					// 	}
					// });

				},
			});
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				uni.navigateTo({
					url: '../index/index'
				})
			},
		}
	}
</script>
