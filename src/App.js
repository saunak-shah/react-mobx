import React, { Component, Suspense } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import Loader from "./globals/components/loader";
import Themes from "./globals/components/theme";
// import Header from "./header";
import Sider from "./globals/layout/sider";

const { Content } = Layout;
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Content className="contents">
            <Router>
              <Suspense fallback={<Loader />}>
                <Themes>
                  {/* <Routes /> */}
                  <Sider />
                  <h1>Test Saunak</h1>
                </Themes>
              </Suspense>
            </Router>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
