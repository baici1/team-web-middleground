// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

const permissionRouter = {
  path: "/permission",
  name: "permission",
  redirect: "/permission/page/index",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    i18n: true,
    showLink: true,
    rank: 3
  },
  children: [
    {
      path: "/permission/page/index",
      name: "permissionPage",
      meta: {
        title: "menus.permissionPage",
        i18n: true,
        showLink: true
      }
    },
    {
      path: "/permission/button/index",
      name: "permissionButton",
      meta: {
        title: "menus.permissionButton",
        i18n: true,
        showLink: true,
        authority: []
      }
    }
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  console.log(
    "%c 🍞 routes.children[1].meta.authority: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    routes.children[1].meta.authority
  );
  return routes;
}

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      if (query.name === "admin") {
        return {
          code: 0,
          info: [setDifAuthority("v-admin", permissionRouter)]
        };
      } else {
        return {
          code: 0,
          info: [setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
