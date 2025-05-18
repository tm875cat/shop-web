<template>
  <div class="checkout_page">
    <div class="check_UI">
      <CheckoutUi shopState="1" />
    </div>
    <div class="shop_car">
      <h2>購物車</h2>
      <div class="shop_car_box">
        <div class="shop_car_item" >

        </div>


      </div>
    </div>
  </div>
</template>
<script setup>
import CheckoutUi from '@/components/CheckoutUi.vue' //自訂勾選框
import { userStore } from '@/stores/userStore' //現在登入的會員資料
</script>
<style lang="scss"></style>
