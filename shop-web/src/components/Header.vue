<template>
    <header>
        <!-- 一般狀態 -->
        <div v-if="!isSearchOpen" class="header_content">
            <div class="menu" @click="toggleLeftMenu">
                <span :class="{ left_open: isLeftOpen }"></span>
                <span :class="{ left_open: isLeftOpen }"></span>
                <span :class="{ left_open: isLeftOpen }"></span>
            </div>
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
            <div class="right_icon">
                <IconSearch @click="toggleSearch" class="icon_search" />
                <IconShop class="icon_shop" />
            </div>
        </div>

        <!-- 搜尋狀態 -->
        <div v-else class="search_content">
            <IconOpenSearch class="icon_open_search" />
            <input type="text" placeholder="  找商品" />
        </div>
    </header>
    <div class="search-overlay" v-if="isSearchOpen" @click="toggleSearch"></div>
    <!--左遮罩(用來關閉選單) -->
    <div class="left_overlay" v-if="isLeftOpen" @click="toggleLeftMenu"></div>
    <!-- 左側選單 -->
    <div class="left_side_menu" :class="{ left_open: isLeftOpen }">
        <ul>
            <li><a href="#">本期新上</a></li>
            <li><a href="#">48H現貨專區</a></li>
            <li><a href="#">熱銷安可上架</a></li>
            <li><a href="#">分類</a></li>
            <li><a href="#">注意事項</a></li>
            <li><a href="#">CONTACT US / 官方LINE客服
                </a></li>
        </ul>
        <div class="member_area">
            <div class="login"><img src="@/components/icons/member.png" alt="登入">會員登入 </div>
            <div class="apply"><img src="@/components/icons/apply.png" alt="註冊">新用戶註冊</div>
        </div>
    </div>
</template>
<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconOpenSearch from '@/components/icons/IconOpenSearch.vue'
import IconShop from '@/components/icons/IconShop.vue'
import { ref } from 'vue'

// 左側彈出選單
const isLeftOpen = ref(false)
const isSearchOpen = ref(false)
function toggleLeftMenu() {
    isLeftOpen.value = !isLeftOpen.value
}
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
        top: 0;
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

// 搜尋框遮罩
.search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(134, 134, 134, 0.41);
    z-index: 900;
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

// 左邊選單
.left_side_menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: -400px;
    width: 400px;
    height: 100vh;
    background: #fdfdfd;
    color: rgb(0, 0, 0);
    transition: left 0.5s ease;
    z-index: 1000;

    &.left_open {
        left: 0;
    }

    ul {
        margin-top: 100px;
        list-style: none;
        padding: 0;

        li {
            margin: 20px 50px;

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
        padding: 20px 40px;

        img {
            width: 45px;
            height: 45px;
        }

        .login,
        .apply {
            display: flex;
            align-items: center;
            margin-top: 10px;
            font-size: 16px;

            img {
                margin-right: 10px;
            }
        }
    }

}
</style>