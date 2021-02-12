import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/login'
import Home from '../views/frontStage/home'
import ManagerHome from '../views/backStage/managerHome'

Vue.use(VueRouter)

const routes = [
    {
        path: '/user/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home
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
                component: () => import(/* webpackChunkName: "table" */ '../views/backStage/page/UserTable'),
                meta: { title: '用户管理' }
            },
            {
                path: '/writingTable',
                component: () => import(/* webpackChunkName: "table" */ '../views/backStage/page/WritingTable'),
                meta: { title: '文章管理' }
            },
            {
                path: '/filmTable',
                component: () => import(/* webpackChunkName: "table" */ '../views/backStage/page/FilmTable'),
                meta: { title: '影视管理' }
            },
        ]
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
