<template>

    <!-- 文章详情 -->
    <!-- 文章卡片父容器 -->
    <div
        class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <!-- 面包屑 -->
      <nav class="flex text-gray-400" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <a href="#"
               class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                   fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
              </svg>
              首页
            </a>
          </li>
          <li>
            <div class="flex items-center">
              /
              <a href="#"
                 class="ml-1 text-sm font-medium md:ml-3 dark:text-gray-400 dark:hover:text-white">正文</a>
            </div>
          </li>
        </ol>
      </nav>

      <!-- 文章 -->
      <article>
        <!-- 文章标题 -->
        <h1 class="mt-4 font-bold text-3xl">{{ article.title }}</h1>
        <!-- 文章 meta 信息，如发布时间等 -->
        <div class="text-gray-400 flex items-center mt-5 text-sm">
          <!-- 发布时间 -->
          <svg class="inline w-3 h-3 mr-2 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/>
          </svg>
          <span class="hidden md:inline mr-1">发表于</span> {{ article.createTime }}

          <!-- 分类 -->
          <svg class="inline w-3 h-3 ml-5 mr-2 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z"/>
          </svg>
          <span class="hidden md:inline mr-1">分类于</span>
          <a @click="goCategoryArticleListPage(article.categoryId, article.categoryName)"
             class="cursor-pointer mr-1 hover:underline">{{ article.categoryName }}</a>

          <!-- 阅读量 -->
          <svg class="inline w-3 h-3 ml-5 mr-2 dark:text-white" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
            <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
            </g>
          </svg>
          <span class="hidden md:inline mr-1">阅读量</span> {{ article.readNum }}
        </div>
      </article>

      <!-- 正文 -->
      <div ref="articleContentRef" class="mt-5 article-content" v-viewer v-html="article.content"></div>

      <!-- 标签集合 -->
      <div v-if="article.tags && article.tags.length > 0" class="mt-5">
        <span @click="goTagArticleListPage(tag.id, tag.name)" v-for="(tag, index) in article.tags"
              :key="index"
              class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-3 py-1 rounded-full hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300">
          # {{ tag.name }}
        </span>
      </div>

      <!-- 上下篇 -->
      <nav class="flex flex-row mt-7">
        <!-- basis-1/2 用于占用 flex 布局的一半空间 -->
        <div class="basis-1/2">
          <!-- h-full 指定高度占满 -->
          <a v-if="article.preArticle" @click="router.push('/article/' + article.preArticle.articleId)"
             class="flex flex-col h-full p-4 mr-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <div>
              <svg class="inline w-3.5 h-3.5 mr-2 mb-1" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
              </svg>
              上一篇
            </div>
            <div>{{ article.preArticle.articleTitle }}</div>
          </a>
        </div>

        <div class="basis-1/2">
          <!-- text-right 指定文字居右显示 -->
          <a v-if="article.nextArticle" @click="router.push('/article/' + article.nextArticle.articleId)"
             class="flex flex-col h-full text-right p-4 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <div>
              下一篇
              <svg class="inline w-3.5 h-3.5 ml-2 mb-1" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"></path>
              </svg>
            </div>
            <div>{{ article.nextArticle.articleTitle }}</div>
          </a>
        </div>
      </nav>
    </div>

</template>

<script setup type="module">
import {getArticleDetail} from '@/api/frontend/article'
import {useRoute, useRouter} from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import hljs from 'highlight.js'
// 代码高亮样式
import 'highlight.js/styles/tokyo-night-dark.css'

const route = useRoute()
const router = useRouter()
// 打印文章 ID
// console.log(route.params.articleId)

const article = ref({})

// 获取文章详情
function refreshArticleDetail(articleId) {
  getArticleDetail(articleId).then((res) => {
    // 该文章不存在(错误码为 20010)
    if (!res.success && res.errorCode === '20010') {
      // 手动跳转 404 页面
      router.push({name : 'NotFound'})
      return
    }

    article.value = res.data
  })
}

refreshArticleDetail(route.params.articleId)

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（分类 ID、分类名称）
  router.push({path: '/category/article/list', query: {id, name}})
}

// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（标签 ID、标签名称）
  router.push({path: '/tag/article/list', query: {id, name}})
}

watch(route,(newRoute) =>{
  // 重新渲染文章详情
  refreshArticleDetail(newRoute.params.articleId)
})

// 正文 div 引用
const articleContentRef = ref(null)
onMounted(() => {
  // 使用 MutationObserver 监视 DOM 的变化
  const observer = new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 获取所有 pre code 节点
        let highlight = document.querySelectorAll('pre code')
        // 循环高亮
        highlight.forEach((block) => {
          hljs.highlightBlock(block)
        })
      }
    }
  })

  // 配置监视子节点的变化
  const config = { childList: true, subtree: true }
  // 开始观察正文内容变化
  observer.observe(articleContentRef.value, config)
})
</script>

<style scoped>
/* h1, h2, h3, h4, h5, h6 标题样式 */
::v-deep(.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6) {
  color: #292525;
  line-height: 150%;
  font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

::v-deep(.article-content h2) {
  line-height: 1.5;
  font-weight: 700;
  font-synthesis: style;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 26px;
  line-height: 140%;
  border-bottom: 1px solid rgb(241 245 249);
  padding-bottom: 15px;
}

::v-deep(.article-content h3) {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: 600;
}

::v-deep(.article-content h4) {
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 16px;
  font-weight: 600;
}

::v-deep(.article-content h5) {
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 14px;
  font-weight: 600;
}

::v-deep(.article-content h6) {
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 14px;
  font-weight: 600;
}

/* p 段落样式 */
::v-deep(.article-content p) {
  letter-spacing: .3px;
  margin: 0 0 20px;
  line-height: 30px;
  color: #4c4e4d;
  font-weight: 400;
  word-break: normal;
  word-wrap: break-word;
  font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Arial, sans-serif;
}

/* blockquote 引用样式 */
::v-deep(.article-content blockquote) {
  border-left: 2.3px solid rgb(52, 152, 219);
  quotes: none;
  background: rgb(236, 240, 241);
  color: #777;
  font-size: 16px;
  margin-bottom: 20px;
  padding: 24px;
}

/* 设置 blockquote 中最后一个 p 标签的 margin-bottom 为 0 */
::v-deep(.article-content blockquote p:last-child) {
  margin-bottom: 0;
}

/* 斜体样式 */
::v-deep(.article-content em) {
  color: #c849ff;
}

/* 超链接样式 */
::v-deep(.article-content a) {
  color: #167bc2;
}

::v-deep(.article-content a:hover) {
  text-decoration: underline;
}

/* ul 样式 */
::v-deep(.article-content ul) {
  padding-left: 2rem;
}

::v-deep(.article-content > ul) {
  margin-bottom: 20px;
}

::v-deep(.article-content ul li) {
  list-style-type: disc;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
}

::v-deep(.article-content ul li p) {
  margin-bottom: 0!important;
}

::v-deep(.article-content ul ul li) {
  list-style-type: square;
}

/* ol 样式 */
::v-deep(.article-content ol) {
  list-style-type: decimal;
  padding-left: 2rem;
}

/* 图片样式 */
::v-deep(.article-content img) {
  max-width: 100%;
  overflow: hidden;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}

::v-deep(.article-content img:hover,
img:focus) {
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, .15);
}

/* 图片描述文字 */
::v-deep(.image-caption) {
  min-width: 20%;
  max-width: 80%;
  min-height: 43px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  font-size: 13px;
  color: #999;
  text-align: center;
}

/* code 样式 */
::v-deep(.article-content code:not(pre code)) {
  padding: 2px 4px;
  margin: 0 2px;
  font-size: 95% !important;
  border-radius: 4px;
  color: rgb(41, 128, 185);
  background-color: rgba(27, 31, 35, 0.05);
  font-family: Operator Mono, Consolas, Monaco, Menlo, monospace;
}

/* 表格样式 */
::v-deep(table) {
  margin-bottom: 20px;
  width: 100%;
}

::v-deep(table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

::v-deep(table th) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

::v-deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

::v-deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

/* hr 横线 */
::v-deep(hr) {
  margin-bottom: 20px;
}

/* pre code 样式 */
::v-deep(code) {
  font-size: 98%;
}

::v-deep(pre) {
  margin-bottom: 20px;
}

::v-deep(pre code.hljs) {
  padding-top: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.7rem;
  border-radius: 6px;
}

::v-deep(pre:before) {
  background: #fc625d;
  border-radius: 50%;
  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;
  content: ' ';
  height: 10px;
  margin-top: 10px;
  margin-left: 10px;
  position: absolute;
  width: 10px;
}

</style>
