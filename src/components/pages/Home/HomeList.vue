<template>
    <router-link
        :to = "{name:'detail',query:{brandId:list.brandId}}"
        tag = "li" :brandId = 'list.brandId'>
            <dl>
                <dt class="infoImg">
                    <img :src="list.brandLogo">
                    <div class="type">
                    <h3 class="title">{{list.brandName}}</h3>
                    <span>|</span>
                    <p class="sub-title">{{list.mainPoint}}</p>
                    </div>
                </dt>
                <dd>
                    <div class="core-feature">
                        <b>核心特色 ： </b>{{list.coreFeatures}}
                    </div>
                </dd>
                <dd>
                    <div class="icon tipbox">
                        <p class="fl">总部{{list.location}}</p>
                        <p class="fl" v-for="tag in list.tagList" :key="tag">{{tag}}</p>
                        <div class="fr">
                            <i class="iconfont icon-icon_pinglun"></i>
                            <span class="ulev-2" style="padding-left:0.3em;float: right;">4</span>
                        </div>
                    </div>
                </dd>
            </dl>
        </router-link>
</template>
<script>
export default {
  name: 'ListBox',
  props: ['list']
}
</script>
