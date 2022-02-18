<script setup lang="ts">
import { ReBar, ReInfo, ReInfinite, RePie } from "/@/components/ReCharts/index";
import { ref } from "vue";
import { getStudentInfo } from "/@/api/user";
import { useUserStoreHook } from "/@/store/modules/user";
import { ElMessage } from "element-plus";
const userStore = useUserStoreHook();
let loading = ref<boolean>(true);
setTimeout(() => {
  loading.value = !loading.value;
}, 800);
//获取个人id
const uid = userStore.userid;
const Info = ref({} as any);
//获取个人信息详情
const get_studentInfo = async () => {
  try {
    const data: any = await getStudentInfo({
      id: uid
    });
    console.log(
      "%c 🦑 data: ",
      "font-size:20px;background-color: #EA7E5C;color:#fff;",
      data
    );
    Info.value = data.data;
  } catch ({ response }) {
    ElMessage.error("获取用户信息失败，请重新刷新！");
  }
};
get_studentInfo();
</script>

<template>
  <div class="welcome">
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="14"
        :lg="14"
        :xl="14"
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
        <el-card>
          <template #header>
            <div class="card-header">
              <span style="font-size: 16px; font-weight: 500">个人信息</span>
              <el-button class="button" type="text">编辑</el-button>
            </div>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReInfo :info="Info" />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="10"
        :lg="10"
        :xl="10"
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
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500"
              >比赛类型分析图</span
            >
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReBar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="14"
        :lg="14"
        :xl="14"
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
        <el-card>
          <template #header class="card-header">
            <div class="card-header">
              <span style="font-size: 16px; font-weight: 500">获奖信息</span>
              <el-button class="button" type="text">更多</el-button>
            </div>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReInfinite class="warp" class-option="bottom" />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="10"
        :lg="10"
        :xl="10"
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
        <el-card>
          <template #header>
            <span style="font-size: 16px; font-weight: 500">获奖分析图</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <RePie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.warp {
  height: 450px;
}
</style>
