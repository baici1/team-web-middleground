<template>
  <div class="footer">
    <div class="fo-top">
      <div class="fo-first">
        <div class="text-one">支持单位</div>
        <div class="text-two">主办单位：CTGU</div>
        <div class="text-two">技术支持：启明星工作室</div>
      </div>
      <div class="fo-second">
        <div class="text-one">联系我们</div>
        <div class="text-two">Email:249337001@qq.com</div>
        <div class="text-two">地址:b3楼</div>
      </div>
    </div>
    <el-divider
      border-style="color: rgba($color: #d2d2d2, $alpha: 0.1);"
    ></el-divider>
    <div class="fo-bottom">京公网安备</div>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  background-color: rgb(26, 26, 26);
  color: white;

  .fo-top {
    padding: 30px 10px;
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text-one {
      color: #d2d2d2;
      font-size: 18px;
      font-weight: 600;
    }
    .text-two {
      color: #979797;
      font-size: 14px;
      margin: 10px 0;
    }
  }
  .fo-bottom {
    text-align: center;
    padding: 10px 0;
    font-size: 7px;
    color: #979797;
  }
  .el-divider {
    margin: 3px 0;
  }
}
@media screen and (max-width: 768px) {
  .footer .fo-top {
    width: 93%;
  }
}
</style>
