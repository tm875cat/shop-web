<template>
  <div class="checkout_page">
    <div class="check_UI">
      <CheckoutUi :shopState="shopStep" />
    </div>
    <!-- 主要結帳資訊 -->
    <div class="check_content">
      <ShopCarBox class="shop_car_box check_content_box" />
      <DeliveryAndPayment v-if="shopStep == '1'" class="delivery_and_payment check_content_box" />
      <CustomerInfo @updateCustomer="handleCustomerUpdate" v-if="shopStep == '2'" class="customer_info check_content_box" />
      <OrderInfo @checkout="handleCheckout" class="order_info check_content_box" />
    </div>
  </div>
</template>
<script setup>
import CheckoutUi from '@/components/CheckoutUi.vue' //自訂勾選框
import ShopCarBox from '@/components/ShopCarBox.vue' //購物車購買框
import DeliveryAndPayment from '@/components/DeliveryAndPayment.vue' //送貨及付款方式
import OrderInfo from '@/components/OrderInfo.vue' //訂單資訊
import CustomerInfo from '@/components/CustomerInfo.vue' //顧客資料
import { userStore } from '@/stores/userStore' //現在登入的會員資料
import { customRef, ref } from 'vue'
const currentUserStore = userStore() //目前登入會員
const shopCar = ref(currentUserStore.user.shopCar) //購物車內容
let shopStep = ref('1')
// 接收子元件OrderInfo checkout訊息前往結帳步驟2
function handleCheckout(message) {
  shopStep.value = message.checkoutStep
  window.scrollTo({ top: 0, behavior: 'smooth' }) //卷軸捲到最上面
}
//接收子元件CustomerInfo 的收件人姓名 電話
function handleCustomerUpdate(cusInfo) {
  console.log('收到的收件人姓名:', cusInfo)
}
</script>
<style lang="scss">
.checkout_page {
  padding: 25px;
  .check_content_box{
    margin-top: 20px;

  }
  // .shop_car_box {
  //   margin-top: 30px;
  // }
  // .delivery_and_payment {
  //   margin-top: 20px;
  // }
  // .order_info {
  //   margin-top: 20px;
  // }
}
</style>
