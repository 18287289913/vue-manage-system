import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";
import api from "../api/index";
import { ElMessage } from "element-plus";

const routes = [
    {
        path: '/',
        redirect: '/login'
    }, {
        path: "/home",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/new',
                name: 'new',
                meta: {
                    title: 'new'
                },
                component: () =>import('../views/New.vue')
            }, {
              path: "/vipquery",
              name: "vipquery",
              meta: {
                title: "会员查询"
              },
              component: () =>import("../views/VipQuery.vue")
            }, {
              path: "/orderquery",
              name: "orderquery",
              meta: {
                title: "订单查询"
              },
              component: () =>import("../views/OrderQuery.vue")
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if(token) {
    api.checkToken().then(res => {
      // console.log(res);
      if(res.data.msg == "success") {
        next();
      } else if (res.data.msg == "expired") {
        // console.log(res);
        ElMessage.error("登录超时，请重新登录！");
        localStorage.setItem("token", "");
        localStorage.setItem("username", "");
        next("/login");
      } else {
        if (to.path == '/' | to.path == '/login') {
          next();
        } else {
          next("/login");
        }
      }
    })
  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  let permission = localStorage.getItem("permission");
  if(to.path == '/permission') {
    permission == 1?next():next('/403');
  } else {
    next();
  }
})

export default router;