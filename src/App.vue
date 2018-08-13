<template>
  <div id="app">
    <!-- <app-footer></app-footer> -->
    <router-view/>
  </div>
</template>

<script>
import AppFooter from '@/components/commons/Footer/Footer'
export default {
  name: 'App'
  // components:{AppFooter},

}
</script>

<style lang="less">
@import 'stylesheets/particles/_base.less';

</style>
