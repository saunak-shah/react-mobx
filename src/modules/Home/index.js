import React from "react";
import ContainerLayout from "globals/components/ContainerLayout";
import {  Button, message, Table } from "antd";
import "./home.style.scss";
import AddeditUser from "./addEditModal";
import AddCategory from "./addCategory";
import AddProduct from "./addProduct";
import { Cookies } from "react-cookie";
import { withRouter } from "react-router";
const cookie = new Cookies();

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      UserList_list: [],
      categoryList: [],
      userList: [],
      isModalVisible: false,
      isCategoryModalVisible: false,
      isProductModalVisible: false,
      pagination: {
        total: 0,
        pageSize: 2,
        defaultCurrent: 1,
        current: 1,
        sortBy: "ASC",
        orderBy: "username",
      },
    };
    this.columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
      },
      {
        title: "Product Name",
        dataIndex: "product_name",
        key: "product_name",
        sorter: true,
      },
      {
        title: "Category Name",
        dataIndex: "categoryname",
        key: "categoryname",
        sorter: true,
      },
    ];
  }
  componentDidMount = () => {
    const { pagination = {} } = this.state;
    this.callAllUserlist(pagination);
  };
  callAllUserlist = (values = {}) => {
    return fetch("http://localhost:4444/user/get", {
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
          this.logoutFunc();
          message.error(responseJson.msg);
        }
        if (responseJson.status === 1) {
          this.setState({ UserList_list: responseJson.data });
          const paginationChange = {
            total: responseJson.count,
            current: values.current,
            pageSize: values.pageSize,
            sortBy: values.sortBy,
            orderBy: values.orderBy,
          };
          this.setState({ pagination: paginationChange });
        }
        return responseJson;
      })
      .catch((error) => {
        // message.error(error);
      });
  };

  modalVisibleFunc = (visible) => {
    this.setState({ isModalVisible: visible });
  };
  modalCategoryVisibleFunc = (visible) => {
    this.setState({ isCategoryModalVisible: visible });
  };
  getUserlist = () => {
    return fetch("http://localhost:4444/user/users/get", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookie.get("token"),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === -1) {
          this.logoutFunc();
          message.error(responseJson.msg);
        }
        if (responseJson.status === 1) {
          this.setState({ userList: responseJson.data });
        }
        return responseJson;
      })
      .catch((error) => {
        // message.error(error);
      });
  };
  getCategorylist = () => {
    return fetch("http://localhost:4444/user/category/get", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookie.get("token"),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === -1) {
          this.logoutFunc();
          message.error(responseJson.msg);
        }
        if (responseJson.status === 1) {
          this.setState({ categoryList: responseJson.data });
        }
        return responseJson;
      })
      .catch((error) => {
        // message.error(error);
      });
  };
  modalProductVisibleFunc = async (visible) => {
    this.setState({ isProductModalVisible: visible });
    if (visible) {
      await this.getUserlist();
      await this.getCategorylist();
    }
  };
  logoutFunc = () => {
    cookie.remove("token");
    this.props.history.push("/login");
  };

  productPaginnationFilter = (paginationData, sorter) => {
    let sortBy = "";
    if (sorter.order) {
      sortBy = sorter.order === "ascend" ? "ASC" : "DESC";
    } else {
      sortBy = "ASC";
    }
    let orderBy = sorter.field ? sorter.field : "username";
    const paginationChange = {
      total: paginationData.total,
      current: paginationData.current,
      pageSize: paginationData.pageSize,
      sortBy: sortBy,
      orderBy: orderBy,
    };

    this.setState({ pagination: paginationChange });
    this.callAllUserlist(paginationChange);
  };

  render() {
    const { UserList_list = [], pagination } = this.state;

    return (
      <ContainerLayout>
        <div className="home">
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span>
              <Button
                style={{ margin: 10 }}
                icon="plus"
                size="large"
                type="primary"
                onClick={(e) => {
                  this.modalVisibleFunc(true);
                }}
              >
                ADD User
              </Button>
              <Button
                style={{ margin: 10 }}
                icon="plus"
                size="large"
                type="primary"
                onClick={(e) => {
                  this.modalCategoryVisibleFunc(true);
                }}
              >
                ADD Category
              </Button>
              <Button
                style={{ margin: 10 }}
                icon="plus"
                size="large"
                type="primary"
                onClick={(e) => {
                  this.modalProductVisibleFunc(true);
                }}
              >
                ADD Product
              </Button>
            </span>

            <Button
              size="large"
              type="danger"
              onClick={(e) => {
                this.logoutFunc();
              }}
            >
              Logout
            </Button>
          </span>

          <Table
            rowKey={(record) => record.p_id}
            columns={this.columns}
            dataSource={UserList_list}
            pagination={pagination}
            onChange={(pagination, filters, sorter) => {
              console.log(pagination);
              this.productPaginnationFilter(pagination, filters, sorter);
            }}
          />
        </div>

        <AddeditUser
          {...this.state}
          modalVisibleFunc={this.modalVisibleFunc}
          callAllUserlist={this.callAllUserlist}
          logoutFunc={this.logoutFunc}
        />
        <AddCategory
          {...this.state}
          modalCategoryVisibleFunc={this.modalCategoryVisibleFunc}
          callAllUserlist={this.callAllUserlist}
          logoutFunc={this.logoutFunc}
        />
        <AddProduct
          {...this.state}
          modalProductVisibleFunc={this.modalProductVisibleFunc}
          callAllUserlist={this.callAllUserlist}
          logoutFunc={this.logoutFunc}
        />
      </ContainerLayout>
    );
  }
}

export default withRouter(Home);
