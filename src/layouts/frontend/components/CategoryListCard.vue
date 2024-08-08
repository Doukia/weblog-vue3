<template>
  <!-- 分类 -->
  <div v-if="categories && categories.length > 0"
      class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <!-- 分类标题 -->
    <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">
      <!-- 文件夹图标 -->
      <svg class="icon inline w-5 h-5 mr-2" viewBox="0 0 1024 1024"
           xmlns="http://www.w3.org/2000/svg" p-id="21572" width="200" height="200">
        <path
            d="M938.666667 464.592593h-853.333334v-265.481482c0-62.577778 51.2-113.777778 113.777778-113.777778h128.948148c15.17037 0 28.444444 3.792593 41.718519 11.377778l98.607407 64.474074h356.503704c62.577778 0 113.777778 51.2 113.777778 113.777778v189.62963z"
            fill="#3A69DD" p-id="21573"></path>
        <path
            d="M805.925926 398.222222h-587.851852v-125.155555c0-24.651852 20.859259-45.511111 45.511111-45.511111h496.82963c24.651852 0 45.511111 20.859259 45.511111 45.511111V398.222222z"
            fill="#D9E3FF" p-id="21574"></path>
        <path
            d="M843.851852 417.185185h-663.703704v-98.607407c0-28.444444 22.755556-53.096296 53.096296-53.096297h559.407408c28.444444 0 53.096296 22.755556 53.096296 53.096297V417.185185z"
            fill="#FFFFFF" p-id="21575"></path>
        <path
            d="M786.962963 938.666667h-549.925926c-83.437037 0-151.703704-68.266667-151.703704-151.703704V341.333333s316.681481 37.925926 430.45926 37.925926c189.62963 0 422.874074-37.925926 422.874074-37.925926v445.62963c0 83.437037-68.266667 151.703704-151.703704 151.703704z"
            fill="#5F7CF9" p-id="21576"></path>
        <path
            d="M559.407407 512h-75.851851c-20.859259 0-37.925926-17.066667-37.925926-37.925926s17.066667-37.925926 37.925926-37.925926h75.851851c20.859259 0 37.925926 17.066667 37.925926 37.925926s-17.066667 37.925926-37.925926 37.925926z"
            fill="#F9D523" p-id="21577"></path>
      </svg>
      分类
    </h2>
    <!-- 分类列表 -->
    <div class="text-sm font-medium text-gray-600 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <a  @click="goCategoryArticleListPage(category.id, category.name)" v-for="(category,index) in categories" :key="index"
         class="flex items-center w-full px-4 py-2 rounded-lg border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg class="w-3.5 h-3.5 mr-1.5 dark:text-white" aria-hidden="true"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5" />
        </svg>
        {{ category.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { getCategoryList } from '@/api/frontend/category'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 所有分类
const categories = ref([])
getCategoryList().then((res) => {
  if (res.success) {
    categories.value = res.data
  }
})

// 引入路由
const router = useRouter()

// 跳转分类文章列表页
const goCategoryArticleListPage = (id,name) =>{
  // 跳转时通过 query 携带参数（分类 ID、分类名称）
  router.push({path: '/category/article/list', query: {id, name}})
}
</script>

<style scoped>

</style>
