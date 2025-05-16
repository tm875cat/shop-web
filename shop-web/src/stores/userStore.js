import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
// 當前用戶的登入資料
export const userStore = defineStore('userStore', () => {
  const username = ref('')
  const email = ref('')
  const password = ref('')
  const pic = ref('') // 用戶照片
  const shopCar = ref([])

  // 從 localStorage 載入資料
  const loadFromStorage = () => {
    const saved = JSON.parse(localStorage.getItem('userStore'))
    if (saved) {
      username.value = saved.username || ''
      email.value = saved.email || ''
      password.value = saved.password || ''
      pic.value = saved.pic || ''
      shopCar.value = saved.shopCar || []
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
    }
  }

  // 自動同步到 localStorage
  watch(
    [username, email, password, pic, shopCar],
    () => {
      localStorage.setItem(
        'userStore',
        JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          pic: pic.value,
          shopCar: shopCar.value,
        }),
      )
    },
    { deep: true },
  )

  return {
    username,
    email,
    password,
    pic,
    shopCar,
    loadFromStorage,
  }
})
