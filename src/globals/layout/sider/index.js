import React from "react";
import SideBar from "./Sider";
import { withRouter } from "react-router";
import { observer, inject } from "mobx-react";
import { Drawer } from "antd";
import "./SideBar.less";

const Side = (props) => {
  return props.globals.isMobile ? (
    <Drawer
      className="side-bar-drawer"
      visible={!props.layout.collapsed}
      placement="left"
      onClose={() => props.layout.onCollapse(true)}
      style={{
        padding: 0,
        height: "100vh"
      }}
    >
      <SideBar {...props} />
    </Drawer>
  ) : (
    <SideBar {...props} />
  );
};

export default inject("layout", "globals")(withRouter(observer(Side)));
