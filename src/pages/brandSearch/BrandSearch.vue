<template>
    <div class="brand-search page-top">
        <div class="header bc line-bottom back">
             <i class="icon fa fa-angle-left" v-on:click = "$router.go(-1)"></i>
            品牌-{{listBrandByTitle}}
        </div>
        <div class="search-content">
            <div v-if="list">   
                <div class="list content" style="margin-top: 6em;">
                        <div class="masked unhide"></div>
                        <div class="new" style="padding-top: 10px;"><div>
                        <a class="info" href="/mobile/share/brand?brandId=a79077ad08a440faa8cc6c96b2fdd12d" dataname="宇宙卷饼"> 
                            <div class="infoImg">
                                {{list}}
                                <img src="http://static.kuaidao.cn/brand/P2ZA6f3WZG.jpg" alt="">
                            <p class="type"></p>
                            <div class="typeContent cutoff"><h3 class="ufl ulev-1">宇宙卷饼<span>|</span></h3><p class="ufl cutoff" style="width: 221px;">一只传递正能量的卷饼</p></div>
                        </div>
                        <div class="infoCon">
                            <div class="mon">
                            <div class="cutoff"><b>核心特色：</b>首创卷饼+中式炒菜，口味丰富更健康</div>
                            </div>
                            <div class="lineHeight icon tipbox">
                                <p class="ufl location">总部北京</p>
                                
                                <p class="ufl location">融资</p>
                                
                                <p class="ufl location">爆款</p>
            
                                <div class="ufr" style="margin-top: 0.2em;">
                                    <i class="iconfont icon-pinglun1"></i>
                                    <span class="ulev-2" style="padding-left:0.3em;">28</span>
                                </div>
                            </div>
                        </div>
                    </a>
                    </div>
                
                </div>
                    <div class="overs tx-c ulev-1">已经全部加载完毕</div>
                    <div class="dropload-down unhide"><div class="dropload-load"><span class="loading"></span>加载中...</div></div>
                </div>


            </div>
            <div class="searchBg_nodata" v-else >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'BrandSearch',
    data () {
        return {
            listBrandByTitle:'',
            list:[]
        }
    },
    methods:{
        getBrandTitle(){
            let params = {title: this.listBrandByTitle, brandPageNum: 1, brandPageSize: 10}
            this.$http.post('/kd/mobile/brand/listBrandByTitle',params).then(res=>{
                this.list = res.data.data.list
            })
        }
    },
    created(){
        this.listBrandByTitle = this.$route.query.name;
        this.getBrandTitle()
    }
}
</script>
<style lang="less" scoped>
@rem:50rem;
.searchBg_nodata {
    height: 668/@rem;
    margin-top: 100/@rem;
    background: url(/static/images/empty/bg_noend.png) no-repeat;
    background-size: 50%;
    background-position: 50% 50%;
}
</style>
