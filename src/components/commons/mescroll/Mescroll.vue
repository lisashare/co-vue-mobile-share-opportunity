<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
import MeScroll from '../../../../node_modules/mescroll.js/mescroll.min.js'
import totop from './mescroll-totop.png'
import empty from './dlogo1.png'
export default {
  props: {
    upCallback: {
      type: Function,
      default: null
    },
    scrollId: {
      type: String,
      default: 'body'
    },
    upUse: {
      type: Boolean,
      default: true
    },
    upAuto: {
      type: Boolean,
      default: true
    },
    toTopClass: {
      type: String,
      default: 'mescroll-totop'
    },
    warpId: {
      type: String,
      default: 'mescroll'
    }
  },
  data () {
    return {
      mescroll: null
    }
  },
  methods: {
    endSuccess (curPageDataLength) {
      this.mescroll && this.mescroll.endSuccess(curPageDataLength)
    },
    endErr () {
      this.mescroll && this.mescroll.endErr()
    },
    getScrollTop () {
      if (this.mescroll) {
        return this.mescroll.getScrollTop()
      }
      return 0
    },
    scrollTo (top, duration) {
      this.mescroll && this.mescroll.scrollTo(top, duration)
    }
  },
  mounted () {
    let self = this
    this.mescroll = new MeScroll(self.scrollId, {
      down: {use: false},
      up: {
        use: self.upUse,
        auto: self.upAuto,
        callback: self.upCallback, // 上拉回调
        page: {num: 0, size: 10}, // 可配置每页8条数据,默认10
        toTop: { // 配置回到顶部按钮
          src: totop, // 默认滚动到1000px显示,可配置offset修改
          offset: 1000,
          warpClass: self.toTopClass
        },
        noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: { // 配置列表无任何数据的提示
          warpId: self.warpId,
          icon: empty,
          tip: '暂无相关信息！'
          // btntext: "",
          // btnClick: self.emptyDataBtnClick || self.btnClick,
        },
        warpId: self.warpId, // 外部需要使用，所以单独定义在外部
        htmlNodata: '<p class="upwarp-nodata">已经全部加载完毕</p>', // 无数据的布局
        // scrollbar: {use: false, barClass: "mescroll-bar"}, // use是否开启自定义滚动条
        htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>' // 上拉加载中的布局
      }
    })
  }
}
</script>

<style lang="less">
@import './mescroll.min.css';

</style>
