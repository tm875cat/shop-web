<template>
    <div class="product_page" v-if="product">
        <!-- 主要圖片 -->
        <div class="main_pic">
            <img :src="product.pic1" :alt="product.name" />

        </div>
        <!-- 其他圖片清單 -->
        <div class="pic_list">
            <img v-for="(img, index) in getAllPics(product)" :key="index" :src="img"
                :alt="product.name + ' 圖片' + (index + 1)" />
        </div>
        <!-- 商品資訊 -->
        <div class="product_info">
            <div class="title">
                <h2>{{ product.no }}</h2>
                <h2>{{ product.describe + product.name }}</h2>
            </div>
            <div class="price">
                <p>NT${{ product.price }}</p>
            </div>
            <!-- 下拉式選單 -->
            <div class="select_bar">
                <div class="color_bar">
                    <h3>顏色</h3>
                    <select v-model="selectedColor">
                        <option v-for="(color, index) in product.color" :key="index" :value="color">
                            {{ color }}
                        </option>
                    </select>
                </div>
                <div class="size_bar">
                    <h3>尺寸</h3>
                    <select v-model="selectedSize">
                        <option v-for="(size, index) in product.size" :key="index" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>

            </div>
            <!-- 商品數量選擇 -->
            <div class="count_select">
                <IconMinus />
                <p>1</p>
                <IconAdd />
            </div>
            <button class="shop_car">加入購物車</button>


        </div>
        <!-- 商品描述及購物須知 -->
        <div class="describe_and_tips">
            <!-- 選擇按鈕 -->
            <div class="select_option">
                <button :class="{ active: activeTab === 'describe' }" @click="activeTab = 'describe'">
                    商品描述
                </button>
                <button :class="{ active: activeTab === 'tips' }" @click="activeTab = 'tips'">
                    購物須知
                </button>
            </div>

            <!-- 顯示內容 -->
            <div class="content">
                <div v-if="activeTab === 'describe'" class="describe">
                    <!-- 商品描述內容 -->
                    這裡是商品描述。
                </div>
                <div v-else class="tips">
                    <!-- 購物須知內容 -->
                    這裡是購物須知。
                </div>
            </div>
        </div>

    </div>
    <div v-else>
        <p>找不到商品</p>
    </div>

</template>
<script setup>
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { computed, ref, watchEffect } from 'vue'
//Icon引入
import IconAdd from '@/components/icons/IconAdd.vue'
import IconMinus from '@/components/icons/IconMinus.vue'

const route = useRoute()
const productStore = useProductStore()

// 從 route.params 拿到 id，並轉成數字
const productId = Number(route.params.id)

// 找到對應的商品
const product = computed(() =>
    productStore.products.find(p => p.id === productId)
)
//商品圖片塞入陣列
const getAllPics = (product) => {
    return [product.pic, product.pic1, product.pic2, product.pic3];
};
// ------------------------function-----------------------
// @下拉式選單邏輯
//選擇顏色
const selectedColor = ref('')  // 顏色 預設空避免報錯
// 使用 watchEffect 監聽 product 的變化
watchEffect(() => {
    // 確認 product 已經有值且顏色陣列存在且有長度
    if (product.value && product.value.color && product.value.color.length > 0) {
        // 只有當 selectedColor 還沒設定值時，才將它設成第一個顏色
        selectedColor.value = selectedColor.value || product.value.color[0]
        //如果還沒設定過預設值，設為第一個顏色
        if (!selectedColor.value) {
            selectedColor.value = product.value.color[0]
        }
    }
})
//選擇尺寸
const selectedSize = ref('')  // 尺寸 預設空避免報錯
// 使用 watchEffect 監聽 product 的變化
watchEffect(() => {
    // 確認 product 已經有值且尺寸陣列存在且有長度
    if (product.value && product.value.size && product.value.size.length > 0) {
        // 只有當 selectedSize 還沒設定值時，才將它設成第一個尺寸
        selectedSize.value = selectedSize.value || product.value.size[0]
        //如果還沒設定過預設值，設為第一個尺寸
        if (!selectedSize.value) {
            selectedSize.value = product.value.size[0]
        }
    }
})
//@商品描述及購物提醒切換紐邏輯
// 控制目前選中的區塊（預設顯示商品描述）
const activeTab = ref('describe')
</script>
<style lang="scss">
// 主要圖片
.product_page {

    .main_pic {
        width: 100%;

        img {
            width: 100%;
        }
    }

    // 其他圖片清單
    .pic_list {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        img {
            width: 23%;
            aspect-ratio: 1 / 1; // 正方形
            object-fit: cover; // 裁切圖片來填滿容器
        }
    }

    // 商品資訊
    .product_info {
        margin-left: 10px;

        // 商品標題
        .title {
            display: flex;
            align-items: center;
            margin-top: 20px;

            h2:nth-of-type(1) {
                margin-right: 10px;
            }

            h2 {
                line-height: 1;
                font-family: 'Roboto Mono', monospace;
                font-size: 20px;
            }
        }

        //價格
        .price {
            margin-top: 15px;

            p {
                font-family: 'Roboto Mono', monospace;
                color: rgba(167, 64, 72, 1);
                font-size: 20px;
                font-weight: bold;
            }
        }

        //下拉式選單
        .select_bar {
            margin-top: 10px;
            margin-bottom: 50px;

            select {
                font-size: 12px;
                color: rgba(154, 154, 154, 1); // 字體顏色
                background-color: rgba(245, 245, 245, 1); // 背景顏色
                border: none; // 移除邊框
                outline: none; // 移除聚焦時的藍色外框
                width: 100%; // 設定寬度
                height: 30px; // 設定高度
                appearance: none; // 移除預設的下拉箭頭（各瀏覽器兼容）
                -webkit-appearance: none;
                -moz-appearance: none;
                padding-left: 20px;
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

            h3 {
                font-size: 10px;
                color: rgba(154, 154, 154, 1);
                font-family: 'Roboto Mono', monospace;
                margin-left: 5px;
                margin-bottom: 5px;
            }

            .color_bar {
                margin-bottom: 50px;
            }

        }

        .count_select {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 35px;

            p {
                font-family: 'Roboto Mono', monospace;
                font-size: 15px;
                font-weight: bold;
                color: rgba(154, 154, 154, 1);
            }
        }

        .shop_car {
            margin-top: 35px;
            font-family: 'Anonymous Pro', monospace;
            color: white;
            font-weight: bold;
            width: 100%; // 與圖片同寬
            height: 33px;
            background-color: rgba(167, 64, 72, 1);
            border: 0;
            color: white;
            font-size: 14px;
            cursor: pointer;
        }
    }

    //商品描述及購物須知
    .describe_and_tips {
        margin-top: 100px;

        .select_option {
            display: flex;
            justify-content: space-between;

            button {
                width: 48%;
                background: none;
                border: none;
                border-bottom: 2px solid rgba(217, 217, 217, 1);
                font-family: 'Roboto Mono', monospace;
                font-size: 16px;
                cursor: pointer;
                color: #333;
                padding: 4px 8px;
                transition: all 0.3s ease;

                // 滑鼠懸停效果
                &:hover {
                    opacity: 0.8;
                }

                //  被選中時（點了之後）套用樣式
                &.active {
                    color: #a74048;
                    border-bottom: 4px solid #a74048;


                }
            }
        }

    }
}
</style>