<template>
    <div class="nav-box" id="navBox">
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
                @click="setCateIndex(item.id,item.data_id)"
                :data_id = "item.data_id"
                ><span :class="[item.isChange ? 'change':'']">{{item.typename}}</span></li>
              </ul>
              <div class="buttons-box">
                <div class="reset" @click.stop = "reset">重置</div>
                <div class="complete" @click.stop="hideFilter(showfilterindex)">完成</div>
              </div>
          </div>
          <!-- 投资金额 -->
          <div class="amount" v-if="showfilterindex==2">
            <div class="moneys">
              <h3>投资金额</h3>
              <ul class="">
                <li class="unlimited">不限</li>
                <li class="six">6万</li>
                <li class="fiveth">15万</li>
                <li class="twenty">20万</li>
                <li class="thirty">30万</li>
                <li class="fifty">50万</li>
                <li class="bai">100万</li>
                <li class="baishang">100万以上</li>
              </ul>
              <div class="rang">
                <input type="range" value="0" class="range" min="0" max="100" step="1">
                <div class="xian"></div>
              </div>
              <div class="complete" @click.stop="hideFilter">完成</div>
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
            <ul class="attentArea" v-if="activeShowType=='regionTag'" @click.stop="hideFilter">
                <li :class="[activeShowArea === area.id?'changecolor':'']" 
                v-for="area in filterdata.attentArea" 
                :key="area.id"
                @click="changearea(area.id)">{{area.areaname}}</li>
            </ul>  
            <div class="attent" v-if="activeShowType =='shopArea'">
              <ul>
                <li class="attUnlimited">不限</li>
                <li class="five">15平以下</li>
                <li class="fivetheen">15平</li>
                <li class="third">30平</li>
                <li class="fif">50平</li>
                <li class="eig">80平</li>
                <li class="two">120平</li>
                <li class="twobaishang">120平以上</li>
              </ul>
              <div class="rang2">
                <input type="range" value="0" class="range2" min="0" max="100" step="1">
                <div class="xian"></div>
              </div> 
              
              <div class="complete" @click.stop="hideFilter">完成</div>
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
          others:[         
            {id:1,title:'考察区域',type:'regionTag'},
            {id:2,title:'开店面积',type:'shopArea'},
          ],
          attentArea:[
            {id:1,areaname:'全部'},
            {id:2,areaname:'北京'},
            {id:3,areaname:'上海'},
            {id:4,areaname:'深圳'},
            {id:5,areaname:'成都'},
          ]
      },         //筛选条件数据
      activeShowType:'regionTag',
      activeShowArea:1,
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
        listBrandByTags: []
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
    // filtertotal(id){
    //   switch(id){
    //     case '1': return this.filterfoods;
    //   }
    // }
  },
  methods: {
    condition(type) {
      this.activeShowType = type;
    },
    changearea(id){
      this.activeShowArea = id
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
      bus.$emit('black',this.showfilter)
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
    hideFilter(id){
      this.info.list.tagList = this.filterfoods
      console.log(this.info.list.tagList)

      this.showfilterindex = ''
      this.showfilter = false
      bus.$emit('black',this.showfilter)
    },
    complete() {

    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      var offsetTop = document.querySelector('#navBox').offsetTop - document.querySelector('#search').clientHeight - 1
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)

    bus.$on('white',this.hideFilter)
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
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
	  background-size: 0% 100%;
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
