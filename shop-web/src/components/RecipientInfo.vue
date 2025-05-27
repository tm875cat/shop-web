<template>
  <!-- 收件人資料 -->
  <div class="customer_info">
    <div class="customer_info_header">
      <h2>收件人資料</h2>
      <p>選擇{{ delivery }} NT$0</p>
    </div>
    <div class="customer_info_content">
      <div class=" custom_input">
        <CustomCheckbox v-model="sameAsCustomer" />
        <p>收件人資料與顧客資料相同</p>
      </div>

      <div class="customer_info_fields customer_name">
        <h2>收件人姓名</h2>
        <input type="text" v-model="recipientName" />
      </div>
      <div class="customer_info_fields customer_eamil">
        <h2>電子信箱</h2>
        <p>{{ email }}</p>
      </div>
      <div class="customer_phone customer_info_fields">
        <h2>電話號碼</h2>
        <input type="text" v-model="phoneNumber" inputmode="numeric" pattern="[0-9]*" @input="phoneInput" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomCheckbox from '@/components/CustomCheckbox.vue' //自訂勾選框
import { ref, watch } from 'vue'
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const currentUserStore = userStore() //目前登入會員
const email = ref(currentUserStore.user.email) //使用者信箱
const recipientName = ref('') //收件人姓名
const phoneNumber = ref('') //電話
const sameAsCustomer = ref(false)//是否勾選收件人資料與顧客資料相同
// 接收父元件的電話 姓名參數
const props = defineProps({
  customerName: String,//顧客姓名
  customerPhone: String,//顧客電話
  delivery: String//送貨方式
})
const emit = defineEmits(['updateRecipient']) //emit 收件人資料
//監聽 收件人姓名 電話傳給父元件
watch([recipientName, phoneNumber], ([newName, newPhone]) => {
  emit('updateRecipient', {
    name: newName,
    phone: newPhone,
  })
})
// 勾選時，自動套用顧客資料
watch(sameAsCustomer, (checked) => {
  if (checked) {
    recipientName.value = props.customerName || ''
    phoneNumber.value = props.customerPhone || ''
  }
})


// 只允許數字，限制最多 10 碼
const phoneInput = (event) => {
  phoneNumber.value = event.target.value.replace(/\D/g, '').slice(0, 10)
}
</script>

<style scoped lang="scss">
// 購物車
.customer_info {
  border: 1px solid #ccc; // 外框線
  width: 100%;
  background: white;

  .customer_info_header {
    display: flex;
    justify-content: space-between;
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

    p {
      margin-right: 20px;
    }
  }

  .customer_info_content {
    font-family: 'Roboto Mono', monospace;
    padding: 15px 25px;
    font-size: 10px;

    .custom_input {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      p {
        color: #9A9A9A;
        margin-left: 10px;
      }
    }

    .customer_info_fields {
      margin-bottom: 8px;

      h2 {
        margin-bottom: 6px;
      }

      input {
        width: 100%;
        border: 1px solid #d9d9d9;
        min-height: 25px;
      }
    }

    .customer_eamil {
      margin-bottom: 15px;
    }
  }
}
</style>
