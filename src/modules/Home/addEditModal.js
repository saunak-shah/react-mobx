import React, { Component } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 6 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 },
};

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  insertUserData = async (values) => {
    return fetch("http://localhost:4444/user/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookie.get("token"),
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === -1) {
          this.props.logoutFunc();
          message.error(responseJson.msg);
          return;
        }
        message.success(responseJson.msg);
        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };
  handleSubmit = (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          console.log(values);

          await this.insertUserData(values);

          form && form.resetFields();
          this.props.modalVisibleFunc(false);
        } catch (error) {
          message.error(error);
        }
      }
    });
  };

  render() {
    const { form, isModalVisible } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={isModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalVisibleFunc(false)}
        title={"Add User"}
        footer={[
          <Button
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalVisibleFunc(false)}
          >
            {"cancel"}
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            title="Submit"
            onClick={(e) => this.handleSubmit(e, form)}
          >
            {"submit"}
          </Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={"Full Name"}>
            {getFieldDecorator("username", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Please Enter full name",
                },
              ],
            })(<Input placeholder={"Enter full name"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"Email Id"}>
            {getFieldDecorator("email", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  whitespace: true,
                  type: "email",
                  message: "Please email id",
                },
              ],
            })(<Input placeholder={"Enter Email id"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"Password"}>
            {getFieldDecorator("password", {
              initialValue: "",
              rules: [
                {
                  whitespace: true,
                  required: true,
                  message: "please enter password",
                },
                {
                  pattern: /^(?=.*\d)(?=.*[a-zA-Z]*[A-Z]).{6,16}$/,
                  message:
                    "Password must have upper and lowercase letters and at least 1 number and must be of 6-16 characters",
                },
              ],
            })(
              <Input.Password type="password" placeholder={"Enter Password"} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(Admin);
