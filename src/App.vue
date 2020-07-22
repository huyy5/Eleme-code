<template>
  <div id="app">
    <div>
      <v-header :seller= "seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
          <router-link to="/goods" active-class="active">商品</router-link>
      </div>
       <div class="tab-item">
         <router-link to="/ratings" active-class="active">评价</router-link>
       </div>
        <div class="tab-item">
           <router-link to="/seller" active-class="active">商家</router-link>
        </div>
    </div>

    <router-view :seller= "seller" keep-alive></router-view>
  </div>
</template>

<script>
import sellheader from './components/header/SellHeader'
import {urlParse} from './common/js/util'
export default {
  name: 'App',
  data() {
    return {
      seller:{
        id:(() => {
          let queryParam=urlParse();
          return queryParam.id;
        })()
      }
    }
  },
 async created() {
    this.$http.get('/seller?id='+this.seller.id).then(response => {
      this.seller=Object.assign({},this.seller,response);//对象合并,避免直接赋值会丢失id参数
    });
  },
  components: {
    'v-header': sellheader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
 .tab
  display: flex;
  width:100%;
  height: 40px;
  line-height: 40px;
  justify-content: center;
  border-1px(rgba(7,17,27,0.1));//mixin样式定义伪类实现真正的1像素

.tab-item{
    flex: 1;
    text-align: center;
    &>a{
      text-decoration :none;
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active{
          color: rgb(240,20,20);
      }
    }
  }
</style>
