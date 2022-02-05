import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const TeamRouter = {
  path: "/",
  name: "Team",
  component: Layout,
  redirect: "/team",
  meta: {
    icon: "home-filled",
    title: $t("menus.hsteamManagement"),
    showLink: true,
    i18n: true,
    rank: 10
  },
  children: [
    {
      path: "/team",
      name: "teamManage",
      component: () => import("/@/views/team/index.vue"),
      meta: {
        title: $t("menus.hsteamManagement"),
        i18n: true,
        showLink: true
      }
    }
  ]
};

export default TeamRouter;
