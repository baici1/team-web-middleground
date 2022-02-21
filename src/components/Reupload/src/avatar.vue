<template>
  <el-upload
    class="avatar-uploader"
    action="http://127.0.0.1:20201/admin/upload/a_file"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="header"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { storageLocal } from "/@/utils/storage";

const imageUrl = ref("");
const handleAvatarSuccess = (res: any, file: any) => {
  console.log(
    "%c 🍕 file: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    file
  );
  console.log(
    "%c 🧀 res: ",
    "font-size:20px;background-color: #E41A6A;color:#fff;",
    res
  );
  imageUrl.value = "http://127.0.0.1:20201" + res?.data.path;
  console.log(
    "%c 🎂 imageUrl: ",
    "font-size:20px;background-color: #93C0A4;color:#fff;",
    imageUrl.value
  );
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
  }
  return isJPG && isLt2M;
};
const header = ref({
  Authorization:
    "Bearer " + storageLocal.getItem("authorized-token").accessToken
} as any);
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
