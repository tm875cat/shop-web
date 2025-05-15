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
                <div class="pic">
                    <img :src="product.pic" :alt="product.name" @click.stop="toggleButton(product.id)">
                    <button v-if="activeProductId === product.id" @click="goToProduct(product.id)">加入購物車</button>
                </div>

                <div class="title">
                    <h2>{{ product.no }} {{ product.describe }}</h2>
                </div>
                <h3>{{ product.name }}</h3>
                <p>NT${{ product.price }} </p>
                <p class="original_price">NT${{ product.originalPrice }}</p>
                <button @click="goToProduct(product.id)">加入購物車</button>
            </div>
        </div>

        <!-- 分頁按鈕 -->
        <div class="pagination">
            <button @click="prevPageWindow" :disabled="pageWindowStart <= 1" class="arrow_button prev_button"></button>

            <div class="page_numbers">
                <button v-for="page in visiblePageNumbers" :key="page" :class="{ active: currentPage === page }"
                    @click="goToPage(page)">
                    {{ page }}
                </button>
            </div>

            <button @click="nextPageWindow" :disabled="pageWindowStart + pageWindowSize > totalPages"
                class="arrow_button next_button"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
const isSortOpen = ref(false)// 排序方式的下拉式選單是否開啟
const isItemOpen = ref(false)// 每頁筆數的下拉式選單是否開啟
const sortOption = ref('') // 商品排序方式預設由新到舊
// 假資料
import { useProductStore } from '@/stores/productStore'
const productStore = useProductStore()
// ------------------function----------------------
// @頁面跳轉
import { useRouter } from 'vue-router'
function goToProduct(productId) {
    router.push({ name: 'product', params: { id: productId } })
}
const router = useRouter()
// @購物車按鈕顯示邏輯
const activeProductId = ref(null)// 用來記錄目前哪一個商品的「加入購物車」按鈕正在顯示（透過商品 id 區分）

// 切換某商品的按鈕顯示狀態，如果目前是該商品就關閉，否則顯示它
function toggleButton(id) {
    activeProductId.value = activeProductId.value === id ? null : id
}
// 點擊頁面其他地方時，關閉按鈕（只有點擊不在 .pic 元素內時才會執行）
function handleClickOutside(event) {
    const clickedInside = event.target.closest('.pic') // 判斷點擊位置是否在 .pic 元素內
    if (!clickedInside) {
        activeProductId.value = null
    }
}
// 掛載時綁定全頁的點擊事件
onMounted(() => {
    window.addEventListener('click', handleClickOutside)
})

// 元件卸載時移除事件監聽，避免記憶體洩漏
onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
})
// @排序邏輯
// sortedProducts：根據 sortOption 對商品做排序
const sortedProducts = computed(() => {
    let sorted = [...productStore.products]
    if (sortOption.value === 'priceHigh') {
        sorted.sort((a, b) => b.price - a.price)
    } else if (sortOption.value === 'priceLow') {
        sorted.sort((a, b) => a.price - b.price)
    } else {
        sorted.sort((a, b) => b.id - a.id) // 預設為由新到舊
    }
    return sorted
})
// @分頁邏輯
const itemsPerPage = ref(6) // 每頁顯示幾筆商品
const currentPage = ref(1) // 當前頁數
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
// @底層分頁按鈕邏輯
const pageWindowStart = ref(1) // 當前頁碼視窗起始頁，例如 1～5
const pageWindowSize = 3       // 每次最多顯示幾個頁碼

// 動態計算目前要顯示哪些頁碼
const visiblePageNumbers = computed(() => {
    const pages = []
    const end = Math.min(pageWindowStart.value + pageWindowSize - 1, totalPages.value)
    for (let i = pageWindowStart.value; i <= end; i++) {
        pages.push(i)
    }
    return pages
})

// 點擊左箭頭時，頁碼視窗往左移
function prevPageWindow() {
    if (pageWindowStart.value > 1) {
        pageWindowStart.value -= pageWindowSize
    }
}

// 點擊右箭頭時，頁碼視窗往右移
function nextPageWindow() {
    if (pageWindowStart.value + pageWindowSize <= totalPages.value) {
        pageWindowStart.value += pageWindowSize
    }
}

// 點數字切換頁面
function goToPage(page) {
    currentPage.value = page
}
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

// 分頁 排序選單
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

//商品清單
.product_list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
}

.product_card {
    // outline: red solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(50% - 4px);
    /* 兩欄，每欄佔 50%  */
    box-sizing: border-box;
    border-radius: 8px;
    margin-bottom: 20px;

    .pic {

        position: relative;

        img {
            width: 100%;
        }

        button {
            font-family: 'Anonymous Pro', monospace;
            color: white;
            font-weight: bold;
            width: 100%; // 與圖片同寬
            height: 33px;
            background-color: rgba(167, 64, 72, 1);
            border: 0;
            position: absolute;
            bottom: 0; // 貼底
            left: 0;
            color: white;
            font-size: 14px;
            cursor: pointer;
        }

        margin-bottom: 20px;
    }


    // 標題ex:A01 本期推薦
    .title {
        margin-bottom: 15px;

        h2 {
            font-family: 'Tenor Sans', sans-serif;
        }
    }

    // 品名
    h3 {
        font-weight: bold;
        font-family: 'Anonymous Pro', monospace;
        margin-bottom: 15px;
    }

    //價格
    p {
        font-family: 'Tenor Sans', sans-serif;
        margin-bottom: 5px;
    }

    // 原價
    .original_price {
        text-decoration: line-through; //劃掉
        color: rgba(203, 203, 203, 1);
    }

    //加入購物車按鈕
    button {
        font-family: 'Anonymous Pro', monospace;
        color: white;
        font-weight: bold;
        width: 130px;
        height: 33px;
        background-color: rgba(167, 64, 72, 1);
        border: 0;
    }
}

// 分頁按鈕
.pagination {

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;

    .arrow_button {
        background-color: transparent; // 移除背景色
        border: none;
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 12px 8px;
        cursor: pointer; //滑鼠變樣式
        border-radius: 50%;

        // 往左按鈕
        &.prev_button {


            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(203,203,203,1)' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");

            transform: rotate(90deg);
            /* 左箭頭需要旋轉180度 */
        }

        // 往右按鈕
        &.next_button {
            background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(203,203,203,1)' stroke-width='2' fill='none' fill-rule='evenodd'/%3E%3C/svg%3E");

            transform: rotate(270deg);
        }

        &:disabled {
            display: none;
        }
    }

    // 分頁按鈕數字
    .page_numbers {
        display: flex;
        gap: 15px;

        button {
            font-family: 'Roboto', sans-serif;
            background-color: transparent;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 14px;
            color: rgba(203, 203, 203, 1);

            &.active {
                background-color: rgba(167, 64, 72, 1);
                color: white;
            }

            &:hover:not(.active) {
                background-color: #f0f0f0;
            }
        }
    }
}
</style>