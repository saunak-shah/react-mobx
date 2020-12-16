import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { observer, inject } from "mobx-react";
import ReactGA from "react-ga";
import { appServiceName } from "utils/environment";
import Layout from "globals/layout";
import Loader from "globals/components/loader";

export default (Children) => {
  @inject("globals", "routes", "layout")
  @observer
  class AuthHOC extends Component {
    componentDidMount() {
      this.props.routes.setRoute(this.props.location, this.props.match, this.props.history);
    }

    checkRouter = (location) => {
      switch (location) {
        case "/user/customer-selection":
          return true;
        case "/user/change-password":
          return true;
        case "/user/service-selection":
          return true;
        default:
          return false;
      }
    };

    render() {
      const {
        globals: { reload }
      } = this.props;

      if (localStorage.getItem("customerToken")) {
        if (this.checkRouter(this.props.location.pathname)) {
          return <Loader spinning={reload}>{!reload && <Children {...this.props} />} </Loader>;
        }
        return (
          <Loader spinning={reload}>
            <Layout>{!reload && <Children {...this.props} />}</Layout>
          </Loader>
        );
      }
      return (
        <Redirect
          to={{
            pathname: "/user/login",
            state: { from: this.props.location }
          }}
        />
      );
    }
  }
  AuthHOC.propTypes = Children.propTypes;

  return AuthHOC;
};
