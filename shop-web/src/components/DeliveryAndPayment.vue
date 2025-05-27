<template>
  <!-- 送貨及付款方式 -->
  <div class="delivery_and_payment">
    <div class="delivery_and_payment_header">
      <h2>選擇送貨及付款方式</h2>
    </div>
    <div class="delivery_and_payment_content">
      <div class="delivery">
        <h2>送貨方式</h2>
        <select :class="{ open: isDeliveryOpen }" v-model="selectedDelivery" @click="isDeliveryOpen = !isDeliveryOpen"
          @blur="isDeliveryOpen = false">
          <option value="宅配">宅配</option>
          <option value="超商取貨">超商取貨</option>
        </select>
        <p>超商取貨0元自取需要核對證件呦！麻煩填寫正確姓名以免影響自身權益~</p>
      </div>

      <div class="payment">
        <h2>付款方式</h2>
        <select :class="{ open: isPaymentOpen }" v-model="selectedPayment" @click="isPaymentOpen = !isPaymentOpen"
          @blur="isPaymentOpen = false">
          <option value="信用卡">信用卡</option>
          <option value="轉帳">轉帳</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const currentUserStore = userStore() //目前登入會員
const shopCar = ref(currentUserStore.user.shopCar) //購物車
const selectedDelivery = ref('') //送貨方式
const selectedPayment = ref('') //付款方式
const isDeliveryOpen = ref(false) //送貨方式下拉選單
const isPaymentOpen = ref(false) //付款方式下拉選單
const emit = defineEmits(['updateDelivery', 'updatePayment'])
// 當 selectedDelivery  改變，就發送事件給父元件
watch(selectedDelivery, (newDelivery) => {
  emit('updateDelivery', newDelivery)
})
// 當 selectedPayment  改變，就發送事件給父元件
watch(selectedPayment, (newPayment) => {
  emit('updatePayment', newPayment)
})
</script>

<style scoped lang="scss">
// 購物車
.delivery_and_payment {
  border: 1px solid #ccc; // 外框線
  width: 100%;
  background: white;

  .delivery_and_payment_header {
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

  .delivery_and_payment_content {
    font-family: 'Roboto Mono', monospace;
    padding: 15px 25px;

    select {
      cursor: pointer;
      font-size: 12px;
      color: rgba(154, 154, 154, 1); // 字體顏色
      background-color: #ffffff; // 背景顏色
      border: 1px #d9d9d9 solid;
      outline: none; // 移除聚焦時的藍色外框
      width: 100%; // 設定寬度
      height: 30px; // 設定高度
      appearance: none; // 移除預設的下拉箭頭（各瀏覽器兼容）
      -webkit-appearance: none;
      -moz-appearance: none;
      padding-left: 20px;
      padding-right: 30px; // 預留右邊空間給箭頭
      position: relative; // 設為相對定位，以便放置箭頭
      background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23646363' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 10px center; // 箭頭位置
      background-size: 10px 6px; // 箭頭尺寸

      &.open {
        background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%205l4%20-4%204%204%22%20stroke%3D%22%23646363%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');
      }
    }

    .delivery {
      h2 {
        font-size: 10px;
        margin-bottom: 5px;
      }

      p {
        font-size: 10px;
        color: #cecece;
      }
    }

    .payment {
      h2 {
        font-size: 10px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
