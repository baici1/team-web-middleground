import { ElMessage } from "element-plus";
import { VxeColumnPropTypes } from "vxe-table";
import { ref } from "vue";
import { getAllGameInfo, getAGameInfo } from "/@/api/game";
import { getStudentInfo } from "/@/api/user";
export const gameInfo = ref({
  loading: false,
  tableData: [] as any[],
  c_typeList: [
    {
      label: "A",
      value: "A"
    },
    {
      label: "B",
      value: "B"
    },
    {
      label: "C",
      value: "C"
    }
  ],
  level: [
    {
      label: "校赛",
      value: "校赛"
    },
    {
      label: "省赛",
      value: "省赛"
    },
    {
      label: "国赛",
      value: "国赛"
    }
  ],
  status: [
    {
      label: "未开始",
      value: "未开始"
    },
    {
      label: "报名中",
      value: "报名中"
    },
    {
      label: "比赛中",
      value: "比赛中"
    },
    {
      label: "已结束",
      value: "已结束"
    }
  ],
  identify: [
    {
      label: "队长",
      value: 1
    },
    {
      label: "副队长",
      value: 2
    },
    {
      label: "队员",
      value: 3
    },
    {
      label: "指导老师",
      value: 4
    }
  ],
  e_status: [
    {
      label: "受理中",
      value: 0
    },
    {
      label: "成功",
      value: 1
    }
  ]
});
export const formatterType: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = gameInfo.value.c_typeList.find(item => item.value === cellValue);
  return item ? item.label : "";
};
export const formatterLevel: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = gameInfo.value.level.find(item => item.value === cellValue);
  return item ? item.label : "";
};
export const formattercomStatus: VxeColumnPropTypes.Formatter = ({
  cellValue
}) => {
  const item = gameInfo.value.status.find(item => item.value === cellValue);
  return item ? item.label : "";
};
export const formatentryIdentify: VxeColumnPropTypes.Formatter = ({
  cellValue
}) => {
  const item = gameInfo.value.identify.find(item => item.value === cellValue);
  return item ? item.label : "";
};
export const formatentryStatus: VxeColumnPropTypes.Formatter = ({
  cellValue
}) => {
  const item = gameInfo.value.e_status.find(item => item.value === cellValue);
  return item ? item.label : "";
};

//通过uid获取所有相关的form信息
export const get_all_gameInfo = async () => {
  gameInfo.value.loading = true;
  try {
    const data: any = await getAllGameInfo({
      u_id: 1
    });
    gameInfo.value.tableData = data.data;
  } catch (response) {
    ElMessage.error(response.data.data);
  } finally {
    gameInfo.value.loading = false;
  }
};
type formType = {
  form: any;
  project: any;
  members: any;
  competition: any;
};
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

//处理创建与修改
export const isEdit = ref(false);
//处理弹出框事件
export const dialogVisible = ref(false);
export const editorForm = ref({
  c_name: "",
  version: "",
  level: "",
  members: []
});
const initForm = () => {
  editorForm.value = {
    c_name: "",
    version: "",
    level: "",
    members: []
  };
};
export const editorFormRules = ref({
  c_name: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur"
    }
  ],
  version: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur"
    }
  ],
  level: [
    {
      required: true,
      message: "Please input Activity name",
      trigger: "blur"
    }
  ]
});

// 新增成员
export const addMember = editorForm => {
  if (!editorForm.members) {
    editorForm.value.members = [];
  }
  editorForm.members.push({
    identify: "",
    phone: ""
  });
};
// 删除参数
export const deleteMember = (members, index) => {
  members.splice(index, 1);
};
export const closeDialog = () => {
  initForm();
  dialogVisible.value = false;
};
export const enterDialog = () => {
  console.log(
    "%c 🍷 editorForm: ",
    "font-size:20px;background-color: #F5CE50;color:#fff;",
    editorForm.value
  );
  dialogVisible.value = false;
};
export const handleClose = done => {
  initForm();
  done();
};
