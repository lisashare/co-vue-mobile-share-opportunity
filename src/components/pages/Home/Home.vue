<template>
    <div class="home page-top">
        <home-search></home-search>
        <banner></banner>
        <home-list-box></home-list-box> 
    </div>
</template>
<script>
import Banner from '../../commons/Banner/Banner'
import HomeSearch from './HomeSearch'
import HomeListBox from './HomeListBox'

export default {
  name: 'Home',
  components: {HomeSearch, Banner, HomeListBox}
}
</script>
<style lang="less" scoped>
@import '../../../stylesheets/particles/_base.less';
// .home{
//     height:2000px;
// }
</style>
