import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/user/login'
import home from '../views/index/home'

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = new VueRouter({
    routes
})

export default router