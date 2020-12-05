import React, { Component } from "react";
import { Form, Button, Input, message } from "antd";
import CenterBox from "globals/components/centerBox";
import { withRouter } from "react-router";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
// import "./Login.scss";
const FormItem = Form.Item;
class LoginPage extends Component {
  userLoginFunc = async (values) => {
    console.log("ljkl", values);
    return fetch("http://localhost:4444/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 1) {
          message.success(responseJson.msg);

        } else {
          message.error(responseJson.msg);

        }
        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };
  handleLoginSubmit = (e, form, history) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          console.log(values)
          let userdata = await this.userLoginFunc(values)
          console.log("fffffffffffffffffff", userdata)
          if (userdata.status === 1) {
            const { data } = userdata
            cookie.set("token", data.token);
            history.push("/home")
          }
          console.log("userdata", userdata)
        } catch (error) {
          console.log("error", error)
        }
      }
    });
  };
  render() {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    return (
      <CenterBox>
        <div className="login-container">
          <div className="image-title-container">

            <h2 className="title">Log in to your Account</h2>
          </div>

          <Form
            layout="vertical"
            className="login-form"

            onSubmit={(e) => this.handleLoginSubmit(e, props.form, props.history)}
          >
            <FormItem
              required={false}
              label={
                "Email ID:-"
              }
            >
              {getFieldDecorator("email", {
                rules: [
                  {
                    whitespace: true,
                    required: true,
                    type: "email",
                    message: "Enter email .",
                  }
                ],
              })(
                <Input
                  size="large"
                  placeholder="Enter email ."
                  inputType="string"
                />
              )}
            </FormItem>
            <FormItem
              required={false}
              label={
                <span>
                  Password
                </span>
              }
            >
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please enter your password!",
                  },
                ],
              })(<Input.Password size="large" type="password" placeholder="Password" />)}
            </FormItem>

            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ float: "right", margin: "10px 0", minWidth: "130px" }}
                size="large"
              >
                LOG IN
              </Button>
            </FormItem>

          </Form>

        </div>
      </CenterBox>
    );
  }
}

const WrappedLoginPage = Form.create()(LoginPage);

export default withRouter(WrappedLoginPage);
