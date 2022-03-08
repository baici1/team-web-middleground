import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // import locale
dayjs.locale("zh-cn"); // use locale

export function timeFormatMD(time): string {
  return dayjs(time).format("MM-DD");
}

export function timeFormatYMD(time): string {
  return dayjs(time).format("YYYY-MM-DD");
}
export function getYear() {
  return [dayjs().startOf("year"), dayjs().endOf("year")];
}

export function timeFormat(time, format): string {
  return dayjs(time).format(format);
}

export function checkGender(gender: number): string {
  return gender ? "男" : "女";
}

//通过四个时间判断当前状态。
export function checkComStatus(time1, time2, time3, time4) {
  //当前时间在time1之前
  const time = dayjs();
  if (time.isBefore(time1)) {
    return "未开始";
  } else if (time.isAfter(time1) && time.isBefore(time2)) {
    return "报名中";
  } else if (time.isAfter(time3) && time.isBefore(time4)) {
    return "参赛中";
  } else if (time.isAfter(time4)) {
    return "已结束";
  } else {
    return "准备中";
  }
}
