<template>
  <nav>
    <div class="top">
      <div class="top-left">
        <img src="@/assets/logo.png" alt="qmx" />
        <div class="top-left_text">创新创业官网</div>
      </div>
      <div class="top-right">
        <div class="top-box">
          <router-link to="/" class="router">首页</router-link>
        </div>
        <div class="top-box">
          <router-link to="/team" class="router">组队</router-link>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="top-box">
          <router-link to="/login" class="router">登录</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
// https://ismail9k.github.io/vue3-carousel/examples.html
</script>
<style lang="scss" scoped>
.top {
  width: 90%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-left {
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}
.top-left_text {
  line-height: 60px;
  margin-left: 20px;
}
img {
  height: 60px;
  width: 60px;
}
.top-right {
  display: flex;
  justify-content: center;
  align-items: center;
  .top-box {
    width: 60px;
    padding: 0 15px;
    text-align: center;
  }
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: rgb(51, 112, 255);
}
@media screen and (max-width: 768px) {
  .top-left_text {
    display: none;
  }
  .top-right {
    display: flex;
    justify-content: center;
    align-items: center;
    .top-box {
      width: 35px;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
