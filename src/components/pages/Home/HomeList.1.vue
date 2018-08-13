<template>
    <div class="home-list content">
        <!-- <ul class="info"
        v-infinite-scroll = "loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="20"> -->
        <ul class="info">
            <router-link
            v-for = "(list,index) in listBrandByTags" :key = "index"
            :to = "{name:'detail',query:{brandId:list.brandId}}"
            tag = "li">
                <dl>
                    <dt class="infoImg">
                        <img :src="list.brandLogo">
                        <div class="type">
                           <h3 class="title">{{list.brandName}}</h3>
                           <span>|</span>
                           <p class="sub-title">{{list.mainPoint}}</p>
                        </div>
                    </dt>
                    <dd>
                        <div class="core-feature">
                            <b>核心特色 ： </b>{{list.coreFeatures}}
                        </div>
                    </dd>
                    <dd>
                        <div class="icon tipbox">
                            <p class="fl">总部{{list.location}}</p>
                            <p class="fl" v-for="tag in list.tagList" :key="tag">{{tag}}</p>
                            <div class="fr">
                                <i class="iconfont icon-icon_pinglun"></i>
                                <span class="ulev-2" style="padding-left:0.3em;float: right;">4</span>
                            </div>
                        </div>
                    </dd>
                </dl>
            </router-link>
        </ul>
        <!-- <p class="page-infinite-loading" v-show="!queryLoading">
            <span>
                <mt-spinner style="width: 28px; height: 28px;" type="fading-circle" :size="30" ></mt-spinner>正在加载
            </span>
             <span v-if="!allLoaded">正在加载</span>
            <span v-show="allLoaded">已全部加载</span>
        </p> -->
         <p class="page-infinite-loading">
            <mt-spinner type="fading-circle" size="24"></mt-spinner>正在加载...
            <!-- <span v-if="!allLoaded">正在加载</span> -->
            <!-- <span v-show="allLoaded">已全部加载</span> -->
        </p>
    </div>
</template>

<script>
export default {
  name: 'HomeList',
  data () {
    return {
      info: {
        attentionSort: '',
        investment: '',
        list: [
          {
            'classifyCode': 'BRAND_CATEGORY',
            'tagList': []
          }],
        pageNum: 1,
        pageSize: 10,
        regionTagId: '',
        shopArea: ''
      },
      listBrandByTags: [],
      showLoading: true, // 是否显示 loading 图标
      tip: '正在加载', // 提示文字，如果没有显示图标也没有显示文字，则显示点
      loading: true, // 是否正在加载的开关
      hasMore: true, // 是否拥有更多的开关
      queryLoading: false,
      allLoaded: false
    }
  },
  methods: {
    getListBrandByTags () {
      let {info} = this
      // 开始请求，无限滚动被触发 底部提示
      this.loading = true
      this.$http.post('/kd/mobile/brand/listBrandByTags2', info).then((res) => {
        this.listBrandByTags = this.listBrandByTags.concat(res.data.data.list)
        console.log(res.data.data)
        // 请求结束
        this.loading = false
        console.log(res.data.data.pages)
        let {pages, pageNum} = res.data.data // 从数据中取出当前数据，一共的数据
        if (pages - pageNum <= 0) { // 没有更多数据的时候，没有更多
          this.hasMore = false
          return false
        }
        // 如果还有更多的数据，页面++
        info.pageNum++
      })
    },
    loadMore () {
      // 如果没有更多了，提示
      if (!this.hasMore) {
        this.loading = true
        this.showLoading = false
        this.tip = '已全部加载完毕'
        return false
      }
      this.getListBrandByTags()
    }
  },

  created () {
    this.getListBrandByTags()
  }
//     watch : { //监听
//     type:{
//         immediate:true,
//         handler(val){
//         //切换类型后的操作
//         this.page = 1;
//         this.films = [];
//         this.hasMore = true;
//         this.loading = false;
//         this.getFilms();  //这里执行请求一次数据，还没回来，页面上判断没有，就又执行一次
//         }
//       }
//   }
}
</script>
<style lang="less" scoped>
@rem:50rem;
.page-infinite-loading {
    text-align: center;

 div{display: inline-block;
    vertical-align: top;

 }
    span{
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
    }
}
.info {
    position: relative;
    color:#666666;
    li{
        overflow: hidden;
        margin-top: 30/@rem;
        padding: 0 20/@rem 20/@rem;
    }
    .infoImg{
        position: relative;
        width: 100%;
        height: auto;
        border-radius: 5px;
        overflow: hidden;
        img{
            width:100%;
            height:288/@rem;
        }
        .type{
            position: absolute;
            left:0;
            bottom:0;
            width:100%;
            height: 64/@rem;
            background:rgba(0, 0, 0, .8);
            color:#ffffff;
            display: flex;
            align-items: center;
            .title{
                padding-left: 30/@rem;
                font-size: 30/@rem;
                line-height: 30/@rem;
                font-weight: 700;
            }
            span{
                display: block;
                margin-left:10px;
                margin-right:10px;
                font-size:0;
                width:1px;
                height:20px;
                background: #D5D5D5;
            }
            .sub-title{
                font-size: 28/@rem;
                line-height:28/@rem;
            }
        }

    }
}
.core-feature{
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
   b{
        font-weight: 700;
    }
}
.tipbox{
    width:100%;
    color:#999999;
    clear:both;
    overflow: hidden;
    p{
        font-size: 12px;
        border-radius: 3px;
        border:1px solid #bbbaba;
        color:#999;
        padding:2px;
        line-height:15px;
        text-align: center;
        float:left;
        overflow: hidden;
        margin-right:3px;
    }
    div{
        float:right;
    }
}
</style>
