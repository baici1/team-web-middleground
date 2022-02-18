<script setup lang="ts">
import { ref } from "vue";
import { ReTip } from "/@/components/ReTip/index";
import { timeFormatYMD } from "../../utils/tools";
import {
  get_a_gameInfo,
  formDetail,
  get_student_info,
  studentsInfo
} from "./utils/home";
import { useRoute } from "vue-router";
const route = useRoute();
let isGame = ref(true);
let loading = ref(false);
let array = [];
let run = async () => {
  await get_a_gameInfo(route.params.id);
  for (let i = 0; i < formDetail.value.members.length; i++) {
    const data: any = await get_student_info(formDetail.value.members[i].u_id);
    array.push(data);
  }
  studentsInfo.value = array;
};
run();
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
              {{ formDetail.competition?.com_info.c_name }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛类型">
              {{ formDetail.competition?.com_info.c_type }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛级别">
              {{ formDetail.competition?.com_sche.level }}
            </el-descriptions-item>
            <el-descriptions-item label="报名开始">
              {{ timeFormatYMD(formDetail.competition?.com_sche.start_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="报名结束">
              {{ timeFormatYMD(formDetail.competition?.com_sche.end_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛开始">
              {{ timeFormatYMD(formDetail.competition?.com_sche.r_start_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="比赛结束">
              {{ timeFormatYMD(formDetail.competition?.com_sche.r_end_time) }}
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
            <el-descriptions-item label="队长姓名">
              {{ studentsInfo[0]?.real_name }}
            </el-descriptions-item>
            <el-descriptions-item label="申请状态">
              <el-tag> {{ formDetail.form?.status }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="获奖名称">
              {{ formDetail.form?.rank }}
            </el-descriptions-item>
            <el-descriptions-item label="成果展示">
              <el-tag> {{ formDetail.form?.ach_name }}</el-tag>
            </el-descriptions-item>
            <!-- <el-descriptions-item label="指导老师">
              {{ entry?.teacher }}
            </el-descriptions-item> -->
            <el-descriptions-item label="项目编号">
              {{ formDetail.project?.project_code }}
            </el-descriptions-item>
            <el-descriptions-item label="项目名称">
              {{ formDetail.project?.project_name }}
            </el-descriptions-item>
            <el-descriptions-item label="项目简介" :span="2">
              {{ formDetail.project?.introduction }}
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

          <vxe-table :data="studentsInfo">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="real_name" title="Name" width="100"></vxe-column>
            <vxe-column field="email" title="email" width="150"></vxe-column>
            <vxe-column field="gender" title="gender" width="100"></vxe-column>
            <vxe-column field="degree" title="degree" width="100"></vxe-column>
            <vxe-column field="grade" title="grade" width="100"></vxe-column>
            <vxe-column field="QQ" title="QQ" width="100"></vxe-column>
            <vxe-column field="order" title="order" width="100"></vxe-column>
            <vxe-column field="major" title="major" width="100"></vxe-column>
            <vxe-column
              field="class_num"
              title="class_num"
              width="100"
            ></vxe-column>
            <vxe-column
              field="specialty"
              title="specialty"
              width="100"
            ></vxe-column>
            <vxe-column field="wechat" title="wechat" width="100"></vxe-column>
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
