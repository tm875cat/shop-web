<template>
  <!-- 購物車購買框 -->
  <div class="cart">
    <div class="cart_header">
      <h2>購物車</h2>
    </div>
    <ul class="cart_list">
      <li class="cart_item" v-for="(item, index) in shopCar" :key="index">
        <img class="item_img" :src="item.pic" alt="商品圖片" />
        <div class="item_info">
          <h3>{{ item.no }} {{ item.name }}</h3>
          <p>{{ item.color }}色</p>
          <div class="quantity_control">
            <button class="minus" @click="minus(item)">-</button>
            <span>{{ item.quantity }}</span>
            <button class="add" @click="add(item)">+</button>
          </div>
        </div>
        <div class="item_price">
          <button class="remove" @click="chancel(index)"><IconCancel /></button>
          <div class="price">
            <del>NT${{ item.originalPrice }}</del>
            <p>NT{{ item.price }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/userStore' //現在登入的會員資料
//Icon引入
import IconCancel from '@/components/icons/IconCancel.vue'
const currentUserStore = userStore() //目前登入會員
const shopCar = ref(currentUserStore.user.shopCar) //購物車
// 商品數量+
function add(item) {
  item.quantity += 1
}
// 商品數量-
function minus(item) {
  if (item.quantity > 1) {
    item.quantity -= 1
  }
}
// 刪除商品
function chancel(index) {
  shopCar.value.splice(index, 1)
}
</script>

<style scoped lang="scss">
// 購物車
.cart {
  border: 1px solid #ccc; // 外框線
  width: 100%;
  background: white;

  .cart_header {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    border-bottom: 1px solid #ddd;
    font-family: 'Roboto Mono', monospace;
    height: 40px;
    letter-spacing: 1px; //  字距設定
    h2 {
      margin-left: 20px;
    }
  }

  .cart_list {
    list-style: none;
    font-family: 'Roboto Mono', monospace;
    // 個別商品
    .cart_item {
      display: flex;
      padding: 20px;
      .item_img {
        width: 60px;
        height: 60px;
        margin-right: 16px;
      }

      .item_info {
        flex: 1;
        // 商品名 ex: A43 輕量登山包
        h3 {
          font-size: 10px;
          margin-bottom: 4px;
        }
        // 顏色
        p {
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        //數量
        .quantity_control {
          display: flex;
          justify-content: space-between;
          align-items: center;

          border: 1px solid #a74048; // 紅色邊框
          width: 85px;
          height: 18px;

          button {
            width: 20px;
            height: 18px;
            background: none;
            border: none;
            color: black;
            font-size: 10px;
            cursor: pointer;
          }
          .minus {
            border-right: 1px solid #a74048; // 紅色邊框
          }
          .add {
            border-left: 1px solid #a74048; // 紅色邊框
          }
          span {
            font-size: 10px;
          }
        }
      }
      // 價格
      .item_price {
        text-align: right;
        margin-left: 10px;

        .remove {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #666;
          margin-bottom: 8px;
        }

        .price {
          del {
            font-size: 12px;
            color: #cbcbcb;
            font-family: 'Tenor Sans', sans-serif;
          }
          p {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
