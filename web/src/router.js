import Vue from "vue";
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

import Login from "@/components/Login";
import Mainpage from "@/components/mainpage";
import index from "@/components/index";
import project from "@/components/project";

const routes=[
    {
        path: '/Login',
        name:'Login',
        component: Login
    },
    {
        path:'',
        name:'index1',
        redirect:{path:'/Login'}
    },
    {
        path: '/mainpage',
        name: 'mainpage',
        component: Mainpage,
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
    // {
    //     path: '/userInformation',
    //     name:'userInformation',
    //     component: userInformation
    // },
    // {
    //     path: '/backIndex',
    //     name:'backIndex',
    //     component: backIndex
    // },

]
const router=new VueRouter({
    mode:"history",
    routes
})
export default router

