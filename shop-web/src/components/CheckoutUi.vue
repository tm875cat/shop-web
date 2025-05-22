<template>
  <!-- 結帳畫面進度條 -->
  <div class="check_UI">
    <!-- Step 1 -->
    <div class="step_group">
      <div class="circle_container">
        <div :class="['round', { active: shopState >= 1 }]">1</div>
        <div class="line" :class="{ active: shopState >= 2 }"></div>
      </div>
      <p>購物車</p>
    </div>

    <!-- Step 2 -->
    <div class="step_group">
      <div class="circle_container">
        <div :class="['round', { active: shopState >= 2 }]">2</div>
        <div class="line" :class="{ active: shopState >= 3 }"></div>
      </div>
      <p>填寫資料</p>
    </div>

    <!-- Step 3 -->
    <div class="step_group">
      <div class="circle_container">
        <div :class="['round', { active: shopState >= 3 }]">3</div>
      </div>
      <p>訂單確認</p>
    </div>
  </div>
</template>

<script setup>
// 傳入目前步驟狀態 1~3
const props = defineProps({
  shopState: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.check_UI {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  font-family: 'Roboto Mono', monospace;
}

.step_group {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  text-align: center;

  p {
    margin-top: 10px;
    font-size: 12px;
    color: #515151;
  }
}

.circle_container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.round {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e5e5e5;
  color: #6d6d6d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  z-index: 2;
}

.round.active {
  background-color: #a74048;
  color: white;
}

.line {
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  position: absolute;
  height: 5px;
  background-color: #e5e5e5;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateX(20px);
  z-index: 1;
}

.line.active {
  background-color: #a74048;
}
</style>
