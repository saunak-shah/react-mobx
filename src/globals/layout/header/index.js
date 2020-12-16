import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { withRouter, Link } from "react-router-dom";
import { Layout, Icon, Menu, Avatar, Popover, Badge } from "antd";
import { ReactComponent as Logout } from "assets/images/logout.svg";
import { ReactComponent as Profile } from "assets/images/profile.svg";
import { ReactComponent as Notification } from "assets/images/notification.svg";
import "./Header.less";
// import userSeting from "utils/defaultSettings";
// import ActivityDrawer from "modules/activityLog/activity.popover";
// import Support from "../../../modules/support";
// import Language from "./language.select";
const { Header } = Layout;

const content = (props) => {
  const { image_url } = {};
  console.log("ggggggggggggggggggg")

  return (
    <div className="main-header-content-menu">
      <Menu>
        {props.layout.headerLeftMenu.map((menu) => {
          let menuShowIds = props.globals.allow_routes.filter(
            (e) => menu.menuIds.indexOf(e) !== -1
          );
          if (
            menu.name === "Customer Selection" &&
            props.globals.employee.customer_bind_count < 2
          ) {
            return null;
          }
          if (!!menuShowIds.length) {
            return (
              <Menu.Item key={menu.route}>
                <Link to={menu.route}>
                  {[8, 9].includes(menu.id) && image_url ? (
                    <Avatar className="user-image" src={image_url} />
                  ) : (
                      <Icon component={menu.svg} />
                    )}
                  <span>{menu.name}</span>
                </Link>
              </Menu.Item>
            );
          }
          return null;
        })}
        <Menu.Divider />
        <Menu.Item
          key="4"
          onClick={(e) => {
            props.user.onLogout();
          }}
        >
          <span className="logout">
            <Icon component={Logout} />
            <span>Logout</span>
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

@inject("globals", "layout", "complaintMgmt", "complaintServices", "user", "activity", "locale")
@observer
class MainHeader extends Component {
  render() {
    const props = this.props;
    const { globals, layout, user, activity } = props;
    const { cust_emp_fname = "", cust_emp_lname = "", role_name = [""] } = globals.employee || {};
    const { customer_name } = globals.customer || {};

    return (
      <Header
        style={{
          padding: "0 90px 0 25px",
          position: "fixed",
          zIndex: 106,
          width: !globals.isMobile ? (!layout.collapsed ? "calc(100% - 150px)" : "100%") : "100%",
        }}
        className="main-header"
      >
        <div className="left-div">
          <div className="menu-fold-unfold-btn">
            <Icon
              className="trigger"
              type={props.layout.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={() => {
                props.layout.handleSideBarChange([]);
                props.layout.onCollapse(!props.layout.collapsed);
              }}
            />
          </div>
        </div>
        <div className="customer-title">
          <div className="customer-content">
            <span className="customer-name">Welcome, {customer_name}</span>
          </div>
        </div>
        <div className="right-div">
          <div className="popover-style" onClick={() => activity.activityPopoverChnage(true)}>
            <Icon component={Notification} />
            <Badge dot={activity.counter ? true : false} className="bell-badge" />
          </div>
          {/* <Language {...props} /> */}
          {/* <Support /> */}
          <div className="user-avt profile">
            <Popover
              className="popover-style"
              placement="bottomRight"
              content={content(this.props)}
              trigger="click"
            >
              {user.empProfileFileList.length ? (
                <Avatar src={user.empProfileFileList[0].thumb} />
              ) : (
                  <Icon component={Profile} />
                )}
              <div className="rightprofile">
                <span className="user-name">
                  {cust_emp_fname} {cust_emp_lname}
                </span>
                <span className="user-role" title={role_name}>
                  {role_name}
                </span>
              </div>
            </Popover>
          </div>
        </div>
        {/* <ActivityDrawer {...this.props} /> */}
      </Header>
    );
  }
}

export default withRouter(MainHeader);
