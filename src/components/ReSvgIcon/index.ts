import { App } from "vue";
import SvgIcon from "./src/index.vue";

export const ReSvgIcon = Object.assign(SvgIcon, {
  install(app: App) {
    app.component(SvgIcon.name, SvgIcon);
  }
});
