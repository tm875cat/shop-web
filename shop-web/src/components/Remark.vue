<template>
    <!-- 備註 -->
    <div class="customer_info">
        <div class="customer_info_header">
            <h2>備註</h2>
        </div>
        <div class="customer_info_content">
            <div class="customer_info_fields ">
                <h2>有甚麼要告訴賣家的嗎</h2>
                <textarea placeholder="" v-model="messageForSeller"></textarea>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const messageForSeller = ref('') //給賣家的訊息
const emit = defineEmits(['updateMessageForSeller']) //emit 給賣家的訊息
//監聽 給賣家的訊息傳給父元件
watch(messageForSeller, (newVal) => {
    emit('updateMessageForSeller', {
        messageForSeller: newVal,
    })
})

</script>

<style scoped lang="scss">
// 備註
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

            textarea {
                width: 100%;
                border: 1px solid #d9d9d9;
                min-height: 83px;
                resize: none; //  不允許使用者調整大小
            }
        }

    }
}
</style>
