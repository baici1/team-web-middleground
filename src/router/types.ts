import { RouteLocationNormalized } from "vue-router";
/**
 * to 的格式 查询：https://next.router.vuejs.org/zh/api/#routelocationnormalized
 *
 */
export interface toRouteType extends RouteLocationNormalized {
  meta: {
    keepAlive?: boolean;
    refreshRedirect: string;
    dynamicLevel?: string;
  };
}
