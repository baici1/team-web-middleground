import { toRouteType } from "./types";
import { openLink } from "/@/utils/link";
import NProgress from "/@/utils/progress";
import { constantRoutes } from "./modules";
import { split, findIndex } from "lodash-es";
import { transformI18n } from "/@/plugins/i18n";
import remainingRouter from "./modules/remaining";
import { storageSession } from "/@/utils/storage";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { usePermissionStoreHook } from "/@/store/modules/permission";
import { Router, RouteMeta, createRouter, RouteRecordName } from "vue-router";
import {
  initRouter,
  getHistoryMode,
  getParentPaths,
  findRouteByPath,
  handleAliveRoute
} from "./utils";

// 创建路由实例
export const router: Router = createRouter({
  history: getHistoryMode(),
  routes: constantRoutes.concat(...remainingRouter),
  strict: true,
  //处理处理当你的home滚动到底部，跳转页面也是底部的bug情况
  // 作用：主要是让页面回到顶部
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition;
      } else {
        if (from.meta.saveSrollTop) {
          const top: number =
            document.documentElement.scrollTop || document.body.scrollTop;
          resolve({ left: 0, top });
        }
      }
    });
  }
});

// 路由白名单
const whiteList = ["/login"];
//跳转页面之前的处理
/**
 * to 的格式 查询：https://next.router.vuejs.org/zh/api/#routelocationnormalized
 *
 */
router.beforeEach((to: toRouteType, _from, next) => {
  //是否进行缓存
  if (to.meta?.keepAlive) {
    const newMatched = to.matched;
    handleAliveRoute(newMatched, "add");
    // 页面整体刷新和点击标签页刷新
    if (_from.name === undefined || _from.name === "redirect") {
      handleAliveRoute(newMatched);
    }
  }
  //获取Session的内容
  const name = storageSession.getItem("info");
  //开启进度条
  NProgress.start();
  //是否存在重定向
  const externalLink = to?.redirectedFrom?.fullPath;
  //不存在，处理matched的title进行翻译
  if (!externalLink)
    to.matched.some(item => {
      item.meta.title
        ? (document.title = transformI18n(
            item.meta.title as string,
            item.meta?.i18n as boolean
          ))
        : "";
    });
  //判断是否存在session
  if (name) {
    //存在重定向的地址，就跳转到重定向地址去，如果不存在，就是正常路由跳转，就可以直接跳转next()
    if (_from?.name) {
      // 如果路由包含http 则是超链接 反之是普通路由
      if (externalLink && externalLink.includes("http")) {
        openLink(`http${split(externalLink, "http")[1]}`);
        NProgress.done();
      } else {
        next();
      }
    } else {
      // 这里针对的每次的刷新，每次的刷新第一次 to 是根目录，name 不存在
      //获取 整体路由生成的菜单（静态、动态）的长度，如果为 0，就主动创建路由
      if (usePermissionStoreHook().wholeMenus.length === 0)
        initRouter(name.username).then((router: Router) => {
          //判断是否存储了标签页信息
          if (!useMultiTagsStoreHook().getMultiTagsCache) {
            const handTag = (
              path: string,
              parentPath: string,
              name: RouteRecordName,
              meta: RouteMeta
            ): void => {
              useMultiTagsStoreHook().handleTags("push", {
                path,
                parentPath,
                name,
                meta
              });
            };
            // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对静态路由）
            if (to.meta?.refreshRedirect) {
              const routes = router.options.routes;
              const { refreshRedirect } = to.meta;
              const { name, meta } = findRouteByPath(refreshRedirect, routes);
              handTag(
                refreshRedirect,
                getParentPaths(refreshRedirect, routes)[1],
                name,
                meta
              );
              return router.push(refreshRedirect);
            } else {
              const { path } = to;
              const index = findIndex(remainingRouter, v => {
                return v.path == path;
              });
              const routes =
                index === -1
                  ? router.options.routes[0].children
                  : router.options.routes;
              const route = findRouteByPath(path, routes);
              const routePartent = getParentPaths(path, routes);
              // 未开启标签页缓存，刷新页面重定向到顶级路由（参考标签页操作例子，只针对动态路由）
              if (
                path !== routes[0].path &&
                route?.meta?.rank !== 0 &&
                routePartent.length === 0
              ) {
                if (!route?.meta?.refreshRedirect) return;
                const { name, meta } = findRouteByPath(
                  route.meta.refreshRedirect,
                  routes
                );
                handTag(
                  route.meta?.refreshRedirect,
                  getParentPaths(route.meta?.refreshRedirect, routes)[0],
                  name,
                  meta
                );
                return router.push(route.meta?.refreshRedirect);
              } else {
                handTag(
                  route.path,
                  routePartent[routePartent.length - 1],
                  route.name,
                  route.meta
                );
                return router.push(path);
              }
            }
          }
          router.push(to.fullPath);
        });
      next();
    }
  } else {
    //这里针对白名单，也是不需要 token 进入的页面
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
