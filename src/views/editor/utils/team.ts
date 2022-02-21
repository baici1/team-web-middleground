import { ref } from "vue";
import { ElMessage } from "element-plus";
import {
  getTeamId,
  GetTeamInfo,
  getCompanyInfo,
  createTeamLeader
} from "/@/api/team";
import { useUserStoreHook } from "/@/store/modules/user";
const userStore = useUserStoreHook();
//team的数据与校验规则
export const formDataTeam = ref({
  name: undefined,
  introduction: undefined,
  intellectual_property: undefined,
  company_id: 0
});
export const rulesTeam = ref({
  name: [
    {
      required: true,
      message: "请输入团队名称",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ],
  intellectual_property: [
    {
      required: true,
      message: "请输入知识产权",
      trigger: "blur"
    }
  ]
});
//Company的数据与校验规则
export const formDataCompany = ref({
  name: undefined,
  address: undefined,
  introduction: undefined
});
export const rulesCompany = ref({
  name: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur"
    }
  ],
  address: [
    {
      required: true,
      message: "请输入公司地址",
      trigger: "blur"
    }
  ],
  introduction: [
    {
      required: true,
      message: "请输入团队介绍",
      trigger: "blur"
    }
  ]
});
//判断是否需要提交公司信息
export const flagCompany = ref(false);
export const changeflagCompany = val => {
  if (!val) {
    formDataCompany.value = {
      name: undefined,
      address: undefined,
      introduction: undefined
    };
  }
};
//判断当前是创建还是修改
export const flagTeam = ref(true);
//发起请求获取团队id
const teamId = ref(0);
export const get_team_id = async () => {
  try {
    const data: any = await getTeamId({
      u_id: userStore.userid
    });
    teamId.value = data.data;
    if (teamId.value) {
      flagTeam.value = false;
      flagCompany.value = true;
    }
  } catch (error) {
    ElMessage.warning("当前用户无团队");
  }
};

//获取团队信息
export const get_team_info = async () => {
  // //获取teamId
  // const teamId = useUserStoreHook().teamid;
  const data: any = await GetTeamInfo({
    id: teamId.value
  });
  formDataTeam.value = data.data;
};
//获取公司信息
export const get_company_info = async () => {
  const data: any = await getCompanyInfo({
    id: formDataTeam.value.company_id
  });
  console.log(
    "%c 🍰 data: ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    data
  );
  formDataCompany.value = data.data;
};
export const create_team_leader = async () => {
  await createTeamLeader({
    u_id: userStore.userid,
    team_id: teamId.value
  });
};

export type commitData = {
  u_id?: number;
  flag: boolean;
  teaminfo: any;
  companyinfo?: any;
};
