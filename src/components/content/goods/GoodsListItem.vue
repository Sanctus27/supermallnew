<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
    <div class="test"></div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default: {},
    },
  },
  methods:{
    imageLoad(){
      //因为detail组件也调用了该组件，所以当图片load时会给Home也发送，这就没有必要
      if (this.$route.path.includes('/home')) {
        this.$bus.$emit("itemImageLoad")
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path: 'detail',
      //   query: {
      //     id: this.goodsItem.iid
      //   }
      // })
    }
  },
  computed: {
    showImg(){
      return this.goodsItem.image || this.goodsItem.show.img
      // return  this.goodsItem.show.img || this.goodsItem.image 

    }
  }
};
</script>


<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>

//  <style lang="less" scoped>
// .goods-item {
//   width: 48%;
//   padding-bottom: 40px;
//   font-size: 12px;
//   text-align: center;
//   img {
//     width: 100%;
//     border-radius: 5px;
//   }
//   .goods-info {
//     // min-width: 0;
//     p {
//       .ellipsis;
//     }
//     .price {
//       color: @color-high-text;
//     }
//   }
//   .collect {
//     // position: relative;
//     &::before {
//       content: "";
//     //   position: absolute;
//     //   left: -15px;
//     //   top: -1px;
//       width: 14px;
//       height: 14px;
//       background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px; //less中的url解析不出来
//     }
//   }
// //   .test {
// //       background: url("@~assets/img/common/collect.svg") 0 0/14px 14px;

// //   }
// }