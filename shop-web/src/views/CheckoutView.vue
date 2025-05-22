<template>
  <div class="checkout_page">
    <div class="check_UI">
      <CheckoutUi shopState="1" />
    </div>
    <ShopCarBox />

  </div>
</template>
<script setup>
import CheckoutUi from '@/components/CheckoutUi.vue' //自訂勾選框
import ShopCarBox from '@/components/ShopCarBox.vue' //購物車購買框
import { userStore } from '@/stores/userStore' //現在登入的會員資料
import { ref } from 'vue'
const currentUserStore = userStore() //目前登入會員
const shopCar = ref(currentUserStore.user.shopCar)
</script>
<style lang="scss">
.checkout_page {
  padding: 25px;
  // // 進度條
  // .check_UI {
  // }

}
</style>
