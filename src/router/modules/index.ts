// 静态路由
import homeRouter from "./home";
import errorRouter from "./error";
import externalLink from "./externalLink";
import remainingRouter from "./remaining";
import TeamRouter from "./team";
import gameRouter from "./game";
// import PreWebRouter from "./preweb";
import { RouteRecordRaw, RouteComponent } from "vue-router";

import {
  ascending,
  formatTwoStageRoutes,
  formatFlatteningRoutes
} from "../utils";

//查询配置项 https://pure-admin-doc.vercel.app/pages/782b6e/
// 原始静态路由（未做任何处理）
const routes = [homeRouter, errorRouter, externalLink, TeamRouter, gameRouter];

// 导出处理后的静态路由（三级及以上的路由全部拍成二级）
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(ascending(routes))
);

// 用于渲染菜单，保持原始层级
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(
  ...remainingRouter
);
