import React, { Component } from "react";
import { observer } from "mobx-react";

import { Layout } from "antd";
import moment from "moment";
import "./Footer.less";
import userSeting from "utils/defaultSettings";
const { Footer } = Layout;

class MainFooter extends Component {
  render() {
    return (
      <Footer className="globalFooter">
        <span>
          {userSeting.title} © {moment().format("YYYY")} Astics Inc. All Rights Reserved
        </span>
      </Footer>
    );
  }
}

export default observer(MainFooter);
