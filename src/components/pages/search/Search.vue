<template>
    <div class="search page-top">
        <!-- <search-top :placeholder="placeholder"></search-top> -->
        <!-- 顶部搜索框 -->
        <div class="search-top line-bottom">
            <form class="search-inp" @submit.prevent="searchTarget">
                <i class="icon"></i>
                <!-- @keyup.enter="searchTarget" -->
                <input type="text" name="search" id="search"  maxlength="30" class="name" autocomplete="off"
                    v-focus
                    :placeholder="placeholder"
                    
                    v-model="searchValue"
                    @input="checkInput"/>
                <i class="close" v-if="close" @click="clearValue"></i>
            </form>
            <span class="txt" v-on:click = "$router.go(-1)">取消</span>
        </div>

        <div class="cont">
            <div class="title">
                <h4>热搜品牌</h4>
                <div class="search-branch">
                    <ul class=""><li></li></ul>
                </div>
            </div>
            <div class="title" v-if="listHotInfos">
                <h4>大家都在搜索</h4>
                <div class="search-branch">
                    <ul>
                        <li v-for="(listHotInfo,index) in listHotInfos" :key="listHotInfo.infoId" @click="enterMessage(index)">
                            <span class="hottxt">热文</span>
                            <span class="hotinfo">{{ listHotInfo.title }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="title" v-if="showHistory">
                <h4>搜索记录</h4>
                <div class="search-branch">
                    <ul>
                        <li class="search-history" v-for="(item,index) in searchHistory">
                            <span class="ind">{{index+1}}</span>
                            <p>{{item}}</p>
                        </li>
                    </ul>
                </div>
                <h5 @click="clearAllHistory">清空搜索记录</h5>
            </div>
        </div>
    </div>
</template>

<script>
// import SearchTop from '@/common/searchTop/SearchTop'
import utils from '@/modules/utils.js'
export default {
  name: 'Search',
  data () {
    return {
      placeholder: '请输入关键字',
      listHotInfos: '',
      params: {pageNum: 1, pageSize: 10},
      close: false,
      searchValue: '', // 搜索内容
      restaurantList: [], // 搜索返回的结果
      // imgBaseUrl,             // 图片域名地址
      searchHistory: [], // 搜索历史记录
      showHistory: false, // 是否显示历史记录，     // 只有在返回搜索结果后隐藏
      emptyResult: false // 搜索结果为空时显示
    }
  },
  // components:{SearchTop},
  methods: {
    getListHotInfo () {
      let {params} = this
      this.$http.post('/kd/mobile/brand/listHotInfo', params).then(res => {
        this.listHotInfos = res.data.data.slice(0, 2)
      })
    },
    enterMessage (index) {
      let listHotInfo = JSON.stringify(this.listHotInfos[index])
      window.sessionStorage.setItem('listHotInfo', listHotInfo)
      this.$router.push({name: 'message'})
    },

    // 数据框，点击回车搜索结果并显示，同时将搜索内容存入历史记录
    searchTarget () {
      /*
        * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
        * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
        */
    //   searchValue 前后去空格后
      if (!this.searchValue) {
        // 输入的值为空提示
        // toast
        console.log('提示')
      } else {
          // 请求，存本地，返回的值跳转到相应页面
            let history = utils.getStore('searchHistory');
            if (history) { 
                let checkrepeat = false;
                this.searchHistory = history;
                this.searchHistory.forEach(item => {
                    if (item == this.searchValue) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    this.searchHistory.push(this.searchValue)
                }
            }else {
                this.searchHistory.push(this.searchValue)
            }
            utils.setStore('searchHistory',this.searchHistory)
            // 跳转
            // 清空value值
            this.searchValue = ''
        }
    },
    // 监控input框内的值，显示清除按钮
    checkInput () {
      if (this.searchValue.length !== 0) {
        this.close = true
      } else {
        this.close = false
      }
    },
    // 点击清除按钮，清空值
    clearValue () {
        this.searchValue = ''
    },
    // 清除搜索历史
    clearAllHistory () {
      this.showHistory = false
      this.searchHistory = []
      utils.setStore('searchHistory',this.searchHistory);
    }
  },
  created () { // 获取热搜数据
    this.getListHotInfo();
    console.log(utils.getStore('searchHistory'))
      //获取搜索历史记录
      if (utils.getStore('searchHistory')) {
          this.searchHistory = utils.getStore('searchHistory');
          // 本地缓存中有数据显示数据
          this.showHistory = true
      }
  },
  mounted(){
    
  }
}
</script>
<style lang="less" scoped>
@rem:50rem;
.cont{
    margin-top: 80/@rem;
    // padding: 0 16/@rem 50/@rem;
    padding: 0 24/@rem 50/@rem;
}
.title{
    h5{
        line-height: 120/@rem;
        text-align: center;
        font-size: 30/@rem;
        color: #999999;
    }
}
.title{
    h4{
        line-height: 78/@rem;
        font-size: 26/@rem;
        font-weight: bold;
    }
    .search-branch{
        li{
            margin: 30/@rem 20/@rem;
            span.hottxt{
                display: inline-block;
                width: 80/@rem;
                height: 42/@rem;
                line-height: 42/@rem;
                text-align: center;
                font-size: 26/@rem;
                color: #fff;
                background: #fc4b48;
                margin-right: 3px;
                border-radius: 3px;
            }
            span.hotinfo{
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                vertical-align: bottom;
                line-height: 42/@rem;
                font-size: 30/@rem;
                color:rgb(102, 102, 102);
            }
        }
    }
}
.search-history{
    display: flex;
    font-size: 28/@rem;
    align-items: center;
    .ind{
        width: 12px;
        height: 12px;
        text-align: center;
        line-height: 12px;
        border-radius: 2px;
        background: #f2f2f2;
        margin-right: 12px;

    }
}

*{box-sizing: border-box;}
.search-top{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 86/@rem;
    padding: 15/@rem 24/@rem;
    z-index: 1001;
}
.search-inp {
    position: relative;
    height: 56/@rem;
    width: 626/@rem;
    background: #eff3f7;
    border-radius: 28/@rem;
    margin-right: 6/@rem;
    padding-left: 54/@rem;
    input{
        width: 80%;
        height: 56/@rem;
        font-size: 26/@rem;
        color: #666666;
        background: #eff3f7;
    }
}
i {
    display: inline-block;
    vertical-align: middle;
    background-size: 100% 100%;
    background-position:center center;
    background-repeat: no-repeat;
}
.icon {
    position: absolute;
    left: 16/@rem;
    top: 50%;
    -webkit-transform: translate3d(0, -50%, 0);
    -ms-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    display: inline-block;
    width: 28/@rem;
    height: 32/@rem;
    background-image: url(/static/images/position/icon_search@2x.png);
}
.close {
    position: absolute;
    right: 20/@rem;
    top: 50%;
    -webkit-transform: translate3d(0, -50%, 0);
    -ms-transform: translate3d(0, -50%, 0);
    transform: translate3d(0, -50%, 0);
    display: inline-block;
    width: 26/@rem;
    height: 26/@rem;
    background-image: url(/static/images/position/icon-close.png);
}

.txt {
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 10/@rem;
    padding: 0 14/@rem;
    display: block;
    height: 86/@rem;
    // width: 84/@rem;
    text-align: center;
    line-height: 86/@rem;
    font-size: 30/@rem;
    color: #333333;
}
</style>
