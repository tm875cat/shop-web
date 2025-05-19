<template>
    <div class="home_page">
        <!-- 商品圖區域 -->
        <div class="product_area">
            <Swiper :modules="[Pagination, Autoplay]" :pagination="{ clickable: true }" :loop="true"
                :autoplay="{ delay: 3000 }" class="mySwiper">
                <SwiperSlide v-for="(image, index) in images" :key="index">
                    <img :src="image" alt="產品圖片" />
                </SwiperSlide>
            </Swiper>
        </div>
        <!-- 全部商品按鈕 -->
        <div class="shop_all_area">
            <RouterLink to="/all-product"> <button class="shop_all_buutton">SHOP ALL</button></RouterLink>
        </div>
        <Footer />

    </div>

</template>
<script setup>
import { RouterLink } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
// 匯入 Swiper 樣式
import 'swiper/css'
import 'swiper/css/pagination'
import Footer from '@/components/Footer.vue'

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
.home_page {
    padding: 0 20px;

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
            cursor: pointer;
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

}
</style>