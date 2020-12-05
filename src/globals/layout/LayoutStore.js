import { observable, action } from "mobx";
import sideMenu from "../layout/sider/side-menu.config";
import update from "immutability-helper";
class LayoutStore {
  @observable collapsed = false;
  @observable selectSideMenu = [];
  @observable sideMenuListdata = [];
  @observable sideMenuCount = {
    staffManagement: 0,
    complaintManagement: 0,
    chat: 0,
    vendor: 0,
    analytics: 0
  };
  @observable PermissionRoutes = [];
  constructor(allStore) {
    this.allStore = allStore;
  }
  reset = () => {
    this.collapsed = false;
    this.selectSideMenu = [];
    this.sideMenuListdata = [];
    this.sideMenuCount = {
      staffManagement: 0,
      complaintManagement: 0,
      chat: 0,
      vendor: 0,
      analytics: 0,
    };
    this.PermissionRoutes = [];
  };

  @action onCollapse = (collapsed) => {
    this.collapsed = collapsed;
  };
  handleSideBarChange = (key) => {
    this.selectSideMenu = key;
  };
  MenuClick = (item) => {
    localStorage.setItem("selectSideMenu", [item.keyPath[item.keyPath.length - 1]]);
    this.selectSideMenu = [item.keyPath[item.keyPath.length - 1]];
  };
  resetCurrentSideMenu = () => {
    this.selectSideMenu = [];
  };

  setCurrentSideMenu = () => {
    this.selectSideMenu = [localStorage.getItem("selectSideMenu")];
  };
  handleKeyWithMenuId = () => {
    const { allow_routes } = this.allStore.globals;
    let PermissionRoutes = [];
    sideMenu.forEach((content) => {
      let contentShowIds = allow_routes.filter((e) => content.menuIds.indexOf(e) !== -1);
      if (!content.children.length && !!contentShowIds.length) {
        let route = content.route.split("/")[1];
        PermissionRoutes.push(route);
      } else {
        content.children.forEach((children) => {
          let childrenShowIds = allow_routes.filter((e) => children.menuIds.indexOf(e) !== -1);
          if (!!childrenShowIds.length) {
            let ChildRoute = children.route.replace("/", "");
            PermissionRoutes = PermissionRoutes.concat(ChildRoute);
          }
          return null;
        });
      }

      return null;
    });
    PermissionRoutes.push("page-not-found");
    PermissionRoutes.push("user");
    console.log(PermissionRoutes);

    this.PermissionRoutes = PermissionRoutes;
  };
  sidebardatafunc = async () => {
    this.sideMenuListdata = sideMenu;
  };
  updateSideMenuCount = (key, value) => {
    this.sideMenuCount = update(this.sideMenuCount, {
      [key]: { $set: value }
    });
  };
}

export default LayoutStore;
