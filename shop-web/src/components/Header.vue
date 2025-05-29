<template>
    <header>
        <!-- 一般狀態 -->
        <div v-if="!isSearchOpen" class="header_content">
            <div class="menu" @click="toggleLeftMenu">
                <span :class="{ left_open: isLeftOpen }"></span>
                <span :class="{ left_open: isLeftOpen }"></span>
                <span :class="{ left_open: isLeftOpen }"></span>
            </div>
            <img src="@/assets/logo.png" alt="Logo" class="logo" @click="goToHome" />
            <div class="right_icon">
                <IconSearch @click="toggleSearch" class="icon_search" />
                <IconShop @click="toggleShopCarMenu" class="icon_shop" />
            </div>
        </div>

        <!-- 搜尋狀態 -->
        <div v-else class="search_content">
            <IconOpenSearch class="icon_open_search" />
            <input type="text" placeholder="  找商品" />
        </div>
    </header>
    <!--遮罩(用來關閉選單) -->
    <div class="left_overlay" v-if="isLeftOpen || isShopCarOpen || isSearchOpen" @click="closeMenu"></div>
    <!-- 左側選單 -->
    <div class="left_side_menu" :class="{ left_open: isLeftOpen }">
        <ul>
            <li><a href="#">本期新上</a></li>
            <li><a href="#">48H現貨專區</a></li>
            <li><a href="#">熱銷安可上架</a></li>
            <li><a href="#">分類</a></li>
            <li><a href="#">注意事項</a></li>
            <li><a href="#">CONTACT US / 官方LINE客服 </a></li>
        </ul>
        <!-- 已登入 -->
        <div v-if="isLogin" class="member_area">
            . <div class="user_field is_login" @click="signout()">
                <img src="@/components/icons/signout.png" alt="登出" />會員登出
            </div>
        </div>
        <!-- 未登入 -->
        <div v-else class="member_area">
            <div class="user_field" @click="goToLogin(), closeMenu()">
                <img src="@/components/icons/member.png" alt="登入" />會員登入
            </div>
            <div class="user_field" @click="goToApply(), closeMenu()">
                <img src="@/components/icons/apply.png" alt="註冊" />新用戶註冊
            </div>
        </div>
    </div>
    <!-- 購物車側邊攔 -->
    <div class="shopcar_menu" :class="{ shopcar_open: isShopCarOpen }">
        <ul>
            <li v-for="product in userShopCar">
                <img :src="product.pic" alt="商品圖">
                <div class="product_info">
                    <h3>{{ product.no }} {{ product.describe }}{{ product.name }}</h3>
                    <p><span>{{ product.color }}</span> </p>
                    <p>{{ product.quantity }} x NT{{ product.price }}</p>
                </div>
            </li>

        </ul>
        <button @click="goToCheckout()">訂單結帳</button>
    </div>
</template>
<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconOpenSearch from '@/components/icons/IconOpenSearch.vue'
import IconShop from '@/components/icons/IconShop.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userStore } from '@/stores/userStore' //現在登入的會員資料
const currentUserStore = userStore() //目前登入會員
const route = useRoute()
const router = useRouter()
const isLeftOpen = ref(false)// 左側彈出選單彈出狀態
const isShopCarOpen = ref(false)// 購物車選單彈出狀態
const isSearchOpen = ref(false)//上方搜尋框彈出狀態
const isLogin = computed(() => currentUserStore.user.email !== '')// 根據 user 裡的 email 是否存在判斷是否登入
const userShopCar = computed(() => currentUserStore.user.shopCar)//載入user的購物車
let startX = 0 //滑動起點X 軸位置
let endX = 0//滑動終點X 軸位置
// 使用者觸控開始時，紀錄起始點位置
function handleTouchStart(e) {
    startX = e.touches[0].clientX
}
// 使用者觸控結束時，取得結束點位置並判斷滑動方向與距離
function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX
    const deltaX = endX - startX

    // 如果滑動距離小於 -50，表示是往左滑且距離夠大（避免誤觸）
    if (deltaX < -50) {
        // 如果有任何側邊欄是打開的，就關閉它們
        if (isLeftOpen.value || isShopCarOpen.value) {
            closeMenu()
        }
    }
}
// 元件掛載時，綁定觸控事件監聽器到整個視窗（window）
onMounted(() => {
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
})

// 元件卸載前，移除事件監聽器，避免記憶體洩漏
onBeforeUnmount(() => {
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
})
//登出
function signout() {
    isLeftOpen.value = false
    router.push({ name: 'anti' })
    currentUserStore.logout()
}
//回首頁
function goToHome() {
    router.push({ name: 'anti' })
}
//跳到登入頁面
function goToLogin() {
    router.push({ name: 'login' })
}
//跳到註冊頁面
function goToApply() {
    router.push({ name: 'apply' })
}
//跳到結帳頁面
function goToCheckout() {
    router.push({ name: 'checkout' })
}
// 購物車選單彈出選單
function toggleShopCarMenu() {


    isShopCarOpen.value = !isShopCarOpen.value
    console.log(isShopCarOpen.value);
}
//遮罩關閉選單
function closeMenu() {
    isLeftOpen.value = false
    isShopCarOpen.value = false
    isSearchOpen.value = false
}

// 左側彈出選單
function toggleLeftMenu() {
    isLeftOpen.value = !isLeftOpen.value
}
//上方搜尋框
function toggleSearch() {
    isSearchOpen.value = !isSearchOpen.value
}
</script>

<style lang="scss" scoped>
header {
    margin-top: 50px;
    position: relative;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;

    .header_content {
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
            cursor: pointer;
            width: 121px;
            height: 20px;
            position: relative;
            bottom: 5px;
        }

        .right_icon {
            margin-right: 23px;

            .icon_search {
                cursor: pointer;
                margin-right: 16px;
            }

            .icon_shop {
                cursor: pointer;
            }
        }
    }

    // 搜尋框遮罩
    .search_overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(134, 134, 134, 0.41);
        z-index: 900;
    }

    //點擊後的搜尋框區域
    .search_content {
        top: 50px;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 1000;
        background-color: rgba(167, 64, 72, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;

        .icon_open_search {
            margin-right: 20px;
        }

        input {
            outline: none;
            border: none;
            border-bottom: 1px solid white;
            font-size: 14px;
            color: white;
            min-width: 80%;
            height: 20px;
            background-color: rgba(167, 64, 72, 1);

            &::placeholder {
                color: white;
                opacity: 1; // ✅ 確保不透明（有些瀏覽器會默認較淡）
            }
        }
    }
}

// 左邊選單
.left_side_menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100vh;
    background: #fdfdfd;
    color: rgb(0, 0, 0);
    transition: left 0.5s ease;
    z-index: 1000;

    &.left_open {
        left: 0;
    }

    ul {
        margin-top: 150px;
        list-style: none;
        padding: 0;

        li {
            height: 42px;
            margin-left: 30px;

            a {
                color: rgb(0, 0, 0);
                text-decoration: none;
                font-size: 18px;
            }
        }
    }

    // 會員區域
    .member_area {
        margin-top: auto;
        padding-bottom: 30px;
        padding-left: 30px;

        .user_field {
            display: flex;
            align-items: center;
            margin-top: 10px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;

            img {
                width: 45px;
                height: 45px;
                margin-right: 10px;
            }
        }

        .is_login {
            margin-bottom: 40px;
        }
    }
}

// 左遮罩(用來關閉選單)
.left_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(134, 134, 134, 0.41);
    z-index: 900;
}

//購物車選單
.shopcar_menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100vh;
    background: #fdfdfd;
    color: rgb(0, 0, 0);
    transition: left 0.5s ease;
    z-index: 1000;

    &.shopcar_open {
        left: 0;
    }

    ul {
        width: 100%;
        margin-top: 40px;
        list-style: none;
        flex: 0.9; //  讓 ul 撐滿中間空間（可滾動區）
        overflow-y: auto; //  超出時出現垂直卷軸

        li {

            display: flex;
            margin-top: 25px;
            justify-content: center;
            align-items: center;

            img {
                width: 77px;
                height: 77px;
                object-fit: cover; //  保持比例，裁切多餘部分
            }

            .product_info {
                margin-left: 15px;
                font-family: 'Roboto Mono', monospace;
                font-size: 14px;

                h3 {}

                p {
                    margin-top: 3px;

                    span {
                        font-weight: bold;
                    }
                }
            }
        }
    }

    // 會員區域
    button {
        margin-top: auto;
        margin-bottom: 30px;
        width: 255px;
        height: 79px;
        border: none;
        cursor: pointer;
        font-family: 'Anonymous Pro', monospace;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: rgba(167, 64, 72, 1);
        border: 0;
    }
}
</style>
