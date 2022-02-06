import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const TeamRouter = {
  path: "/team",
  name: "Team",
  component: Layout,
  redirect: "/team/info",
  meta: {
    icon: "home-filled",
    title: $t("menus.hsteamManagement"),
    showLink: true,
    i18n: true,
    rank: 10
  },
  children: [
    {
      path: "/team/info",
      name: "TeamInfo",
      component: () => import("/@/views/team/info.vue"),
      meta: {
        title: $t("menus.hsteamManageInfo"),
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/team/member",
      name: "TeamManage",
      component: () => import("/@/views/team/member.vue"),
      meta: {
        title: $t("menus.hsteamManageMember"),
        i18n: true,
        showLink: true
      }
    },
    {
      //用于团队创建，不显示
      path: "/team/editor",
      name: "Create&UpdateTeam",
      component: () => import("/@/views/editor/team.vue"),
      meta: {
        title: $t("menus.hsEditorteam"),
        i18n: true,
        showLink: false,
        keepAlive: false
      }
    }
  ]
};

export default TeamRouter;
