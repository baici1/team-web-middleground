import { App } from "vue";
import reBar from "./src/Bar.vue";
import reInfo from "./src/Info.vue";
import reInfinite from "./src/Infinite.vue";
import rePie from "./src/Pie.vue";

export const ReBar = Object.assign(reBar, {
  install(app: App) {
    app.component(reBar.name, reBar);
  }
});
export const ReInfo = Object.assign(reInfo, {
  install(app: App) {
    app.component(reInfo.name, reInfo);
  }
});
export const ReInfinite = Object.assign(reInfinite, {
  install(app: App) {
    app.component(reInfinite.name, reInfinite);
  }
});
export const RePie = Object.assign(rePie, {
  install(app: App) {
    app.component(rePie.name, rePie);
  }
});
