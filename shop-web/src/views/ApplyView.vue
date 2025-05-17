<template>
  <div class="apply_page">
    <!-- 歡迎 -->
    <div class="welcome">
      <h1>註冊會員</h1>
      <p>快完成了</p>
    </div>
    <!-- 輸入框區域 -->
    <div class="apply_input">
      <input
        type="text"
        v-model="inputName"
        :placeholder="inputNamePlaceholder"
        @click="resetNameError()"
        :class="{ error: inputNameError }"
      />
      <input
        type="text"
        v-model="inputEmail"
        :placeholder="inputEmailPlaceholder"
        @input="inputEmail = filterEnglishSymbols($event.target.value)"
        @click="resetEmailError()"
        :class="{ error: inputEmailError }"
      />
      <input
        type="text"
        v-model="inputPsw"
        :placeholder="inputPswPlaceholder"
        @input="inputPsw = filterEnglishSymbols($event.target.value)"
        @click="resetPswError()"
        :class="{ error: inputPswError }"
      />
    </div>
    <!-- 同意條款 -->
    <div class="argee_input">
      <label>
        <CustomCheckbox v-model="agreeNews" />
        <p>我願意接收 品牌 的最新優惠消息和服務推廣相關資訊</p>
      </label>
      <label>
        <CustomCheckbox v-model="agreeTerms" />
        <p>我同意網站 <span>服務條款</span>和 <span>隱私權政策</span></p>
      </label>
      <button @click="apply()">即將完成</button>
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
import CustomCheckbox from '@/components/CustomCheckbox.vue' //自訂勾選框
import { useUserDataStore } from '@/stores/userDataStore' //現有會員資料
import { onMounted } from 'vue'
// 載入之前註冊的會員資料
onMounted(() => {
  store.loadFromStorage()
})
// @@註冊邏輯
const inputName = ref('') //用戶名
const inputNamePlaceholder = ref('用戶名') //用戶名Placeholder
const inputNameError = ref(false) //用戶名error顯示
const inputEmail = ref('') //電子信箱
const inputEmailPlaceholder = ref('電子信箱') //電子信箱Placeholder
const inputEmailError = ref(false) //電子信箱error顯示
const inputPsw = ref('') //密碼
const inputPswPlaceholder = ref('密碼') //密碼Placeholder
const inputPswError = ref(false) //密碼error顯示

const agreeTerms = ref(false) //同意條款
const agreeNews = ref(false) //同意最新消息
//限定只能打英文數字及符號
const filterEnglishSymbols = (value) => {
  return value.replace(/[^\x00-\x7F]/g, '')
}

const store = useUserDataStore() //現有會員資料

//@註冊
const apply = () => {
  if (
    isUsernameInvalid(inputName.value) ||
    isEmailFormatValid(inputEmail.value) ||
    isEmailDuplicate(inputEmail.value) ||
    isPasswordValid(inputPsw.value)
  ) {
    return
  }
  if(!agreeTerms.value){
    alert("請勾選同意服務條款")
    return
  }
  // 建立新會員
  const newUser = {
    username: inputName.value,
    email: inputEmail.value,
    password: inputPsw.value,
    pic: '',
    shopcar: [],
  }

  // 存入 Store
  store.users.push(newUser)

  // 清空表單
  resetForm()

  alert('註冊成功！')
}
// test@example.com
// 檢查信箱是否已存在
const isEmailDuplicate = (email) => {
  const exists = store.users.some((user) => user.email === email)
  if (exists) {
    inputEmail.value = ''
    inputEmailPlaceholder.value = '此信箱已經註冊過，請使用其他信箱。'
    inputEmailError.value = true
    setTimeout(() => {
      inputEmailPlaceholder.value = '電子信箱'
      inputEmailError.value = false
    }, 2000)
    console.log('此信箱已經註冊過，請使用其他信箱。');
    
    return true
  }
  return false
}
// 檢查 Email 格式是否正確
const isEmailFormatValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
     inputEmail.value = ''
    inputEmailPlaceholder.value = '請輸入正確格式的電子信箱'
    inputEmailError.value = true
    setTimeout(() => {
      inputEmailPlaceholder.value = '電子信箱'
      inputEmailError.value = false
    }, 2000)
    console.log("請輸入正確格式的電子信箱");
    return true
  }
  return false
}
// Email檢察錯誤時還原動畫
const resetEmailError = () => {
  inputEmailPlaceholder.value = '電子信箱' // 立刻復原 placeholder 文字
  inputEmailError.value = false // 移除錯誤狀態
}
// 用戶名檢察
const isUsernameInvalid = (name) => {
  if (!name.trim()) {
    inputNamePlaceholder.value = '用戶名不可為空!!'
    inputNameError.value = true
    setTimeout(() => {
      inputNamePlaceholder.value = '用戶名'
      inputNameError.value = false
    }, 2000)
    console.log("用戶名不可為空");
    
    return true
  }
  const duplicate = store.users.some((user) => user.username === name)
  if (duplicate) {
    inputName.value = ''
    inputNamePlaceholder.value = '用戶名已被使用!!'
    inputNameError.value = true
    setTimeout(() => {
      inputNamePlaceholder.value = '用戶名'
      inputNameError.value = false
    }, 2000)
    console.log("用戶名已被使用");
    return true
  }
  return false
}
// 用戶名檢察錯誤時還原動畫
const resetNameError = () => {
  inputNamePlaceholder.value = '用戶名' // 立刻復原 placeholder 文字
  inputNameError.value = false // 移除錯誤狀態
}
// 密碼檢查
const isPasswordValid = (password) => {
  if (password.length < 8) {
    inputPswPlaceholder.value = '密碼長度需至少8位數'
    inputPswError.value = true
    setTimeout(() => {
      inputPswPlaceholder.value = '密碼'
      inputPswError.value = false
    }, 2000)
    console.log('密碼長度需至少8位數');
    
    return true
  }
  return false
}
// 密碼檢察錯誤時還原動畫
const resetPswError = () => {
  inputPswPlaceholder.value = '密碼' // 立刻復原 placeholder 文字
  inputPswError.value = false // 移除錯誤狀態
}
// 清空表單
const resetForm = () => {
  inputName.value = ''
  inputEmail.value = ''
  inputPsw.value = ''
  agreeTerms.value = false
  agreeNews.value = false
}
</script>
<style lang="scss">
.apply_page {
  // 歡迎
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
  //   輸入框區域
  .apply_input {
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
      // 錯誤訊息
      &.error {
        border: 2px solid #a74048;
        color: #a74048;
        animation: text-flash 1s ease-in-out;
        &::placeholder {
          color: #a74048;
          animation: text-flash 1s ease-in-out;
        }
      }
    }

    @keyframes flash {
      0%,
      100% {
        color: #a74048;
      }
      50% {
        color: transparent;
      }
    }
  }
  //   同意條款
  .argee_input {
    display: flex;
    flex-direction: column;
    font-family: 'Roboto Mono', monospace;
    font-size: 15px;
    label {
      width: 100%;
      display: flex;
      align-items: center;
      color: #9a9a9a;
      p {
        margin-left: 10px;
        span {
          font-weight: bold;

          cursor: pointer;
          color: #a74048;
        }
      }
    }
    button {
      cursor: pointer;
      margin-top: 15px;
      width: 100%;
      min-height: 40px;
      background-color: #a74048;
      color: white;
      border: none;
      font-family: 'Roboto Mono', monospace;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }
  //   註冊區域
  .to_login {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto Mono', monospace;
    font-weight: bold;
    font-size: 24px;
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
