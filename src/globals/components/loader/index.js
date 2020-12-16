import React from "react";
import { Spin } from "antd";
import "./Loader.less";

const Loader = ({ spinning = true, size = "large", children, setHeight = 0 }) => {
  return (
    <Spin
      spinning={spinning}
      size={size}
      tip="Loading..."
      className="loader"
      style={{ color: "#252525", height: `calc(100vh - ${setHeight}px)` }}
    >
      {children}
    </Spin>
  );
};
export default Loader;
