import { VxeColumnPropTypes } from "vxe-table";
import { ref } from "vue";
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
