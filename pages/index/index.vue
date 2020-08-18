<template>
	<view>
	</view>

</template>

<style>
</style>


<script>
	import helper from '../../common/helper.js';
	import api_config from '../../api_config.js';
	var num;
	var usrName;
	export default {

		onLoad: function(options) {
			let that = this;
			let name = "code";
			//获得code
			that.GetCode(name);
			//获得token
			uni.request({
				url: api_config.wx_token,
				success: (res1) => {
					helper.token = res1.data.access_token;
					//获得UserId
					uni.request({
						url: api_config.wx_userid1 + helper.token + api_config.wx_userid2 + helper.usrCode,
						success: (res2) => {
							if (res2.data.UserId) {//企业成员登陆
								helper.usrId = res2.data.UserId;
								//获得用户信息
								uni.request({
									url: api_config.wx_userinfo1 + helper.token +
										api_config.wx_userinfo2 + helper.usrId,
									success: (res3) => {
										uni.setStorage({
											key: "wxuser_info",
											data: res3,
											success: function() {
												uni.redirectTo({
													url: 'home'
												})
											}
										});
									}
								})
							}
							else {//非企业成员的外部成员登陆
								uni.showModal({
									title: '抱歉！',
									content: '您不是企业成员，无权访问该应用。',
									confirmText: '确定',
									showCancel:false,
									success: res => {
										if (res.confirm) {
											uni.redirectTo({
												url: 'about'
											})
										}
									}
								})
							}
						},
					});
				},
			});
		},
		methods: {
			GetCode(name) {
				var str = location.href;
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
			},
		},

	}
</script>
