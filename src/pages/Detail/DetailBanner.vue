
<template>
	<div>
		<swiper :options="swiperOption"  ref="mySwiper" class="brandImg">
			<!-- 这部分放你要渲染的那些内容 -->
			<!-- <swiper-slide>1
			</swiper-slide>
            <swiper-slide>1
			</swiper-slide>
            <swiper-slide>1
			</swiper-slide> -->
			<swiper-slide v-for = "(slide, index) in brandImages" :key = "index">
				<img :src="slide.imgUrl" alt="" width="100%">
			</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../../../node_modules/swiper/dist/css/swiper.css'
// （如果你使用的是2.6.0以上的版本要自己手动去加载css）
import { swiper, swiperSlide } from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
export default {
  props: ['brandImages'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        // 是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        // notNextTick: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        autoplay: {
          // delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false // 触碰后自动切换也不会停止
        },
        loop: true
      },
      swiperSlides: ''
    }
  },
  // 定义这个sweiper对象
  computed: {
		    // swiper() {
		    //   return this.$refs.mySwiper.swiper;
		    // }
  },
  mounted () {
    // 这边就可以使用swiper这个对象去使用swiper官网中的那些方法
  }

}
</script>
<style lang="less" scoped>
@rem:50rem;
.brandImg{
    width:750/@rem;
    height:420/@rem;
    background:yellowgreen;
}
.swiper-pagination{
    text-align: right !important;
    color: #fff;
    font-size: 22px;
    height:30px;
}
</style>
