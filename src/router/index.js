import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Article from '@/pages/article'
import User from '@/pages/user'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/article/:id',
    name: 'article',
    component: Article
  }, {
    path: '/user/:userId',
    name: 'user',
    component: User
  }]
})
