<template>
    <div class="authentication">
        <div class="back header">
            <i class="icon fa fa-angle-left" v-on:click = "$router.back(-1)"></i>
        </div>
        <div class="container">
            <div class="bannerimg"><img width="100%" src="/static/images/branddetail/renzheng.jpg"></div>
            <div class="companybox bc">
                <div class="companyname border-bt">上海茶花与间餐饮管理有限公司</div>
                <div class="companyinfo">茶与花间，一个特色十足的茶饮品牌，依托上千年的中国茶饮文化和总部先进的战略眼光，将传统茶饮精髓与现代饮品潮流相结合，打造更受欢迎与认可的现代化茶饮美食，一上市就得到火热追捧。</div>
            </div>
            <div class="qualification-certificate bc">
                <div class="linebox"></div>
                <div class="imgtitle">
                    <em>——</em>
                    <span>资质及证书</span>
                    <em>——</em>
                </div>
                <div class="imgbox">
                    <img src="http://static.kuaidao.cn/brand/Chi34TE6zA.jpg">
                    <img src="http://static.kuaidao.cn/brand/5sjmbiG7Bx.jpg">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Authentication'
}
</script>
<style lang="less" scoped>
@rem:50rem;
.bannerimg{
    width:100%;
    height: 412/@rem;
}
.companybox{
    padding: 0 32/@rem 32/@rem;
    margin-bottom: 14/@rem;
    .companyname{
        font-size: 32/@rem;
        color: #000000;
        height: 76/@rem;
        line-height: 76/@rem;
        margin-bottom:22/@rem;
    }
    .companyinfo{
        font-size: 26/@rem;
        color: #666666;
        line-height: 48/@rem;
        text-indent: 1.8em;
    }
}
.imgtitle{
    text-align: center;
    color:#666666;
    padding: 48/@rem 0 40/@rem 0;
    font-size: 32/@rem;
    em{
        color: #d8dadc;
    }
    span{
        padding:0 8/@rem;
    }
}
.imgbox{
    margin: 0 32/@rem 80/@rem;
    border: 1px dotted #ccd6e4;
    padding: 40/@rem 40/@rem 32/@rem;
    img{width: 100%;}
    img:first-child{
        margin-bottom: 4px;
    }
}
</style>
