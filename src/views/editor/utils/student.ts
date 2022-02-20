import { ElMessage } from "element-plus";
import { storageLocal } from "/@/utils/storage";
import { ref, nextTick } from "vue";
import { getStudentInfo, updateStudentInfo } from "/@/api/user";
import type { ElInput } from "element-plus";
export const greetings = ref("希望能有更多人认识你");
//获取userid
const info = storageLocal.getItem("info");
const uid = info.id;

//tag
export const inputValue = ref("");
export const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
export const inputVisible = ref(false);
export const InputRef = ref<InstanceType<typeof ElInput>>();

export const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

export const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

export const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

//表单
export const form = ref({
  id: 0,
  student_id: "",
  u_id: 0,
  nickname: "",
  email: "",
  avatar: "",
  real_name: "",
  gender: 1,
  degree: "",
  grade: "",
  department: "",
  major: "",
  class_num: "",
  specialty: "",
  QQ: "",
  wechat: "",
  bank_name: "",
  bank_card_number: "",
  introduction: ""
});
//初始化form
export const initForm = () => {
  form.value = {
    id: 0,
    student_id: "",
    u_id: 0,
    nickname: "",
    email: "",
    avatar: "",
    real_name: "",
    gender: 1,
    degree: "",
    grade: "",
    department: "",
    major: "",
    class_num: "",
    specialty: "",
    QQ: "",
    wechat: "",
    bank_name: "",
    bank_card_number: "",
    introduction: ""
  };
};
//表单规则
export const formRules = ref({
  student_id: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  nickname: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  avatar: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  real_name: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  degree: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  grade: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  department: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  major: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  class_num: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  specialty: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  QQ: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  wechat: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  bank_name: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  bank_card_number: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "Please input email",
      trigger: "blur"
    }
  ]
});

//获取学生详情信息
export const get_studentInfo = async () => {
  const data: any = await getStudentInfo({
    id: uid
  });
  console.log(
    "%c 🍏 data: ",
    "font-size:20px;background-color: #2EAFB0;color:#fff;",
    data
  );
  form.value = data.data;
  //处理specialty
  dynamicTags.value = form.value.specialty.split(",");
};
//修改学生详情信息
export const update_studentInfo = async () => {
  form.value.specialty = dynamicTags.value.join(",");
  const data = await updateStudentInfo(form.value);
  console.log(
    "%c 🦐 data: ",
    "font-size:20px;background-color: #3F7CFF;color:#fff;",
    data
  );
  ElMessage.success("信息更新成功");
};
