<script setup lang="ts">
import { checkGender } from "/@/utils/tools";
// const lists = ref([
//   { type: "", label: "善良" },
//   { type: "success", label: "好学" }
// ]);
const props = defineProps({
  info: {
    type: Object,
    default: undefined
  }
} as any);
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
      <el-avatar :size="35" :src="props.info.avatar"></el-avatar>
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="user" />
        </el-icon>
        姓名
      </template>
      {{ props.info.real_name }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="iphone" />
        </el-icon>
        性别
      </template>
      {{ checkGender(props.info.gender) }}
    </el-descriptions-item>
  </el-descriptions>
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
        学号
      </template>
      {{ props.info.student_id }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="user" />
        </el-icon>
        学历
      </template>
      {{ props.info.degree }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="iphone" />
        </el-icon>
        专业
      </template>
      {{ props.info.department }}--{{ props.info.major }}
    </el-descriptions-item>
  </el-descriptions>
  <el-descriptions
    class="margin-top"
    direction="vertical"
    :column="3"
    :border="true"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="iphone" />
        </el-icon>
        QQ
      </template>
      {{ props.info.QQ }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="user" />
        </el-icon>
        微信
      </template>
      {{ props.info.wechat }}
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
    :column="2"
    :border="true"
  >
    <el-descriptions-item>
      <template #label>
        <el-icon>
          <IconifyIconOffline icon="tickets" />
        </el-icon>
        特长
      </template>
      <el-tag
        v-for="item in props.info.lists"
        :key="item.label"
        size="small"
        effect="dark"
      >
        {{ item }}
      </el-tag>
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
      {{ props.info.introduction }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
.el-tag {
  margin-right: 10px !important;
}
</style>
