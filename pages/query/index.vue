<template>
	<view>
		<view class="body">
			<view>
				<navigator url="../index/home">
					<uni-nav-bar left-icon="back" left-text="返回" title="查询结果" fixed="true" backgroundColor="#3761b0" color="white"
					 class="navbar"></uni-nav-bar>
				</navigator>
			</view>
			<form @submit="formSubmit">
				<view class="margin-top">
					<view class="cu-form-group">
						<view class="title">姓名</view>
						<input placeholder="请输入你的姓名" name="name" type="text" disabled="true" :value="usrName"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">工号</view>
						<input placeholder="请输入你的工号" name="number" type="text" disabled="true" :value="num"></input>
					</view>
				</view>
				<view class="margin-top">
					<view class="cu-form-group">
						<view class="title">查询班次</view>
						<picker @change="pickerChange" :value="index" :range="picker" name="duty">
							<view class="picker">
								{{index>-1?picker[index]:'选择查询班次'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">开始日期</view>
						<picker mode="date" :value="date1" name="startDate" @change="DateChange1">
							<view class="picker">
								{{date1}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">截止日期</view>
						<picker mode="date" :value="date2" name="endDate" @change="DateChange2">
							<view class="picker">
								{{date2}}
							</view>
						</picker>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-qywx margin-tb-sm lg" form-type="submit" @click="naviToQuery" id="submit_btn">查询</button>
					</view>
				</view>
			</form>
		</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/basics' + [PageCur=='basics'?'_cur':''] + '.png'"></image>
				</view>
		
				<view :class="PageCur=='basics'?'text-green':'text-gray'">首页</view>
		
			</view>
		
			<view class="action" @click="NavChange" data-cur="about">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/about' + [PageCur == 'about'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='about'?'text-green':'text-gray'">我的</view>
			</view>
		</view>
		

	</view>
</template>

<script>
	var corpid = 'wx9320d37828f8e3fc';
	var secrete = 'Y_JZZKnBrp3hiUoUC-SA7hBU0C-IvS1abbys2QuA3w0';
	var token;
	var usrId;
	var usrCode;
	var num;
	var usrName;
	//var list;
	export default {
		data() {
			return {
				picker: ['未选择', '上班', '下班'],
				index: -1,
				date1: "请选择",
				date2: "请选择",
				usrName: '',
				num: '',
				PageCur: '',
			}
		},

		methods: {
			pickerChange(e) {
				this.index = e.detail.value
			},
			DateChange1(e) {
				this.date1 = e.detail.value
			},
			DateChange2(e) {
				this.date2 = e.detail.value
			},
			naviToQuery() {
				uni.navigateTo({
					url: "queryresult"
				})
			},
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur;
				uni.navigateTo({
					url: '../index/home'
				})
			},
			onLoad: function(options) {
				let that=this;
				uni.getStorage({
					key:"wxuser_info",
					success: (res) => {
						that.usrName=res.data.data.name;
						usrName=res.data.data.name;
						that.num=res.data.data.extattr.attrs[0].value;
						num=res.data.data.extattr.attrs[0].value;
					},
					fail: (res) => {
						uni.showToast({
							title:"fail:"+JSON.stringify(res)
						})
					}
				});
			},
			formSubmit: function(e) {
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
				var formdata = e.detail.value;
				uni.navigateTo({
					url: './queryresult?&number='+num+'&duty=' + formdata.duty + '&startDate=' + formdata.startDate +
						'&endDate=' + formdata.endDate,
				})
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.content {
		padding: 10px;
	}
	
	
</style>
