import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Supplier from './components/basics/Supplier.vue'
import Client from './components/basics/Client.vue'
import Printing from './components/basics/Printing.vue'
import Production from './components/basics/Production.vue'
import Maintenance from './components/basics/Maintenance.vue'
import Product from './components/basics/Product.vue'
import Merchandise from './components/basics/Merchandise.vue'
import Duty from './components/system/Duty.vue'
import Department from './components/system/Department.vue'
import Cate from './components/goods/Cate.vue'
import Params from './components/goods/Params.vue'
import Goods from './components/goods/Goods.vue'
import Add from './components/goods/Add.vue'
import User from './components/system/User.vue'
import Menu from './components/system/Menu.vue'
import Journal from './components/system/Journal.vue'
import Audit from './components/purchase/Audit.vue'
import Cancel from './components/purchase/Cancel.vue'
import First from './components/purchase/First.vue'
import Order from './components/purchase/Order.vue'
import Stored from './components/purchase/Stored.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                { path: '/supplier', component: Supplier },
                { path: '/client', component: Client },
                { path: '/printing', component: Printing },
                { path: '/production', component: Production },
                { path: '/maintenance', component: Maintenance },
                { path: '/product', component: Product },
                { path: '/merchandise', component: Merchandise },
                { path: '/duty', component: Duty },
                { path: '/department', component: Department },
                { path: '/user', component: User },
                { path: '/menu', component: Menu },
                { path: '/journal', component: Journal },
                { path: '/audit', component: Audit },
                { path: '/cancel', component: Cancel },
                { path: '/first', component: First },
                { path: '/order', component: Order },
                { path: '/stored', component: Stored },
                { path: '/categories', component: Cate },
                { path: '/params', component: Params },
                { path: '/goods', component: Goods },
                { path: '/goodsadd', component: Add },
            ]
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router