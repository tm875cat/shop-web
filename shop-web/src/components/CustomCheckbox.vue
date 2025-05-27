<template>
  <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)"
    class="custom_checkbox_input" />
</template>

<script setup>
defineProps({
  modelValue: Boolean,
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.custom_checkbox_input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 14px;
  height: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: transparent;
  /* 透明背景 */
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

/* 勾選時 邊框改色，背景仍透明 */
.custom_checkbox_input:checked {
  border-color: #a74048;
  background-color: transparent;
  /* 透明 */
}

/* 勾勾 標記 */
.custom_checkbox_input:checked::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 0.5px;
  width: 3px;
  height: 6px;
  border: solid #a74048;
  /* 勾勾顏色 */
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
