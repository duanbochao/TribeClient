import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import PostArticle from '@/components/PostArticle'
import UserMana from '@/components/UserMana'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登陆',
      component: Login,
      hidden:true
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      hidden:true
    },
    {
      path: '/home',
      name: '文章管理',
      iconCls: "el-icon-document",
      component: Home,
      children: [
        {
          path: '/articleList',
          name: "文章列表",
          component: ArticleList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/postArticle',
          name: "发表文章",
          component: PostArticle,
          meta: {
            keepAlive: true
          }
        }
      ]
    }, {
      path: '/home',
      component: Home,
      name: '用户管理',
      children: [
        {
          path: '/user',
          iconCls: 'fa fa-user-o',
          name: 'guan',
          component: UserMana
        }
      ]
    }
  ]
})
