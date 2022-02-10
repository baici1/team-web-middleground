<script setup lang="ts">
import { ref } from "vue";
import { ReTip } from "/@/components/ReTip/index";
import { timeFormatYMD } from "/@/utils/time";
let isGame = ref(true);
let loading = ref(false);
let competition = ref({
  c_name: "蓝桥杯",
  c_type: "A",
  level: "省赛",
  start_time: "2020-11-15T07:14:41.000Z",
  end_time: "2020-11-17T07:14:41.000Z",
  status: "已结束"
});
let entry = ref({
  name: "lala",
  join_time: "2020-11-14T07:14:41.000Z",
  status: 1,
  identify: 1,
  rank: "一等奖",
  achieve_name: "专利",
  project_code: "111",
  project_name: "无",
  introduction: "好",
  teacher: "杨澳宇"
});
const tableData1 = ref([
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "Man",
    age: 28,
    address: "test abc"
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "Women",
    age: 22,
    address: "Guangzhou"
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "Man",
    age: 32,
    address: "Shanghai"
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "Women",
    age: 24,
    address: "Shanghai"
  }
]);
</script>

<template>
  <div>
    <re-tip tips="这些都是你的荣誉！"></re-tip>
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
        <el-card class="info-box" v-if="isGame">
          <template #header>
            <div class="card-header">
              <span>比赛信息</span>
            </div>
          </template>
          <el-skeleton :rows="5" :loading="loading" />
          <el-descriptions direction="vertical" :column="3" :border="true">
            <el-descriptions-item label="比赛名称">
              {{ competition?.c_name }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛类型">
              {{ competition?.c_type }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛级别">
              {{ competition?.level }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间">
              {{ timeFormatYMD(competition?.start_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="结束时间">
              {{ timeFormatYMD(competition?.end_time) }}
            </el-descriptions-item>

            <el-descriptions-item label="比赛状态">
              <el-tag> {{ competition?.status }}</el-tag>
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
      </el-col>
    </el-row>
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
        <el-card class="info-box" v-if="isGame">
          <template #header>
            <div class="card-header">
              <span>参赛表信息</span>
            </div>
          </template>
          <el-skeleton :rows="5" :loading="loading" />
          <el-descriptions direction="vertical" :column="3" :border="true">
            <el-descriptions-item label="职位">
              {{ entry?.name }}
            </el-descriptions-item>
            <el-descriptions-item label="职位">
              <el-tag>{{ entry?.identify }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="参赛时间">
              {{ timeFormatYMD(entry?.join_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="申请状态">
              <el-tag> {{ entry?.status }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="获奖名称">
              {{ entry?.rank }}
            </el-descriptions-item>
            <el-descriptions-item label="成果展示">
              <el-tag> {{ entry?.achieve_name }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="指导老师">
              {{ entry?.teacher }}
            </el-descriptions-item>
            <el-descriptions-item label="项目编号">
              {{ entry?.project_code }}
            </el-descriptions-item>
            <el-descriptions-item label="项目名称">
              {{ entry?.project_name }}
            </el-descriptions-item>
            <el-descriptions-item label="项目简介" :span="2">
              {{ entry?.introduction }}
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
      </el-col>
    </el-row>
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
        <el-card class="info-box" v-if="isGame">
          <template #header>
            <div class="card-header">
              <span>队员信息</span>
            </div>
          </template>

          <vxe-table :data="tableData1">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0;
}
</style>
