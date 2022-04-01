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
import projectAdd from "@/components/projectAdd";
import allProjects from "@/components/allProjects";
import projectView from "@/components/projectView";
import myWorkJoin from "@/components/myWorkJoin";
import myWorkCreate from "@/components/myWorkCreate";
import myWorkResponsible from "@/components/myWorkResponsible";
import projectReport from "@/components/projectReport";
import memberReport from "@/components/memberReport";
import backstage from "@/components/backstage";

const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '',
        name: 'index',
        redirect: {path: '/Login'}
    },
    {
        path: '/userInformation',
        name: 'userInformation',
        component: userInformation
    },
    {
        path: '/backIndex',
        name: 'backIndex',
        component: backIndex
    },
    {
        path: '/workAdd',
        name: 'workAdd',
        component: workAdd
    },
    {
        path: '/projectAdd',
        name: 'projectAdd',
        component: projectAdd
    },
    {
        path: '/mainPage',
        name: 'mainPage',
        component: mainPage,
        redirect: {path: '/index'},
        children: [
            {
                path: '/index',
                name: 'index',
                component: index,
            },
            {
                path: '/project',
                name: 'project',
                component: project,
                redirect: {path: '/allProjects'},
                children: [
                    {
                        path: '/allProjects',
                        name: 'allProjects',
                        component: allProjects,
                    },
                    {
                        path: '/projectView',
                        name: 'projectView',
                        component: projectView
                    },
                    {
                        path: '/myWorkResponsible',
                        name: 'myWorkResponsible',
                        component: myWorkResponsible
                    },
                    {
                        path: '/myWorkJoin',
                        name: 'myWorkJoin',
                        component: myWorkJoin
                    },
                    {
                        path: '/myWorkCreate',
                        name: 'myWorkCreate',
                        component: myWorkCreate
                    },
                    {
                        path: '/projectReport',
                        name: 'projectReport',
                        component: projectReport
                    },
                    {
                        path: '/memberReport',
                        name: 'memberReport',
                        component: memberReport
                    },
                ]
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
    {
        path: '/backstage',
        name: 'backstage',
        component: backstage
    }

]
const router = new VueRouter({
    mode: "history",
    routes
})
export default router
