<!-- 商品 -->
<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for= "(item,index) in goods" class="menu-item" :class= "{'current':currentIndex === index}"  @click= "selectMenu(index,$event)">
            <span class="text border-1px">
              <span v-show= "item.type>0" class="icon" :class= "classMap[item.type]"></span>{{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
          <li v-for= "item in goods" class="food-list food-list-hook">
              <h1 class="title">{{item.name}}</h1>
              <ul>
                <li v-for= "food in item.foods" @click= "selectFood(food,$event)" class="food-item border-1px">
                  <div class="icon">
                    <img :src="food.icon" width="55" height="55"/>
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">¥{{food.price}}</span>
                      <span class="old" v-show= "food.oldPrice">¥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food= "food" @cart-add= "cartAdd"></cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
          </li>
      </ul>
    </div>
    <shopcart ref= "shopcart" :selectFoods= "selectFoods" :delivery-price= "seller.deliveryPrice" :min-price= "seller.minPrice"></shopcart>
  </div>
  <food :food= "selectedFood" ref= "food" @cart-add= "cartAdd"></food>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
export default {
  name: 'goods',
  props: {
      seller:{
        type: Object
      }
  },
  data () {
    return {
      goods: [],
      listheight: [],
      scrollY:0,
      selectedFood:{}
    }
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.listheight.length;i++){
          let height1=this.listheight[i];
          let height2=this.listheight[i+1];
          if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
            return i;
          }
        }
        return 0;
      },
      selectFoods(){
        let foods=[];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count){
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    created() {
      this.classMap=["decrease","discount","guarantee","invoice","special"];
      this.$http.get('/goods').then(response => {
        this.goods=response;
        this.$nextTick(() => {
           this._initScroll();
           this._calculateHeight();
        })
       
      })  
  },
    methods: {
        selectMenu(index,event){
          if(!event._constructed){
            return;
          }
          let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
          let el=foodList[index];
          this.foodsScroll.scrollToElement(el,300);
        },
        _initScroll(){
          this.meunScroll=new BScroll(this.$refs.menuWrapper,{
            click:true
          });
          this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
             click:true,
            probeType:3//监测滚动的实时位置
          });
          this.foodsScroll.on("scroll",(pos) => {
            this.scrollY=Math.abs(Math.round(pos.y));
          })
        },
        _calculateHeight(){
          let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
          let height=0;
          this.listheight.push(height);
          for(let i=0;i<foodList.length;i++){
            let item=foodList[i];
            height+=item.clientHeight;
            this.listheight.push(height);
          }
        },
        cartAdd(el){
          this.$nextTick(() => {
            this.$refs.shopcart.drop(el);
          })
          
        },
        selectFood(food,event) {
          if(!event._constructed){
            return;
          }
          this.selectedFood = food;
          this.$refs.food.show();
        }
    },
    components:{
      shopcart,
      cartcontrol,
      food
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './style/goods'
</style>