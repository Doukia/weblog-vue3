<template>

  <!-- 文章列表，grid 表格布局，分为 2 列 -->
  <div class="grid grid-cols-2 gap-4">
    <div v-for="(article, index) in articles" :key="index" class="col-span-2 md:col-span-1">
      <div class="bg-white h-full border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <!-- 文章封面 -->
        <a @click="goArticleDetailPage(article.id)" class="cursor-pointer">
          <img class="rounded-t-lg h-48 w-full"
               :src="article.cover"/>
        </a>
        <div class="p-5">
          <!-- 标签 -->
          <div class="mb-3">
                                    <span v-for="(tag, tagIndex) in article.tags" :key="tagIndex"
                                          class="cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
                                        {{ tag.name }}
                                    </span>
          </div>
          <!-- 文章标题 -->
          <a @click="goArticleDetailPage(article.id)" class="cursor-pointer">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ article.title }}</h2>
          </a>
          <!-- 文章摘要 -->
          <p v-if="article.summary" class="mb-3 font-normal text-gray-500 dark:text-gray-400">{{ article.summary }}</p>
          <!-- 文章发布时间、所属分类 -->
          <p class="flex items-center font-normal text-gray-400 text-sm dark:text-gray-400">
            <!-- 发布时间 -->
            <svg class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
            </svg>
            {{ article.createDate }}

            <!-- 所属分类 -->
            <svg class="inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z"/>
            </svg>
            <a @click="goCategoryArticleListPage(article.category.id,article.category.name)"
               class="text-gray-400 hover:underline cursor-pointer">{{ article.category.name }}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- 分页 -->
  <nav aria-label="Page navigation example" class="mt-10 flex justify-center" v-if="pages > 1">
    <ul class="flex items-center -space-x-px h-10 text-base">
      <!-- 上一页 -->
      <li>
        <a @click="getArticles(current - 1)"
           class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           :class="[current > 1 ? '' : 'cursor-not-allowed']"
        >

          <span class="sr-only">上一页</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="M5 1 1 5l4 4"/>
          </svg>
        </a>
      </li>
      <!-- 页码 -->
      <li v-for="(pageNo, index) in pages" :key="index">
        <a @click="getArticles(pageNo)"
           class="flex items-center justify-center px-4 h-10 leading-tight border  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           :class="[pageNo === current ? 'text-blue-600  bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700']"
        >
          {{ index + 1 }}
        </a>
      </li>
      <!-- 下一页 -->
      <li>
        <a @click="getArticles(current + 1)"
           class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           :class="[current < pages ? '' : 'cursor-not-allowed']"
        >
          <span class="sr-only">下一页</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
        </a>
      </li>
    </ul>
  </nav>

</template>

<script setup>
import {ref} from 'vue'
import {getArticlePageList} from '@/api/frontend/article'
import {useRouter} from 'vue-router'


// 文章集合
const articles = ref([])
// 当前页码
const current = ref(1)
// 每页显示的文章数
const size = ref(4)
// 总文章数
const total = ref(0)
// 总共多少页
const pages = ref(0)


function getArticles(currentNo) {
  // 上下页是否能点击判断，当要跳转上一页且页码小于 1 时，则不允许跳转；当要跳转下一页且页码大于总页数时，则不允许跳转
  if (currentNo < 1 || (pages.value > 0 && currentNo > pages.value)) return
  // 调用分页接口渲染数据
  getArticlePageList({current: currentNo, size: size.value}).then((res) => {
    if (res.success) {
      articles.value = res.data
      current.value = res.current
      size.value = res.size
      total.value = res.total
      pages.value = res.pages
    }
  })
}

getArticles(current.value)


// 引入路由
const router = useRouter()

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（分类 ID、分类名称）
  router.push({path: '/category/article/list', query: {id, name}})
}

// 跳转文章详情页
const goArticleDetailPage = (articleId) => {
  router.push('/article/' + articleId)
}


</script>

<style scoped>

</style>
