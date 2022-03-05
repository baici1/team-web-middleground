import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const remainingRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/login/login.vue"),
    meta: {
      title: $t("menus.hslogin"),
      showLink: false,
      i18n: true,
      rank: 101
    }
  },
  {
    path: "/pre_home",
    name: "preHome",
    component: () => import("/@/views/pre_home/index.vue"),
    meta: {
      title: $t("menus.hshome"),
      showLink: false,
      i18n: true
    }
  },
  {
    path: "/list",
    name: "List",
    component: () => import("/@/views/pre_pagelist/index.vue"),
    meta: {
      title: $t("menus.hsList"),
      showLink: false,
      i18n: true
    }
  },
  {
    path: "/page/detail/:id",
    name: "Details",
    component: () => import("/@/views/pre_details/index.vue"),
    meta: {
      title: $t("menus.hsPageDetail"),
      showLink: false,
      i18n: true
    }
  },
  {
    path: "/preGame/home",
    name: "PreGame",
    component: () => import("/@/views/pre_game/index.vue"),
    meta: {
      title: $t("menus.hsPageDetail"),
      showLink: false,
      i18n: true
    }
  },
  {
    path: "/redirect",
    name: "redirect",
    component: Layout,
    meta: {
      icon: "home-filled",
      title: $t("menus.hshome"),
      i18n: true,
      showLink: false,
      rank: 104
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "redirect",
        component: () => import("/@/views/redirect.vue")
      }
    ]
  }
];

export default remainingRouter;
