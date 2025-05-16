import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
// 引入圖片資源
import product1 from '@/assets/product/product_1.png'
import product2 from '@/assets/product/product_2.png'
import product3 from '@/assets/product/product_3.png'
// 建立一個新的 Pinia store，名稱為 'userDataStore'
export const useUserDataStore = defineStore('userDataStore', () => {
  // users 是一個會員資料陣列，預設包含一筆假帳號
  const users = ref([
    {
      username: '測試用戶',
      email: 'test@example.com',
      password: '123456',
      pic: '',
      shopcar: [
        {
          pic: product1,
          no: 'A01',
          describe: '本期推薦',
          name: '復古立領外套',
          price: 180,
          originalPrice: 3000,
          color: '黑',
          size: 'S',
          quantity: 1,
        },
      ],
    },
  ])

  // 從 localStorage 載入之前儲存的會員資料
  const loadFromStorage = () => {
    const saved = JSON.parse(localStorage.getItem('userData'))
    // 如果 localStorage 裡有資料，就加入 users
    if (Array.isArray(saved)) {
      users.value.push(...saved)
    }
  }

  // 當 users 的資料有變動，就同步儲存到 localStorage
  watch(
    users,
    () => {
      localStorage.setItem('userData', JSON.stringify(users.value))
    },
    { deep: true },
  ) // deep: true 表示監聽巢狀物件的變動

  // 將 users 和函式回傳，供元件使用
  return {
    users,
    loadFromStorage,
  }
})
