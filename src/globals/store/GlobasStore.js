import { observable, action } from "mobx";
// import userServices from "../../service/userServices";
// import { Cookies } from "react-cookie";
import { message } from "antd";
// import update from "immutability-helper";
class GlobalsStore {
  @observable reload = false;
  @observable isLoggedIn = false;
  constructor(allStore) {
    this.allStore = allStore;
    console.log(this.allStore)
    // this.getCookiesData();
  }
  resetStore = () => {
    this.allStore.layout.reset();
  };

  setGlobalData = ({
    data: {
      employee,
    },
  }) => {
    this.getModuleData();
    this.allStore.layout.setCurrentSideMenu();
    this.allStore.layout.handleKeyWithMenuId();
  };

  @action getModuleData = async () => {
    this.allStore.layout.sidebardatafunc();
  };
}

export default GlobalsStore;
