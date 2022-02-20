<script setup lang="ts">
import { ref } from "vue";
import "babel-polyfill";
import myUpload from "vue-image-crop-upload";
const show = ref(false);
const params = ref({
  token: "123456798",
  name: "avatar"
});
const headers = ref({
  smail: "*_~"
});
const imgDataUrl = ref(""); // the datebase64 url of created image
function toggleShow() {
  show.value = !show.value;
}
/**
 * crop success
 *
 * [param] imgDataUrl
 * [param] field
 */
function cropSuccess(imgDataUrl, field) {
  console.log(
    "%c 🍿 field: ",
    "font-size:20px;background-color: #EA7E5C;color:#fff;",
    field
  );
  console.log("-------- crop success --------");
  imgDataUrl.value = imgDataUrl;
}
/**
 * upload success
 *
 * [param] jsonData   服务器返回数据，已进行json转码
 * [param] field
 */
function cropUploadSuccess(jsonData, field) {
  console.log("-------- upload success --------");
  console.log(jsonData);
  console.log("field: " + field);
}
/**
 * upload fail
 *
 * [param] status    server api return error status, like 500
 * [param] field
 */
function cropUploadFail(status, field) {
  console.log("-------- upload fail --------");
  console.log(status);
  console.log("field: " + field);
}
</script>

<template>
  <div class="avator">
    <a class="btn" @click="toggleShow">设置头像</a>
    <my-upload
      field="img"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="300"
      :height="300"
      url="/upload"
      :params="params"
      :headers="headers"
      img-format="png"
    ></my-upload>
    <img :src="imgDataUrl" />
  </div>
</template>
