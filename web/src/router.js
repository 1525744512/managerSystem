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
import mainPage from "@/components/mainPage";
import index from "@/components/index";
import project from "@/components/project";
import workAdd from "@/components/workAdd";
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
    {
        path: '/workAdd',
        name:'workAdd',
        component: workAdd
    },
    {
        path: '/mainPage',
        name: 'mainPage',
        component: mainPage,
        redirect: {path:'/index'},
        children: [
            {
                path: '/index',
                name:'index',
                component: index,
            },
            {
                path: '/project',
                name: 'project',
                component: project
            },
            // {
            //     path: '/showresT',
            //     name: 'showresT',
            //     component: showresT
            // },
            // {
            //     path: '/showresT',
            //     name: 'showresT',
            //     component: showresT
            // },
            // {
            //     path: '/showresT',
            //     name: 'showresT',
            //     component: showresT
            // },
            // {
            //     path: '/showresT',
            //     name: 'showresT',
            //     component: showresT
            // }
        ]
    },

]
const router=new VueRouter({
    mode:"history",
    routes
})
export default router
