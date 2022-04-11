import Vue from 'vue'
import VueRouter from 'vue-router'

import Cart from '@/views/cart/Cart'
import Category from '@/views/category/Category'
import Home from '@/views/home/Home'
import Profile from '@/views/profile/Profile'
import Detail from '@/views/home/detail/Detail'


//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:id',
        component: Detail
    }
]

const router = new VueRouter({
    routes,
    mode: "history"//默认是hash模式，这里做一个切换
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

//3.导出router
export default router