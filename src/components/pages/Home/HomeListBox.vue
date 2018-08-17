<template>
    <div class="home-list" id="nav">
        <div class="nav-box">
        <div class="nav-bar" :class="searchBarFixed == true ? 'isFixed' :''">
          <div :class = "['nav-items',showfilterindex === navItem.id ? ' changecolor':'']"
            v-for="navItem in navItems" 
            :key="navItem.id"
            @click="setFilterPanel(navItem.id)"
          >
              <div class="nav-item">
                  <span>{{navItem.title}}</span>
                  <i :class="['fa fa-angle-'+ (showfilterindex === navItem.id ? 'up':'down')]"></i>
              </div>
              <div v-if="navItem.line" class='height'></div>
          </div>
        </div>

        <div class="menu" v-if="showfilter">
          <!-- 餐饮分类 -->
          <div class="classify" v-if="showfilterindex==1">
              <ul>
                <li 
                v-for="item in filterdata.cates" 
                :key="item.id"
                @click="setCateIndex(item.id)"
                :data_id = "item.data_id"
                ><span :class="[item.isChange ? 'change':'']">{{item.typename}}</span></li>
              </ul>
              <div class="buttons-box">
                <div class="reset" @click.stop = "reset">重置</div>
                <div class="complete" @click.stop="setFoodIndex">完成</div>
              </div>
          </div>
          <!-- 投资金额 -->
          <div class="amount" v-if="showfilterindex==2">
            <div class="moneys">
              <h3>投资金额</h3>
              <ul>
                <li 
                  v-for="money in filterdata.moneys" 
                  :key="money.id"
                  :class="[money.isChange ? 'changecolor':'']"
                  >{{money.money}}</li>
                <!-- <li class="unlimited">不限</li>
                <li class="six">6万</li>
                <li class="fiveth">15万</li>
                <li class="twenty">20万</li>
                <li class="thirty">30万</li>
                <li class="fifty">50万</li>
                <li class="bai">100万</li>
                <li class="baishang">100万以上</li> -->
              </ul>
              <div class="rang">
                <input type="range" class="range" min="0" max="100" step="1" 
                 @input = "changeProcess()"  
                 v-model="processPoint"
                :style="'background-size:'+ processPoint +'% 100%'"
                >
                <div class="xian"></div>
              </div>
              <div class="complete" @click="setInvestIndex">完成</div>
            </div>
            
          </div>
          <!-- 其他条件 -->
          <div class="attention" v-if="showfilterindex==3">
             <div class="attenTab">
              <ul class="tab">
                <li :class="[activeShowType===other.type?'change':'']" 
                v-for="other in filterdata.others"
                :key="other.id"
                @click="condition(other.type)">{{other.title}}</li>
              </ul>
            </div>
            <ul class="attentArea" v-if="activeShowType=='regionTag'">
                <li :class="[activeShowGeo === area.id?'changecolor':'']" 
                v-for="area in filterdata.attentArea" 
                :key="area.id" data_id = "area.data_id"
                @click="setGeoIndex(area.id,area.data_id)">{{area.areaname}}</li>
            </ul>  
            <div class="attent" v-if="activeShowType =='shopArea'">
              <ul>
                <li 
                v-for="item in filterdata.arearule" 
                :key="item.id"
                :class="[item.isChange ? 'changecolor':'']"
                >{{item.area}}</li>
                <!-- <li class="attUnlimited">不限</li>
                <li class="five">15平以下</li>
                <li class="fivetheen">15平</li>
                <li class="third">30平</li>
                <li class="fif">50平</li>
                <li class="eig">80平</li>
                <li class="two">120平</li>
                <li class="twobaishang">120平以上</li> -->
              </ul>
              <div class="rang2">
                <input type="range" class="range" min="0" max="100" step="1" 
                 @input = "changeAreaProcess()"  
                 v-model="areaPoint"
                :style="'background-size:'+ areaPoint +'% 100%'"
                >
                <div class="xian"></div>
              </div> 
              
              <div class="complete" @click="setAreaIndex">完成</div>
            </div>
          </div>
        </div>
      </div>
        <!-- 遮罩 -->
        <div :class="[showfilterindex ? 'masked':'']" @click="hideFilter"></div>
        <mescroll ref="mescroll" :upCallback="upCallback"  warpId="index_scroll" id="index_scroll">
            <ul class="info content" ref="content">
                 <list-box 
                  v-for = "(list,index) in listBrandByTags" 
                  :key = "index" 
                  :list = "list">
                </list-box> 
            </ul>
        </mescroll>
        <!-- <div class="empty" v-else>
          <img width="100%" src="/static/images/empty/bg_Norecommendation.png" alt="">
        </div> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import bus from '@/modules/bus'

import mescroll from '@/components/commons/mescroll/Mescroll.vue' /* 分页组件 */
import ListBox from './HomeList'
import { EHOSTUNREACH } from 'constants';
export default {
  name: 'HomeListBox',
  components: {mescroll, ListBox},
  data () {
    return {
      searchBarFixed: false,
      
      navItems:[
        {id:1,title:'餐饮分类',icon:'up',line:true},
        {id:2,title:'投资金额',icon:'up',line:true},
        {id:3,title:'其他条件',icon:'up',line:false}
      ],
      filterdata: {
        cates:[
            {id:0,typename:'全部',isChange:true,data_id:''},
            {id:1,typename:'中餐',isChange:false,data_id:'a1eaba595c0311e7b5f600163e065533'},
            {id:2,typename:'西餐',isChange:false,data_id:'0738fd415c2b11e7a4bf00163e06ebbc'},
            {id:3,typename:'饮品',isChange:false,data_id:'848536ab32f04ebda6ef6f9cd1ea96e2'},
            {id:4,typename:'小吃',isChange:false,data_id:'8120fbe5611245c1a6aa7ae01dfc6b6f'},
            {id:5,typename:'甜品',isChange:false,data_id:'073943bc5c2b11e7a4bf00163e06ebbc'},
            {id:6,typename:'烘焙',isChange:false,data_id:'073823245c2b11e7a4bf00163e06ebbc'},
            {id:7,typename:'火锅',isChange:false,data_id:'07398a5a5c2b11e7a4bf00163e06ebbc'},
            {id:8,typename:'烧烤',isChange:false,data_id:'073a41c75c2b11e7a4bf00163e06ebbc'},
            {id:9,typename:'面食',isChange:false,data_id:'0739fc755c2b11e7a4bf00163e06ebbc'},
            {id:10,typename:'其他',isChange:false,data_id:'073a882b5c2b11e7a4bf00163e06ebbc'}
          ],
          moneys:[
            {id:1,money:'不限',num:'0',isChange:false},
            {id:2,money:'6万',num:'9',isChange:false},
            {id:3,money:'15万',num:'23',isChange:false},
            {id:4,money:'20万',num:'37',isChange:false},
            {id:5,money:'30万',num:'51',isChange:false},
            {id:6,money:'50万',num:'65',isChange:false},
            {id:7,money:'100万',num:'79',isChange:false},
            {id:8,money:'100万以上',num:'100',isChange:false},
            ],
          others:[         
            {id:1,title:'考察区域',type:'regionTag'},
            {id:2,title:'开店面积',type:'shopArea'},
          ],
          attentArea:[
            {id:1,areaname:'全部',data_id:''},
            {id:2,areaname:'北京',data_id:'4e4ac2f932494fa79b4335bb8e8f2be0'},
            {id:3,areaname:'上海',data_id:'ea6a4d46832a421b9d11e7056192374d'},
            {id:4,areaname:'深圳',data_id:'e66ce59f74054f2594c92ac2955bc0c4'},
            {id:5,areaname:'成都',data_id:'00b5456988624d9ba4f6767f9234ee82'},
          ],
          arearule:[
            {id:1,area:'不限',num:'0',isChange:false},
            {id:2,area:'15平以下',num:'0',isChange:false},
            {id:3,area:'15平',num:'0',isChange:false},
            {id:4,area:'30平',num:'0',isChange:false},
            {id:5,area:'50平',num:'0',isChange:false},
            {id:6,area:'80平',num:'0',isChange:false},
            {id:7,area:'120平',num:'0',isChange:false},
            {id:8,area:'120平以上',num:'0',isChange:false},
          ]
      },         
      activeShowType:'regionTag',  //筛选条件数据
      activeShowGeo:1,
      // isSelectShow:false,     //关键数据：控制按钮切换模式
      showfilterindex: null,  //显示哪个筛选类目
      showfilter: false,      //是否显示下拉筛选
      // cateindex: 0,           //分类索引
      // typeid: null,           //分类id
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
      processPoint: 0,
      areaPoint: 0,
    }
  },
   // 计算属性
  computed: {
    filterfoods(){
      let foodId = this.filterdata.cates.filter(item=>{
        return item.isChange ? item.data_id : false
      })
      let list = [];
      for(let i = 0;i < foodId.length;i++){
        list.push(foodId[i].data_id)
      }
      return list;
    },
    filterarea() {
      if(this.areaPoint == 0){  
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
      }else if( this.areaPoint < 6){  
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[1].isChange = true
      }else if(this.areaPoint >= 8 && this.areaPoint < 21){
         this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[1].isChange = true;
        this.filterdata.arearule[2].isChange = true;
        
      }else if(this.areaPoint >=23 && this.areaPoint < 35 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[2].isChange = true;
        this.filterdata.arearule[3].isChange = true;
      }else if(this.areaPoint >=39 && this.areaPoint < 46 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[3].isChange = true;
        this.filterdata.arearule[4].isChange = true;
      }else if(this.areaPoint >=54 && this.areaPoint < 62 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[4].isChange = true;
        this.filterdata.arearule[5].isChange = true;
      }else if(this.areaPoint >=64 && this.areaPoint < 76 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[5].isChange = true;
        this.filterdata.arearule[6].isChange = true;
      }else if(this.areaPoint >=95 && this.areaPoint < 100 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[6].isChange = true;
        this.filterdata.arearule[7].isChange = true;
      }else if(this.areaPoint >= 100 ){
        this.filterdata.arearule.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.arearule[7].isChange = true;
      }
    },
    filterinvestment() {            // 投资金额
      if(this.processPoint == 0){  
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
      }else if( this.processPoint < 6){  
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[1].isChange = true
      }else if(this.processPoint >= 8 && this.processPoint < 21){
         this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[1].isChange = true;
        this.filterdata.moneys[2].isChange = true;
        
      }else if(this.processPoint >=23 && this.processPoint < 35 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[2].isChange = true;
        this.filterdata.moneys[3].isChange = true;
      }else if(this.processPoint >=39 && this.processPoint < 46 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[3].isChange = true;
        this.filterdata.moneys[4].isChange = true;
      }else if(this.processPoint >=54 && this.processPoint < 62 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[4].isChange = true;
        this.filterdata.moneys[5].isChange = true;
      }else if(this.processPoint >=64 && this.processPoint < 76 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[5].isChange = true;
        this.filterdata.moneys[6].isChange = true;
      }else if(this.processPoint >=95 && this.processPoint < 100 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[6].isChange = true;
        this.filterdata.moneys[7].isChange = true;
      }else if(this.processPoint >= 100 ){
        this.filterdata.moneys.forEach(item=>{
          return item.isChange = false
        })
        this.filterdata.moneys[7].isChange = true;
      }
    }
  },
  methods: {
    upCallback (page) {
      let {info} = this
      info.pageNum = page ? page.num : 1
      info.pageSize = page ? page.size : 10
      this.$http.post('/kd/mobile/brand/listBrandByTags2', info).then((res) => {
  
        this.listBrandByTags = this.listBrandByTags.concat(res.data.data.list)

        this.$refs.mescroll.endSuccess(res.data.data.list.length)
      }).catch((error) => {
        this.$refs.mescroll.endErr()
      })
    },
    // 其他条件内部的选项卡
    condition(type) {
      this.activeShowType = type;
    },
    // 区域选择的请求
    setGeoIndex(id, data_id){
      this.activeShowGeo = id

      this.info.regionTagId = data_id
      this.listBrandByTags = []
      this.upCallback()
      this.hideFilter()
    },
    changeAreaProcess(){
      this.filterarea
    },
    // 开店面积选择的请求
    setAreaIndex(){
      this.info.shopArea = this.areaPoint
      this.listBrandByTags = []
      this.upCallback()
      this.hideFilter()
    },
    // 餐饮分类的请求
    setFoodIndex(){
      this.info.list.tagList = this.filterfoods
      this.listBrandByTags = []
      this.upCallback()
      this.hideFilter()
    },
    changeProcess(){
      this.filterinvestment
    },
    // 投资金额的请求
    setInvestIndex(){
      this.info.investment = this.processPoint
      // console.log(this.info)
      this.listBrandByTags = []
      this.upCallback()
      this.hideFilter()
    },
    // 设置选项卡面板显示
    setFilterPanel(id) {  
      if(this.showfilterindex === id){
        this.showfilter = false
        this.showfilterindex = null
      } else {
        this.showfilter = true
        this.showfilterindex = id
      }
      // 遮罩，body定位
      if(this.showfilterindex === id){
          document.getElementsByTagName("body")[0].className="overHidden";
      }else{
          document.getElementsByTagName("body")[0].className="";
      }
    },
     // 设置餐饮分类
    setCateIndex(id) {
      let items = this.filterdata.cates
      if(!id){ // 如果点击的是全部 0 让所有除了全部的都是false
        items[0].isChange = true
        return items.forEach(item => {
                if(item.id){
                    return item.isChange = false;
                }
              });
      } else {
        items[0].isChange = false  // 否则第一个为false
        return items.forEach(item=>{
              if(item.id == id && item.id){
                  return item.isChange = !item.isChange;
              }
          })
      }  
    },
    // 重置餐饮分类
    reset() {
      let items = this.filterdata.cates
      items[0].isChange = true
      return items.forEach(item => {
              if(item.id){
                  return item.isChange = false;
              }
            });
    },
    hideFilter(){
      this.showfilterindex = ''
      this.showfilter = false
      document.getElementsByTagName("body")[0].className="";
    },
    
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      var offsetTop = document.querySelector('#nav').offsetTop - document.querySelector('#search').clientHeight - 1
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
  },
  mounted(){
       window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less">
@rem:50rem;
.empty{
    margin: 130/@rem auto;
    width: 50%;
    height: 50%;
}
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
    min-height: 928/@rem;
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
// 导航
.change {
  color: #35aeb6;
  background: #ebfefd !important;
}
.changecolor {
    color: #35aeb6;
}
.menu{
  position:absolute;
  width: 100%;
  top: 86/@rem;
  left: 0;
  z-index: 9999;
}
.classify,.moneys{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 9999;
    padding-bottom: 26/@rem;
    border-top: 1px solid #e1e1e1;
    ul{
      color: #333;
      font-size: 26/@rem;
      overflow-y: scroll;
      display: flex;
    }
}
.classify{ 
    ul{
        border-bottom: 1px solid #e1e1e1;
        padding-bottom: 26/@rem;  
        flex-wrap: wrap;
        li{
          width: 20%;
          padding-top: 26/@rem;
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
// 投资金额
.moneys{
  h3{
    font-size: 28/@rem;
    line-height: 90/@rem;
    padding-left: 26/@rem;
  }
}
.moneys ul,.attent ul{
    display:flex;
    height: 96/@rem;
    padding-left: 26/@rem;
    padding-right: 26/@rem;
    justify-content: space-between;
    align-items: center;
  }
.xian {
  width: 85%;
  height: 1px;
  background: #b1b1b1;
  position: absolute;
}

.complete{ 
    text-align: center;
    line-height: 100/@rem;
    margin: 0 auto;
    width: 85%;
    color: #fff;
    font-size: 34/@rem;
    border-radius: 40/@rem;
    background: #35aeb6;
}
// 控制条
.rang{
  padding:30/@rem 50/@rem;
  margin:26/@rem 0 56/@rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.rang2{
  padding:30/@rem 50/@rem;
  margin-bottom:26/@rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
// 其他条件
.attenTab { 
    border-bottom: 1px solid #dae0e6;
    ul{
      display: flex;
      line-height: 84/@rem;
      li{
        width: 50%;
        text-align: center;
      }
    }
}
.attention{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 9999;
    padding-bottom: 26/@rem;
    border-top: 1px solid #e1e1e1;
    height: 371/@rem;
    overflow-y: scroll;
    ul{
      color: #333;
      font-size: 26/@rem;
    }
    .attentArea {
      overflow-y: scroll;
      height: 100%;
      text-align: left;
      color: #333;
       li {
          height: 72/@rem !important;
          line-height: 72/@rem !important;
          font-size: 26/@rem;
          border-bottom: 1px solid #dae0e6;
          margin-left: 25/@rem;
      }
    }
}
.amount input[type=range] {
	 -webkit-appearance: none;
    width: 100%;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    background: -webkit-linear-gradient(#35aeb6, #35aeb6) no-repeat;
	  background-size: 10% 100%;
	  z-index: 9999;
}
.attent input[type=range] {
	  -webkit-appearance: none;
    width: 100%;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    background: -webkit-linear-gradient(#35aeb6, #35aeb6) no-repeat;
	  background-size: 0% 100%;
	  z-index: 9999;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background:#eee;
}  
input[type=range]::-webkit-slider-runnable-track {
	-webkit-appearance: none;
    height: 1.5px;
    border-radius: 10px; /*将轨道设为圆角的*/
  /*   box-shadow: 0 1px 1px #b1b1b1轨道内置阴影效果 */
}
input[type=range]:focus {
    outline: none;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 50/@rem;
    width: 50/@rem;
    margin-top: -25/@rem; /*使滑块超出轨道部分的偏移量相等*/
    border:none;
    background:url("https://m.kuaidao.cn/mobile/share/branddetail/images/handle.png") no-repeat; 
    background-size: 100% 100%;
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
