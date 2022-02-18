<script setup lang="ts">
import { ref, reactive } from "vue";
import { templateRef } from "@vueuse/core";
import SeamlessScroll from "/@/components/ReSeamlessScroll";
const scroll = templateRef<ElRef | null>("scroll", null);
let listData = ref([
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一等奖"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一等奖"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "国一等奖"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  },
  {
    date: "2021-09-01",
    name: "蓝桥杯",
    star: "省一"
  }
]);
let classOption = reactive({
  direction: "bottom"
});
</script>

<template>
  <div class="infinite">
    <ul class="top">
      <li>获奖日期</li>
      <li>比赛名称</li>
      <li>获奖等级</li>
    </ul>
    <SeamlessScroll
      ref="scroll"
      :data="listData"
      :class-option="classOption"
      class="warp"
      :number="15"
    >
      <ul class="item">
        <li v-for="(item, index) in listData" :key="index">
          <span v-text="item.date"></span>
          <span v-text="item.name"></span>
          <span v-text="item.star"></span>
        </li>
      </ul>
    </SeamlessScroll>
  </div>
</template>

<style lang="scss" scoped>
.infinite {
  .top {
    width: 95%;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin: 0 auto;
    font-size: 14px;
    color: #909399;
    font-weight: 400;
    background: #fafafa;

    li {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .warp {
    width: 95%;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;

    li {
      height: 30px;
      line-height: 30px;
      display: flex;
      font-size: 15px;
    }

    span {
      width: 34%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
