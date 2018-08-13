<template>
    <div class="detail page-top">
        <div class="header bc line-bottom back">
            <i class="icon fa fa-angle-left" v-on:click = "$router.go(-1)"></i>
            {{brandInfo.brandName}}
            <i class="txt"><img src="/static/images/icon_tel.png"></i>
        </div>
        <detail-banner :brandImages = 'brandImages'></detail-banner>
        <!-- 品牌名称 -->
        <div class="name border-bt over bc">
            <div class="title na">{{ brandInfo.company }}</div>
            <div class="comments">
                <div class="concern">
                    <i class="img-bg"></i>
                    <span class="concern-plus">关注</span>
                </div>
                <router-link :to="{name:'authentication'}" class="authentication">
                    <i class="img-bg"></i>
                    <span class="authenticated">已认证</span>
                </router-link>
            </div>
        </div>
        <!-- 品牌简介 -->
        <div class="intro border bc mar-bt">
            <ul class="investment over">
                <li class="investment-volume">
                    <i><img width="100%" src="/static/images/branddetail/icon_rmb.png" alt=""></i>
                    <span>预估总投资额</span><span class="money">{{ brandInfo.invesmentAmount }}</span>
                </li>
                <li class="investment-info">
                    <ul>
                        <li class="">加盟费：{{brandInfo.joinInvestMin}}~{{brandInfo.joinInvestMax}}万</li>
                        <li class="">店铺区域：{{brandInfo.joinRequire}}平</li>
                        <li class="">合同期限：{{brandInfo.contractPeriod}}年</li>
                        <li class="">关注人数：{{brandInfo.focusCount}}人</li>
                        <li class="main-product">
                            <span>主营产品：</span>
                            <span class="main-item">{{brandInfo.mainProductList|item}}</span>
                        </li>
                    </ul>
                </li>
                <li class="investment-condition">
                    <router-link to="/" tag="div" class="calculator">
                        <div class="img-box">
                            <img width="100%" src="/static/images/branddetail/button_cal.png" alt="" class="button_address">
                        </div>

                        <p>投资计算器</p>
                        <div class="arrow"><img width="100%" src="/static/images/branddetail/icon_arrow.png" alt=""></div>
                    </router-link>
                    <router-link to="/" tag="div" class="area">
                        <div class="img-box">
                            <img width="100%" src="/static/images/branddetail/button_address.png" alt="" class="button_address"></div>
                        <p>加盟区域<p>
                        <div class="arrow"><img width="100%" src="/static/images/branddetail/icon_arrow.png" alt=""></div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 盈利预估 -->
        <div class="profit border-bt bc mar-bt">
           <h2 class="item border">盈利预估</h2>
           <div class="profit-table" v-if="brandInfo">
                <table>
                <tbody>
                   <tr>
                       <td>预估初始投资总额</td><td>{{brandInfo.invesmentAmount}}万</td>
                    </tr>
                    <tr>
                        <td>预估客单价</td><td>{{brandInfo.tableAnalysis.single}}元/人</td>
                        </tr>
                    <tr>
                        <td>预估日客流量</td><td>{{brandInfo.tableAnalysis.dailyFlow}}人/日</td>
                        </tr>
                    <tr>
                        <td>预估月销售额</td>
                        <td>{{brandInfo.tableAnalysis.monthlySales}}万元</td>
                    </tr>
                    <tr>
                        <td>预估毛利率</td><td>{{brandInfo.tableAnalysis.grossProfit}}%</td>
                    </tr>
                    <tr>
                        <td>预估回报周期</td><td>{{brandInfo.returnCycleMin}}~{{brandInfo.returnCycleMax}}个月</td>
                   </tr>
                   </tbody>
                </table>
                <p>注：以上为预估数值，仅供参考。</p>
           </div>
        </div>
        <!-- 主打产品 -->
        <div class="product border-bt bc mar-bt">
            <h2 class="item border">主打产品</h2>
            <banner-y v-if="brandInfo" :swiper = "brandInfo.advantageImg"></banner-y>
        </div>
        <!-- 门店实景 -->
        <div class="scenery border-bt bc mar-bt">
            <h2 class="item border">门店实景</h2>
            <banner-y v-if="brandInfo" :swiper = "brandInfo.outdoorScene"></banner-y>
        </div>
        <!-- 品牌视频 -->
        <div class="video border-bt bc mar-bt">
            <h2 class="item border">品牌视频</h2>
            <banner-video v-if="brandInfo" :swiper = "brandInfo.video"></banner-video>
        </div>
        <!-- 创始人问答区 -->
        <div class="founder border-bt bc mar-bt">
            <h2 class="item border">
                <span>创始人问答区</span>
                <span class="question"><img src="/static/images/branddetail/icon_comment.png"/>提问与评论</span>
            </h2>
            <div class="explain border-bt over">
                <div class="prople">
                    <div class="information img-bg">
                        <div class="information-center">
                            <p class="over"><img width="100%" src="http://kdsj-prod.oss-cn-beijing.aliyuncs.com/brand/2Eyxb5kwEh.jpg"></p>
                            <h3>茶与花间</h3>
                            <div class="label over"><span>钻研</span><span>创新</span></div>
                        </div>
                    </div>
                    <div class="synopsis">
                        <h3>传统茶饮结合现代潮流</h3>
                        <p>茶与花间，一个特色十足的茶饮品牌，依托上千年中国茶饮文化和总部先进的战略眼光，将传统茶饮精髓与现代饮品潮流相结合，打造出更受欢迎与认可的现代化茶饮美食，一上市即受到火热追捧。茶与花间能有如今的成就，与品牌在餐饮市场多年的潜心沉淀有着密不可分的关系。茶与花间总部始终钻研我国茶饮文化，同时研发团队深入消费者当中了解最新需求，以市场为导向，以传统为根基，碰撞出清新好茶味。</p>
                        </div>
                </div>
            </div>
            <!-- 精选回答 -->
            <div class="answer">
                <h2>
                    <span>HOT</span><span>精选问答</span>
                    <span class="question"><img src="/static/images/branddetail/icon_comment.png">提问与评论</span>
                </h2>
                <div class="answerComent">
                    <div class="answername">
                        <dl class="answerinfo over">
                            <dt class="avatar">
                                <div class="avatar-box img-bg over">
                                    <img width="100%" src="http://kdsj-prod.oss-cn-beijing.aliyuncs.com/brand/QJfkdNmCCh.jpg" alt="">
                                </div>
                            </dt>
                            <dd class="avatarname">
                                <p class="position-re font-w7">
                                    <span>萌萌</span>
                                    <i class="wen"><img width="100%" height="100%" src="/static/images/branddetail/wen.png" alt=""></i>
                                </p>
                                <p class="answerwen">我想加盟一个奶茶店，请问你们这个品牌在同类产品中的优势是什么？</p>
                                <div class="answerReturn"><div class="riangle-up"></div>
                                <dl class="answerfounder over">
                                    <dt class="">
                                        <div class="avatar-box img-bg over">
                                            <img width="100%" src="http://kdsj-prod.oss-cn-beijing.aliyuncs.com/brand/QJfkdNmCCh.jpg" alt="">
                                        </div>
                                    </dt>
                                    <dd class="">
                                        <p class="position-re font-w7">
                                            <span>创始人&nbsp;茶与花间</span><i class="da"><img width="100%" height="100%"src="/static/images/branddetail/da.png" alt=""></i>
                                        </p>
                                        <p class="">你好，我们有三大优势：一、茶与花间奶茶店在制作过程中，绝不添加奶精、果粉等化学物质，品质绝对是行业中无与抗衡的。二、茶与花间以新鲜水果，天然素材研发符合消费者口感的优质茶品，在竞争激烈的茶饮市场，能有更多的差异化与优势。三、茶与花间加盟店产品线覆盖10个系列，80余种单品，口味之多为不同需求的顾客提供了更加丰富的选择。</p>
                                    </dd>
                                </dl>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        </div>
        <!-- 评论区 -->
        <div class="comment border-bt bc mar-bt">
            <h2 class="item border">评论区</h2>

             <div class="answerComent">
                 <div class="answername">
                        <dl class="answerinfo over">
                            <dt class="avatar">
                                <div class="avatar-box img-bg over">
                                    <img width="100%" src="http://kdsj-prod.oss-cn-beijing.aliyuncs.com/brand/QJfkdNmCCh.jpg" alt="">
                                </div>
                            </dt>
                            <dd class="avatarname">
                                <p class="position-re font-w7">
                                    <span>萌萌</span>
                                    <i class="wen"><img width="100%" height="100%" src="/static/images/branddetail/wen.png" alt=""></i>
                                </p>
                                <p class="answerwen">我想加盟一个奶茶店，请问你们这个品牌在同类产品中的优势是什么？</p>
                                <div class="answerReturn"><div class="riangle-up"></div>
                                <dl class="answerfounder over">
                                    <dt class="">
                                        <div class="avatar-box img-bg over">
                                            <img width="100%" src="http://kdsj-prod.oss-cn-beijing.aliyuncs.com/brand/QJfkdNmCCh.jpg" alt="">
                                        </div>
                                    </dt>
                                    <dd class="">
                                        <p class="position-re font-w7">
                                            <span>创始人&nbsp;茶与花间</span><i class="da"><img width="100%" height="100%"src="/static/images/branddetail/da.png" alt=""></i>
                                        </p>
                                        <p class="">你好，我们有三大优势：一、茶与花间奶茶店在制作过程中，绝不添加奶精、果粉等化学物质，品质绝对是行业中无与抗衡的。二、茶与花间以新鲜水果，天然素材研发符合消费者口感的优质茶品，在竞争激烈的茶饮市场，能有更多的差异化与优势。三、茶与花间加盟店产品线覆盖10个系列，80余种单品，口味之多为不同需求的顾客提供了更加丰富的选择。</p>
                                    </dd>
                                </dl>
                            </div>
                        </dd>
                    </dl>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import DetailBanner from './DetailBanner'
import BannerY from './BannerY'
import BannerVideo from './BannerVideo'
export default {
  name: 'Detail',
  components: {DetailBanner, BannerY, BannerVideo},
  data () {
    return {
      brandId: '',
      brandInfo: '',
      brandImages: ''
    }
  },
  filters: { // 组件的选项中定义本地的过滤器
    item: function (value) {
      var str = ''
      for (var i = 0; i < value.length; i++) {
        if (value[i] !== value[value.length - 1]) {
          str += value[i] + ' | '
        } else {
          str += value[i]
        }
      }
      return str
    }
  },
  methods: {
    getBrandIdDetail () {
      let {brandId} = this
      console.log(brandId)
      this.$http.get('/kd/mobile/share/getBrand', {params: {brandId}}).then((res) => {
        console.log(res.data.data)
        this.brandInfo = res.data.data
        this.brandImages = res.data.data.promotes
      })
    }
  },
  created () {
    this.brandId = this.$route.query.brandId
    this.getBrandIdDetail()
  }
}
</script>
<style lang="less" scoped>
@rem:50rem;
.detail{background: #eff3f7;}
.mar-bt{margin-bottom: 14/@rem;}
.icon{
    // left:42/@rem;
    // background-image: url(/static/images/branddetail/icon_arrow.png)
}
/* 品牌名称 */
.name{
    display: flex;
    justify-content: space-between;
    padding: 34/@rem 24/@rem 30/@rem;
    margin-bottom: 6/@rem;
    .title{
        width: 410/@rem;
        font-size: 32/@rem;
        line-height: 32/@rem;
    }
    .comments{
        display: flex;
        font-size: 28/@rem;
        color:#666666;
        line-height: 33/@rem;
        .concern{
            display: flex;
            margin-right: 37/@rem;
            i{
                width:33/@rem;
                height:33/@rem;
                display: block;
                background-image:url('/static/images/branddetail/icon_attention_normal.png');
                margin-right: 9/@rem;
            }
        }
        .authentication{
            display: flex;
            i{
                // width:27/@rem;
                // height:31/@rem;
                width:33/@rem;
                height:33/@rem;
                display: block;
                background-image:url('/static/images/branddetail/icon_attestation_hover.png');
                margin-right: 9/@rem;
            }
        }
        .authenticated{
            color: #279683;

        }
    }
}
/* 加盟信息 */
.intro{
    margin-bottom:15/@rem;
    padding: 24/@rem 24/@rem 40/@rem;
    .investment{
        .investment-volume{
            margin-bottom: 16/@rem;
            padding-top:2px;
            display: flex;
            font-size: 30/@rem;
            font-weight: 700;
            i{
                display: block;
                width:40/@rem;
                height:40/@rem;
                margin-right: 7/@rem;
            }
            span{
                line-height:40/@rem;
                &.money{
                    color: #dd1400;
                }
            }
        }
        .investment-info{
            ul{
                display: flex;
                justify-content: space-between;
                flex-wrap:wrap;
                li{
                    width: 50%;
                    line-height:53/@rem;
                    font-size: 26/@rem;
                }
                li:last-child{
                    width:100%;
                }
            }
        }
        .investment-condition{
            display: flex;
            height: 70/@rem;
            margin-top:26/@rem;
            font-size: 26/@rem;
            font-weight: 700;
            .calculator,.area{
                display: flex;
                align-items: center;
                flex: 1;
                p{
                    margin:0 21/@rem 0 13/@rem;
                }
            }
            .calculator{
                border-right: 1px solid #dddddd;
                .img-box{
                    padding-left:36/@rem;
                }
            }
            .area{
                .img-box{
                    padding-left:74/@rem;
                }
            }
            .img-box{
                width: 70/@rem;
                height: 70/@rem;
            }
            .arrow{
                width:15/@rem;
                height:26/@rem;
            }
        }
    }
}
/* 盈利预估 */
.profit{
    h2{
        border-left-color: #0098cb;
    }
    .profit-table{
        margin:24/@rem 24/@rem 0/@rem;
        table {
            display: table;
            border-collapse: separate;
            border-spacing: 2px;
            border-color: grey;
        }
        table{
            width: 100%;
            font-size: 26/@rem;
            tbody{
                // border: 1px solid #fff;
                tr{
                    height: 46/@rem;
                }
                tr:nth-child(odd) {
                    background: #d9eeef;
                }
                tr:nth-child(even) {
                    background: #f2f9fb;
                }
                tr:last-child{
                    font-weight: 700;
                }
                td:first-child {
                    width: 40%;
                    color: #0d8274;
                    padding-left: 22/@rem;
                }
                td:last-child {
                    width: 60%;
                    color: #666666;
                    text-align: center;
                }
            }
        }
    }
    p{
        padding-left: 1em;
        height: 58/@rem;
        line-height:58/@rem;
        color: #0d8274;
    }
}
/* 主打产品 */
.product{
    h2{border-left-color:#8299d5;}
}
/* 门店实景 */
.scenery{
    h2{border-left-color:#5dbec5;}
}
/* 品牌视频 */
.video{
    h2{border-left-color:#5ab379;}
}
/* 创始人问答 */
.founder{
    h2{
        border-left-color:#5dbec5;
    }
}
.explain{
    margin: 0 20/@rem 8/@rem;
    .prople {
        position: relative;
        height: 100%;
        min-height: 600/@rem;
        background: #eff3f7;
        border-radius: 10px;
        border: 1px solid #dae0e6;
        margin: 100/@rem 0;
        .information{
            position: absolute;
            width: 320/@rem;
            min-height: 880/@rem;
            top:-12%;
            left: 6/@rem;
            background-image:url('/static/images/branddetail/information.png');
            .information-center{
                position: absolute;
                top:50%;
                left:0;
                text-align: center;
                width: 100%;
                -webkit-transform:translate3d(0,-50%,0);
                -ms-transform: translate3d(0,-50%,0);
                transform:translate3d(0,-50%,0);
            }
            h3{
                font-size: 32/@rem;
                font-weight: 700;
                line-height: 60/@rem;
            }
            p{
                display: inline-block;
                width: 240/@rem;
                height: 240/@rem;
                border: 1px solid #dae0e6;
                padding: 0.2em;
                border-radius: 50%;
                margin-left: -16/@rem;
            }
            .label{
                width: 80%;
                padding-left: 10px;
                span{
                    border: 1px solid #e1e1e1;
                    color: #999;
                    padding: 2px;
                    border-radius: 15px;
                    float: left;
                    margin-left: 7px;
                    margin-top: 8px;
                    font-size: 24/@rem;

                }
            }
        }
        .synopsis{
            width: 55%;
            margin-left: 43%;
            padding: 22/@rem 0;
            h3{
                font-size: 32/@rem;
                font-weight: 700;
            }
            p{
                line-height: 42/@rem;
                color: #666666;
                margin-top: 8px;
                font-size: 26/@rem;
            }
        }
    }
}
/* 精选回答 */
.answer{
    h2{
        padding: 0 24/@rem;
        height: 90/@rem;
        line-height: 90/@rem;
        color:#333333;
        font-size: 32/@rem;
        span:first-child {
            display: inline-block;
            font-size: 26/@rem;
            width: 51/@rem;
            height:30/@rem;
            line-height: 30/@rem;
            background: #ff3021;
            color: #fff;
            border-radius: 3px;
            font-weight: 500;
            margin-right: 20/@rem;
            text-align:center;
        }
    }
}
.answername{
    padding:10/@rem 24/@rem 40/@rem;
    .answerinfo{
        display: flex;
        .avatar-box{
            width: 62/@rem;
            height: 62/@rem;
            border-radius: 50%;
        }
    }
    .avatarname{
        width: 620/@rem;
        padding-left: 20/@rem;
        padding-top: 6/@rem;
        p{
            line-height: 50/@rem;
            font-size: 24/@rem;
            color:#333333;
        }
    }
    .answerwen{
            line-height: 36/@rem;
            font-size: 26/@rem;
            margin-bottom:14/@rem;
    }
}

.answerfounder{
    display: flex;
    width:580/@rem;
    padding: 20/@rem;
    background:#f4f4f4;
    border-radius: 8px;
    color: #333333;
    dd{
        padding-left:20/@rem;
        color: #666666;
    }
}
/* 评论区 */
.comment{
    h2{border-left-color:#0098cb;}
}
// 项目标题
.item{
    height: 80/@rem;
    line-height: 80/@rem;
    padding-left: 14/@rem;
    border-left: 10/@rem solid;
    font-size: 30/@rem;
    font-weight: 700;
}
.question{
    font-weight: 500;
    float:right;
    padding-right: 10px;
    color: #f46e65;
    font-size: 14px;
    img{
        width:14px;
        height:14px;
        margin-right:10/@rem;
    }
}
.position-re{
    position: relative;
}
.wen,.da{
    position: absolute;
    width:40/@rem;
    height: 36/@rem;
    overflow: hidden;
    margin-left: 20/@rem;
    img{
       display: block;
    }
}
</style>
