<script setup lang="ts">
import {
  isEdit,
  gameInfo,
  formatterType,
  formatterLevel,
  formatentryIdentify,
  formatentryStatus,
  get_all_gameInfo,
  Form,
  FormRules,
  addMember,
  deleteMember,
  dialogVisible,
  closeDialog,
  enterDialog,
  handleClose,
  dialogTitle,
  cascaderOptions,
  cascaderChange,
  createForm,
  editorForm
} from "./utils/home";
// import { ref } from "vue";
import { ReTip } from "/@/components/ReTip/index";
import { Edit, More, Delete, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
let getMore = id => {
  router.push({
    name: "gameDetail",
    params: {
      id: id
    }
  });
};
get_all_gameInfo();
</script>

<template>
  <div class="game-home">
    <ReTip tips="竞赛的魅力在于每一次比赛中的拼搏！"></ReTip>
    <!-- 显示表格信息 -->
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
            field="competition.com_sche.version"
            title="届数"
            width="100"
          ></vxe-column>
          <vxe-column
            field="competition.com_info.c_name"
            title="比赛名"
            sortable
            width="200"
          ></vxe-column>
          <vxe-column
            field="competition.com_info.c_type"
            title="比赛类型"
            :filters="gameInfo.c_typeList"
            :formatter="formatterType"
            width="100"
          ></vxe-column>
          <vxe-column
            field="competition.com_sche.level"
            title="比赛级别"
            width="100"
            :filters="gameInfo.level"
            :formatter="formatterLevel"
          ></vxe-column>
          <vxe-column
            field="competition.com_sche.start_time"
            title="开始时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="competition.com_sche.end_time"
            title="结束时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <!-- <vxe-column
            field="com.status"
            title="状态"
            width="100"
            :filters="gameInfo.status"
            :formatter="formattercomStatus"
          ></vxe-column> -->
          <vxe-column
            field="competition.com_sche.r_start_time"
            title="参赛时间"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="competition.com_sche.r_end_time"
            title="赛事结束"
            sortable
            width="200"
            formatter="formatDate"
          ></vxe-column>
          <vxe-column
            field="members.identify"
            title="职位"
            width="100"
            :filters="gameInfo.identify"
            :formatter="formatentryIdentify"
            show-overflow
          ></vxe-column>
          <vxe-column
            field="form.status"
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
            field="form.rank"
            title="名次"
            fixed="right"
            width="100"
            show-overflow
          ></vxe-column>
          <vxe-column
            field="form.ach_name"
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
            field="form.id"
          >
            <template #default="{ row }">
              <el-tooltip effect="dark" content="增加" placement="top">
                <el-button :icon="Plus" circle @click="createForm"></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="更多" placement="top">
                <el-button
                  :icon="More"
                  circle
                  @click="getMore(row.form?.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="编辑" placement="top">
                <el-button
                  :icon="Edit"
                  circle
                  @click="editorForm(row.form?.id)"
                ></el-button>
              </el-tooltip>
            </template>
          </vxe-column>
        </vxe-table>
      </el-col>
    </el-row>
    <!-- 弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="40%"
      custom-class="dialog"
      :before-close="handleClose"
    >
      <el-alert
        title="默认创建者为队长，同时增加的队员需要注册手机号"
        type="warning"
        style="margin-bottom: 10px"
      />
      <el-form
        ref="ruleFormRef"
        :model="Form"
        :rules="FormRules"
        class="demo-ruleForm"
        label-position="top"
      >
        <!-- <el-form-item label="届数" prop="version">
          <el-input v-model="editorForm.version"></el-input>
        </el-form-item>
        <el-form-item label="输入比赛名" prop="c_name">
          <el-input v-model="editorForm.c_name"></el-input>
        </el-form-item>
        <el-form-item label="比赛级别" prop="level">
          <el-input v-model="editorForm.level"></el-input>
        </el-form-item> -->
        <el-cascader-panel
          :options="cascaderOptions"
          v-model="Form.cmp_id"
          @change="cascaderChange"
          style="margin-bottom: 10px"
        />
      </el-form>
      <div>
        <el-button
          size="small"
          type="primary"
          :icon="Edit"
          @click="addMember(Form)"
        >
          新增队员
        </el-button>
        <el-table :data="Form.members" style="width: 100%">
          <el-table-column
            align="left"
            prop="identify"
            label="身份"
            width="180"
          >
            <template #default="scope">
              <el-select
                v-model="scope.row.identify"
                placeholder="请选择"
                :disabled="scope.row.isEdit"
              >
                <el-option key="leader" :value="1" label="队长" />
                <el-option key="member" :value="2" label="队员" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="phone" label="手机号" width="180">
            <template #default="scope">
              <div>
                <el-input
                  v-model="scope.row.phone"
                  :disabled="scope.row.isEdit"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template #default="scope">
              <div>
                <el-button
                  type="danger"
                  size="small"
                  :icon="Delete"
                  :disabled="isEdit || scope.row.isEdit"
                  @click="deleteMember(Form.members, scope.$index)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="enterDialog"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
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
