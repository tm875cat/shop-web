<template>
  <div class="login_page">
    <!-- 歡迎 -->
    <div class="welcome">
      <h1>歡迎</h1>
      <p>登入或註冊以便繼續</p>
    </div>
    <!-- 輸入框區域 -->
    <div class="login_input">
      <input type="text" v-model="inputText" placeholder="電子信箱" />
      <button class="continue">繼續</button>
      <button class="forget_psw">忘記密碼?</button>
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
      color: #d9d9d9;
      min-height: 40px;
      margin-bottom: 12px;
      &::placeholder {
        color: #d9d9d9;
      }
    }
    .continue {
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
