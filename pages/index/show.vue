<template>
	<view>
		<view class="cu-bar bg-black search">
			<!-- <view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg);"></view> -->
			<view class="content">
				员工助手
			</view>
		</view>
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
			</swiper-item>
		</swiper>
		

		<view class="solids-bottom padding-xs flex align-center">
			<view class="cu-avatar xl round touxiang" @tap="to_employees($event)" :data-section_yuangongid="section_data.section_yuangongid"
			 :style="{backgroundImage: 'url(' + section_data.section_touxiang +')'}"></view>
			<view class="flex-sub text-right">
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-left">工号：{{number}}
					</text>
				</view>
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-right">姓名：{{name}}</text>
				</view>
				<view class="solid-bottom text-lg padding">
					<text class="text-black text-right">部门：{{depart}}</text>
				</view>

			</view>
		</view>
		<br>
		<scroll-view class="page">
			<view class="cu-list grid no-border" :class="['col-3','no-border'] ">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, ],
				gridCol: 3,
				number: '00320360',
				name: 'test',
				depart: 'IS',
				section_data: {
					section_touxiang: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
				},
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
		}
	}
</script>

<style>
	.cu-avatar.xl {
		width: 200upx;
		height: 200upx;
		margin-left: 5%;
	}

	.box {
		/* margin: 20upx 0; */

	}

	.box view.cu-bar {
		/* margin-top: 20upx; */
		/* margin-bottom: -10px; */
	}

	.page {
		height: 30Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}
</style>
