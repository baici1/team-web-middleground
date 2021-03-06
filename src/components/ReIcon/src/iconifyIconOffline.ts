import { h, defineComponent } from "vue";
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";
import Check from "@iconify-icons/ep/check";
import Menu from "@iconify-icons/ep/menu";
import HomeFilled from "@iconify-icons/ep/home-filled";
import SetUp from "@iconify-icons/ep/set-up";
import Edit from "@iconify-icons/ep/edit";
import Setting from "@iconify-icons/ep/setting";
import Lollipop from "@iconify-icons/ep/lollipop";
import Link from "@iconify-icons/ep/link";
import Position from "@iconify-icons/ep/position";
import Histogram from "@iconify-icons/ep/histogram";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import ArrowDown from "@iconify-icons/ep/arrow-down";
import Close from "@iconify-icons/ep/close";
import CloseBold from "@iconify-icons/ep/close-bold";
import Bell from "@iconify-icons/ep/bell";
import Guide from "@iconify-icons/ep/guide";
import User from "@iconify-icons/ep/user";
import Iphone from "@iconify-icons/ep/iphone";
import Location from "@iconify-icons/ep/location";
import Tickets from "@iconify-icons/ep/tickets";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import Notebook from "@iconify-icons/ep/notebook";
import pictureRounded from "@iconify-icons/ep/picture-rounded";
import messageIcon from "@iconify-icons/ep/message";
import medalIcon from "@iconify-icons/ep/medal";
import documentIcon from "@iconify-icons/ep/document";
addIcon("check", Check);
addIcon("menu", Menu);
addIcon("home-filled", HomeFilled);
addIcon("set-up", SetUp);
addIcon("edit", Edit);
addIcon("setting", Setting);
addIcon("lollipop", Lollipop);
addIcon("link", Link);
addIcon("position", Position);
addIcon("histogram", Histogram);
addIcon("refresh-right", RefreshRight);
addIcon("arrow-down", ArrowDown);
addIcon("close", Close);
addIcon("close-bold", CloseBold);
addIcon("bell", Bell);
addIcon("guide", Guide);
addIcon("user", User);
addIcon("iphone", Iphone);
addIcon("location", Location);
addIcon("tickets", Tickets);
addIcon("office-building", OfficeBuilding);
addIcon("notebook", Notebook);
addIcon("picture-rounded", pictureRounded);
addIcon("message-icon", messageIcon);
addIcon("medal", medalIcon);
addIcon("document", documentIcon);
// Iconify Icon???Vue???????????????????????????????????????
// https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: "IconifyIcon",
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`
      },
      {
        default: () => []
      }
    );
  }
});
