<template>
	<view class="content">
		<swiper
			class="Flow-content"
			:circular="true"
			:autoplay="true"
			interval="3000"
			duration="500"
			previous-margin="16"
			next-margin="16">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<view class="Flow">
					<image class="Flowimg" :src="item.picAddress" @tap="navigo(item.linkAddress)"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- <view class="">
			<button  @tap="lunbo" >测试轮播</button>
		</view> -->
		<!-- 热销保险 -->
		<view class="hotsell">
			<view class="hotsellTitle">
				<image class="hotsellimg" :src="btnimageURL" mode=""></image>
				<text class="hotsellTitletext">热销保险</text>
			</view>
			<view class="insure">
				<view class="insureContent" v-for="(item,index) in insureTypelist" :class="[insureTypelist.length == 4 || insureTypelist.length == 8 ? 'active' : 'otheractive']" @tap="goProductlist(item.code)" :key="index">
					<image class="insureImg" :src="insureTypelistimg[index].img" mode=""></image>
					<text>{{item.codeName}}</text>
				</view>
			</view>
		</view>
		<!-- 热门推荐 -->
		<view class="hotRecommend">
			<view class="hotRecommendTitle">
				<image class="hotRecommendimg" :src="btnimageURL" mode=""></image>
				<text class="hotRecommendTitletext">热门推荐</text>
			</view>
			<view class="hotRecommendContent" v-for="(item,index) in hotRecommendlist" :key="index">
				<view class="hotRecommendTitleimg">
					<image :src="item.userID" mode="" class="hotRecommendTitleImg"></image>
				</view>
				<view class="hotRecommendProduct">
					<view class="Productcontent">
						<text>{{item.userName}}</text>
						<text>{{item.workShift}}</text>
					</view>
					<view class="ProductcontentRight">
						<view class="ProductcontentRightimg" :style="{backgroundImage: 'url('+ProductcontentRightimg+')'}">
							<text>热卖</text>
						</view>
						<view class="ProductcontentRightprice">
							<text>元/年</text><text class="price">{{item.workDate}}</text>
						</view>
					</view>
				</view>
				<view class="lineContent">
					<text>------------------------------------------</text>
				</view>
			</view>
			<text class="loading-text">
				{{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
			</text>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue" 
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	var _self,
	page = 1;
	export default {
		components: {uniSwiperDot,uniLoadMore},
		data() {
			return {
				news:[],
				swiperList: [],
				swiperList1:[],
				current: 0,
				mode: 'long',
				hotSellimageURL:'../../static/cjkz.png',
				btnimageURL:'../../static/logo.png',
				insureTypelist:[],
				insureTypelistimg:[
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
					{img:'../../static/tabbar/about.png'},
				],
				hotRecommendlist:[],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				ProductcontentRightimg:'../../static/tabbar/component.png',
				memberOperateimg:'../../static/tabbar/basics.png',
				procuratorimg:'../../static/tabbar/plugin.png',
				headImg:'../../static/tabbar/about_cur.png',
				procuratorIconBgimg:'../../static/tabbar/component_cur.png',
				procuratorIconimg:'../../static/tabbar/basics_cur.png',
				output:'../../static/sib-list/iconRefreshed.png',
				outputimg:'../../static/sib-list/totop.png',
				outputvalue:true
			}
		},
		onLoad() {
			// 轮播图数据
			uni.request({
				url:'地址',
				method:'GET',
				dataType:'json',
				data:{
					"ident":1,
					"platform":1
				},
				success: (res) => {
					var Data = res.data;
					this.swiperList = Data.data;
				}
			})
			// 产品列表数据默认加载	
			_self = this;
			this.getNewsList();
			// 热销保险数据加载
			uni.request({
				url:'地址',
				method:'GET',
				success:(res)=> {
					console.log(res.data);
					var Data = res.data;
					this.insureTypelist = Data.data;
				}
			})
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getNewsList();
		},
		// 上拉加载
		onReachBottom: function() {
			page++;//每触底一次 page +1
			// console.log(_self.hotRecommendlist.length);
			if (_self.loadingType != 0) {//loadingType!=0;直接返回
				return false;
			}
			_self.loadingType = 1;
			// console.log(page);
			uni.showNavigationBarLoading();//显示加载动画
			uni.request({
				url:'地址',
				method:'POST',
				data:{
					"trandate":1534730538050,
					"requestinfo":{
						"riskkind": "", 
						"hot": "Y", 
						"iscommend":"",
						"productname":"",
						"suppliername":"",
						"channeltype":"",
						"ispublish":"Y",
						"productcode":"",
						"start_date":"",
						"end_date":"",
						"pageno":page,    //页码，整数大于0，必填
						"pagesize":1 //每页显示条数，整数大于0必填
					}
				},
				success: function(res) {
					if (_self.hotRecommendlist.length==res.data.data.totalcount) {//没有数据
						_self.loadingType = 2;
						uni.hideNavigationBarLoading();//关闭加载动画
						return false;
					}
					for(var i=_self.hotRecommendlist.length;i<res.data.data.totalcount;i++){
						_self.hotRecommendlist = _self.hotRecommendlist.concat(res.data.data.response[i-1]);//将数据拼接在一起
					}
					_self.loadingType = 0;//将loadingType归0重置
					uni.hideNavigationBarLoading();//关闭加载动画
					
				}
			});
		},
		methods: {
			// 产品列表数据
			getNewsList: function() {//第一次回去数据
				_self.loadingType = 0;
				uni.showNavigationBarLoading();
				uni.request({
					url: '地址',
					method:'POST',
					data:{
						"trandate":1534730538050,
						"requestinfo":{
							"riskkind": "", 
							"hot": "Y", 
							"iscommend":"",
							"productname":"",
							"suppliername":"",
							"channeltype":"",
							"ispublish":"Y",
							"productcode":"",
							"start_date":"",
							"end_date":"",
							"pageno":1,    //页码，整数大于0，必填
							"pagesize":1  //每页显示条数，整数大于0必填
						}
					},
					success: function(res) {
						console.log(res.data)
						_self.hotRecommendlist = res.data;
						if(res.data.data.totalcount==res.data.data.response.length){
							uni.showToast({
								title: '已是最新',
								duration: 2000
							});
						}
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();//得到数据后停止下拉刷新
					}
				});
				
			},
			// 跳转超链接
			navigo(linkaddress){
				console.log(linkaddress)
				var navData = linkaddress;
				uni.navigateTo({
					url:'linkAddress?index='+navData
				})
			},
			toProcurator(){
				uni.navigateTo({
					url: '../procurator/procurator',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			lunbo(e){
				uni.navigateTo({
					url: '../text/1'
				});
			},
			change(e) {
				this.current = e.detail.current;
			},
			OutputView(){
				this.outputvalue = false;
			},
			goProductlist(index){
				uni.navigateTo({
					url: '../productlist/productlist?type='+index
				});
			}
		},
		computed:{
			activemargin:function(){
				if(this.swiperList.length == 4){
					return{
						active:true
					}
				}
			}
		}
	}
</script>

<style>
	.uni-media-list-body{height: auto;}
	.uni-media-list-text-top{line-height: 1.6em;}
	.Video{width: 100%;border-bottom: 1px solid #09BB07;}
	.Video p{text-align: center;font-size: 1.6em;}
	.content{background: #F5F7FA;}
	.Flow-content{width: 100%;height: 454upx;background: linear-gradient(to bottom, #C30F23 , #DF5D4E);position: relative;}
	.Flow{width: 662upx;height: 394upx;	position: relative;top: 6upx;left: 12upx;}
	.Flow .Flowimg{width: 100%;height: 100%;}
	.hotsell{width: 720upx;position: relative;left: 15upx;top: -42upx;background: #fff;border-radius:18upx;overflow: hidden;}
	.hotsellTitle,.hotRecommendTitle{overflow: hidden;position: relative;height: 96upx;}
	.hotsellTitle .hotsellimg,.hotRecommendTitle .hotRecommendimg{display: inline-block;position: relative;top: 40upx;left: 60upx;width: 10upx;height:24upx;}
	.hotsellTitletext,.hotRecommendTitletext{font-size: 32upx;color: #C30F23;position: relative;left: 88upx;top: 36upx;font-weight: 600;}
	/* 热销保险 */
	.insure{position: relative;display: inline-block;padding-bottom: 40upx;}
	.insureContent{width: 80upx;position: relative;top: 28upx;bottom: 28upx;display: inline-block;}
	.insureContent .insureImg{width:80upx;height: 80upx;float: left;}
	.insureContent text{font-size: 24upx;line-height: 24upx;width: 80upx;text-align: center;float: left;display: inline-block;}
	.active{margin: 0 50upx;}
	.otheractive{margin: 0 80upx;}
	/* 热门推荐 */
	.hotRecommend{width: 720upx;left:15upx;position: relative;top: -18upx;background: #fff;border-radius:18upx;padding-bottom: 40upx;}
	.hotRecommendTitleimg{width: 690upx;height: 344upx;left: 15upx;position: relative;}
	.hotRecommendTitleImg{width: 100%;height: 100%;}
	.hotRecommendContent{padding-bottom: 28upx;}
	.hotRecommendProduct{width: 690upx;height: 192upx;left: 15upx;position: relative;}
	.Productcontent{display: inline-block;width:390upx;height: 192upx;position: relative;left: 15upx}
	.Productcontent text:first-child{font-size: 32upx;height: 32upx;line-height: 32upx;width: 350upx;overflow: hidden;text-overflow: ellipsis; white-space:nowrap;display:block;color: #777777;margin: 16upx 0 0 45upx;font-weight:600;}
	.Productcontent text:last-child{font-size: 24upx;width: 340upx;line-height: 32upx;height:100upx;text-overflow: ellipsis; word-break: break-word;white-space:normal;overflow: hidden;display:block;color: #BBBBBB;margin: 20upx 0 0 45upx;}
	.ProductcontentRight{display: inline-block;width:300upx;height: 192upx;float: right;}
	.ProductcontentRightimg{width: 118upx;height: 40upx;margin: 10upx 18upx 0 0;float: right;}
	.ProductcontentRightimg text{font-size: 32upx;height: 40upx;color: #fff;line-height: 40upx;width: 118upx;text-align: center;display: inline-block;float: right;}
	.ProductcontentRightprice{width: 240upx;height: 32upx;float: right;margin-top: 74upx;}
	.ProductcontentRightprice text{font-size: 32upx;height: 32upx;text-align: right;float: right;line-height: 32upx;}
	.price{color: #C30F23;}
	/* 分界线 */
	.lineContent{height:40upx;width: 100%;text-align: center;}
	.lineContent text{font-weight: 600;line-height: 40upx;height: 40upx;color: #eeeeee;}
	/* 加载 */
	.loading-text{
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
