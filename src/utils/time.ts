import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // import locale
dayjs.locale("zh-cn"); // use locale

export function timeFormatMD(time): string {
  return dayjs(time).format("MM-DD");
}

export function timeFormatYMD(time): string {
  return dayjs(time).format("YYYY-MM-DD");
}
