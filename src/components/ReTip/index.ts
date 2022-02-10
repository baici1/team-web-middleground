import { App } from "vue";
import reTip from "./src/tip.vue";

export const ReTip = Object.assign(reTip, {
  install(app: App) {
    app.component(reTip.name, reTip);
  }
});
