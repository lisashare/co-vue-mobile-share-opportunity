<template>
    <div class="banner-y">

        <swiper :options="swiperOption" class="swiperY">
            <swiper-slide class="swiper" v-for = "(list,index) in swiper.list" :key = "index">
                <a href="http://static.kuaidao.cn/brand/nQbW6wX7HZ.jpg" data-size="1600x1600" data-med="http://static.kuaidao.cn/brand/nQbW6wX7HZ.jpg" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main swiper-slide zhuda swiper-slide-active" style="width: 168.5px; margin-right: 20px;">
                    <img width="100%" height="100%" :src="list.coverdUrl" alt="">
                    <p><img width="100%" src="/static/images/branddetail/bofang.png" alt=""></p>
                </a>
            </swiper-slide>
        </swiper>
<!--图片放大-->

        <!-- <div class="pswp pswp--supports-fs pswp--open pswp--touch pswp--css_animation pswp--svg pswp--visible pswp--animated-in" tabindex="-1" role="dialog" aria-hidden="false" style="position: fixed;">
            <div class="pswp__bg" style="opacity: 1;"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container" style="transform: translate3d(-2100px, 0px, 0px);">
                    <div class="pswp__item" style="display: block; transform: translate3d(2100px, 0px, 0px);"><div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img class="pswp__img" src="http://static.kuaidao.cn/brand/5nZbYfnmcd.jpg" style="opacity: 1; width: 375px; height: 375px;"></div></div>
                    <div class="pswp__item" style="transform: translate3d(2520px, 0px, 0px);"><div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img class="pswp__img" src="http://static.kuaidao.cn/brand/BSEWZ3ZPfS.jpg" style="opacity: 1; width: 375px; height: 375px;"></div></div>
                    <div class="pswp__item" style="display: block; transform: translate3d(1680px, 0px, 0px);"><div class="pswp__zoom-wrap" style="transform: translate3d(0px, 146px, 0px) scale(1);"><img class="pswp__img" src="http://static.kuaidao.cn/brand/64EZr5wara.jpg" style="opacity: 1; width: 375px; height: 375px;"></div></div>
                </div>
                <div class="pswp__ui">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter">3 / 5</div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader">
                            <div class="pswp__preloader__icn">
                              <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                        <div class="pswp__share-tooltip"></div>
                    </div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div class="pswp__caption">
                        <div class="pswp__caption__center">主打产品图3</div>
                    </div>
                  </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import Vue from 'vue'
/* vue-awesome-swiper */
import VueAwesomeSwiper from 'vue-awesome-swiper' // 调用插件
import { swiper, swiperSlide, swiperPlugins } from 'vue-awesome-swiper'
import '../../../node_modules/swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
export default {
  name: 'BannerY',
  props: ['swiper'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 22,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        onSlideChangeEnd: swiper => {
		            	// 这个位置放swiper的回调方法
		            	this.page = swiper.realIndex + 1
		            	this.index = swiper.realIndex
        },
        on: {
          tap: function (event) {
            alert('你碰了Swiper')
          }
        }
        //         onImagesReady: function(swiper){
        //         var param33={};
        //         param33.brandId=brandId;
        //         param33.pageNum=1;
        //         param33.pageSize=productshowObj.total;
        //         param33.busiType=3;
        //         $.ajax({
        //           url:'/mobile/share/listBrandImage',
        //           type:'POST',
        //           dataType:'json',
        //           data:JSON.stringify(param33),
        //           contentType:'application/json',
        //           success:function(data){
        //            // console.log(data)
        //             var data=data.data.list;
        //             var productLi='';
        //             for(var i=10;i<data.length;i++){
        //                if(data[i].imgUrl == ''){
        //                   data[i].imgUrl = 'img/产品展示图.png'
        //                 }else{
        //                   data[i].imgUrl = data[i].imgUrl;
        //                 }
        //               productLi +='<a href="'+data[i].imgUrl+'" data-size="1600x1600" data-med="'+data[i].imgUrl+'" data-med-size="1024x1024" data-author="Folkert Gorter" class="demo-gallery__img--main swiper-slide liveAction"><img src="'+data[i].imgUrl+'" alt="" /><figure>'+data[i].name+'</figure></a>'
        //             }
        //             var length=$('.mendianImg .swiper-slide').size();
        //             if(productshowObj.total == length){

        //             }else{
        //               swiper.appendSlide(productLi);
        //             }
        //           }
        //         })
        // }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
.swiper{
    width: 340/@rem;
    background: #dd0;
    border-radius: 5px;
    // margin-right: 22/@rem;
    height: 200/@rem;
    overflow: hidden;
    position: relative;
}
.swiperY{
    margin: 40/@rem 0;
    padding: 0 24/@rem;
    height: 200/@rem;
    // background-image:url();
    a{
        display: inline-block;
        width: 340/@rem;
        border-radius: 5px;
        margin-right: 22/@rem;
        overflow: hidden;
    }
    p{
        width: 72/@rem;
        height:72/@rem;
        position:absolute;
        left: 50%;
        top: 50%;
        -webkit-transform:translate3d(-50%,-50%,0);
        -ms-transform: translate3d(-50%,-50%,0);
        transform:translate3d(-50%,-50%,0);
    }
}
</style>
