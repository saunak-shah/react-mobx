import React from "react";
import { Layout } from "antd";
import Header from "./header";
import Sider from "./sider";
// import Footer from "./footer";
import ErrorBoundary from "../components/errorBoundary";
import "./MainLayout.less";
import { observer, inject } from "mobx-react";

const { Content } = Layout;

@inject("globals", "layout", "hardware")
@observer
class MainLayout extends React.Component {
  render() {
    const { children, globals, layout } = this.props;
    return (
      <Layout className="app-layout">
        <Sider />
        <Layout
          style={{
            minHeight: "calc(100vh - 174px)",
            marginLeft: !globals.isMobile ? (!layout.collapsed ? "230px" : "80px") : "0",
            zIndex: 0,
            justifyContent: "space-between"
          }}
        >
          <Header />
          {/* <div className="sub-header" /> */}
          <Content
            style={{
              // margin: "24px 16px 0",
              overflow: "initial",
              width: !globals.isMobile ? (!layout.collapsed ? "calc(100% - 230px)" : "95%") : "100%"
            }}
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
