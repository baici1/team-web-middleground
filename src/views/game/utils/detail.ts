import { getAGameInfo } from "/@/api/game";
import { getStudentInfo } from "/@/api/user";
import { ref } from "vue";
import { VxeColumnPropTypes } from "vxe-table";
type formType = {
  form: any;
  project: any;
  members: any;
  competition: any;
};
//获取表单信息
export const formDetail = ref({} as formType);
export const get_a_gameInfo = async id => {
  const data: any = await getAGameInfo({
    id: id
  });
  console.log(
    "%c 🍶 data: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    data
  );
  formDetail.value = data.data;
};
//获取学生详情信息
export const studentsInfo = ref([] as any);
export const get_student_info = async id => {
  const data: any = await getStudentInfo({
    id: id
  });
  console.log(
    "%c 🥘 data: ",
    "font-size:20px;background-color: #B03734;color:#fff;",
    data
  );
  return data.data;
};
//处理返回的数据进行计算属性
//处理无数据
export const handleNoData = val => {
  console.log(
    "%c 🍡 val: ",
    "font-size:20px;background-color: #4b4b4b;color:#fff;",
    val
  );
  if (val == undefined || val?.length == 0) {
    return "无";
  }
  return val;
};
const projectStatus = ["审核中", "已参赛", "已结束"];
export const handleStatus = val => {
  return projectStatus[val];
};

//表格格式化内容
export const formatterGender: VxeColumnPropTypes.Formatter = ({
  cellValue
}) => {
  if (cellValue == 1) {
    return "男";
  }
  return "女";
};
