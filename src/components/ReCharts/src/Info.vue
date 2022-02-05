<script setup lang="ts">
import { ref } from "vue";
const lists = ref([
  { type: "", label: "善良" },
  { type: "success", label: "好学" }
]);
</script>

<template>
  <el-descriptions
    class="margin-top"
    direction="vertical"
    :column="3"
    :border="true"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="picture-rounded" />
        </el-icon>
        头像
      </template>
      <el-avatar
        :size="35"
        src="http://yiming_chang.gitee.io/manages/assets/avatars.596f7aa0.jpg"
      ></el-avatar>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="user" />
        </el-icon>
        姓名
      </template>
      xiaoxian
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="iphone" />
        </el-icon>
        性别
      </template>
      男
    </el-descriptions-item>
  </el-descriptions>
  <el-descriptions
    class="margin-top"
    direction="vertical"
    :column="2"
    :border="true"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="tickets" />
        </el-icon>
        身份
      </template>
      <el-tag
        v-for="item in lists"
        :key="item.label"
        :type="item.type"
        size="small"
        effect="dark"
      >
        {{ item.label }}
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="message-icon" />
        </el-icon>
        邮箱
      </template>
      249337001@qq.com
    </el-descriptions-item>
  </el-descriptions>
  <el-descriptions
    class="margin-top"
    direction="vertical"
    :column="1"
    :border="true"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="notebook" />
        </el-icon>
        介绍
      </template>
      好好学习，天天向上 好好学习，天天向上 好好学习，天天向上
      好好学习，天天向上 好好学习，天天向上 好好学习，天天向上
      好好学习，天天向上 好好学习，天天向上
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
.el-tag {
  margin-right: 10px !important;
}
</style>
