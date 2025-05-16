<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'

</script>

<template>
  <div class="layout">
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>

</template>

<style scoped>
/* 引入字體 */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro&display=swap');


/* 通用頁面寬度與左右邊距設定 */
.layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 頁面切換動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
