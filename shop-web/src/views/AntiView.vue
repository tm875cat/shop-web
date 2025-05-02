<template>
    <header>
        <div class="menu" @click="toggleLeftMenu">
            <span :class="{ left_open: isLeftOpen }"></span>
            <span :class="{ left_open: isLeftOpen }"></span>
            <span :class="{ left_open: isLeftOpen }"></span>
        </div>

        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <div class="right_icon">
            <IconSearch class="icon_search" />
            <IconShop class="icon_shop" />
        </div>

    </header>
    <!-- 商品圖區域 -->
    <div class="product_area">
        <Swiper :modules="[Pagination, Autoplay]" :pagination="{ clickable: true }" :loop="true"
            :autoplay="{ delay: 3000 }" class="mySwiper">
            <SwiperSlide v-for="(image, index) in images" :key="index">
                <img :src="image" alt="產品圖片" />
            </SwiperSlide>
        </Swiper>
    </div>
    <div class="shop_all_area">
        <button class="shop_all_buutton">SHOP ALL</button>
    </div>
    <footer>
        <div class="text_area">
            <div class="shop_name">店名店名內容</div>
            <div class="taxpayer_iD">統一編號 | 12345678</div>
        </div>

    </footer>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
// 匯入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/pagination'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconShop from '@/components/icons/IconShop.vue'
import { ref } from 'vue'

// 左側彈出選單
const isLeftOpen = ref(false)
function toggleLeftMenu() {
    isLeftOpen.value = !isLeftOpen.value
}
//商品輪播圖
// 自動匯入 product 資料夾的圖片
const imageModules = import.meta.glob('@/assets/product/*.png', { eager: true })
const images = Object.values(imageModules).map(m => m.default)
const currentIndex = ref(0)
//圖片變動
function goToSlide(index) {
    currentIndex.value = index
}
</script>

<style lang="scss" scoped>
header {
    margin-top: 50px;
    width: 100%;
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;

    .menu {
        margin-left: 16.25px;
        position: relative;
        width: 30px;
        height: 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;

        span {
            position: absolute;
            width: 100%;
            height: 1.5px;
            background: #333;
            border-radius: 2px;
            transition: 0.3s;

            &:nth-child(1) {
                top: 0;
                /* 第一條線在上 */
            }

            &:nth-child(2) {
                width: 60%;
                /* 第二條線縮短 */
                top: 50%;
            }

            &:nth-child(3) {
                bottom: 0;
                /* 第三條線在下 */
            }

            &.left_open:nth-child(1) {
                transform: rotate(45deg) translate(5px, 9.5px);
                /* 第一條旋轉並偏移 */
            }

            &.left_open:nth-child(2) {
                opacity: 0;
                /* 第二條線隱藏 */
            }

            &.left_open:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -9.5px);
                /* 第三條旋轉並偏移 */
            }
        }
    }

    .logo {
        width: 121px;
        height: 20px;
        position: relative;
        bottom: 5px;
    }

    .right_icon {
        margin-right: 23px;

        .icon_search {
            margin-right: 16px;
        }

        .icon_shop {}
    }


}

.dropdown {
    position: absolute;
    top: 30px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    padding: 10px;
    z-index: 1000;

    li {
        margin: 5px 0;
    }

    a {
        text-decoration: none;
        color: #333;
    }
}

// 商品圖區域
.product_area {
    margin-top: 40px;
    width: 100%;
    background-color: rgba(167, 64, 72, 1);
    height: 464px;
    position: relative;

    .mySwiper {
        max-width: 600px;
        height: 100%;
    }

    .mySwiper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

}

// SHOP ALL按鈕區域
.shop_all_area {
    display: flex;
    justify-content: center;
    margin-top: 40px;

    .shop_all_buutton {
        color: white;
        font-weight: bold;
        width: 130px;
        height: 33px;
        background-color: rgba(167, 64, 72, 1);
        border: 0;
        font-size: 14px;
        font-family: 'Roboto', sans-serif;
    }
}

// 頁尾
footer {
    display: flex;
    margin-top: 70px;

    .text_area {
        font-weight: bold;
        font-size: 14px;
        margin-left: 40px;

        .shop_name {
            font-family: 'Anonymous Pro', monospace;
        }

        .taxpayer_iD {
            font-family: 'Roboto Mono', monospace;
            margin-top: 5px;
        }
    }
}
</style>