<template>
<div class="content home-list-box">
    <!-- 导航 -->
    <div class="nav-box" id="navBox">
        <div class="nav-bar" :class="searchBarFixed == true ? 'isFixed' :''">
          <div class="nav-items" 
            v-for="navItem in navItems" 
            :key="navItem.id"
            @click="show(navItem.id)"
          >
              <div class="nav-item">
                  <span>{{navItem.title}}</span>
                  <i :class="['fa fa-angle-'+ (navItem.isUpShow ? 'up':'down')]"></i>
              </div>
              <div v-if="navItem.line" class='height'></div>
          </div>
            <!-- <div class="nav-items"  @click = "show">
                <div class="nav-item">
                    <span>餐饮分类</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class='height'></div>
            </div>
            <div class="nav-items" @click = "show">
                <div class="nav-item">
                    <span>投资金额</span>
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class='height'></div>
            </div>
            <div class="nav-items" @click = "show">
                <div class="nav-item">
                    <span>其他条件</span>
                    <i class="fa fa-angle-down"></i>
                </div>
            </div> -->
        </div>

        <div class="menu">
          <!-- 餐饮分类 -->
          <div class="classify">
              <ul>
                <li><span class="change">全部</span></li>
                <li class="foodCode"><span>中餐</span></li>
                <li class="foodCode"><span>西餐</span></li>
                <li class="foodCode"><span>饮品</span></li>
                <li class="foodCode"><span>小吃</span></li>
                <li class="foodCode"><span>甜品</span></li>
                <li class="foodCode"><span>烘焙</span></li>
                <li class="foodCode"><span>火锅</span></li>
                <li class="foodCode"><span>烧烤</span></li>
                <li class="foodCode"><span>面食</span></li>
                <li class="foodCode"><span>其他</span></li>
              </ul>
              <div class="buttons-box">
                <div class="reset">重置</div>
                <div class="complete">完成</div>
              </div>
          </div>
          <!-- 投资金额 -->
          <div class="amount kdhidden">
            <div class="moneys">
              <h3>投资金额</h3>
              <ul class="ub ub-pc ub-ac">
                <li class="unlimited">不限</li>
                <li class="six">6万</li>
                <li class="fiveth">15万</li>
                <li class="twenty">20万</li>
                <li class="thirty">30万</li>
                <li class="fifty">50万</li>
                <li class="bai">100万</li>
                <li class="baishang">100万以上</li>
              </ul>
            </div>
            <input type="range" value="0" class="range" min="0" max="100" step="1">
            <div class="xian"></div>
             <div class="value"></div>
            <div class="buttons ub ub-ac ub-pc">
               <div class="moneyComplete">完成</div>
            </div>
          </div>
          <!-- 其他条件 -->
          <div class="attention kdhidden">
            <div class="attenTab">
              <ul class="tab ub ub-ac ub-pc">
                <li class="changes">考察区域</li>
                <li class="">开店面积</li>
              </ul>
            </div>
            <ul class="attentArea">
                <li class="allCode tabCode moneyChages">全部</li>
                <li class="tabCode">北京</li>
                <li class="tabCode">上海</li>
                <li class="tabCode">深圳</li>
                <li class="tabCode">成都</li>
            </ul>
            <div class="attent unhide">
              <ul class="ub ub-pc ub-ac">
                <li class="attUnlimited">不限</li>
                <li class="five">15平以下</li>
                <li class="fivetheen">15平</li>
                <li class="third">30平</li>
                <li class="fif">50平</li>
                <li class="eig">80平</li>
                <li class="two">120平</li>
                <li class="twobaishang">120平以上</li>
              </ul>
              <input type="range" value="0" class="range2" min="0" max="100" step="1">
              <div class="xian1"></div>
               <!-- <div class="value"></div> -->
              <div class="buttons ub ub-ac ub-pc">
                <div class="attentComplete">完成</div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!-- 商品列表 -->
    <div class="home-list">
        <div :class="[isShow ? 'masked':'']"></div>
        <mescroll ref="mescroll" :upCallback="upCallback"  warpId="index_scroll" id="index_scroll">
            <ul class="info content" ref="content">
                <list-box v-for = "(list,index) in listBrandByTags" :key = "index" :brandId = 'list.brandId' :list = "list">
                </list-box>
            </ul>
        </mescroll>
    </div>
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
      searchBarFixed: false,
      showfilterindex: null,  //显示哪个筛选类目
      navBarIsShow: false,
      navItems:[
        {id:1,title:'餐饮分类',icon:'up',isUpShow:false,line:true},
        {id:2,title:'投资金额',icon:'up',isUpShow:false,line:true},
        {id:3,title:'其他条件',icon:'up',isUpShow:false,line:false}
      ],
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
      handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      var offsetTop = document.querySelector('#navBox').offsetTop - document.querySelector('#search').clientHeight - 1
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    show(id){
      // 控制遮罩
      bus.$emit('black')
      this.navBarIsShow = true
      this.showfilterindex = id
      console.log(this.showfilterindex)
    },
 
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
    // bus.$on('black',this.show)

    window.addEventListener('scroll', this.handleScroll)
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

// 导航部分
.home-list-box{
    position: relative;
}
*{
  box-sizing: border-box;
}
.menu{
  position:absolute;
  width: 100%;
  top: 86/@rem;
  left: 0;
  z-index: 9999;
}
.classify{ 
    // text-align: center;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 9999;
    padding-bottom: 26/@rem;
    border-top: 1px solid #e1e1e1;
    ul{
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 26/@rem; 
        
        display: flex;
        flex-wrap: wrap;
        li{
          width: 20%;
          padding: 26/@rem 15/@rem 0;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            display: block;
            width: 112/@rem;
            height: 52/@rem;
            text-align: center;
            line-height: 52/@rem;
            border-radius: 3px;
            background: #f5f5f5;
             &.change {
                color: #35aeb6;
                background: #ebfefd !important;
            }
          }
         
        }
    }
    .buttons-box{
      margin-top: 26/@rem;
      padding: 0 26/@rem;
      font-size: 30/@rem;
      display: flex;
      justify-content: space-around;
      div{
        width: 43%;
        // width: 326/@rem;
        height: 100/@rem;
        text-align: center;
        line-height: 100/@rem;
        border: 1px solid #e1e1e1;
        color: #333;
        border-radius: 3px;
      }
    }
}
.complete {
    background: #35aeb6;
    color: #ffffff!important;
}
.classify ul{
    color: #333;
    font-size: 26/@rem;
    overflow-y: scroll;
}

.nav-box{
  position: relative;
  z-index: 999;
  background-color:#ffffff;
  height: 96/@rem;
  .isFixed{
    position:fixed;
    top:84/@rem;
    left: 0;
    right: 0;
    z-index:999;
  }
  .nav-bar {
    background-color:#ffffff;
    width:100%;
    height: 96/@rem;
    line-height: 96/@rem;
    display: flex;
    border-top: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    .nav-items {
      font-size: 30/@rem;
      text-align: center;
      flex: 1;
      position: relative;
      i {
        font-size: 32/@rem;
        padding-left: 5px;
        color: #999999;
      }
    }
  }
}

.height {
    width: 1px;
    height: 1.8em;
    background: #e1e1e1;
    position: absolute;
    top: 50%;
    margin-top: -0.9em;
    right: 0;
}
</style>
