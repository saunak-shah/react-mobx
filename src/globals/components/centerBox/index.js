import React, { Component } from "react";
import PropTypes from "prop-types";
import "./centerBox.scss";

class CenterBox extends Component {
  render() {
    const props = this.props;
    const { centerBoxClassName, children } = props;
    return (
      <div className="center-box">
        {/* <div className="background-image"/> */}
        <div className={`center-box-content ${centerBoxClassName}`}>{children}</div>
      </div>
    );
  }
}
CenterBox.propTypes = {
  centerBoxClassName: PropTypes.string
};
CenterBox.defaultProps = {
  centerBoxClassName: ""
};

export default CenterBox;
