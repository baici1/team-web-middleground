import { ElMessage } from "element-plus";
import { VxeColumnPropTypes } from "vxe-table";
import { ref } from "vue";
import {
  getAllGameInfo,
  getAGameInfo,
  getEntryFormDetail,
  createEntryFormDetail,
  updateEntryFormDetail
} from "/@/api/game";
import { getStudentInfo } from "/@/api/user";
import { getComSelectList } from "/@/api/competition";
import type { CascaderOption } from "element-plus";
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
  } catch ({ response }) {
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
export const dialogTitle = ref("创建");
export const Form = ref({
  id: 0,
  cmp_id: 0,
  p_id: 0,
  members: [],
  project_name: "",
  introduction: ""
});
const initForm = () => {
  Form.value = {
    id: 0,
    cmp_id: 0,
    p_id: 0,
    members: [{ u_id: 0, identify: 1, phone: "13337474745", isEdit: true }],
    project_name: "",
    introduction: ""
  };
};
//创建form信息
export const create_entry_gameInfo = async () => {
  try {
    const data: any = await createEntryFormDetail(Form.value);
    ElMessage.success(data.msg);
  } catch ({ response }) {
    ElMessage.error(response.data.msg);
  }
};
//查询form信息
export const get_entry_gameInfo = async id => {
  const data: any = await getEntryFormDetail({
    id: id
  });
  console.log(
    "%c 🍮 data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  Form.value = data.data;
  Form.value.members[0].isEdit = true;
};
//修改form信息
export const update_entry_formDetail = async () => {
  try {
    const data: any = await updateEntryFormDetail(Form.value);
    ElMessage.success(data.msg);
  } catch ({ response }) {
    ElMessage.error(response.data.msg);
  }
};
export const FormRules = ref({
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
export const addMember = Form => {
  if (!Form.members) {
    Form.value.members = [];
  }
  Form.members.push({
    u_id: 0,
    identify: 2,
    phone: ""
  });
};
// 删除成员
export const deleteMember = (members, index) => {
  members.splice(index, 1);
};
//关闭对话框
export const closeDialog = () => {
  initForm();
  dialogVisible.value = false;
};
//确认对话框
export const enterDialog = () => {
  console.log(
    "%c 🥟 isEdit.value: ",
    "font-size:20px;background-color: #7F2B82;color:#fff;",
    isEdit.value
  );
  if (isEdit.value) {
    update_entry_formDetail();
  } else {
    create_entry_gameInfo();
  }
  dialogVisible.value = false;
};
export const handleClose = done => {
  initForm();
  done();
};

//弹出框创建参赛表
export const addform = () => {
  dialogTitle.value = "创建参赛表";
  isEdit.value = false;
};

//与联级选择相关
export const cascaderOptions = ref([] as CascaderOption[]);
//联级选择器改变
export const cascaderChange = value => {
  console.log(
    "%c 🥘 value: ",
    "font-size:20px;background-color: #6EC1C2;color:#fff;",
    value
  );
  Form.value.cmp_id = value[2];
};
//获取比赛信息树形数据
export const get_com_selectList = async () => {
  const data: any = await getComSelectList();
  console.log(
    "%c 🥩 data: ",
    "font-size:20px;background-color: #465975;color:#fff;",
    data
  );
  cascaderOptions.value = data.data;
  for (let index = 0; index < cascaderOptions.value.length; index++) {
    cascaderOptions.value[index].disabled = isEdit.value;
  }
};

export const createForm = async () => {
  get_com_selectList();
  initForm();
  dialogVisible.value = true;
  isEdit.value = false;
  dialogTitle.value = "创建参赛表";
};
export const editorForm = async id => {
  get_com_selectList();
  get_entry_gameInfo(id);
  dialogVisible.value = true;
  isEdit.value = true;
  dialogTitle.value = "修改参赛表";
};
