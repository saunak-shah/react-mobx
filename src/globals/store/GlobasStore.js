import { observable, action } from "mobx";
// import userServices from "../../service/userServices";
// import { Cookies } from "react-cookie";
import { message } from "antd";
// import update from "immutability-helper";
class GlobalsStore {
  @observable reload = false;
  @observable isMobile = false;
  @observable isLoggedIn = false;
  @observable customerToken = null;
  @observable cust_emp_id = null;
  @observable customer_id = null;
  @observable allow_routes = [999];
  @observable isModuleFatching = false;
  constructor(allStore) {
    this.allStore = allStore;
    console.log(this.allStore)
    // this.getCookiesData();
  }
  resetStore = () => {
    this.allStore.layout.reset();
  };
  checkStatusToMsgType = (statusCode) => {
    if (statusCode === 401) {
      this.clearAllCookies();
      this.allStore.routes.history.push("/user/login");
      return "error";
    }
    switch (statusCode) {
      case 201: // CREATED: 201
      case 200: // OK: 200
        return "success";
      case 401:
      case 400: // BAD_REQUEST: 400
      case 404:
      case 420: // METHOD_FAILURE: 420
        return "error";
      case 206: // PARTIAL_CONTENT: 206
      case 409: // CONFLICT: 409
        return "warning";
      default:
        return "success";
    }
  };

  responseMessageHandler = (res = {}) => {
    if (res && res.status) {
      if (res.message) {
        if (typeof res.message === "string") {
          message[this.checkStatusToMsgType(res.status)](res.message);
        } else if (typeof res.message === "object") {
          message[this.checkStatusToMsgType(res.status)](res.message.en);
        }
      } else {
        !res.data && console.error(res);
      }
    } else {
      !res.data && console.error(res);
    }
  };
  clearAllCookies = () => {
    this.reload = false;
    this.isMobile = false;
    this.isLoggedIn = false;
    this.customerToken = null;
    this.employee = {};
    this.customer = {};
    this.department = {};
    this.cust_emp_id = null;
    this.customer_id = null;

    localStorage.clear();
    document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.allStore.socket.disconnectSocket();
    this.allow_routes = [999];
    this.userAccessControlId = [];
    this.userAccessControl = [];
    this.isUserAllAccessControl = false;
    this.all_notification_enabled = true;
  };
  @action handleSetIsLoggedIn = (mode, { cust_emp_id, token }, remember) => {
    this.isLoggedIn = mode;
    this.cust_emp_id = cust_emp_id;
    localStorage.setItem("cust_emp_id", cust_emp_id);
    localStorage.setItem("customerToken", token);
    localStorage.setItem("rememberMe", remember);
    document.cookie = `rememberMe=${remember};path=/;`;
  };

  @action handleBreakpointSet = (mode) => {
    this.isMobile = mode;
  };
  setGlobalData = ({
    data: {
      employee,
      customer,
      depts,
      modules,
      token,
      notification_prefs,
      all_notification_enabled,
    },
  }) => {
    this.customer = customer;
    this.employee = {
      ...employee,
      filterKey: employee.filterKey ? JSON.parse(employee.filterKey) : [],
      filterKey2: employee.filterKey ? JSON.parse(employee.filterKey) : [],
      accessControl: employee.accessControl ? JSON.parse(employee.accessControl) : [],
      installation_filterKey: employee.installation_filterKey
        ? JSON.parse(employee.installation_filterKey)
        : [],
      commissioning_filterKey: employee.commissioning_filterKey
        ? JSON.parse(employee.commissioning_filterKey)
        : [],
      filter_zone_ids: employee.filter_zone_ids ? employee.filter_zone_ids : [],
      filter_city_ids: employee.filter_city_ids ? employee.filter_city_ids : [],
      filter_outlet_ids: employee.filter_outlet_ids ? employee.filter_outlet_ids : [],
    };
    this.notification_prefs = notification_prefs;
    this.all_notification_enabled = all_notification_enabled;
    this.department = depts;
    this.customer_id = customer.customer_id;
    this.project_arr_seq = customer.project_arr_seq;
    this.project_arr_seq1 = customer.project_arr_seq;
    this.modules = modules;
    this.allStore.roleMgmt.accessModules = employee.accessModules;
    let allow_routes = [];
    let empModules = employee.empModules || [];
    empModules.forEach((obj) => {
      if (obj.isSelected && obj.access_code) {
        allow_routes.push(obj.access_code);
      }
      if (obj.childrens) {
        let keyArr = [];
        obj.childrens.forEach((item) => {
          if (item.isSelected) {
            keyArr.push(item.group_id);
          }
          if (item.children) {
            item.children.forEach((child) => {
              if (child.isSelected) {
                keyArr.push(child.access_code);
              }
            });
          }
        });
        allow_routes = allow_routes.concat(keyArr);
      }
    });

    allow_routes.push(999);
    this.allow_routes = allow_routes;
    this.getModuleData();
    this.allStore.layout.setCurrentSideMenu();
    this.allStore.layout.handleKeyWithMenuId();
    localStorage.setItem("customer_id", customer.customer_id);
    localStorage.setItem("customer", customer);
    localStorage.setItem("customerToken", token);
    if (
      !this.service_selection &&
      this.allStore.routes.location.pathname === "/user/service-selection"
    ) {
      this.allStore.routes.history.push("/");
    }
  };

  @action getModuleData = async () => {
    this.allStore.layout.sidebardatafunc();
  };
}

export default GlobalsStore;
