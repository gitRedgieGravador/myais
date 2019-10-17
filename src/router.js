import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Create from './views/Create.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/create',
            name: 'create',
            component: Create
        },
        {
            path: '/update/:id',
            name: 'update',
            component: Create,
            props: true
        },
        {
            path: '/delete/:id',
            name: 'delete',
            component: Home,
            props: true
        }
    ]
})