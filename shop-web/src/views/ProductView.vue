<template>
    <!-- ALL標題 -->
    <div class="all_title_content">
        <h2>ALL</h2>
    </div>
    <div class="product_page">
        <!-- 篩選列 -->
        <div class="filter_bar">

            <select v-model="sortOption" :class="{ open: isSortOpen }" @click="isSortOpen = !isSortOpen"
                @blur="isSortOpen = false">
                <option disabled value="">排序方式</option>
                <option value="newest">由新到舊</option>
                <option value="priceHigh">價格高到低</option>
                <option value="priceLow">價格低到高</option>
            </select>

            <select v-model.number="itemsPerPage" :class="{ open: isItemOpen }" @click="isItemOpen = !isItemOpen"
                @blur="isItemOpen = false">
                <option disabled value="6">每頁顯示數</option>
                <option :value="8">8</option>
                <option :value="10">10</option>
                <option :value="12">12</option>
            </select>
        </div>

        <!-- 商品清單 -->
        <div class="product_list">
            <div v-for="product in visibleProducts" :key="product.id" class="product_card">
                <img :src="product.pic" alt="圖片">
                <div class="title">
                    <h2>{{ product.no }}</h2>
                    <h2>{{ product.describe }}</h2>
                </div>
                <h3>{{ product.name }}</h3>
                <p>NT${{ product.price }} </p>
            </div>
        </div>

        <!-- 分頁按鈕 -->
        <div class="pagination">
            <button @click="currentPage--" :disabled="currentPage <= 1">上一頁</button>
            <button @click="currentPage++" :disabled="currentPage >= totalPages">下一頁</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
const isSortOpen = ref(false)// 排序方式的下拉式選單是否開啟
const isItemOpen = ref(false)// 每頁筆數的下拉式選單是否開啟

const sortOption = ref('') // 商品排序方式預設由新到舊
const itemsPerPage = ref("6") // 每頁顯示幾筆商品
const currentPage = ref(1) // 當前頁數

// 假資料圖片匯入
import product1 from '@/assets/product/product_1.png'
import product2 from '@/assets/product/product_2.png'
import product3 from '@/assets/product/product_3.png'
// 假資料
const products = ref([
    { id: 1, pic: product1, no: "A01", describe: "本期推薦", name: '紅色T-shirt', price: 500 },
    { id: 2, pic: product2, no: "A01", describe: "本期推薦", name: '牛仔褲', price: 900 },
    { id: 3, pic: product3, no: "A01", describe: "本期推薦", name: '白色T-shirt', price: 600 },
    { id: 4, pic: product1, no: "A01", describe: "本期推薦", name: '運動鞋', price: 1500 },
    { id: 5, pic: product2, no: "A01", describe: "本期推薦", name: '毛衣', price: 800 },
    { id: 6, pic: product3, no: "A01", describe: "本期推薦", name: '短裙', price: 700 },
    { id: 7, pic: product1, no: "A01", describe: "本期推薦", name: '長袖T', price: 550 },
    { id: 8, pic: product2, no: "A01", describe: "本期推薦", name: '外套', price: 1200 },
    { id: 9, pic: product3, no: "A01", describe: "本期推薦", name: '涼鞋', price: 400 },
    { id: 10, pic: product1, no: "A01", describe: "本期推薦", name: '休閒帽', price: 300 },
    { id: 11, pic: product2, no: "A01", describe: "本期推薦", name: '牛仔外套', price: 1600 },
    { id: 12, pic: product3, no: "A01", describe: "本期推薦", name: '皮帶', price: 350 },
    { id: 13, pic: product1, no: "A01", describe: "本期推薦", name: '運動褲', price: 850 },
    { id: 14, pic: product2, no: "A01", describe: "本期推薦", name: '涼感衣', price: 520 },
])

// sortedProducts：根據 sortOption 對商品做排序
const sortedProducts = computed(() => {
    let sorted = [...products.value]
    if (sortOption.value === 'priceHigh') {
        sorted.sort((a, b) => b.price - a.price)
    } else if (sortOption.value === 'priceLow') {
        sorted.sort((a, b) => a.price - b.price)
    } else {
        sorted.sort((a, b) => b.id - a.id) // 預設為由新到舊
    }
    return sorted
})

// visibleProducts：計算當前頁數顯示的商品
const visibleProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    return sortedProducts.value.slice(startIndex, endIndex)
})

// totalPages：總頁數
const totalPages = computed(() => {
    return Math.ceil(sortedProducts.value.length / itemsPerPage.value)
})

// 當使用者改變每頁筆數時，重置頁數
watch(itemsPerPage, () => {
    currentPage.value = 1
})
</script>


<style lang="scss">
// ALL標題
.all_title_content {
    display: flex;
    justify-content: center;
    margin-top: 60px;

    h2 {
        position: relative;
        font-size: 24px;
        font-family: 'Roboto', sans-serif;

        // 下底線
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: -10px; // 底線與文字間距
            transform: translateX(-50%);
            width: 64px;
            height: 2px;
            background-color: black; // 底線顏色
        }
    }
}

.product_page {
    overflow-y: auto;
    padding: 16px;
}

.filter_bar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
    margin-bottom: 50px;
    align-items: center;

    select {
        color: rgba(154, 154, 154, 1); // 字體顏色
        background-color: rgba(245, 245, 245, 1); // 背景顏色
        border: none; // 移除邊框
        outline: none; // 移除聚焦時的藍色外框
        width: calc(50% - 8px); // 設定寬度
        height: 30px; // 設定高度
        appearance: none; // 移除預設的下拉箭頭（各瀏覽器兼容）
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-right: 30px; // 預留右邊空間給箭頭
        position: relative; // 設為相對定位，以便放置箭頭
        background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239A9A9A' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E"); //往下箭頭
        background-repeat: no-repeat;
        background-position: right 10px center; // 箭頭位置
        background-size: 10px 6px; // 箭頭尺寸

        &.open {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 5l4 -4 4 4' stroke='%239A9A9A' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
    }
}

.product_list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
}

.product_card {
    width: calc(50% - 4px);
    /* 兩欄，每欄佔 50% - gap 一半 */
    box-sizing: border-box;
    // padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;

    img {
        width: 100%;

    }
}

.loading {
    text-align: center;
    padding: 20px;
    color: #888;
}
</style>