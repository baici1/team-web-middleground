<script setup lang="ts">
import { ReBar, ReInfo, ReInfinite, RePie } from "/@/components/ReCharts/index";
import { ref } from "vue";
let loading = ref<boolean>(true);
setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<template>
  <div class="welcome">
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
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
              <ReInfo />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
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
            <span style="font-size: 16px; font-weight: 500">获奖信息</span>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <ReInfinite class="warp" class-option="bottom" />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin: 20px">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
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
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
        :xl="12"
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
  height: 280px;
}
</style>
