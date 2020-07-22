<!--  -->
<template>
    <div class="cartcontrol">
        <div class="cart-decrease icon-remove_circle_outline" v-show= "food.count>0" @click.stop.prevent= "decreasecart($event)"></div>
        <div class="cart-count" v-show= "food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop.prevent= "addcart($event)"></div>
    </div>
</template>

<script>
    export default{
        props:{
            food:{
                type:Object
            } 
        },
        methods:{
            addcart(event){
                 if(!event._constructed){
                    return;
                } 
                if(!this.food.count){
                    this.$set(this.food,"count",1);
                }else{
                    this.food.count++;
                }
                this.$emit('cart-add',event.target);
            },
            decreasecart(event){
                if(!event._constructed){
                    return;
                } 
                if(this.food.count){
                    this.food.count--;
                }
            }
        }
    }
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import './style/cartcontrol'
</style>