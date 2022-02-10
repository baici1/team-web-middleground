<script lang="ts">
export default {
  name: "user"
};
</script>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { $t } from "/@/plugins/i18n";
import {
  VxeGridProps,
  VxeGridInstance
  // VxeGridListeners,
  // VXETable
} from "vxe-table";
import axios from "axios";
import { ElMessage, ElNotification } from "element-plus";
import { useUserStoreHook } from "/@/store/modules/user";
const xGrid = ref({} as VxeGridInstance);
let id = useUserStoreHook().userid;
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
    mode: "cell",
    showStatus: true,
    activeMethod: ({ row, rowIndex, column, columnIndex }) => {
      const field: string = column.field;
      const phone: string = row.phone;
      if (field === "phone" && phone != null && phone.length > 0) {
        return false;
      } else {
        if (field === "phone") {
          ElNotification({
            type: "warning",
            title: "提示",
            message: "填写的手机号需要保证对方已注册账号！"
          });
        }
        return true;
      }
    }
  },
  //工具栏配置
  toolbarConfig: {
    buttons: [
      {
        code: "insert_actived",
        name: $t("buttons.hsadd"),
        status: "primary",
        icon: "fa fa-plus"
      },
      {
        code: "delete",
        name: "直接删除",
        icon: "fa fa-trash-o",
        status: "primary"
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
        status: "primary",
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
  tooltipConfig: {
    showAll: true
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
          u_id: id
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
        if (body.insertRecords.length > 0) {
          const user = body.insertRecords;
          const $grid = xGrid.value;
          const data = $grid.getData(1);
          const teamid: number = data.team_id;
          const queryParams: any = {
            team_id: teamid,
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
              if (response.data.code == 40101) {
                ElMessage.error("填写内容错误！");
              }
            });
        }
        if (body.updateRecords.length > 0) {
          const user = body.updateRecords;
          const queryParams: any = {
            team_id: user[0].team_id,
            u_id: user[0].u_id,
            identify: +user[0].identify
          };
          return axios
            .request({
              url: "http://127.0.0.1:20201/menage/teamMember/update",
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
      }
    }
  },
  //列配置
  columns: [
    { type: "checkbox", width: 50 },
    { type: "seq", width: 60 },
    {
      field: "team_id",
      title: "team_id",
      visible: false,
      slots: {
        default: ({ row }) => {
          return row.team_id;
        }
      }
    },
    { field: "real_name", title: "Name" },
    { field: "nickname", title: "Nickname" },
    {
      field: "phone",
      title: "phone",
      editRender: { name: "$input" },
      titleHelp: {
        content: "当进行添加时候可以修改，其余时刻不允许修改！",
        icon: "ri-question-fill"
      }
    },
    { field: "email", title: "email" },
    { field: "gender", title: "gender" },
    { field: "identify", title: "identify", editRender: { name: "$input" } }
  ]
} as VxeGridProps);

// const gridEvents: VxeGridListeners = {
//   toolbarButtonClick({ code }) {
//     const $grid = xGrid.value;
//     switch (code) {
//       case "myInsert": {
//         $grid.insert({
//           name: "xxx"
//         });
//         break;
//       }
//       case "save": {
//         const { insertRecords, removeRecords, updateRecords } =
//           $grid.getRecordset();
//         VXETable.modal.message({
//           content: `新增 ${insertRecords.length} 条，删除 ${removeRecords.length} 条，更新 ${updateRecords.length} 条`,
//           status: "success"
//         });
//         break;
//       }
//       case "myExport": {
//         $grid.exportData({
//           type: "csv"
//         });
//         break;
//       }
//     }
//   }
// };
</script>

<template>
  <div>
    <el-alert
      title="请勿修改表格中的手机号"
      type="warning"
      effect="light"
      style="margin-bottom: 10px"
    >
    </el-alert>
    <vxe-grid v-bind="gridOptions" ref="xGrid"
      ><!--自定义空数据模板-->
      <template #empty>
        <span style="color: red">
          <img
            src="https://pic2.zhimg.com/50/v2-f7031359103859e1ed38559715ef5f3f_hd.gif"
          />
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-grid>
  </div>
</template>
