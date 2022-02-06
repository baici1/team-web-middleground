<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="default"
      label-width="100px"
    >
      <el-form-item label="公司名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入公司名称"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="address">
        <el-input
          v-model="formData.address"
          placeholder="请输入公司地址"
          clearable
          :style="{ width: '100%' }"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="团队介绍" prop="introduction">
        <el-input
          v-model="formData.introduction"
          type="textarea"
          placeholder="请输入团队介绍"
          :maxlength="100"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 4 }"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const formData = ref({
  name: undefined,
  address: undefined,
  introduction: undefined
});
const rules = ref({
  name: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur"
    }
  ],
  address: [
    {
      required: true,
      message: "请输入公司地址",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ]
});
</script>
<style></style>
