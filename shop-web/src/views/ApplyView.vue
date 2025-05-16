<template>
    <div class="apply_page">
        <!-- 歡迎 -->
        <div class="welcome">
            <h1>註冊會員</h1>
            <p> 快完成了</p>
        </div>
        <!-- 輸入框區域 -->
        <div class="apply_input">
            <input type="text" v-model="inputName" placeholder="用戶名" />
            <input type="text" v-model="inputEmail" placeholder="電子信箱" />
            <input type="text" v-model="inputPsw" placeholder="密碼" />
            <label>
                <input type="checkbox" v-model="agreeNews" />
                我願意接收 品牌 的最新優惠消息和服務推廣相關資訊
            </label>
            <label>
                <input type="checkbox" v-model="agreeTerms" />
                我同意網站服務條款和隱私權政策
            </label>
            <button>即將完成</button>

        </div>
        <!-- 註冊區域 -->
        <div class="to_login">
            <h2>已註冊會員?</h2>
            <button>登入</button>
        </div>



    </div>
</template>
<script setup>
import { ref } from 'vue'
const agreeTerms = ref(false)//同意條款
const agreeNews = ref(false)//同意最新消息

</script>
<style lang="scss">
// 歡迎
.apply_page {
    .welcome {
        h1 {}

        p {}

    }
}
</style>