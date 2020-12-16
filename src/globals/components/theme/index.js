import React, { Component } from "react";
import { message } from "antd";
// import userSeting from "utils/defaultSettings";
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   let colors = {
  //     "@primary-color": userSeting.primaryColor, // primary color for all components
  //     "@btn-primary-bg": userSeting.primaryColor,
  //     "@secondary-color": "#0000ff"
  //   };
  //   try {
  //   } finally {
  //     this.state = { colors };
  //     window.less
  //       .modifyVars(colors)
  //       .then(() => {})
  //       .catch((error) => {
  //         message.error(`Failed to update theme`);
  //       });
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  };
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  onChangeComplete = (varName, color) => {
    const { vars } = this.state;
    vars[varName] = color;
    this.setState({ vars });
  };
  handleColorChange = (varname, color) => {
    const { vars } = this.state;
    if (varname) vars[varname] = color;
    window.less
      .modifyVars(vars)
      .then(() => {
        // message.success(`Theme updated successfully`);
        this.setState({ vars });
        localStorage.setItem("app-theme", JSON.stringify(vars));
      })
      .catch((error) => {
        message.error(`Failed to update theme`);
      });
  };

  // resetTheme = () => {
  //   localStorage.setItem("app-theme", "{}");
  //   this.setState({ vars: this.state.initialValue });
  //   window.less.modifyVars(this.state.initialValue).catch(error => {
  //     message.error(`Failed to reset theme`);
  //   });
  // };

  render() {
    return <div className="App">{this.props.children}</div>;
  }
}

export default App;
