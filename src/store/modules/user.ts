import { defineStore } from "pinia";
import { store } from "/@/store";
import { userType } from "./types";
import { useRouter } from "vue-router";
import { storageLocal, storageSession } from "/@/utils/storage";
import { getToken, removeToken } from "/@/utils/auth";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
const data = getToken();
let token = "";
const name = "";
let userid = 0;
let phone = "";
//获取cookie里面的用户信息
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    userid = dataJson?.user.id;
    phone = dataJson?.user.phone;
    //name = dataJson?.name ?? "admin";
  }
}
export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    token,
    name,
    userid,
    phone
  }),
  actions: {
    SET_TOKEN(token) {
      this.token = token;
    },
    SET_NAME(name) {
      this.name = name;
    },
    SET_USERID(id) {
      this.userid = id;
    },
    SET_PHONE(phone) {
      this.phone = phone;
    },
    // 登出 清空缓存
    logOut() {
      this.token = "";
      this.name = "";
      removeToken();
      storageLocal.clear();
      storageSession.clear();
      useMultiTagsStoreHook().handleTags("equal", [
        {
          path: "/welcome",
          parentPath: "/",
          meta: {
            title: "menus.hshome",
            icon: "home-filled",
            i18n: true,
            showLink: true
          }
        }
      ]);
      useRouter().push("/login");
    }
    // 刷新token
    // async refreshToken(data) {
    //   return refreshToken(data).then(data => {
    //     if (data) {
    //       setToken(data);
    //       return data;
    //     }
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
