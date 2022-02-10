import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const gameRouter = {
  path: "/",
  name: "Game",
  component: Layout,
  redirect: "/game",
  meta: {
    icon: "medal",
    title: $t("menus.hsgameManagement"),
    showLink: true,
    i18n: true,
    rank: 20
  },
  children: [
    {
      path: "/game/home",
      name: "gameHome",
      component: () => import("/@/views/game/home.vue"),
      meta: {
        icon: "document",
        title: $t("menus.hsgameManageInfo"),
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/game/detail/:id",
      name: "gameDetail",
      component: () => import("/@/views/game/detail.vue"),
      meta: {
        title: $t("menus.hsgameManageInfo"),
        i18n: true,
        showLink: false
      }
    }
  ]
};

export default gameRouter;
