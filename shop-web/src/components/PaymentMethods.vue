<template>
    <!-- 付款方式 -->
    <div class="customer_info">
        <div class="customer_info_header">
            <h2>付款方式</h2>
            <p>{{ payment }}付款</p>
        </div>
        <!-- 信用卡付款 -->
        <div class="customer_info_content" v-if="payment == '信用卡'">
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

            <div class="customer_info_fields illustrate">
                附上金流服務說明
            </div>
        </div>
        <!-- 轉帳付款 -->
        <div class="customer_info_content" v-else-if="payment == '轉帳'">
            <div class="customer_info_fields">
                <h2>請提供
                    <span>轉帳帳號末五碼</span>
                    以方便我們查詢！
                </h2>
                <input type="text" v-model="transferAccount" @input="onInputAccount" />
            </div>

            <div class="customer_info_fields">
                <h2>收款人:詹蕙瑜
                </h2>
                <p>帳戶：彰化銀行（009）123456789086</p>

            </div>
            <div class="customer_info_fields">
                <p>完成轉帳我們會盡快寄信通知已完成訂單消息！</p>
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
const transferAccount = ref('')//轉帳帳號末五碼
// 接收父元件的付款方式
const props = defineProps({
    payment: String//付款方式
})
//轉帳帳號末五碼輸入限制
const onInputAccount = (e) => {
    // 只留數字，限制 5 碼
    transferAccount.value = e.target.value.replace(/\D/g, '').slice(0, 5)
}
const emit = defineEmits(['updateCustomer']) //emit 付款資料
//監聽 付款資料
watch([cardNumber, cardholderName, validity, cvs, transferAccount], ([newCardNumber, newCardholderName, newValidity, newCvs, newTransferAccount]) => {
    emit('updatePayment', {
        cardNumber: newCardNumber,
        cardholderName: newCardholderName,
        validity: newValidity,
        cvs: newCvs,
        transferAccount: newTransferAccount
    })
})

</script>

<style scoped lang="scss">
// 付款方式
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

                span {
                    font-weight: bold;
                }
            }

            input {
                width: 100%;
                border: 1px solid #d9d9d9;
                min-height: 25px;
            }


        }

        .illustrate {
            color: #CBCBCB;
        }

    }
}
</style>
