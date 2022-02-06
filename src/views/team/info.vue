<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const loading = ref(false);
const toUpdate = () => {
  router.push({
    path: "/team/editor",
    query: { flagTeam: 0 }
  });
};
</script>

<template>
  <div>
    <el-card class="info-box">
      <template #header>
        <div class="card-header">
          <span>白嫖队</span>
          <el-button type="text" @click="toUpdate">编辑</el-button>
        </div>
      </template>
      <el-skeleton :rows="5" :loading="loading" />
      <el-descriptions
        title="团队信息简介"
        direction="vertical"
        :column="3"
        :border="true"
      >
        <el-descriptions-item label="团队编号"> 1 </el-descriptions-item>
        <el-descriptions-item label="团队名称"> 白嫖队 </el-descriptions-item>
        <el-descriptions-item label="创建时间"> Suzhou </el-descriptions-item>
        <el-descriptions-item label="注册公司"> 未注册 </el-descriptions-item>
        <el-descriptions-item label="知识产权" :span="2">
          Suzhou
        </el-descriptions-item>

        <el-descriptions-item label="团队介绍">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>白嫖公司</span>
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
        <el-descriptions-item label="公司编号"> 1 </el-descriptions-item>
        <el-descriptions-item label="公司名称"> 白嫖队 </el-descriptions-item>
        <el-descriptions-item label="创建时间"> Suzhou </el-descriptions-item>
        <el-descriptions-item label="公司地址"> 未注册 </el-descriptions-item>
        <el-descriptions-item label="公司介绍">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
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
