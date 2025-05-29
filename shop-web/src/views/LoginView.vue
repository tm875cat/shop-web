<template>
    <div class="login_page">
        <!-- 歡迎 -->
        <div class="welcome">
            <h1>歡迎</h1>
            <p>登入或註冊以便繼續</p>
        </div>
        <!-- 輸入框區域 -->
        <div class="login_input">
            <input v-if="loginStep == '1'" type="text" v-model="emailInput" placeholder="電子信箱" />
            <input v-else-if="loginStep == '2'" type="text" v-model="pswInput" placeholder="密碼" ref="pswInputRef" />
            <button v-if="loginStep == '1'" class="login_btn" @click="emailVerify()">繼續</button>
            <button v-else-if="loginStep == '2'" class="login_btn" @click="pswVerify()">開始購物</button>
            <button class="forget_psw">忘記密碼?</button>
        </div>
        <!-- 註冊區域 -->
        <div class="to_apply">
            <h2>還不是會員?</h2>
            <button @click="goToApply()">註冊會員</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useUserDataStore } from '@/stores/userDataStore' //現有所有會員資料(用來登入比對)
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const loginStep = ref('1');//登入步驟1要輸入email 2輸入密碼
const emailInput = ref('');//信箱輸入框
const pswInput = ref('');//密碼輸入框
const pswInputRef = ref(null) // 新增 ref用來聚焦到此input
// 按 Enter 鍵根據登入步驟狀態觸發事件
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        if (loginStep.value === '1') {
            emailVerify()
        } else if (loginStep.value === '2') {
            pswVerify()
        }
    }
}
//要輸入密碼時自動聚焦密碼輸入框
watch(loginStep, async (newVal) => {
    if (newVal === '2') {
        await nextTick() // 等待 DOM 更新完成
        pswInputRef.value?.focus()
    }
})

// @登入驗證
const allUsersStore = useUserDataStore() //現有全部會員資料
const currentUserStore = userStore() //目前登入會員
// 信箱驗證
function emailVerify() {
    const foundUser = allUsersStore.users.some((user) => user.email === emailInput.value)
    if (!foundUser) {
        alert('查無此 Email')
        return
    }
    loginStep.value = "2"
    return
}
// 密碼驗證
function pswVerify() {
    const foundUser = allUsersStore.users.find(
        (user) => user.email === emailInput.value
    )

    if (!foundUser) {
        alert('查無此 Email') //在驗一次email
        return
    }

    if (foundUser.password !== pswInput.value) {
        alert("密碼錯誤")
        return
    }

    //  正確登入，將該使用者資料存入目前 userStore
    currentUserStore.user = { ...foundUser }
    goToAnti()

}

// 進來先登出
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)//綁鍵盤enter事件
    currentUserStore.logout()

})
// 離開頁面移除監聽器
onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
})
// @頁面跳轉
import { useRouter } from 'vue-router'
const router = useRouter()
//跳到註冊頁面
function goToApply() {
    router.push({ name: 'apply' })
}
//跳到首頁
function goToAnti() {
    router.push({ name: 'anti' })
}
</script>
<style lang="scss">
// 歡迎
.login_page {
    padding: 0 25px;

    .welcome {
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Roboto Mono', monospace;

        h1 {
            font-size: 32px;
            font-weight: bold;
        }

        p {
            margin-top: 20px;
            font-size: 15px;
        }
    }

    // 輸入框區域
    .login_input {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        font-family: 'Roboto Mono', monospace;

        input {
            font-size: 15px;
            padding-left: 20px;
            border: 1px solid #d9d9d9;
            color: #a74048;
            min-height: 40px;
            margin-bottom: 12px;

            &:focus {
                border: 2px solid #a74048;
                outline: none; // 移除預設外框
            }

            &::placeholder {
                color: #d9d9d9;
            }
        }

        .login_btn {
            cursor: pointer;
            margin-top: 15px;
            width: 100%;
            min-height: 40px;
            background-color: #a74048;
            color: white;
            border: none;
            font-weight: bold;
            letter-spacing: 2px;
        }

        .forget_psw {
            cursor: pointer;
            margin-top: 15px;
            border: none;
            padding: 0;
            background-color: transparent;
            letter-spacing: 0.5px;
            font-family: 'Roboto Mono', monospace;

            line-height: 1;
            display: inline-block; // 讓寬度只跟文字一樣
            width: auto;
            align-self: center; // 這行讓它在 flex 容器中置中
        }
    }

    //   註冊區域
    .to_apply {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'Roboto Mono', monospace;
        margin-top: 40px;

        h2 {
            font-size: 24px;
            font-weight: bold;
        }

        button {
            margin-top: 20px;
            width: 100%;
            min-height: 40px;
            border: #a74048 1px solid;
            background-color: transparent;
            color: #a74048;
            font-weight: bold;
            font-family: 'Roboto Mono', monospace;
            font-size: 16px;
            cursor: pointer;
            letter-spacing: 2px;
        }
    }
}
</style>
