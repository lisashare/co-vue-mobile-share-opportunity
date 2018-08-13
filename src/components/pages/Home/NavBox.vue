<template>
    <div class="nav-box" id="navBox">
        <div class="nav-bar" :class="searchBarFixed == true ? 'isFixed' :''">
            <div class="nav-items">
                <div class="nav-item">
                    <span>餐饮分类</span>
                    <i class="iconfont icon-iconarrowdown01"></i>
                </div>
                <div class='height'></div>
            </div>
            <div class="nav-items">
                <div class="nav-item">
                    <span>投资金额</span>
                    <i class="iconfont icon-iconarrowdown01"></i>
                </div>
                <div class='height'></div>
            </div>
            <div class="nav-items">
                <div class="nav-item">
                    <span>其他条件</span>
                    <i class="iconfont icon-iconarrowdown01"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'NavBox',
  data () {
    return {
      searchBarFixed: false
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
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
@rem: 50rem;
.nav-box{
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
        font-size: 28/@rem;
        padding-left: 5px;
        color: #ccc;
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
