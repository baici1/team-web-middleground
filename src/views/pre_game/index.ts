import { ref } from "vue";
import { GetCompetitions } from "/@/api/pre_home";
import { ElMessage } from "element-plus";
export const activities = ref([]);
export const loading = ref(false);
export const isMore = ref(true);
// 获取文章列表
export const comParams = ref({
  page: 1,
  limit: 1,
  status: 0,
  search: ""
});

//搜索
export const getSearchStr = search => {
  console.log(
    "%c 🍷 search: ",
    "font-size:20px;background-color: #3F7CFF;color:#fff;",
    search
  );
  comParams.value.search = search;
  console.log(
    "%c 🍬 comParams.value: ",
    "font-size:20px;background-color: #FFDD4D;color:#fff;",
    comParams.value
  );
  getcompetition(true);
};
//获取比赛信息
export const getcompetition = async (flag?: Boolean) => {
  try {
    isMore.value = true;
    loading.value = true;
    const { data }: any = await GetCompetitions(comParams.value);
    console.log(
      "%c 🌮 data: ",
      "font-size:20px;background-color: #ED9EC7;color:#fff;",
      data
    );
    activities.value.push(...data.records);
    // 判断当前菜单是否发生变化
    if (flag) {
      activities.value = data.records;
    }
    // 判断是否需要继续加载
    if (activities.value.length >= data.total) {
      isMore.value = false;
    }
  } catch (error) {
    ElMessage.error(error.response.data.msg);
    activities.value = [];
    isMore.value = false;
  } finally {
    loading.value = false;
  }
};

// 交换标签获取比赛信息
export const handleSelect = key => {
  comParams.value.page = 1;
  if (Number(key) > 0) {
    comParams.value.status = Number(key);
  } else {
    comParams.value.status = 0;
  }
  getcompetition(true);
};
// 获取更多
export const loadingMore = ref(false);
export const loadMore = () => {
  loadingMore.value = true;
  comParams.value.page += 1;
  getcompetition();
  loadingMore.value = false;
};
