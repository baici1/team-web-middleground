<template>
  <el-container>
    <el-header class="header-box">
      <Header></Header>
    </el-header>
    <el-main class="main-box">
      <el-scrollbar>
        <el-row justify="center">
          <el-col :span="24">
            <Banner @get-search-str="getSearchStr"></Banner>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="16" :xs="22">
            <el-menu
              default-active="0"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="0">全部</el-menu-item>
              <el-menu-item index="1">报名中</el-menu-item>
              <el-menu-item index="2">参赛中</el-menu-item>
              <el-menu-item index="3">已结束</el-menu-item>
            </el-menu>
            <!-- <n-tabs default-value="signin" size="large">
              <n-tab-pane name="signin" tab="登录">DENGLU </n-tab-pane>
              <n-tab-pane name="signup" tab="注册"> ZHUVC</n-tab-pane>
            </n-tabs> -->
          </el-col>
        </el-row>
        <el-row justify="center" style="background: rgb(242, 242, 242)">
          <el-col :span="14" :xs="22">
            <a-list
              item-layout="vertical"
              :data-source="activities"
              :loading="loading"
              class="game-list"
            >
              <template #loadMore>
                <div
                  v-if="isMore"
                  :style="{
                    textAlign: 'center',
                    margin: '12px 0',
                    height: '32px',
                    lineHeight: '32px'
                  }"
                >
                  <a-spin v-if="loadingMore" />
                  <a-button v-else @click="loadMore">加载更多</a-button>
                </div>
              </template>
              <template #renderItem="{ item }">
                <el-card class="game-card">
                  <a-list-item>
                    <a-list-item-meta>
                      <template #title>
                        <a
                          href="https://www.antdv.com/"
                          class="game-item-title"
                        >
                          {{ item.c_name }}
                          <el-tag
                            type="success"
                            size="small"
                            style="margin-left: 5px"
                            >{{
                              checkComStatus(
                                item.start_time,
                                item.end_time,
                                item.r_start_time,
                                item.r_end_time
                              )
                            }}</el-tag
                          >
                          <el-tag
                            type="info"
                            size="small"
                            style="margin-left: 5px"
                            >{{ item.c_type }}类赛事</el-tag
                          >
                        </a>
                        <div>
                          <p
                            style="
                              font-size: 14px;
                              color: rgb(102, 102, 102);
                              max-width: 95%;
                            "
                          >
                            {{ item.introduction }}
                          </p>
                          <p
                            style="
                              margin-top: 6px;
                              font-size: 12px;
                              color: rgb(136, 136, 136);
                            "
                          >
                            报名时间： {{ timeFormatYMD(item.start_time) }}
                            <el-divider direction="vertical"></el-divider>
                            截止时间：{{ timeFormatYMD(item.end_time) }}
                            <el-divider direction="vertical"></el-divider>
                            举办方：{{ item.organizer }}
                          </p>
                        </div>
                      </template>
                      <template #avatar>
                        <a-avatar
                          shape="square"
                          src="https://ali-cdn.educoder.net/images/avatars/Competition/3?t=1591925435"
                          class="game-item-img"
                        />
                      </template>
                    </a-list-item-meta>
                    <template #extra>
                      <div class="game-extra">
                        <el-button :disabled="item.isdisabled"
                          >参与报名</el-button
                        >
                      </div>
                      <div class="game-extra">
                        <el-button :disabled="item.isdisabled"
                          ><el-link
                            :href="item.url"
                            target="_blank"
                            :underline="false"
                            >前往官网</el-link
                          ></el-button
                        >
                      </div>
                    </template>
                  </a-list-item>
                </el-card>
              </template>
            </a-list>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-main>
    <!-- <el-footer>
      <Footer></Footer>
    </el-footer> -->
  </el-container>
</template>
<script setup lang="ts">
import Header from "/@/views/pre_home/components/header.vue";
// import { NTabs, NTabPane } from 'naive-ui';
// import { More } from '@element-plus/icons-vue';
import Banner from "./components/banner.vue";
import { timeFormatYMD, checkComStatus } from "/@/utils/tools";
import {
  getSearchStr,
  getcompetition,
  handleSelect,
  activities,
  isMore,
  loading,
  loadingMore,
  loadMore
} from "./index";

getcompetition();
</script>

<style lang="scss" scoped>
// 支持CSS变量注入v-bind(color)

.header-box {
  width: 100%;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.main-box {
  width: 100%;
  padding: 0;
  //  background-color: rgb(242, 242, 242);
}
.el-footer {
  padding: 0;
  margin: 0;
  margin-top: 50px;
}

.el-menu-demo {
  border: none;
}
.game-list {
  margin-top: 20px;
  min-height: 400px;
  .game-card {
    margin: 20px 0;
    border-radius: 5px;
    .el-card__body {
      padding: 0;
    }
    .game-item-title {
      font-size: 20px;
      color: #05101a;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 80%;
    }
    .game-item-img {
      width: 200px;
      height: 100px;
      border-radius: 5px;
    }
  }
}
.game-extra {
  margin: 10px 0;
}
@media screen and (max-width: 768px) {
  .game-list {
    margin-top: 20px;
    .game-card {
      .game-item-img {
        display: none;
        width: 100px;
        height: 50px;
        border-radius: 5px;
      }
    }
  }
}
</style>
