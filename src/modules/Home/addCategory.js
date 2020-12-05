import React, { Component } from "react";
import { Modal, Button, Form,  Input, message } from "antd";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 6 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 },
};

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      cityList: [],
      fileList: [],
      familyDataList: [],
      currenCity: {},
    };
  }

  addCategoryData = async (values) => {
    return fetch("http://localhost:4444/category/add", {
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
        this.props.modalCategoryVisibleFunc(false)

        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };
  handleCategorySubmit = (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          await this.addCategoryData(values)
          console.log(values);
          
        } catch (error) {
          message.error(error);
        }
      }
    });
  };
  render() {
    const {
      form,
      
      isCategoryModalVisible,
    } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={isCategoryModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalCategoryVisibleFunc(false)}
        title={"Add Category"}
        footer={[
          <Button
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalCategoryVisibleFunc(false)}
          >
            {"cancel"}
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            title="Submit"
            onClick={(e) => this.handleCategorySubmit(e, form)}
          >
            {"submit"}
          </Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={"Category Name"}>
            {getFieldDecorator("categoryname", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Please Enter category name",
                },
              ],
            })(<Input placeholder={"Enter category name"} />)}
          </FormItem>
         
         
          
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddCategory);
