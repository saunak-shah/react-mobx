import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Layout } from "antd";
import SideMenu from "./sideMenu";
// import SideMenuList from "./side-menu.config";
import { injectIntl } from "react-intl";
import userSetting from "utils/defaultSettings";
const { Sider } = Layout;
@inject("globals", "layout", "hardware")
@observer
class MainSider extends Component {
  render() {
    const props = this.props;
    const { customer_images = [] } = props.globals.customer;
    const [logo = null] = customer_images;
    return (
      <Sider
        style={{
          position: "fixed",
          left: 0
        }}
        width={250}
        trigger={null}
        collapsed={props.layout.collapsed}
        collapsedWidth={props.globals.isMobile ? "0" : "80"}
        breakpoint="lg"
        onCollapse={props.layout.onCollapse}
        onBreakpoint={(broken) => {
          if (!broken) {
            props.layout.onCollapse(false);
          }
          props.globals.handleBreakpointSet(broken);
        }}
        className="main-layout-sider"
      >
        <div className="bg-pattern" />
        <div className="side-bar-header">
          <div className="image-container">
            <img
              src={
                !logo
                  ? props.layout.collapsed
                    ? userSetting.sm_logo_url
                    : userSetting.bg_logo_url
                  : logo
              }
              alt="logo"
              className="logo"
            />
          </div>
        </div>
        <div className="side-menu-div">
          <SideMenu MenuSiderContent={this.props.layout.sideMenuListdata} {...props} />
        </div>
        <div className="footercontent">
          <img
            className={props.layout.collapsed ? "default-logo" : ""}
            alt="logo"
            src={props.layout.collapsed ? userSetting.sm_logo_url : userSetting.bg_logo_url}
          />
          <span className={props.layout.collapsed ? "sm-span" : "bg-span"}>
            Powered by &nbsp;
            <a alt="aavgo" href="http://asticsinc.com/" target="blank">
              Astics Inc.
            </a>
          </span>
        </div>
      </Sider>
    );
  }
}

export default injectIntl(MainSider);
