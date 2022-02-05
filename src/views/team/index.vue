<script lang="ts">
export default {
  name: "user"
};
</script>

<script setup lang="ts">
import { reactive } from "vue";
import { $t } from "/@/plugins/i18n";
import { VxeGridProps } from "vxe-table";
import axios from "axios";
import { ElMessage } from "element-plus";
const gridOptions = reactive({
  border: true, //是否带有边框
  resizable: true, //所有的列是否允许拖动列宽调整大小
  keepSource: true, //保持原始值的状态，
  height: 650,
  printConfig: {}, //打印配置项
  // //导入配置项
  // importConfig: {
  //   remote: true,
  //   //importMethod: importMethod,
  //   types: ["xlsx"],
  //   modes: ["insert"]
  // },
  //导出配置项
  exportConfig: {
    remote: true,
    //exportMethod: this.exportMethod,
    types: ["csv"],
    modes: ["current", "selected", "all"]
  },
  //分页配置项
  pagerConfig: {
    // perfect: true,
    pageSize: 15
  },
  //可编辑配置项
  editConfig: {
    trigger: "click",
    mode: "row",
    showStatus: true
  },
  //工具栏配置
  toolbarConfig: {
    buttons: [
      {
        code: "insert_actived",
        name: $t("buttons.hsadd"),
        status: "perfect",
        icon: "fa fa-plus"
      },
      {
        code: "delete",
        name: "直接删除",
        icon: "fa fa-trash-o",
        status: "perfect"
      },
      // {
      //   code: "mark_cancel",
      //   name: $t("buttons.hsmark"),
      //   status: "perfect",
      //   icon: "fa fa-trash-o"
      // },
      {
        code: "save",
        name: $t("buttons.hssave"),
        status: "perfect",
        icon: "fa fa-save"
      }
    ],
    perfect: true,
    refresh: {
      icon: "fa fa-refresh",
      iconLoading: "fa fa-spinner fa-spin"
    },
    // import: {
    //   icon: "fa fa-upload"
    // },
    export: {
      icon: "fa fa-download"
    },
    print: {
      icon: "fa fa-print"
    },
    zoom: {
      iconIn: "fa fa-arrows-alt",
      iconOut: "fa fa-expand"
    },
    custom: {
      icon: "fa fa-cog"
    }
  },
  //数据代理配置项
  proxyConfig: {
    //获取的属性配置
    props: {
      result: "result",
      total: "total"
    },
    ajax: {
      // 接收 Promise
      query: ({ page }) => {
        const queryParams: any = {
          page: page.currentPage,
          limit: page.pageSize,
          u_id: 1
        };
        return axios
          .request({
            url: "http://127.0.0.1:20201/menage/teamMember/all",
            method: "GET",
            params: queryParams
          })
          .then(({ data }) => {
            return data.data;
          })
          .catch(({ response }) => {
            ElMessage.error(response.data.msg);
          });
      },
      // body 对象： { removeRecords }
      delete: ({ body }) => {
        const user = body.removeRecords;
        const queryParams: any = {
          team_id: user[0].team_id,
          u_id: user[0].u_id
        };
        return axios
          .request({
            url: "http://127.0.0.1:20201/menage/teamMember/delete",
            method: "POST",
            data: queryParams
          })
          .then(({ data }) => {
            console.log(
              "%c 🍢 response: ",
              "font-size:20px;background-color: #E41A6A;color:#fff;",
              data
            );
          })
          .catch(({ response }) => {
            console.log(
              "%c 🥟 error: ",
              "font-size:20px;background-color: #4b4b4b;color:#fff;",
              response
            );
            ElMessage.error(response.data.msg);
          });
      },
      // body 对象： { insertRecords, updateRecords, removeRecords, pendingRecords }
      save: ({ body }) => {
        console.log(
          "%c 🥠 body: ",
          "font-size:20px;background-color: #FCA650;color:#fff;",
          body
        );
        if (body.insertRecords.length > 0) {
          const user = body.insertRecords;
          const queryParams: any = {
            team_id: 1,
            phone: user[0].phone,
            identify: +user[0].identify
          };
          return axios
            .request({
              url: "http://127.0.0.1:20201/menage/teamMember/create",
              method: "POST",
              data: queryParams
            })
            .then(({ data }) => {
              console.log(
                "%c 🍢 response: ",
                "font-size:20px;background-color: #E41A6A;color:#fff;",
                data
              );
            })
            .catch(({ response }) => {
              console.log(
                "%c 🥟 error: ",
                "font-size:20px;background-color: #4b4b4b;color:#fff;",
                response
              );
              ElMessage.error(response.data.msg);
            });
        }
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({});
          }, 100);
        });
      }
    }
  },
  //列配置
  columns: [
    { type: "checkbox", width: 50 },
    { type: "seq", width: 60 },
    { field: "real_name", title: "Name" },
    { field: "nickname", title: "Nickname" },
    { field: "phone", title: "phone", editRender: { name: "$input" } },
    { field: "email", title: "email" },
    { field: "gender", title: "gender" },
    { field: "identify", title: "identify", editRender: { name: "$input" } }
  ]
} as VxeGridProps);
</script>

<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>
