import React, { Component } from "react";
import { Modal, Button, Form, Input, message, Select } from "antd";
import { Cookies } from "react-cookie";
import { Radio } from "../../../node_modules/antd/lib/index";
const cookie = new Cookies();
const formItemLayout = {
  labelCol: { xs: 24, sm: 24, md: 24, lg: 6 },
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 16 },
};

class AddStore extends Component {
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
          // await this.addProductData(values);
        } catch (error) {
          message.error(error);
        }
      }
    });
  };
  render() {
    const {
      form,
      cityList = [],
      isStoreModalVisible,
    } = this.props;
    const FormItem = Form.Item;
    const { getFieldDecorator } = form;
    const { Option } = Select;
    return (
      <Modal
        visible={isStoreModalVisible}
        destroyOnClose={true}
        onCancel={() => this.props.modalStoreVisibleFunc(false)}
        title={"Add Store"}
        footer={[
          <Button
            key="cancel"
            title="Cancel"
            onClick={() => this.props.modalStoreVisibleFunc(false)}
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
          <FormItem {...formItemLayout} label={"City Name"}>
            {getFieldDecorator("city_id", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Select city name",
                },
              ],
            })(
              <Select
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                showSearch
                placeholder={"Select"}
              >
                {cityList.map((item) => {
                  return (
                    <Option key={item.city_id} value={item.city_id}>
                      {item.city_name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={"Store Name"}>
            {getFieldDecorator("store_name", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Please Enter store name",
                },
              ],
            })(<Input placeholder={"Enter store name"} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={"Store Active"}>
            {getFieldDecorator("store_active", {
              initialValue: undefined,
              rules: [
                {
                  required: true,
                  message: "Please select store activation",
                },
              ],
            })(
              <Radio.Group>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AddStore);
