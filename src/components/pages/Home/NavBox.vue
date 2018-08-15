<template>
    <div class="nav-box" id="navBox">
        <div class="nav-bar" :class="searchBarFixed == true ? 'isFixed' :''">
          <div class="nav-items" 
            v-for="navItem in navItems" 
            :key="navItem.id"
            @click="show"
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
</template>
<script>
import bus from '@/modules/bus'
export default {
  name: 'NavBox',
  data () {
    return {
      searchBarFixed: false,
      navBarIsShow: false,
      navItems:[
        {id:1,title:'餐饮分类',icon:'up',isUpShow:false,line:true},
        {id:2,title:'投资金额',icon:'up',isUpShow:false,line:true},
        {id:3,title:'其他条件',icon:'up',isUpShow:false,line:false}
      ]
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
    show(){
     
      this.navBarIsShow = true
      // 控制遮罩
      bus.$emit('black') 
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
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
