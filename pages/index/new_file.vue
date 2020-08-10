<template>
</template>

<script>
	import helper from '../../common/helper.js';
	var corpid = 'wx9320d37828f8e3fc';
	var secrete = 'Y_JZZKnBrp3hiUoUC-SA7hBU0C-IvS1abbys2QuA3w0';
	var num;
	var usrName;

	export default {
		data() {
			return {

			};
		},
		onLoad: function(options) {
			helper.usrCode = options.code;
			console.log("code:"+options.code)
			//获取access_token
			uni.request({
				url: 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + secrete,
				method: 'GET',
				success: function(res1) {
					helper.token = res1.data.access_token;
					console.log(helper.token)
					//获取用户userid
					uni.request({
						url: 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=' + helper.token + '&code=' +
							helper.usrCode,
						method: 'GET',
						success: function(res2) {
							helper.usrId = res2.data.UserId;
							//获取用户信息
							uni.request({
								url: 'https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=' + helper.token + '&userid='+helper.usrId,
								method: 'GET',
								success: function(res3) {
									console.log(res3);
									// uni.setStorage({
									// 	key: "number",
									// 	data: res3.data.extattr.attrs[0].value,
									// });
									uni.setStorage({
										key: "wxuser_info",
										data: res3,
										success: () => {
											console.log("Success!")
											console.log(helper.usrCode)
										},
									});

								}
							});
						}
					});
				}
			});

		},
	}
</script>

<style>
</style>
