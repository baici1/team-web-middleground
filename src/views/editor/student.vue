<script setup lang="ts">
import { ReTip } from "/@/components/ReTip/index";
import { ReAvatar } from "/@/components/Reupload/index";
import {
  greetings,
  form,
  formRules,
  get_studentInfo,
  update_studentInfo,
  inputValue,
  dynamicTags,
  inputVisible,
  InputRef,
  handleClose,
  showInput,
  handleInputConfirm
} from "./utils/student";
import { ref } from "vue";
import { ElForm, ElMessage } from "element-plus";

type FormInstance = InstanceType<typeof ElForm>;

const ruleFormRef = ref<FormInstance>();
//开始获取学生信息
get_studentInfo();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      update_studentInfo();
    } else {
      ElMessage.warning("请认真填写相关信息！");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <div>
    <ReTip :tips="greetings"></ReTip>
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
        <el-card>
          <template #header>
            <div class="card-header">
              <span>修改信息 </span>
            </div>
          </template>
          <el-row justify="center">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <el-form
                ref="ruleFormRef"
                :model="form"
                :rules="formRules"
                label-width="auto"
                class="demo-ruleForm"
                label-position="right"
              >
                <el-form-item label="avatar" prop="avatar">
                  <ReAvatar></ReAvatar>
                </el-form-item>
                <el-form-item label="real_name" prop="real_name">
                  <el-input v-model="form.real_name"></el-input>
                </el-form-item>
                <el-form-item label="student_id" prop="student_id">
                  <el-input v-model="form.student_id"></el-input>
                </el-form-item>
                <el-form-item label="email" prop="email">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="degree" prop="degree">
                  <el-input v-model="form.degree"></el-input>
                </el-form-item>
                <el-form-item label="grade" prop="grade">
                  <el-input v-model="form.grade"></el-input>
                </el-form-item>
                <el-form-item label="department" prop="department">
                  <el-input v-model="form.department"></el-input>
                </el-form-item>
                <el-form-item label="major" prop="major">
                  <el-input v-model="form.major"></el-input>
                </el-form-item>
                <el-form-item label="class_num" prop="class_num">
                  <el-input v-model="form.class_num"></el-input>
                </el-form-item>
                <el-form-item label="specialty" prop="specialty">
                  <el-tag
                    v-for="tag in dynamicTags"
                    :key="tag"
                    class="mx-1 m-1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{ tag }}
                  </el-tag>
                  <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="ml-1 w-80px"
                    size="small"
                    style="width: 80px"
                    @keyup.enter="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag ml-1"
                    size="small"
                    @click="showInput"
                  >
                    + New Tag
                  </el-button>
                </el-form-item>
                <el-form-item label="QQ" prop="QQ">
                  <el-input v-model="form.QQ"></el-input>
                </el-form-item>
                <el-form-item label="wechat" prop="wechat">
                  <el-input v-model="form.wechat"></el-input>
                </el-form-item>
                <el-form-item label="bank_name" prop="bank_name">
                  <el-input v-model="form.bank_name"></el-input>
                </el-form-item>
                <el-form-item label="bank_card_number" prop="bank_card_number">
                  <el-input v-model="form.bank_card_number"></el-input>
                </el-form-item>
                <el-form-item label="introduction" prop="introduction">
                  <el-input
                    v-model="form.introduction"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    autosize
                  ></el-input>
                </el-form-item>
                <el-form-item label="gender" prop="gender">
                  <el-select v-model="form.gender" placeholder="Activity zone">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >Create</el-button
                  >
                  <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                </el-form-item>
              </el-form></el-col
            >
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 0;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #fff;
  margin-bottom: 20px;

  .left-mark {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
