import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const homeRouter = {
  path: "/",
  name: "home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "home-filled",
    title: $t("menus.hshome"),
    showLink: true,
    i18n: true,
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "welcome",
      component: () => import("/@/views/welcome.vue"),
      meta: {
        title: $t("menus.hshome"),
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/student/update",
      name: "authInfo",
      component: () => import("/@/views/editor/student.vue"),
      meta: {
        title: $t("menus.hsinfoUpdate"),
        i18n: true,
        showLink: false
      }
    }
  ]
};

export default homeRouter;
