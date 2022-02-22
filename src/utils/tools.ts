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
