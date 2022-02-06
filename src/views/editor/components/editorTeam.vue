<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="default"
      label-width="100px"
    >
      <el-form-item label="团队名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入团队名称"
          clearable
          :style="{ width: '100%' }"
        ></el-input>
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
      <el-form-item label="知识产权" prop="intellectual_property">
        <el-input
          v-model="formData.intellectual_property"
          type="textarea"
          placeholder="请输入知识产权"
          :maxlength="100"
          show-word-limit
          :autosize="{ minRows: 4, maxRows: 6 }"
          :style="{ width: '100%' }"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="注册公司" prop="company_id" required>
        <el-switch
          v-model="formData.company_id"
          @change="changeflag"
        ></el-switch>
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
  introduction: undefined,
  intellectual_property: undefined,
  company_id: false
});

const rules = ref({
  name: [
    {
      required: true,
      message: "请输入团队名称",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ],
  intellectual_property: [
    {
      required: true,
      message: "请输入知识产权",
      trigger: "blur"
    }
  ]
});
// 声明事件
const emit = defineEmits(["updateflag"]);
const changeflag = val => {
  // 执行
  emit("updateflag", val);
};
</script>
<style></style>
