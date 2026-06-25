import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/Detail.vue'
import MyPosts from '@/pages/MyPosts.vue'
import CreatePost from '@/pages/CreatePost.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/detail/:id', name: 'detail', component: Detail, props: true },
  { path: '/my-posts', name: 'my-posts', component: MyPosts },
  { path: '/create', name: 'create', component: CreatePost },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
