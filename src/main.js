import '@/assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'animate.css'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import App from '@/App.vue'
// 导入路由
import router from '@/router'
// 导入全局路由守卫
import '@/permission'
// 引入全局状态管理 Pinia
import { createPinia } from 'pinia'
// 引入全局状态管理 Pinia
import pinia from '@/stores'

// 图片点击放大
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

const app = createApp(App)
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// 应用 Pinia
app.use(pinia)
// 应用路由
app.use(router)
app.use(VueViewer)
app.mount('#app')
