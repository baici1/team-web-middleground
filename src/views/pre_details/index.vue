<template>
  <el-container>
    <el-header class="header-box">
      <Header></Header>
    </el-header>
    <el-main class="main-box">
      <el-row justify="center">
        <el-col :span="16" :xs="22">
          <div class="title">
            <div class="title1">{{ article?.title }}</div>
            <div class="title1">{{ article?.type }}</div>
            <div class="mark">
              <span>作者：{{ article?.author }}</span>
              <span>时间：{{ timeFormatYMD(article?.create_time) }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="16" :xs="22">
          <div class="main-text">
            <!-- <div v-html="article.content">
              {{ article.content }}
            </div> -->
            <p v-html="article?.content"></p>
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>
<script setup lang="ts">
import Header from "/@/views/pre_home/components/header.vue";
import Footer from "/@/views/pre_home/components/footer.vue";
import { useRoute } from "vue-router";
import { GetAArticle } from "/@/api/pre_home";
import { ref } from "vue";
import { timeFormatYMD } from "/@/utils/tools";
import { ElMessage } from "element-plus";
// 获取id
const route = useRoute();
const id = route.params.id;
console.log(
  "%c 🍔 id: ",
  "font-size:20px;background-color: #6EC1C2;color:#fff;",
  id
);
const article = ref([] as any);
let articeDetail = async () => {
  try {
    const { data }: any = await GetAArticle({ id: Number(id) });
    console.log(
      "%c 🍖 data: ",
      "font-size:20px;background-color: #42b983;color:#fff;",
      data
    );
    article.value = data;
  } catch (error) {
    ElMessage.error("文章" + error.response.data.msg);
  }
};
articeDetail();
</script>
<style lang="scss" scoped>
// 支持CSS变量注入v-bind(color)

.header-box {
  width: 100%;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.main-box {
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0;
}
.el-footer {
  padding: 0;
  margin: 0;
  margin-top: 50px;
}
.title {
  margin: 60px 0;
  text-align: center;
  border-bottom: 2px solid #e1e1e1;
  .title1 {
    text-align: center;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 5px;
  }
  .mark {
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #999;
    margin: 10px 0;
    span {
      margin: 0 20px;
    }
  }
}
.main-text {
  min-height: 500px;
  padding: 0 20px;
}
@media screen and (max-width: 768px) {
}
</style>
