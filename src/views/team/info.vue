<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStoreHook } from "/@/store/modules/user";
import { ElMessage, ElMessageBox } from "element-plus";
import { timeFormatYMD } from "../../utils/tools";
import {
  getTeamInfo,
  getTeamId,
  getCompanyInfo,
  deleteTeam,
  deleteCompany
} from "/@/api/team";

const router = useRouter();
const loading = ref(false);
const toUpdate = () => {
  router.push({
    path: "/team/editor",
    name: "Create&UpdateTeam"
  });
};
const toCreate = () => {
  router.push({
    path: "/team/editor",
    name: "Create&UpdateTeam"
  });
};
let teamInfo = ref();
let isTeam = ref(false);
let companyInfo = ref();
let isCompany = ref(false);
//获取userid
let id = useUserStoreHook().userid;
let teamId = ref(0);
//获取团队信息
let get_team_info = async () => {
  try {
    const data: any = await getTeamInfo({
      id: teamId.value
    });
    console.log(
      "%c 🍵 data: ",
      "font-size:20px;background-color: #3F7CFF;color:#fff;",
      data
    );
    isTeam.value = true;
    teamInfo.value = data.data;
  } catch (error) {
    ElMessage.error("获取团队信息发生错误");
  }
};
//发起请求获取团队id
let get_team_id = async () => {
  try {
    const data: any = await getTeamId({
      u_id: id
    });
    teamId.value = data.data;
  } catch (error) {
    ElMessage.error("获取团队信息发生错误");
  }
};
//获取公司信息
async function get_company_info(id) {
  try {
    const data: any = await getCompanyInfo({
      id: id
    });
    console.log(
      "%c 🍆 data: ",
      "font-size:20px;background-color: #33A5FF;color:#fff;",
      data
    );
    isCompany.value = true;
    companyInfo.value = data.data;
  } catch (error) {
    ElMessage.error("获取公司信息发生错误");
  }
}
//判断是否需要创建团队
const open = () => {
  ElMessageBox.alert("请尽快创建团队或者等待加入团队！！", "创建团队", {
    confirmButtonText: "OK",
    callback: () => {
      toCreate();
    }
  });
};
async function team() {
  await get_team_id();
  console.log(
    "%c 🍐 teamId.value: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    teamId.value
  );
  if (teamId.value != 0) {
    await get_team_info();
    if (teamInfo.value?.company_id != 0) {
      await get_company_info(teamInfo.value?.company_id);
    }
  } else {
    open();
  }
}
team();
let isDoCompany = computed(() => {
  if (teamInfo.value?.company_id > 0) {
    return "已注册";
  } else {
    return "未注册";
  }
});
const delete_team = async () => {
  const res: any = await deleteTeam({
    id: teamInfo?.value.id
  });
  if (res?.code === 20000) {
    ElMessage.success("团队信息删除成功");
  }
};
const delete_company = async () => {
  const res: any = await deleteCompany({
    id: companyInfo?.value.id
  });
  if (res?.code === 20000) {
    ElMessage.success("公司信息删除成功");
  }
};
let deleteInfo = async () => {
  await delete_team();
  await delete_company();
};
</script>

<template>
  <div>
    <!-- 团队信息 -->
    <el-card class="info-box" v-if="isTeam">
      <template #header>
        <div class="card-header">
          <span>{{ teamInfo?.name }}</span>
          <div>
            <el-button type="text" @click="toUpdate">编辑</el-button>
            <el-button type="text" @click="deleteInfo">删除</el-button>
          </div>
        </div>
      </template>
      <el-skeleton :rows="5" :loading="loading" />
      <el-descriptions
        title="团队信息简介"
        direction="vertical"
        :column="3"
        :border="true"
      >
        <el-descriptions-item label="团队编号">
          {{ teamInfo?.id }}
        </el-descriptions-item>
        <el-descriptions-item label="团队名称">
          {{ teamInfo?.name }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ timeFormatYMD(teamInfo?.create_time) }}
        </el-descriptions-item>
        <el-descriptions-item label="注册公司">
          {{ isDoCompany }}
        </el-descriptions-item>
        <el-descriptions-item label="知识产权" :span="2">
          {{ teamInfo?.intellectual_property }}
        </el-descriptions-item>
        <el-descriptions-item label="团队介绍">
          {{ teamInfo?.introduction }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="info-box" v-else>
      <el-empty description="no data">
        <template #image>
          <ReSvgIcon name="undraw_no_data_re_kwbl"></ReSvgIcon>
        </template>
      </el-empty>
    </el-card>
    <!-- 公司信息 -->
    <el-card v-if="isCompany">
      <template #header>
        <div class="card-header">
          <span>{{ companyInfo?.name }}</span>
          <el-button type="text">编辑</el-button>
        </div>
      </template>
      <el-skeleton :rows="5" :loading="loading" />
      <el-descriptions
        title="公司信息简介"
        direction="vertical"
        :column="2"
        :border="true"
      >
        <el-descriptions-item label="公司编号">
          {{ companyInfo?.id }}
        </el-descriptions-item>
        <el-descriptions-item label="公司名称">
          {{ companyInfo?.name }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ timeFormatYMD(companyInfo?.create_time) }}
        </el-descriptions-item>
        <el-descriptions-item label="公司地址">
          {{ companyInfo?.address }}
        </el-descriptions-item>
        <el-descriptions-item label="公司介绍">
          {{ companyInfo?.introduction }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="info-box" v-else>
      <el-empty description="no data">
        <template #image>
          <ReSvgIcon name="undraw_no_data_re_kwbl"></ReSvgIcon>
        </template>
      </el-empty>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-box {
  margin-bottom: 20px;
}
</style>
