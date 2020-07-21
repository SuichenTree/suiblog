import Vue from 'vue'
import VueRouter from 'vue-router'
import test from "@/views/Test.vue"
import blogIndex from "@/views/blog/Index.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: "默认",
    redirect: "/blog", 
  },
  {
    path: '/test',
    name: "测试页面",
    component:test
  },
  //博客
  {
    path: '/blog',
    name: "博客主页面",
    component:blogIndex,
    redirect: "/blog/index", 
    children:[
      {
        name:"博客首页",
        path:"/blog/index",
        component: () => import('@/views/blog/Main.vue')
      },{
        name:"博客文章",
        path:"/blog/article",
        component: () => import('@/views/blog/Article.vue')
      },{
        name:"管理员登录",
        path:"/blog/adminLogin",
        component: () => import('@/views/blog/AdminLogin.vue')
      },{
        name:"博客管理主页面",
        path:"/blog/admin",
        component: () => import('@/views/blog/Admin/BlogAdmin.vue'),
        redirect:"/blog/admin/article",
        children:[
          {
            name:"文章管理",
            path:"/blog/admin/article",
            component: () => import('@/views/blog/Admin/ArticleList.vue')
          },
          {
            name:"新增文章",
            path:"/blog/admin/addArticle",
            component: () => import('@/views/blog/Admin/AddArticle.vue')
          },
          {
            name:"标签管理",
            path:"/blog/admin/tag",
            component: () => import('@/views/blog/Admin/TagList.vue')
          },
          {
            name:"文章所属标签管理",
            path:"/blog/admin/articletag",
            component: () => import('@/views/blog/Admin/ArticleTagList.vue')
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
