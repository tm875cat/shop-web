<template>
  <!-- 訂單資訊 -->
  <div class="OrderInfo">
    <div class="OrderInfo_header">
      <h2>訂單資訊</h2>
    </div>
    <div class="OrderInfo_content">
      <div class="price_field">
        <h3>小計：</h3>
        <p>NT{{ totalPrice }}</p>
      </div>
      <div class="price_field">
        <h2>運費：</h2>
        <p>NT60</p>
      </div>
      <div class="promotional">
        <h2>使用優惠代碼</h2>

        <div class="price_field">
          <input type="text" />
          <button>套用</button>
        </div>
      </div>
      <div class="total">
        <h2>合計 ({{ totalCount }}件) :</h2>
        <p>NT${{ total }}</p>
      </div>
      <button class="checkout_btn" @click="toCheckOut()">前往結帳</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const emit = defineEmits(['checkout'])

const currentUserStore = userStore() //目前登入會員
const shopCar = ref(currentUserStore.user.shopCar) //購物車
const totalPrice = computed(() => {
  //小記
  let price = 0
  for (let i = 0; i < shopCar.value.length; i++) {
    price += shopCar.value[i].price * shopCar.value[i].quantity
  }
  return price
})
const totalCount = computed(() => {
  //合計件數
  let count = 0
  for (let i = 0; i < shopCar.value.length; i++) {
    count += shopCar.value[i].quantity
  }
  return count
})
const total = computed(() => {
  //總計費用
  return totalPrice.value + 60
})
//到結帳步驟2
function toCheckOut() {
  emit('checkout', {
    cart: shopCar.value,
    count: totalCount.value,
    total: total.value,
    checkoutStep: '2',
  })
}
</script>

<style scoped lang="scss">
// 訂單資訊
.OrderInfo {
  border: 1px solid #ccc; // 外框線
  width: 100%;
  background: white;

  .OrderInfo_header {
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
  .OrderInfo_content {
    font-family: 'Roboto Mono', monospace;
    padding: 15px 25px;
    font-size: 12px;

    .price_field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      h2 {
        margin-bottom: 5px;
      }
      p {
        letter-spacing: 1px; //  字距設定
      }
    }
    .promotional {
      h2 {
        margin-bottom: 10px;
      }
      input {
        width: 100%;
       min-width:  210px;
        border: 1px solid #a74048; // 外框線
        height: 18px;
      }
      button {
        font-size: 10px;
        font-weight: bold;
        width: 60px;
        height: 18px;
        border: 1px solid #a74048; // 外框線
        background-color: rgba(167, 64, 72, 1);
        border: none;
        color: white;
        margin-left: 5px;
        cursor: pointer;
      }
    }
    .total {
      font-weight: bold;
      display: flex;
      align-content: center;
      justify-content: space-between;
      letter-spacing: 1px; //  字距設定
    }
    .checkout_btn {
      width: 100%;
      height: 40px;
      color: white;
      background-color: rgba(167, 64, 72, 1);
      border: none;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      cursor: pointer;
    }
  }
}
</style>
