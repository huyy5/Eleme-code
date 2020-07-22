<!-- 商家 -->
<template>
    <div class="seller" ref="sellerWrapper">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <star :size= "36" :score= "seller.score"></star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2>起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                     <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <!-- 收藏 -->
                <div class="favorite" @click= "toggleFavorite">
                    <span class="icon-favorite" :class= "{'active':favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="title">公告与活动</h1>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if= "seller.supports" class="supports">
                    <li class="support-item" v-for= "(item,index) in seller.supports">
                    <span class="suppicon" :class= "classMap[seller.supports[index].type]"></span>
                    <span class="supptext">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <split></split>
            <div class="pics">
                <h1 class="title">商家实景</h1>
                <div class="pic-wrapper" ref= "picWrapper">
                    <ul class="pic-list" ref= "piclist">
                        <li class="pic-item" v-for= "pic in seller.pics">
                            <img :src= "pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for= "info in seller.infos">
                        {{info}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../start/start'
import split from '../split/split'
import {saveToLocal,lodaFromLocal} from '../../common/js/store'
export default {
    name: "seller",
    data () {
        return {
            favorite:(() =>{
                return lodaFromLocal(this.seller.id,'favorite',false);
            })()
        }
    },
    props:{
        seller:{
            type:Object
        }
    },
    computed:{
        favoriteText(){
            return this.favorite?'已收藏':'收藏';
        }
    },
     watch: {
        seller() { // 监控props里面的seller数据变化
            this.$nextTick(() => {
                this._initScroll();
                this._initScrollPics();
            })
        }
    },
    created(){
        this.classMap=["decrease","discount","guarantee","invoice","special"]
        
    },
    mounted() {
        this.$nextTick(() => {
             this._initScroll();
             this._initScrollPics();
        })
       
    },
    methods:{
        _initScroll(){
            if(!this.scroll){
                this.scroll=new BScroll(this.$refs.sellerWrapper, {
                    click:true
                });
            }else{
                this.scroll.refresh()
            }
        },
        _initScrollPics(){
            if(this.seller.pics){
                let picwidth=120;
                let picMargin=6;
                let imgWidth=(picwidth+picMargin)*this.seller.pics.length-picMargin;
                this.$refs.piclist.style.width=imgWidth+"px";
                this.$nextTick(() =>{
                     if (!this.picScroll) {
                            this.picScroll=new BScroll(this.$refs.picWrapper,{
                                scrollX:true,
                                eventPassthrough: 'vertical'
                            })
                     } else {
                        this.pics.refresh();
                    }
                })
            }
        },
        toggleFavorite(event){
            if(!event._constructed){
                return;
            }
            this.favorite=!this.favorite;
            saveToLocal(this.seller.id,'favorite',this.favorite);
        }
    },
    components:{
        star:star,
        split:split
    }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '/style/seller'
</style>