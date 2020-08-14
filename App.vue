<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
			// uni.clearStorage();
		},
		// onUnload:function(){
		// 	uni.clearStorage();
		// }
	};
</script>

<style>
	@import url("colorui/main.css");
	@import url("colorui/icon.css");

	@import url("colorui/animation.css");
	 @font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
</style>
