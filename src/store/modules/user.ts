import { defineStore } from "pinia";
import { store } from "/@/store";
import { userType } from "./types";
import { useRouter } from "vue-router";
import { getLogin, refreshToken } from "/@/api/user";
import { storageLocal, storageSession } from "/@/utils/storage";
import { getToken, setToken, removeToken } from "/@/utils/auth";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import axios from "axios";
import { ElMessage } from "element-plus";
const data = getToken();
let token = "";
let name = "";
const userid = 14;
const teamid = 0;
const companyid = -1;
if (data) {
  const dataJson = JSON.parse(data);
  if (dataJson) {
    token = dataJson?.accessToken;
    name = dataJson?.name ?? "admin";
  }
}
export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    token,
    name,
    userid,
    teamid,
    companyid
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
    SET_TEAMID(id) {
      this.teamid = id;
    },
    SET_COMPANYID(id) {
      this.companyid = id;
    },
    // 登入
    async loginByUsername(data) {
      return new Promise<void>((resolve, reject) => {
        getLogin(data)
          .then(data => {
            if (data) {
              setToken(data);
              resolve();
            }
          })
          .catch(error => {
            reject(error);
          });
      });
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
    },
    // 刷新token
    async refreshToken(data) {
      return refreshToken(data).then(data => {
        if (data) {
          setToken(data);
          return data;
        }
      });
    },
    //获取teamid
    //发起请求获取团队id
    async getteamId() {
      //获取userid
      const id = useUserStoreHook().userid;
      await axios
        .request({
          url: "http://127.0.0.1:20201/menage/teamMember/teamid",
          method: "GET",
          params: {
            u_id: id
          }
        })
        .then(({ data }) => {
          this.SET_TEAMID(data.data);
        })
        .catch(() => {
          ElMessage.error("获取团队信息发生错误");
        });
    }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
