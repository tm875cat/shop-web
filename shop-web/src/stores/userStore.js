import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

// 當前用戶的登入資料
export const userStore = defineStore('userStore', () => {
  const user = ref({
    username: '',
    email: '',
    password: '',
    pic: '',
    shopCar: [],
    // shopCar結構
    // {
    //   pic: product1,
    //   no: 'A01',
    //   describe: '本期推薦',
    //   name: '復古立領外套',
    //   price: 180,
    //   originalPrice: 3000,
    //   color: '黑',
    //   size: 'S',
    //   quantity: 2,
    // },
  })

  // 從 localStorage 載入資料
  const loadFromStorage = () => {
    const saved = JSON.parse(localStorage.getItem('userStore'))
    if (saved && typeof saved === 'object') {
      user.value = {
        username: saved.username || '',
        email: saved.email || '',
        password: saved.password || '',
        pic: saved.pic || '',
        shopCar: Array.isArray(saved.shopCar) ? saved.shopCar : [],
      }
    }
  }

  // 自動同步到 localStorage
  watch(
    user,
    () => {
      localStorage.setItem('userStore', JSON.stringify(user.value))
    },
    { deep: true },
  )

  return {
    user,
    loadFromStorage,
  }
})
