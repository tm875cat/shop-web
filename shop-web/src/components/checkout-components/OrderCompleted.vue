<template>
    <!-- 訂單完成 -->
    <div class="order_completed">
        <div class="order_completed_item">
            <IconRedStore class="icon" />
        </div>
        <div class="order_completed_item">
            <h2>訂單已完成</h2>
        </div>
        <div class="order_completed_item">
            <p>請注意簡訊及信箱通知出貨資訊呦</p>
        </div>
        <div class="order_completed_item">
            <button>返回首頁</button>
        </div>
    </div>

</template>

<script setup>
import IconRedStore from '@/components/icons/IconRedStore.vue' //自訂勾選框
</script>

<style scoped lang="scss">
.order_completed {
    margin-top: 100px;

    .order_completed_item {
        .icon {
            width: 96px;
            height: 88px;
        }

        display: flex;
        justify-content: center;
        font-family: 'Roboto Mono',
        monospace;

        h2 {
            margin-top: 25px;
            font-size: 32px;
            font-weight: 700;
        }

        p {
            margin-top: 16px;

            font-size: 14px;
        }

        button {
            margin-top: 65px;
            width: 100%;
            height: 40px;
            color: white;
            background-color: rgba(167, 64, 72, 1);
            border: none;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }
    }
}
</style>
