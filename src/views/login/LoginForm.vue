<script setup lang="ts">
import { computed, unref } from "vue";
import { useRouter } from "vue-router";
import { initRouter } from "/@/router/utils";
import { getLogin } from "/@/api/user";
import { ElMessage } from "element-plus";
import { setToken } from "/@/utils/auth";
import { storageLocal } from "/@/utils/storage";
import { useUserStoreHook } from "/@/store/modules/user";
import {
  useInputUtil,
  FormStateEnum,
  useFormState,
  LoginForm
} from "./useLogin";
const userStore = useUserStoreHook();
const router = useRouter();
const { setFormState, getFormState } = useFormState();
const { onInputFocus, onInputBlur, onInputErr } = useInputUtil();
//发起登录请求
const onLogin = async () => {
  LoginForm.value.phone = LoginForm.value.phone.trim();
  if (LoginForm.value.phone.length == 0) {
    onInputErr(LoginForm.value.phone, "phone");
    return;
  }
  LoginForm.value.password = LoginForm.value.password.trim();
  if (LoginForm.value.password.length == 0) {
    onInputErr(LoginForm.value.password, "pwd");
    return;
  }
  try {
    const data: any = await getLogin(LoginForm.value);
    userStore.SET_TOKEN(data.data?.accessToken);
    storageLocal.setItem("info", data.data.user);
    setToken(data.data);
    //通过权限获取列表
    initRouter("admin").then(() => {});
    router.push("/");
  } catch (error) {
    ElMessage.error("手机号与密码输入错误！");
  }
};

const getShow = computed(() => unref(getFormState) === FormStateEnum.LOGIN);
</script>

<template>
  <div class="on-login" v-if="getShow">
    <form>
      <div
        class="input-group phone"
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
        <div class="icon">
          <i class="fa fa-phone"></i>
        </div>
        <div>
          <h5>用户名</h5>
          <input
            type="text"
            class="input"
            v-model="LoginForm.phone"
            @focus="onInputFocus('phone')"
            @blur="onInputBlur(LoginForm.phone, 'phone')"
            required="true"
          />
        </div>
      </div>
      <div
        class="input-group pwd"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <div class="icon">
          <i class="fa fa-lock"></i>
        </div>
        <div>
          <h5>密码</h5>
          <input
            type="password"
            class="input"
            v-model="LoginForm.password"
            @focus="onInputFocus('pwd')"
            @blur="onInputBlur(LoginForm.password, 'pwd')"
            required="true"
          />
        </div>
      </div>
      <el-row
        justify="space-between"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        <el-col :span="4">
          <el-checkbox label="记住我" size="large"></el-checkbox>
        </el-col>
        <el-col :span="5">
          <el-button type="text" @click="setFormState(FormStateEnum.REGISTER)"
            >注册</el-button
          >
        </el-col>
      </el-row>
      <button
        class="btn"
        v-motion
        :initial="{
          opacity: 0,
          y: 10
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500
          }
        }"
        :leave="{
          y: -10,
          opacity: 0,
          transition: {
            delay: 500
          }
        }"
        @click="onLogin"
      >
        登录
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import url("/@/style/login.css");
</style>
