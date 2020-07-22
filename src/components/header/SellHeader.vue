<!--  -->
<template>
<div class="header">
    <!--内容区-->
    <div class="content-wrapper">
      <!--头像-->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if= "seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <!--公告区-->
    <div class="bulletin-wrapper"  @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <!--头部背景图片和模糊-->
    <div class="background-filter">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--弹出公告浮层-->
    <transition name="fade">
      <div v-show= "bulletinShow" class="openbulletin">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size= "48" :score= "seller.score"></star>
            </div>
            <div class="line-title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if= "seller.supports" class="supports">
                <li class="support-item" v-for= "(item,index) in seller.supports">
                  <span class="suppicon" :class= "classMap[seller.supports[index].type]"></span>
                  <span class="supptext">{{seller.supports[index].description}}</span>
                </li>
            </ul>
            <div class="line-title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click= "hideDetail">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
</div>
</template>

<script>
import star from '../start/start'
export default {
  name: 'sellheader',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      bulletinShow:false
    }
  },
  methods:{
    showDetail(){
      this.bulletinShow=true;
    },
    hideDetail() {
      this.bulletinShow=false;
    }
  },
  created() {
    this.classMap=["decrease","discount","guarantee","invoice","special"]
  },
  components: {
    star
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './style/sellheader'
</style>
