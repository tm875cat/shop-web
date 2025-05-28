<template>
  <div class="checkout_page">
    <div class="check_UI">
      <CheckoutUi :shopState="shopStep" />
    </div>
    <!-- 主要結帳資訊 -->
    <div class="check_content">
      <!-- 購物車購買框 -->
      <ShopCarBox class=" check_content_box" />
      <!-- 送貨及付款方式 -->
      <DeliveryAndPayment v-if="shopStep == '1'" class=" check_content_box" @updateDelivery="delivery = $event"
        @updatePayment="payment = $event" />
      <!-- 顧客資料 -->
      <CustomerInfo @updateCustomer="handleCustomerUpdate" v-if="shopStep == '2'" class=" check_content_box" />
      <!-- 收件人資料 -->
      <RecipientInfo @updateRecipient="handleRecipientUpdate" v-if="shopStep == '2'" class=" check_content_box"
        :customerName="customerName" :customerPhone="customerPhone" :delivery="delivery" />
      <!-- 付款方式 -->
      <PaymentMethods @updatePayment="handlePaymentUpdate" v-if="shopStep == '2'" class=" check_content_box"
        :payment="payment" />
      <!-- 訂單資訊 -->
      <OrderInfo @checkout="handleCheckout" class=" check_content_box" v-if="shopStep == '1'" />
      <!-- 備註 -->
      <Remark @updateMessageForSeller="handleMessageUpdate" class=" check_content_box" />
      <!-- 同意條款 -->
      <div class="agree_terms_box ">
        <div class="agree_terms">
          <CustomCheckbox v-model="agreeTerms" />
          <p>我同意網站<span>服務條款</span>和<span>隱私權政策</span>
          </p>
        </div>
      </div>
      <!-- 提交訂單 -->
      <div class="send_order">
        <button>提交訂單</button>


      </div>
    </div>
  </div>
</template>
<script setup>
import CheckoutUi from '@/components/CheckoutUi.vue' //自訂勾選框
import ShopCarBox from '@/components/ShopCarBox.vue' //購物車購買框
import DeliveryAndPayment from '@/components/DeliveryAndPayment.vue' //送貨及付款方式
import OrderInfo from '@/components/OrderInfo.vue' //訂單資訊
import CustomerInfo from '@/components/CustomerInfo.vue' //顧客資料
import RecipientInfo from '@/components/RecipientInfo.vue' //收件人資料
import PaymentMethods from '@/components/PaymentMethods.vue' //付款方式
import Remark from '@/components/Remark.vue' //備註
import { userStore } from '@/stores/userStore' //現在登入的會員資料
import { ref } from 'vue'
import CustomCheckbox from '@/components/CustomCheckbox.vue' //自訂勾選框
const currentUserStore = userStore() //目前登入會員
const delivery = ref('')//送貨方式
const payment = ref('') //付款方式
const customerName = ref('')//顧客姓名
const customerPhone = ref('')//顧客電話
const recipientName = ref('')//收件人姓名
const recipientPhone = ref('')//收件人電話
const cardNumber = ref('') //卡號
const cardholderName = ref('') //持卡人姓名
const validity = ref('') //有效期
const cvs = ref('') //安全碼
const messageForSeller = ref('') //給賣家的訊息
const shopStep = ref('1')//目前結帳步驟
const agreeTerms = ref(false)//同意服務條款
const transferAccount = ref('')//轉帳帳號末五碼
// 接收子元件Remark 給賣家的訊息
function handleMessageUpdate(message) {
  messageForSeller.value = message.messageForSeller
}
// 接收子元件OrderInfo checkout訊息前往結帳步驟2
function handleCheckout(message) {
  if (delivery.value == "") {
    alert("請輸入送貨方式")
    return
  }
  if (payment.value == "") {
    alert("請輸入付款方式")
    return
  }
  shopStep.value = message.checkoutStep
  window.scrollTo({ top: 0, behavior: 'smooth' }) //卷軸捲到最上面
}
//接收子元件CustomerInfo 的顧客姓名 電話
function handleCustomerUpdate(cusInfo) {
  customerName.value = cusInfo.name
  customerPhone.value = cusInfo.phone
}
//接收子元件 Recipient 的收件人姓名 電話
function handleRecipientUpdate(recipient) {
  recipientName.value = recipient.name
  recipientPhone.value = recipient.phone
}
//接收子元件 PaymentMethods 的卡號 持卡人姓名 有效期 安全碼
function handlePaymentUpdate(cardInfo) {
  cardNumber.value = cardInfo.cardNumber
  cardholderName.value = cardInfo.cardholderName
  validity.value = cardInfo.validity
  cvs.value = cardInfo.cvs
  transferAccount.value = cardInfo.transferAccount

}
</script>
<style lang="scss">
.checkout_page {
  padding: 25px;

  .check_content_box {
    margin-top: 20px;
  }

  .agree_terms_box {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .agree_terms {
      display: flex;
      align-items: center;

      margin-bottom: 8px;
      font-size: 10px;
      font-family: 'Roboto Mono', monospace;

      p {
        color: #9A9A9A;
        margin-left: 10px;
        font-weight: 700;
        letter-spacing: 0.5px;

        span {
          color: #A74048;
        }
      }
    }
  }

  .send_order {
    margin-top: 20px;

    button {
      width: 100%;
      height: 40px;
      color: white;
      background-color: rgba(167, 64, 72, 1);
      border: none;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }

}
</style>
