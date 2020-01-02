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
import Align from './components/manufacture/Align.vue'
import Audit from './components/manufacture/Audit.vue'
import Manage from './components/manufacture/Manage.vue'
import Material from './components/manufacture/Material.vue'
import User from './components/system/User.vue'
import Menu from './components/system/Menu.vue'
import Journal from './components/system/Journal.vue'
import AddReturnOrder from './components/purchase/AddReturnOrder.vue'

import Cancel from './components/purchase/Cancel.vue'
import First from './components/purchase/First.vue'
import Order from './components/purchase/Order.vue'

import ReturnFirst from './components/purchase/ReturnFirst.vue'
import ReturnSecond from './components/purchase/ReturnSecond.vue'
import Second from './components/purchase/Second.vue'

import Ordermanagement from './components/sales/Ordermanagement.vue'
import Orderauditing from './components/sales/Orderauditing.vue'
import Ordertobeshipped from './components/sales/Ordertobeshipped.vue'
import Cancellationorder from './components/sales/Cancellationorder.vue'
import Shippedorder from './components/sales/Shippedorder.vue'
import Finishedorder from './components/sales/Finishedorder.vue'
import Input3 from './components/stock/Input3.vue'
import InputCheck from './components/stock/InputCheck.vue'
import Output3 from './components/stock/Output3.vue'
import OutputCheck from './components/stock/OutputCheck.vue'
import Stocktaking from './components/stock/Stocktaking.vue'
import QueryIAndO from './components/stock/QueryIAndO.vue'
import QueryStock from './components/stock/QueryStock.vue'
import CheckStock from './components/stock/CheckStock.vue'
import Receipt from './components/finance/Receipt.vue'
import PaymentSlip from './components/finance/PaymentSlip.vue'
import DispatchList from './components/finance/DispatchList.vue'
import FirstCheckDL from './components/finance/FirstCheckDL.vue'
import SecondCheckDL from './components/finance/SecondCheckDL.vue'
import Detail from './components/finance/Detail.vue'

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
                { path: '/addReturnOrder', component: AddReturnOrder },
                { path: '/cancel', component: Cancel },
                { path: '/first', component: First },
                { path: '/order', component: Order },
                { path: '/returnFirst', component: ReturnFirst },
                { path: '/returnSecond', component: ReturnSecond },
                { path: '/second', component: Second },
                { path: '/ordermanagement', component: Ordermanagement },
                { path: '/orderauditing', component: Orderauditing },
                { path: '/ordertobeshipped', component: Ordertobeshipped },
                { path: '/cancellationorder', component: Cancellationorder },
                { path: '/shippedorder', component: Shippedorder },
                { path: '/finishedorder', component: Finishedorder },
                { path: '/input3', component: Input3 },
                { path: '/inputCheck', component: InputCheck },
                { path: '/stocktaking', component: Stocktaking },
                { path: '/output3', component: Output3 },
                { path: '/queryIAndO', component: QueryIAndO },
                { path: '/queryStock', component: QueryStock },
                { path: '/checkStock', component: CheckStock },
                { path: '/outputCheck', component: OutputCheck },
                { path: '/receipt', component: Receipt },
                { path: '/paymentSlip', component: PaymentSlip },
                { path: '/dispatchList', component: DispatchList },
                { path: '/secondCheckDL', component: SecondCheckDL },
                { path: '/detail', component: Detail },
                { path: '/firstCheckDL', component: FirstCheckDL },
                { path: '/align', component: Align },
                { path: '/audit', component: Audit },
                { path: '/manage', component: Manage },
                { path: '/material', component: Material },

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