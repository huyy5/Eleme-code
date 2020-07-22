<!-- 评论 -->
<template>
    <div class="ratings"  ref= "ratingWrapper">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <star :size= "36" :score= "seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <star :size= "36" :score= "seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type= "selectType" :only-content= "onlyContent" :ratings= "ratings" @selectRating= "selectRating" @toggleContent= "toggleContent"></ratingselect>
            <div class="rating-wrapper" >
                <ul>
                    <li v-for= "rating in ratings"  v-show= "needShow(rating.rateType,rating.text)" class="rating-item">
                        <div class="avatar">
                            <img :src= "rating.avatar" width="28" height="28"/>
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size= "24" :score= "rating.score"></star>
                                <span class="delivery" v-show= "rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show= "rating.recommend && rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span v-for= "item in rating.recommend" class="item">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../start/start'
import {formatDate} from '../../common/js/date'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'

const ALL=2;
export default {
    data () {
        return {
            ratings:[],
            selectType:ALL,
            onlyContent:true
        }
    },
    props: {
        seller:{
            type:Object
        }
    },
    created(){
        this.$http.get('/ratings').then((res) => {
            this.ratings=res;
            this.$nextTick(() => {
                 this.scroll= new BScroll(this.$refs.ratingWrapper,{
                    click:true
                })
                // console.log(this.$refs.ratingWrapper)
                // console.log(this.scroll)
            })
           
        })
    },
    methods:{
        selectRating(type){
            this.selectType=type;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        },
        toggleContent(){
            this.onlyContent=!this.onlyContent;
            this.scroll.refresh();
        },
        needShow(type,text){
            if(this.onlyContent && !text){
                return false;
            }
            if(this.selectType === ALL){
                return true;
            }else{
                console.log(type)
                console.log(this.selectType)
                return type === this.selectType;
            }
        }
    },
    filters:{
          formatDate(time){
              let date= new Date(time);
              return formatDate(date, 'yyyy-MM-dd hh:mm');
          }
      },
    components:{
        star,
        ratingselect,
        split
    }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '/style/ratings'
</style>
