<template>
    <div class="home-list">
        <div :class="[isShow ? 'masked':'']"></div>
        <mescroll ref="mescroll" :upCallback="upCallback"  warpId="index_scroll" id="index_scroll">
            <ul class="info content" ref="content">
                <list-box v-for = "(list,index) in listBrandByTags" :key = "index" :brandId = 'list.brandId' :list = "list">
                </list-box>
            </ul>
        </mescroll>
    </div>
</template>

<script>
import bus from '@/modules/bus'

import mescroll from '@/components/commons/mescroll/Mescroll.vue' /* 分页组件 */
import ListBox from './HomeList'
export default {
  name: 'HomeListBox',
  components: {mescroll, ListBox},
  data () {
    return {
      isShow: false,
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
      listBrandByTags: []
    }
  },
  methods: {
    upCallback (page) {
      let {info} = this
      info.pageNum = page.num
      info.pageSize = page.size
      this.$http.post('/kd/mobile/brand/listBrandByTags2', info).then((res) => {
        this.listBrandByTags = this.listBrandByTags.concat(res.data.data.list)
        this.$refs.mescroll.endSuccess(res.data.data.list.length)
      }).catch((error) => {
        this.$refs.mescroll.endErr()
      })
    },
    show(){
        this.isShow = !this.isShow
        if(this.isShow){
            document.getElementsByTagName("body")[0].className="overHidden";
        }else{
            document.getElementsByTagName("body")[0].className="";
        } 
    }
  },
  mounted(){
       bus.$on('black',this.show)
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
<style lang="less">
@rem:50rem;

.masked {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.55;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
}



.home-list{
    position: relative;
}
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
