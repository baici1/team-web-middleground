<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import avatars from "/@/assets/avatars.jpg";
// import { useRoute } from "vue-router";
import { commitTeam } from "/@/api/team";
import {
  formDataTeam,
  rulesTeam,
  rulesCompany,
  formDataCompany,
  flagTeam,
  flagCompany,
  commitData,
  get_team_id,
  get_team_info,
  get_company_info
} from "./utils/team";
import { useUserStoreHook } from "/@/store/modules/user";
import { ElForm, ElMessage } from "element-plus";
const userStore = useUserStoreHook();
type FormInstance = InstanceType<typeof ElForm>;

// const date: Date = new Date();
const router = useRouter();
const elFormTeam = ref<FormInstance>();
const elFormCompany = ref<FormInstance>();
let greetings = computed(() => {
  if (flagTeam.value) {
    return "创建一个适合你自己的团队吧";
  } else {
    return "恭喜你的团队在向上发展";
  }
});

/**
 * 第一件事情：判断当前是创建团队还是更新团队
 * 第二件事情：提交表单
 * 第三件事情：组合api，完成创建团队与更新团队的功能
 */
//

let getInfo = async () => {
  await get_team_id();
  if (!flagTeam.value) {
    await get_team_info();
    await get_company_info();
  }
};
getInfo();
let commit = async (
  formEl1: FormInstance | undefined,
  formEl2: FormInstance | undefined
) => {
  if (!formEl1 && !formEl2) {
    ElMessage.warning("请提交信息");
    return;
  }
  let valid1 = false;
  let valid2 = false;
  formEl1.validate(async valid => {
    valid1 = valid;
  });
  if (formEl2) {
    formEl2.validate(async valid => {
      valid2 = valid;
    });
  }
  let data: commitData = {
    u_id: userStore.userid,
    flag: flagCompany.value,
    ateaminfo: formDataTeam.value
  };
  if (valid1) {
    if (valid2 && flagCompany.value) {
      data.companyinfo = formDataCompany.value;
    }
    const res: any = await commitTeam(data, flagTeam.value);
    if (res?.code === 20000) {
      ElMessage.success("信息提交成功");
      router.push("/team/info");
    } else {
      ElMessage.error("信息提交失败！请重新尝试！");
    }
  }
};
</script>

<template>
  <div class="editor-team">
    <el-card class="top-content">
      <div class="left-mark">
        <img :src="avatars" title="直达仓库地址" />
        <span>{{ greetings }}</span>
      </div>
    </el-card>
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
        <el-card
          ><template #header>
            <div class="card-header">
              <span>{{ flagTeam ? "创建团队" : "修改团队" }}</span>
            </div>
          </template>
          <el-form
            ref="elFormTeam"
            :model="formDataTeam"
            :rules="rulesTeam"
            size="default"
            label-width="100px"
          >
            <el-form-item label="团队名称" prop="name">
              <el-input
                v-model="formDataTeam.name"
                placeholder="请输入团队名称"
                clearable
                :style="{ width: '100%' }"
                :disabled="!flagTeam"
              ></el-input>
            </el-form-item>
            <el-form-item label="团队介绍" prop="introduction">
              <el-input
                v-model="formDataTeam.introduction"
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
                v-model="formDataTeam.intellectual_property"
                type="textarea"
                placeholder="请输入知识产权"
                :maxlength="100"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 6 }"
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="注册公司" required>
              <el-switch
                v-model="flagCompany"
                :disabled="!flagTeam"
              ></el-switch>
            </el-form-item>
            <!-- <el-form-item size="large">
        <el-button type="primary" @click="commit">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item> -->
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin: 0 20px" v-if="flagCompany">
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
              <span>{{ flagTeam ? "创建公司" : "修改公司" }}</span>
            </div>
          </template>
          <el-form
            ref="elFormCompany"
            :model="formDataCompany"
            :rules="rulesCompany"
            size="default"
            label-width="100px"
          >
            <el-form-item label="公司名称" prop="name">
              <el-input
                v-model="formDataCompany.name"
                placeholder="请输入公司名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司地址" prop="address">
              <el-input
                v-model="formDataCompany.address"
                placeholder="请输入公司地址"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="团队介绍" prop="introduction">
              <el-input
                v-model="formDataCompany.introduction"
                type="textarea"
                placeholder="请输入团队介绍"
                :maxlength="100"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item size="large">
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
      </el-form-item> -->
          </el-form>
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
        <el-button type="primary" @click="commit(elFormTeam, elFormCompany)"
          >提交</el-button
        >
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
