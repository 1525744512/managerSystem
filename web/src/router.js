import Vue from "vue";
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

import Login from "@/components/Login";
import userInformation from "@/components/userInformation";
import backIndex from "@/components/backIndex";
const NotFound = { template: '<p>Page not found</p>' }
const routes=[
    {
        path: '/Login',
        name:'Login',
        component: Login
    },
    {
        path:'',
        name:'index',
        redirect:{path:'/Login'}
    },
    {
        path: '/userInformation',
        name:'userInformation',
        component: userInformation
    },
    {
        path: '/backIndex',
        name:'backIndex',
        component: backIndex
    },

]
const router=new VueRouter({
    mode:"history",
    routes
})
export default router
new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
})
