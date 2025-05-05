<template>
    <footer>
        <div class="text_area">
            <div class="shop_name">店名店名內容</div>
            <div class="taxpayer_iD">統一編號 | 12345678</div>
        </div>
    </footer>
</template>
<script setup>

</script>

<style lang="scss" scoped>
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