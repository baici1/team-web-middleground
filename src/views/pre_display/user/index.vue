<template>
  <el-container>
    <el-header class="header-box">
      <Header></Header>
    </el-header>
    <el-main>
      <!-- 第一部分：头像与基本信息介绍 -->
      <el-row justify="center">
        <el-col :span="15" :xs="24">
          <el-descriptions class="margin-top" title="个人简介" border>
            <el-descriptions-item min-width="80px">
              <template #label>
                <div>
                  <el-icon>
                    <user />
                  </el-icon>
                  头像
                </div>
              </template>
              <el-avatar
                shape="square"
                :size="40"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <user />
                  </el-icon>
                  姓名
                </div>
              </template>
              kooriookami
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <iphone />
                  </el-icon>
                  性别
                </div>
              </template>
              男
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <Location />
                  </el-icon>
                  邮箱
                </div>
              </template>
              249337001@qq.com
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <tickets />
                  </el-icon>
                  身份
                </div>
              </template>
              <el-tag size="small">学生</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <office-building />
                  </el-icon>
                  描述
                </div>
              </template>
              No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
              Province No.1188, Wuzhong Avenue, Wuzhong District, Suzhou,
              Jiangsu Province No.1188, Wuzhong Avenue, Wuzhong District,
              Suzhou, Jiangsu Province No.1188, Wuzhong Avenue, Wuzhong
              District, Suzhou, Jiangsu Province
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <!-- 第二部分：获奖显示 -->
      <el-row justify="center" :gutter="20">
        <el-col :span="5" :xs="20">
          <el-card shadow="always">
            <div class="award">
              <ReSvgIcon
                name="undraw_outer_space_re_u9vd"
                class="award-svg"
              ></ReSvgIcon>
              <div class="award-text">
                <div class="award-text-title">校赛</div>
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="12039"
                />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" :xs="20">
          <el-card shadow="always">
            <div class="award">
              <ReSvgIcon
                name="undraw_happy_news_re_tsbd"
                class="award-svg"
              ></ReSvgIcon>
              <div class="award-text">
                <div class="award-text-title">省赛</div>
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="12039"
                />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" :xs="20">
          <el-card shadow="always">
            <div class="award">
              <ReSvgIcon
                name="undraw_connection_re_lcud"
                class="award-svg"
              ></ReSvgIcon>
              <div class="award-text">
                <div class="award-text-title">国赛</div>
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="12039"
                />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 第三部分：饼图显示 -->
      <el-row justify="center" style="margin: 0">
        <el-col :span="15">
          <h3 style="font-weight: 700">成绩图表显示</h3>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="8"><RePie></RePie> </el-col>
        <el-col :span="8"><RePie></RePie> </el-col>
      </el-row>
      <!-- 第四部分：历史赛事记录 -->
      <el-row justify="center" style="margin: 0">
        <el-col :span="15">
          <h3 style="font-weight: 700">历史赛事记录</h3>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-col :span="15" class="history-col">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :hollow="activity.hollow"
              :timestamp="activity.timestamp"
            >
              <el-card
                :body-style="{
                  padding: '10px',
                  background: 'rgb(250, 250, 250)'
                }"
                shadow="never"
              >
                <div class="history-item">
                  <div class="history-l">
                    <el-avatar
                      :size="50"
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    >
                    </el-avatar>
                    <p style="margin-left: 10px">{{ activity.content }}</p>
                  </div>
                  <div class="history-r">
                    <div>职位： <el-tag type="success">队长</el-tag></div>
                    <div style="margin-left: 10px">
                      获奖： <el-tag>国家一等奖</el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
              <el-card
                :body-style="{
                  padding: '10px',
                  background: 'rgb(250, 250, 250)'
                }"
                shadow="never"
              >
                <div class="history-item">
                  <div class="history-l">
                    <el-avatar
                      :size="50"
                      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                    >
                    </el-avatar>
                    <p style="margin-left: 10px">{{ activity.content }}</p>
                  </div>
                  <div class="history-r">
                    <div>职位： <el-tag type="success">队长</el-tag></div>
                    <div style="margin-left: 10px">
                      获奖： <el-tag>国家一等奖</el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <el-row justify="center">
        <el-button>查看更多</el-button>
      </el-row>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script setup lang="ts">
import Header from "/@/views/pre_home/components/header.vue";
import Footer from "/@/views/pre_home/components/footer.vue";
import {
  User,
  Iphone,
  Location,
  Tickets,
  OfficeBuilding,
  MoreFilled
} from "@element-plus/icons-vue";
import { ReSvgIcon } from "/@/components/ReSvgIcon/index";
import { NNumberAnimation } from "naive-ui";
// import { ref } from 'vue';
// import { GetCompetitions } from '@/api/page';
// import { ElMessage } from 'element-plus';
import { RePie } from "/@/components/ReCharts/index";
const activities = [
  {
    content: "蓝桥杯",
    timestamp: "2018-04",
    size: "large",
    type: "primary",
    icon: MoreFilled
  },
  {
    content: "蓝桥杯",
    timestamp: "2018-04-03 20:46",
    color: "#0bbd87"
  },
  {
    content: "Custom size",
    timestamp: "2018-04-03 20:46",
    size: "large"
  },
  {
    content: "Custom hollow",
    timestamp: "2018-04-03 20:46",
    type: "primary",
    hollow: true
  },
  {
    content: "Default node",
    timestamp: "2018-04-03 20:46"
  }
];
</script>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-box {
  width: 100%;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.el-footer {
  padding: 0;
  margin: 0;
}
.el-descriptions__label {
  max-width: 100px;
}
.el-row {
  margin-bottom: 20px;
}
.award {
  zoom: 1;
  height: 200px;
  position: relative;
  background: url("http://yiming_chang.gitee.io/manages/assets/bg.7b14eacd.png");
  background-size: cover;
  .award-svg {
    position: absolute;
    left: 5%;
    top: 20%;
    width: 150px;
    height: 150px;
  }
  .award-text {
    position: absolute;
    right: 10%;
    top: 10%;
    font-size: 30px;
    .award-text-title {
      margin-bottom: 10px;
      font-weight: bolder;
    }
  }
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
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .history-l {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .history-r {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.history-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
