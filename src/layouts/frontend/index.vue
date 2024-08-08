<template>
  <Header></Header>

  <!-- 主内容区域 -->
  <main class="container max-w-screen-xl mx-auto p-4">
    <!-- grid 表格布局，分为 4 列 -->
    <div class="grid grid-cols-4 gap-7">
      <!-- 左边栏，占用 3 列 -->
      <div class="col-span-4 md:col-span-3 mb-3">
        <router-view></router-view>
      </div>

      <!-- 右边侧边栏，占用一列 -->
      <aside class="col-span-4 md:col-span-1">
        <div>
          <!-- 信息 -->
          <UserInfoCard></UserInfoCard>
          <!-- 分类 -->
          <CategoryListCard v-if="path !== '/category/list'"></CategoryListCard>
          <!-- 标签 -->
          <TagListCard v-if="path !== '/tag/list'"></TagListCard>
        </div>
        <!-- 文章目录 -->
<!--        <Toc v-if="path !== '/' && path !== '/tag/list' &&path !== '/category/list' &&path !== '/archive/list'-->
<!--              &&path !== '/category/article/list' &&path !== '/tag/article/list' &&path !== '/archive/list'"></Toc>-->
        <Toc v-if="isArticleRoute"></Toc>
   </aside>
    </div>
  </main>

  <!-- 返回顶部 -->
  <ScrollToTopButton v-if="path !== '/category/list' && path !== '/tag/list'"></ScrollToTopButton>

  <Footer></Footer>
</template>

<script setup>
import Header from '@/layouts/frontend/components/Header.vue'
import Footer from '@/layouts/frontend/components/Footer.vue'
import UserInfoCard from "@/layouts/frontend/components/UserInfoCard.vue"
import CategoryListCard from '@/layouts/frontend/components/CategoryListCard.vue'
import TagListCard from '@/layouts/frontend/components/TagListCard.vue'
import ScrollToTopButton from '@/layouts/frontend/components/ScrollToTopButton.vue'
import Toc from '@/layouts/frontend/components/Toc.vue'
import {useRoute} from 'vue-router'
import {ref, watch} from 'vue'

const route = useRoute()
const path = ref(route.path)
// 文章目录组件是否显示
const isArticleRoute = ref(route.path.startsWith('/article/'));

// 监听路由
watch(route, (newRoute) => {
  path.value = newRoute.path
  isArticleRoute.value = newRoute.path.startsWith('/article/');
})
</script>
