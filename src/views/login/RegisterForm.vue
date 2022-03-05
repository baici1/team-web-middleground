<script setup lang="ts">
import { ElMessage } from "element-plus";
import { computed, unref } from "vue";
import {
  FormStateEnum,
  useFormState,
  useInputUtil,
  RegisterForm
} from "./useLogin";
import { getRegister } from "/@/api/user";
const { getFormState, handleBackLogin } = useFormState();
const getShow = computed(() => unref(getFormState) === FormStateEnum.REGISTER);
const { onInputFocus, onInputBlur, onInputErr } = useInputUtil();
const onRegister = async () => {
  //参数校验
  //去除空格
  RegisterForm.value.phone = RegisterForm.value.phone.trim();
  if (RegisterForm.value.phone.length == 0) {
    onInputErr(RegisterForm.value.phone, "phone");
    return;
  }
  RegisterForm.value.password = RegisterForm.value.password.trim();
  if (RegisterForm.value.password.length == 0) {
    onInputErr(RegisterForm.value.password, "pwd");
    return;
  }
  RegisterForm.value.again = RegisterForm.value.again.trim();
  if (RegisterForm.value.again != RegisterForm.value.password) {
    onInputErr(RegisterForm.value.password, "pwd");
    onInputErr(RegisterForm.value.again, "again");
    ElMessage.error("两次密码不一致");
    return;
  }
  try {
    const data: any = await getRegister(RegisterForm.value);
    if (data?.code == 20000) {
      ElMessage.success("恭喜你！注册成功，请进行登录");
    }
  } catch (error) {
    ElMessage.error("注册失败！请重新注册！");
  }
};
</script>

<template>
  <template v-if="getShow">
    <form>
      <!-- 用户名 -->
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
          <h5>手机号</h5>
          <input
            type="text"
            class="input"
            v-model="RegisterForm.phone"
            @focus="onInputFocus('phone')"
            @blur="onInputBlur(RegisterForm.phone, 'phone')"
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
            v-model="RegisterForm.password"
            @focus="onInputFocus('pwd')"
            @blur="onInputBlur(RegisterForm.password, 'pwd')"
            required="true"
          />
        </div>
      </div>
      <div
        class="input-group again"
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
          <h5>确认密码</h5>
          <input
            type="password"
            class="input"
            v-model="RegisterForm.again"
            @focus="onInputFocus('again')"
            @blur="onInputBlur(RegisterForm.again, 'again')"
            required="true"
          />
        </div>
      </div>
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
            delay: 250
          }
        }"
        @click="onRegister"
      >
        注册
      </button>
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
            delay: 250
          }
        }"
        @click="handleBackLogin"
      >
        返回
      </button>
    </form>
  </template>
</template>

<style scoped>
@import url("/@/style/login.css");
</style>
