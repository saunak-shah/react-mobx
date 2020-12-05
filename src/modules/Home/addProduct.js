import React, { Component } from "react";
import { Modal, Button, Form, Input, message, Select } from "antd";
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

  addProductData = async (values) => {
    return fetch("http://localhost:4444/product/add", {
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
        this.props.modalProductVisibleFunc(false);
        const pagination = {
          total: 0,
          pageSize: 2,
          defaultCurrent: 1,
          current: 1,
          sortBy: "ASC",
          orderBy: "username",
        }
        this.props.callAllUserlist(pagination);

        return responseJson;
      })
      .catch((error) => {
        message.error(error);
      });
  };
  handleProductSubmit = (e, form) => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        try {
          console.log(values);
          await this.addProductData(values);
        } catch (error) {
          message.error(error);
        }
      }
    });
  };
  render() {
    const {
      form,
      userList = [],
      categoryList = [],
      isProductModalVisible,
    } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    const { Option } = Select;
    return (
      <Modal
        visible={isProductModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalProductVisibleFunc(false)}
        title={"Add Product"}
        footer={[
          <Button
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalProductVisibleFunc(false)}
          >
            {"cancel"}
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            title="Submit"
            onClick={(e) => this.handleProductSubmit(e, form)}
          >
            {"submit"}
          </Button>,
        ]}
      >
        <Form>
          <FormItem {...formItemLayout} label={"User Name"}>
            {getFieldDecorator("user_id", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Select user name",
                },
              ],
            })(
              <Select
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                showSearch
                placeholder={"Select"}
              >
                {userList.map((item) => {
                  return (
                    <Option key={item.user_id} value={item.user_id}>
                      {item.username}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={"User Name"}>
            {getFieldDecorator("c_id", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Select user name",
                },
              ],
            })(
              <Select
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                showSearch
                placeholder={"Select"}
              >
                {categoryList.map((item) => {
                  return (
                    <Option key={item.c_id} value={item.c_id}>
                      {item.categoryname}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={"Product Name"}>
            {getFieldDecorator("product_name", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Please Enter product name",
                },
              ],
            })(<Input placeholder={"Enter product name"} />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddCategory);
