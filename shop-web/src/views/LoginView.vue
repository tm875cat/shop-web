<template>
    <div class="login_page">
        <!-- 歡迎 -->
        <div class="welcome">
            <h1>歡迎</h1>
            <p> 登入或註冊以便繼續</p>
        </div>
        <!-- 輸入框區域 -->
        <div class="login_input">
            <input type="text" v-model="inputText" placeholder="電子信箱" />
            <button>繼續</button>
            <button>忘記密碼
            </button>
        </div>
        <!-- 註冊區域 -->
        <div class="to_apply">
            <h2>還不是會員?</h2>
            <button>註冊會員</button>
        </div>



    </div>
</template>
<script setup></script>
<style lang="scss">
// 歡迎
.login_page {
    .welcome {
        h1 {}

        p {}

    }
}
</style>