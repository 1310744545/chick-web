import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/login'
import Home from '../views/frontStage/Home'

Vue.use(VueRouter)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/user/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/user/register',
        name: 'Register',
        component: () => import('../views/user/register'),
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                component: () => import('../views/frontStage/page/Home'),
                meta: { title: '首页' }
            },
            {
                path: '/tools',
                component: () => import('../views/frontStage/page/Tools'),
                meta: { title: '在线工具' }
            },
            {
                path: '/software',
                component: () => import('../views/frontStage/page/Software'),
                meta: { title: '软件' }
            },
            {
                path: '/writing',
                component: () => import('../views/frontStage/page/Writing'),
                meta: { title: '帖子' }
            },
            {
                path: '/film',
                component: () => import('../views/frontStage/page/Film'),
                meta: { title: '影视' }
            },
            {
                path: '/intro',
                component: () => import('../views/frontStage/page/Intro'),
                meta: { title: '简介' }
            }
        ]
    },
    {
        path: '/managerHome',
        name: 'ManagerHome',
        component: () => import(/* webpackChunkName: "home" */ '../views/backStage/managerHome'),
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/backStage/page/Dashboard'),
                meta: { title: '系统首页' }
            },
            {
                path: '/userTable',
                component: () => import('../views/backStage/page/UserTable'),
                meta: { title: '用户管理' }
            },
            {
                path: '/writingTable',
                component: () => import('../views/backStage/page/WritingTable'),
                meta: { title: '文章管理' }
            },
            {
                path: '/filmTable',
                component: () => import('../views/backStage/page/FilmTable'),
                meta: { title: '影视管理' }
            },
            {
                path: '/announcementTable',
                component: () => import('../views/backStage/page/AnnouncementTable'),
                meta: { title: '公告管理' }
            },
        ]
    },
    {
        path: '*',
        component: () => import('../views/404'),
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]


const router = new VueRouter({
    routes
})

export default router


