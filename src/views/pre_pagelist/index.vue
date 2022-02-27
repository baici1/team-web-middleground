<template>
  <div class="pagesList">
    <el-container>
      <el-header class="header-box">
        <Header></Header>
      </el-header>
      <el-main class="main-box">
        <el-row justify="center" :gutter="20">
          <el-col :xs="0" :sm="6" :md="4" :lg="3" :xl="1">
            <el-menu
              default-active="双创活动"
              class="menu"
              active-text-color="#fff"
              @select="handleSelect"
            >
              <el-menu-item index="双创活动" class="menu-item">
                <el-icon :size="20"><histogram /></el-icon>
                <span>双创活动</span>
              </el-menu-item>
              <el-menu-item index="新闻动态" class="menu-item">
                <el-icon :size="20"><chat-round /></el-icon>
                <span>新闻动态</span>
              </el-menu-item>
              <el-menu-item index="通知公告" class="menu-item">
                <el-icon :size="15"><data-analysis /></el-icon>
                <span>通知公告</span>
              </el-menu-item>
              <el-menu-item index="政策文件" class="menu-item">
                <el-icon :size="15"><goods /></el-icon>
                <span>政策文件</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :sm="18" :md="20" :lg="16" :xl="17" :xs="24">
            <div class="list-box">
              <div class="list-title">
                <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/' }"
                    >首页</el-breadcrumb-item
                  >
                  <el-breadcrumb-item>{{ artparam.type }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <a-list
                item-layout="horizontal"
                :data-source="articles"
                class="list"
              >
                <template #renderItem="{ item }">
                  <a-list-item class="list-item">
                    <a-list-item-meta class="list-meta">
                      <template #title>
                        <router-link
                          :to="{ name: 'Details', params: { id: item.id } }"
                        >
                          <n-ellipsis style="max-width: 90%">
                            {{ item.title }}
                          </n-ellipsis>
                        </router-link>
                      </template>
                      <template #avatar>
                        <a-avatar :size="10"> </a-avatar>
                      </template>
                    </a-list-item-meta>
                    <div>{{ timeFormatMD(item.create_time) }}</div>
                  </a-list-item>
                </template>
              </a-list>
            </div>
            <!-- <el-pagination
              background
              :current-page="artparam.page"
              :page-size="artparam.limit"
              layout="prev, pager, next"
              onUpdate:currentPage
              onUpdate:pageSize
              :total="total"
              style="margin-top: 10px"
            >
            </el-pagination> -->
            <a-pagination
              :current="artparam.page"
              :pageSize="artparam.limit"
              :total="total"
              show-less-items
              @change="onChange"
            />
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import Header from "/@/views/pre_home/components/header.vue";
import Footer from "/@/views/pre_home/components/footer.vue";
import { useRoute } from "vue-router";
import { ref } from "vue";
import {
  DataAnalysis,
  Goods,
  ChatRound,
  Histogram
} from "@element-plus/icons-vue";
import { GetSpecificArticles } from "/@/api/pre_home";
import { timeFormatMD } from "/@/utils/tools";
import { NEllipsis } from "naive-ui";
const route = useRoute();
console.log(
  "%c 🥃 route: ",
  "font-size:20px;background-color: #F5CE50;color:#fff;",
  route
);
let artparam = ref({
  page: 1,
  limit: 10,
  type: ""
});
let total = ref(0);
let articles = ref([]);
let show = ref(true);
async function getArticles(type) {
  try {
    // 初始化
    artparam.value.page = 1;
    // 获取文章类型
    artparam.value.type = type;
    // 发起请求
    const { data }: any = await GetSpecificArticles(artparam.value);
    console.log(
      "%c 🍨 res: ",
      "font-size:20px;background-color: #6EC1C2;color:#fff;",
      data
    );
    articles.value = data.records;
    total.value = data.total;
    show.value = false;
  } catch (error) {
    ElMessage.error(type + error.response.data.msg);
    return;
  }
}
getArticles("双创活动");
const handleSelect = key => {
  getArticles(key);
};
let onChange = pageNumber => {
  artparam.value.page = pageNumber;
  getArticles(artparam.value.type);
};
</script>
<style lang="scss" scoped>
// 支持CSS变量注入v-bind(color)

.header-box {
  width: 100%;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.main-box {
  // background-color: rgb(242, 242, 242);
  .menu {
    border: #f2f2f2 1px solid;
    .is-active {
      background-color: #265db4;
    }
    .menu-item {
      border-bottom: #f2f2f2 1px solid;
    }
  }
}
.el-footer {
  padding: 0;
  margin: 0;
}

.list-box {
  border: #f2f2f2 1px solid;
  border-top: 3px solid #265db4;
  .list-title {
    padding: 5px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: #f2f2f2 1px solid;
  }
  .list-item {
    border-bottom: #f2f2f2 1px solid;
    height: 60px;
    padding: 10px;
    margin: 5px;
  }
  .list-item:last-child {
    border-bottom: none;
  }
}

@media screen and (max-width: 768px) {
}
</style>
