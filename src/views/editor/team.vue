<script setup lang="ts">
import { ref, computed } from "vue";
import avatars from "/@/assets/avatars.jpg";
import createTeamVue from "./components/editorTeam.vue";
import editorCompanyVue from "./components/editorCompany.vue";
import { useRoute } from "vue-router";
// const date: Date = new Date();
//创建团队
const route = useRoute();
const flagTeam = ref(1);
flagTeam.value = +route.query.flagTeam;
let greetings = computed(() => {
  if (flagTeam.value === 1) {
    return "创建一个适合你自己的团队吧";
  } else {
    return "恭喜你的团队在向上发展";
  }
});
let flagCompany = ref(false);
// 接收子组件触发的方法
const updateflag = value => {
  flagCompany.value = value;
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
          <createTeamVue @updateflag="updateflag"></createTeamVue>
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
          <editorCompanyVue></editorCompanyVue>
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
