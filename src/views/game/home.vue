<script setup lang="ts">
import { onMounted } from "vue";
import {
  gameInfo,
  formatterType,
  formatterLevel,
  formattercomStatus,
  formatentryIdentify,
  formatentryStatus
} from "./utils/home";
import { ReTip } from "/@/components/ReTip/index";
import { Edit, More, Delete, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
onMounted(() => {
  gameInfo.value.loading = true;
  setTimeout(() => {
    gameInfo.value.tableData = [
      {
        id: 1,
        com: {
          c_name: "蓝桥杯",
          c_type: "A",
          level: "省赛",
          start_time: "2020-11-15T07:14:41.000Z",
          end_time: "2020-11-17T07:14:41.000Z",
          status: "已结束"
        },
        entry: {
          join_time: "2020-11-14T07:14:41.000Z",
          status: 1,
          identify: 1,
          rank: "一等奖",
          name: "专利"
        },
        project: {
          project_code: "111",
          project_name: "无"
        }
      },
      {
        com: {
          c_name: "蓝桥杯",
          c_type: "B",
          level: "省赛",
          start_time: "2020-11-14T07:14:41.000Z",
          end_time: "2020-11-14T07:14:41.000Z",
          status: "已结束"
        },
        entry: {
          join_time: "2020-11-14T07:14:41.000Z",
          status: 1,
          identify: 1,
          rank: "一等奖",
          name: "专利"
        },
        project: {
          project_code: "111",
          project_name: "无"
        }
      },
      {
        com: {
          c_name: "蓝桥杯",
          c_type: "B",
          level: "省赛",
          start_time: "2020-11-14T07:14:41.000Z",
          end_time: "2020-11-14T07:14:41.000Z",
          status: "已结束"
        },
        entry: {
          join_time: "2020-11-14T07:14:41.000Z",
          status: 1,
          identify: 1,
          rank: "一等奖",
          name: "专利"
        },
        project: {
          project_code: "111",
          project_name: "无"
        }
      }
    ];
    gameInfo.value.loading = false;
  }, 500);
});
const router = useRouter();
let getMore = id => {
  router.push({
    name: "gameDetail",
    params: {
      id: id
    }
  });
};
</script>

<template>
  <div class="game-home">
    <ReTip tips="竞赛的魅力在于每一次比赛中的拼搏！"></ReTip>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :span="24"
        style="margin-bottom: 20px"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200
          }
        }"
      >
        <vxe-table
          round
          ref="xTable"
          border
          stripe
          height="600"
          :loading="gameInfo.loading"
          :column-config="{ resizable: true }"
          :row-config="{ isHover: true }"
          :data="gameInfo.tableData"
          class="mytable-scrollbar"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            field="com.c_name"
            title="比赛名"
            sortable
            width="200"
          ></vxe-column>
          <vxe-column
            field="com.c_type"
            title="比赛类型"
            :filters="gameInfo.c_typeList"
            :formatter="formatterType"
            width="100"
          ></vxe-column>
          <vxe-column
            field="com.level"
            title="比赛级别"
            width="100"
            :filters="gameInfo.level"
            :formatter="formatterLevel"
          ></vxe-column>
          <vxe-column
            field="com.start_time"
            title="开始时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="com.end_time"
            title="结束时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="com.status"
            title="状态"
            width="100"
            :filters="gameInfo.status"
            :formatter="formattercomStatus"
          ></vxe-column>
          <vxe-column
            field="entry.join_time"
            title="参赛时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="entry.identify"
            title="职位"
            width="100"
            :filters="gameInfo.identify"
            :formatter="formatentryIdentify"
            show-overflow
          ></vxe-column>
          <vxe-column
            field="entry.status"
            title="申请"
            sortable
            :filters="gameInfo.e_status"
            :formatter="formatentryStatus"
            width="100"
          ></vxe-column>
          <vxe-column
            field="project.project_code"
            title="项目编号"
            sortable
            width="100"
          ></vxe-column>
          <vxe-column
            field="project.project_name"
            title="项目名称"
            sortable
            width="200"
          ></vxe-column>
          <vxe-column
            field="entry.rank"
            title="名次"
            fixed="right"
            width="100"
            show-overflow
          ></vxe-column>
          <vxe-column
            field="entry.name"
            title="成果名称"
            fixed="right"
            width="200"
            show-overflow
          ></vxe-column>
          <vxe-column
            title="操作"
            fixed="right"
            width="200"
            show-overflow
            field="id"
          >
            <template #default="{ row }">
              <el-tooltip effect="dark" content="增加" placement="top">
                <el-button :icon="Plus" circle></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="更多" placement="top">
                <el-button
                  :icon="More"
                  circle
                  @click="getMore(row?.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button :icon="Edit" circle></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="top">
                <el-button :icon="Delete" circle></el-button>
              </el-tooltip>
            </template>
          </vxe-column>
        </vxe-table>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0;
}

/* 滚动条整体部分 */
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* 滚动条的轨道 */
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #fff;
}

/* 滚动条里面的小方块，能向上向下移动 */
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

/* 边角，即两个滚动条的交汇处 */
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #fff;
}
</style>
