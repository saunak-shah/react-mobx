import React from "react";
import ContainerLayout from "globals/components/ContainerLayout";
import AddStore from "./addStore";
import { Button, message, Table } from "antd";
import { Cookies } from "react-cookie";
import { withRouter } from "react-router";
const cookie = new Cookies();

class Store extends React.Component {
  constructor() {
    super();
    this.state = {
      UserList_list: [],
      cityList: [],
      isModalVisible: false,
      isStoreModalVisible: false,
      pagination: {
        total: 0,
        pageSize: 2,
        defaultCurrent: 1,
        current: 1,
        sortBy: "ASC",
        orderBy: "store_name",
      },
    };
    this.columns = [
      {
        title: "Store Name",
        dataIndex: "store_name",
        key: "store_name",
        sorter: true,
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        sorter: true,
      }
    ];
  }
  componentDidMount = () => {
    const { pagination = {} } = this.state;
    this.callAllUserlist(pagination);
  };
  callAllUserlist = (values = {}) => {
    return fetch("http://localhost:4444/store/list", {
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

  getCityList = () => {
    return fetch("http://localhost:4444/city/list", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: cookie.get("token"),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("aaaaaaaaaaaaaaaaaa", responseJson)
        if (responseJson.status === -1) {
          this.logoutFunc();
          message.error(responseJson.msg);
        }
        if (responseJson.status === 1) {
          this.setState({ cityList: responseJson.data });
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error)
        // message.error(error);
      });
    const result = [{
      city_id: 1,
      city_name: "Ahmedabad"
    }, {
      city_id: 2,
      city_name: "Baroda"
    }]
    this.setState({ cityList: result });
  };

  modalVisibleFunc = (visible) => {
    this.setState({ isModalVisible: visible });
  };
  modalStoreVisibleFunc = async (visible) => {
    this.setState({ isStoreModalVisible: visible });
    if (visible) {
      await this.getCityList();
      // await this.getCategorylist();
    }
  };
  logoutFunc = () => {
    cookie.remove("token");
    this.props.history.push("/login");
  };

  storePaginnationFilter = (paginationData, sorter) => {
    let sortBy = "";
    if (sorter.order) {
      sortBy = sorter.order === "ascend" ? "ASC" : "DESC";
    } else {
      sortBy = "ASC";
    }
    let orderBy = sorter.field ? sorter.field : "store_name";
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
            <Button
              style={{ margin: 10 }}
              icon="plus"
              size="large"
              type="primary"
              onClick={(e) => {
                this.modalStoreVisibleFunc(true);
              }}
            >
              ADD Store
              </Button>
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
            rowKey={(record) => record.store_id}
            columns={this.columns}
            dataSource={UserList_list}
            pagination={pagination}
            onChange={(pagination, filters, sorter) => {
              console.log(pagination);
              this.storePaginnationFilter(pagination, filters, sorter);
            }}
          />
        </div>
        <AddStore
          {...this.state}
          modalStoreVisibleFunc={this.modalStoreVisibleFunc}
          callAllUserlist={this.callAllUserlist}
          logoutFunc={this.logoutFunc}
        />
      </ContainerLayout>
    );
  }
}

export default withRouter(Store);
