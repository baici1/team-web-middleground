<template>
  <div class="Main">
    <el-row justify="center" :gutter="20">
      <el-col :span="12" :xs="22">
        <div class="Main-left">
          <!-- 轮播图 -->
          <Carousel :autoplay="2000" :wrap-around="true">
            <Slide v-for="swiper in Swipers" :key="swiper">
              <!-- <div class="carousel__item" :style="{ backgroundImage: `url(${swiper.swiper_picture})` }"></div> -->
              <el-image class="carousel__item" :src="swiper.swiper_picture">
                <template #error>
                  <ReSvgIcon
                    name="undraw_page_not_found_re_e9o6"
                    class="img-error"
                  ></ReSvgIcon>
                </template>
              </el-image>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
          <!-- 公告合集 -->
          <div class="news">
            <el-row justify="space-between" :gutter="20">
              <el-col :span="12" :xs="24">
                <el-card class="news-card">
                  <template #header>
                    <div class="news-header">
                      <div class="nleft">
                        <span>
                          <el-icon :size="20"><histogram /></el-icon>
                          双创活动
                        </span>
                        <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/notice.png" /> -->
                      </div>
                      <div class="nright">
                        <router-link :to="{ name: 'List' }">
                          <el-button class="button" type="text">
                            查看更多
                          </el-button>
                        </router-link>

                        <img
                          src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
                          alt="icons"
                        />
                      </div>
                    </div>
                  </template>
                  <el-empty v-if="show[0]" description="No Data"></el-empty>
                  <div
                    v-for="item in articles[0]"
                    :key="item"
                    class="news-text"
                  >
                    <el-link @click="ToDetail(item.id)">
                      <n-ellipsis style="max-width: 300px">
                        {{ item.title }}
                      </n-ellipsis>
                    </el-link>
                    <span style="color: #999999" class="news-time">{{
                      timeFormatMD(item.create_time)
                    }}</span>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-card class="news-card">
                  <template #header>
                    <div class="news-header">
                      <div class="nleft">
                        <span>
                          <el-icon :size="20"><chat-round /></el-icon>
                          新闻动态
                        </span>
                        <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/news.png" /> -->
                      </div>
                      <div class="nright">
                        <el-button class="button" type="text"
                          >查看更多</el-button
                        >
                        <img
                          src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
                          alt="icons"
                        />
                      </div>
                    </div>
                  </template>
                  <el-empty v-if="show[1]" description="No Data"></el-empty>
                  <div
                    v-for="item in articles[1]"
                    :key="item"
                    class="news-text"
                  >
                    <el-link>
                      <n-ellipsis style="max-width: 300px">
                        {{ item.title }}
                      </n-ellipsis>
                    </el-link>
                    <el-link>
                      <span style="color: #999999" class="news-time">{{
                        timeFormatMD(item.create_time)
                      }}</span>
                    </el-link>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row justify="space-between" :gutter="20">
              <el-col :span="12" :xs="24">
                <el-card class="news-card">
                  <template #header>
                    <div class="news-header">
                      <div class="nleft">
                        <span>
                          <el-icon :size="20"><data-analysis /></el-icon>
                          通知公告
                        </span>
                        <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/notice.png" /> -->
                      </div>
                      <div class="nright">
                        <router-link
                          :to="{ name: 'Game', params: { id: 'news' } }"
                        >
                          <el-button class="button" type="text"
                            >查看更多</el-button
                          >
                        </router-link>

                        <img
                          src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
                          alt="icons"
                        />
                      </div>
                    </div>
                  </template>
                  <el-empty v-if="show[2]" description="No Data"></el-empty>
                  <div
                    v-for="item in articles[2]"
                    :key="item"
                    class="news-text"
                  >
                    <el-link>
                      <n-ellipsis style="max-width: 300px">
                        {{ item.title }}
                      </n-ellipsis>
                    </el-link>
                    <el-link>
                      <span style="color: #999999" class="news-time">{{
                        timeFormatMD(item.create_time)
                      }}</span>
                    </el-link>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-card class="news-card">
                  <template #header>
                    <div class="news-header">
                      <div class="nleft">
                        <span>
                          <el-icon :size="20"><goods /></el-icon>
                          政策文件
                        </span>
                        <!-- <img src="https://static.lanqiao.cn/dasai/images/20210818/title/news.png" /> -->
                      </div>
                      <div class="nright">
                        <el-button class="button" type="text"
                          >查看更多</el-button
                        >
                        <img
                          src="https://static.lanqiao.cn/dasai/images/20210818/icons/yellow_right.png"
                          alt="icons"
                        />
                      </div>
                    </div>
                  </template>
                  <el-empty v-if="show[3]" description="No Data"></el-empty>
                  <div
                    v-for="item in articles[3]"
                    :key="item"
                    class="news-text"
                  >
                    <el-link>
                      <n-ellipsis style="max-width: 300px">
                        {{ item.title }}
                      </n-ellipsis>
                    </el-link>
                    <el-link>
                      <span style="color: #999999" class="news-time">{{
                        timeFormatMD(item.create_time)
                      }}</span>
                    </el-link>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="3" :xs="0">
        <div class="main-right">
          <el-scrollbar>
            <div class="title">比赛时间轴</div>
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity?.type"
                :color="activity.color"
                :timestamp="`${timeFormatYMD(
                  activity.start_time
                )}~${timeFormatYMD(activity.end_time)}`"
              >
                <!-- @click="toLink(activity.id)" -->
                <el-link :href="activity.url">
                  {{ activity.c_name }}-{{ activity.level }}
                </el-link>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
    <div class="Part">
      <div class="title">优秀教师</div>
      <el-row justify="center">
        <el-col :xl="16" :lg="16" :md="16" :xs="24">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
      <div class="title">优秀团队</div>
      <el-row justify="center">
        <el-col :xl="16" :lg="16" :md="16" :xs="24"><teacher></teacher></el-col>
      </el-row>
      <ReSvgIcon name="undraw_tree_swing_re_pqee" class="icon-left"></ReSvgIcon>
      <ReSvgIcon name="undraw_well_done_i2wr" class="icon-right"></ReSvgIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import {
  GetShowSwiper,
  GetSpecificArticles,
  GetCompetitionTimeList
} from "/@/api/pre_home";
import { ref } from "vue";
import {
  DataAnalysis,
  Goods,
  ChatRound,
  Histogram
} from "@element-plus/icons-vue";
import { ReSvgIcon } from "/@/components/ReSvgIcon/index";
import { useRouter } from "vue-router";
import { timeFormatMD, getYear, timeFormatYMD } from "/@/utils/tools";
import { NEllipsis } from "naive-ui";
import teacher from "./teacher.vue";
const router = useRouter();
// 获取轮播图
const show = ref([true, true, true, true]);
let Swipers = ref([]);
let getSwipers = async () => {
  try {
    const { data }: any = await GetShowSwiper();
    // console.log('%c 🥑 data: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', data);
    Swipers.value = data;
  } catch (error) {
    ElMessage.error(error.response.data.msg);
  }
};
getSwipers();
// 获取各类文章
// 参数
let artparam = ref({
  page: 1,
  limit: 10,
  type: ""
});
let articles = ref([]);

async function getArticles(type) {
  for (let i = 0; i < 4; i++) {
    try {
      artparam.value.type = type[i];
      const { data }: any = await GetSpecificArticles(artparam.value);
      // console.log('%c 🍨 res: ', 'font-size:20px;background-color: #6EC1C2;color:#fff;', data);
      articles.value.push(data.records);
      show.value[articles.value.length - 1] = false;
    } catch (error) {
      ElMessage.error(type[i] + error.response.data.msg);
    }
  }
}
getArticles(["双创活动", "新闻动态", "通知公告", "政策文件"]);
// console.log('%c 🥪 articles: ', 'font-size:20px;background-color: #FCA650;color:#fff;', articles.value);
// 时间轴
const activities = ref([
  {
    c_name: "近一年度",
    start_time: getYear()[0],
    end_time: getYear()[1],
    color: "#00C9C8",
    icon: "el-icon-more",
    id: 123,
    level: "比赛",
    url: "/preGame/home",
    type: ""
  }
]);
let timeList = async () => {
  try {
    const { data }: any = await GetCompetitionTimeList();
    // console.log('%c 🥠 data: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', data);
    let status = ["danger", "success ", "primary", "info"]; // 已结束，比赛中，报名中，未开始。
    for (let i = 0; i < data.length; i++) {
      data[i].type = status[Number(data[i].status)];
      activities.value.push(data[i]);
    }
  } catch (error) {
    ElMessage.error("比赛时间轴" + error.response.data.msg);
  }
};
timeList();

// // 跳转页面
// function toLink(id) {
//   router.push(`/game/${id}`);
// }
function ToDetail(id) {
  router.push(`/details/${id}`);
}
</script>
<style lang="scss" scoped>
.carousel__item {
  height: 300px;
  // min-height: 300px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-error {
    height: 300px;
    width: 100%;
  }
  // background-position: center;
  // background-size: cover;
  // background-repeat: no-repeat;
  // overflow: hidden;
}
.news {
  margin-bottom: 50px;
}
.el-card__header {
  padding: 0 20px;
}
.news-header {
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  .el-button {
    color: #161f39;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
  }
  .el-button:hover {
    color: rgb(100, 42, 251);
  }
  .nleft {
    height: 50px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items: center;
    img {
      height: 17px;
      cursor: pointer;
      margin-left: 10px;
    }
    span {
      font-size: 24px;
      color: #161f39;
    }
  }
  .nright {
    height: 50px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items: center;
    img {
      width: 100%;
      height: 17px;
      cursor: pointer;
    }
  }
}
.news-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .el-link {
    margin: 5px 0;
    cursor: pointer;
  }
}
.el-row {
  margin-bottom: 20px;
}
.main-right {
  .title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
  }
  .time-line {
    padding-left: 50px;
  }
}
.Part {
  overflow: hidden;
  padding: 30px 10px;
  position: relative;
  background: rgba($color: #ceecff, $alpha: 0.7);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: rgba($color: #474554, $alpha: 1);
  font-size: 28px;
}
.icon-left {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 3%;
  transform: translateY(-50%);
}
.icon-right {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 47%;
  right: 2%;
  transform: translateY(-50%);
}
@media screen and (max-width: 768px) {
  .news-time {
    display: none;
  }
  .icon-left {
    display: none;
  }
  .icon-right {
    display: none;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
