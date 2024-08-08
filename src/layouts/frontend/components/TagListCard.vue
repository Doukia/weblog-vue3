<template>
  <!-- 标签 -->
  <div v-if="tags && tags.length > 0" class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">

    <!-- 标签标题 -->
    <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">
      <!-- 标签图标 -->
      <svg class="icon inline w-4 h-4 mr-2" aria-hidden="true" viewBox="0 0 1025 1024"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.257086 118.094877C-3.815151 57.01132 40.979458 5.42965 102.063015 0h16.288948l393.649591 9.501887c25.790835 1.357412 50.224258 12.216711 67.870619 31.220484l414.010775 414.010776c42.079784 42.079784 42.079784 111.307815-1.357412 153.387599L608.377833 992.26845c-42.079784 42.079784-109.950403 42.079784-153.387599 1.357412L40.979458 578.257674c-19.003773-17.646361-29.863072-42.079784-31.220485-67.870619L0.257086 118.094877z"
            fill="#2F77F1" p-id="4308"></path>
        <path
            d="M233.732016 225.330455m-108.592991 0a108.59299 108.59299 0 1 0 217.185981 0 108.59299 108.59299 0 1 0-217.185981 0Z"
            fill="#AFFCFE" p-id="4309"></path>
      </svg>
      标签
    </h2>
    <!-- 标签列表 -->
    <span v-for="(tag, index) in tags" :key="index" @click="goTagArticleListPage(tag.id, tag.name)"
          class="inline-block cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
      {{ tag.name }}
    </span>
   </div>
</template>

<script setup>
import { getTagList } from '@/api/frontend/tag'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 所有标签
const tags = ref([])
getTagList().then((res) => {
  if (res.success) {
    tags.value = res.data
  }
})

const router = useRouter()
// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（标签 ID、标签名称）
  router.push({path: '/tag/article/list', query: {id, name}})
}
</script>

<style scoped>

</style>
