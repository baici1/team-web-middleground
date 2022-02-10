<script setup lang="ts">
import avatars from "/@/assets/avatars.jpg";
const props = defineProps({
  avatar: {
    type: String,
    default: ""
  },
  tips: {
    type: String,
    default: "请不要忘记拼搏！！"
  }
});
</script>

<template>
  <div>
    <el-card class="top-content">
      <div class="left-mark">
        <img :src="avatars" title="加油！" />
        <span>{{ props.tips }}</span>
      </div>
    </el-card>
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
  margin-bottom: 20px;

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
