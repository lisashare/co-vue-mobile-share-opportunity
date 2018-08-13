<template>
    <div class="search-top line-bottom">
      <form class="search-inp">
            <i class="icon"></i>
            <input type="text" name="search" id="search"  maxlength="30" class="name"
                v-focus
                :placeholder="placeholder"
                @keyup.enter="searchTarget"
                v-model="searchValue"
                @input="checkInput">
             <i class="close"></i>
        </form>
        <span class="txt" v-on:click = "$router.go(-1)">取消</span>
    </div>
</template>
<script>
export default {
  name: 'SearchTop',
  props: ['placeholder']
}
</script>
<style lang="less" scoped>
@rem: 50rem;
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
