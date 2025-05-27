<template>
    <!-- 付款方式 -->
    <div class="customer_info">
        <div class="customer_info_header">
            <h2>付款方式</h2>
            <p>{{ payment }}付款</p>
        </div>
        <div class="customer_info_content" v-if="payment == '轉帳'">
            <div class="customer_info_fields">
                <h2>卡號</h2>
                <input type="text" v-model="cardNumber" />
            </div>
            <div class="customer_info_fields">
                <h2>持卡人姓名</h2>
                <input type="text" v-model="cardholderName" />
            </div>
            <div class="customer_info_fields">
                <h2>有效期（ＭＭ/ＹＹ）</h2>
                <input type="text" v-model="validity" />
            </div>
            <div class="customer_info_fields">
                <h2>安全碼</h2>
                <input type="text" v-model="cvs" />
            </div>

            <div class="customer_info_fields">
                附上金流服務說明
            </div>
        </div>
        <div class="customer_info_content" v-else-if="payment == '信用卡'">
            <div class="customer_info_fields">
                <h2>卡號</h2>
                <input type="text" v-model="cardNumber" />
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const cardNumber = ref('') //卡號
const cardholderName = ref('') //持卡人姓名
const validity = ref('') //有效期
const cvs = ref('') //安全碼
// 接收父元件的付款方式
const props = defineProps({
    payment: String//付款方式
})
const emit = defineEmits(['updateCustomer']) //emit 收件人資料
//監聽 收件人姓名 電話傳給父元件
watch([cardNumber, cardholderName, validity, cvs], ([newCardNumber, newCardholderName, newValidity, newCvs]) => {
    emit('updatePayment', {
        cardNumber: newCardNumber,
        cardholderName: newCardholderName,
        validity: newValidity,
        cvs: newCvs
    })
})

</script>

<style scoped lang="scss">
// 購物車
.customer_info {
    border: 1px solid #ccc; // 外框線
    width: 100%;
    background: white;

    .customer_info_header {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 15px;
        border-bottom: 1px solid #ddd;
        font-family: 'Roboto Mono', monospace;
        height: 40px;
        letter-spacing: 1px; //  字距設定
        justify-content: space-between;

        p {
            margin-right: 20px;
        }

        h2 {
            margin-left: 20px;
        }
    }

    .customer_info_content {
        font-family: 'Roboto Mono', monospace;
        padding: 15px 25px;
        font-size: 10px;

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
