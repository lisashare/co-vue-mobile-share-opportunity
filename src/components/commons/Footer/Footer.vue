<template>
    <footer class="app-footer">
        <nav
            v-for='(footNav,index) of footNavs'
            :key="footNav.index"
            :class="[footNav.name,{on:index === activeIndex}]"
			@click="activeIndex=index"
			>
			<router-link :to="{name:footNav.name}">
                <img :src="index===activeIndex?footNav.iconSelect:footNav.icon">
                <span :class="['colorChange',{'on':index === activeIndex}]">{{footNav.title}}</span>
            </router-link>
			</nav>
    </footer>
</template>
<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      activeIndex: 0,
      footNavs: [{
        id: 0,
        title: '首页',
        name: 'home',
        icon: '../../../../static/images/footer/icon_brand_normal.png',
        iconSelect: '../../../../static/images/footer/icon_brand_hover.png'
      },
      {
        id: 1,
        title: '商机',
        name: 'opportunity',
        icon: '../../../../static/images/footer/icon_brand_normal.png',
        iconSelect: '../../../../static/images/footer/icon_brand_hover.png'
      },
      {
        id: 2,
        title: '消息',
        name: 'message',
        icon: '../../../../static/images/footer/icon_news_normal.png',
        iconSelect: '../../../../static/images/footer/icon_news_hover.png'
      },
      {
        id: 3,
        title: '我的',
        name: 'mine',
        icon: '../../../../static/images/footer/icon_mine_normal.png',
        iconSelect: '../../../../static/images/footer/icon_mine_hover.png'
      }]
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../stylesheets/particles/_base.less';
.app-footer{
	display: flex;
	position: fixed;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	height: 80px;
	background: #cccccc;
	width: 100%;
	nav{
		width:25%;
		text-align: center;
		a{
			display: block;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
		}
		img{
			width: 30px;
			height: 30px;
		}
		span{
			font-size:16px;
			color:black;
		}
		.on{
			color: red;
		}
	}
}
</style>
