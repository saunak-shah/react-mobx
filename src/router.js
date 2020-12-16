import React, { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import AuthRoutes from "globals/hoc/private";
import { Spin } from "antd";
import { Cookies } from "react-cookie";
import ProtectRoute from "globals/hoc/ProtectRoute";
const cookie = new Cookies();

const Store = lazy(() => import("modules/Store"));
const Home = lazy(() => import("modules/Home"));
const Login = lazy(() => import("modules/Login"));
const redirect = pathname => () => {
  return <Redirect to={{ pathname }} />;
};

export const Routes = props => {
  return (
    <main>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                paddingTop: 50,
                textAlign: "center"
              }}
            >
              <Spin />
            </div>
          }
        >
          <Switch>
            <Route path="/" component={AuthRoutes(ContentRoute)} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

const ContentRoute = props => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            paddingTop: 50,
            textAlign: "center"
          }}
        >
          <Spin />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" render={redirect("login")} />
        {/* <Route exact path="/login" render={() => <Login {...props} />} /> */}
        <Route
          path="/login"
          exact
          render={() => {
            if (!cookie.get("token")) {
              return <Login {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/home",
                    state: { from: props.location }
                  }}
                  push={false}
                />
              );
            }
          }}
        />
        {/* <Route exact path="/" render={redirect("home")} /> */}
        {/* <Route exact path="/home" render={() => <Home {...props} />} /> */}
        <Route exact path="/home" render={() => {
          if (cookie.get("token")) {
            return <Home {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
                push={false}
              />
            );
          }
        }} />
        <Route exact path="/store" render={() => {
          if (cookie.get("token")) {
            return <Store {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
                push={false}
              />
            );
          }
        }} />

        <Route exact path="/*" render={() => <div>No Page found</div>} />
      </Switch>
    </Suspense>
  );
};
export default Routes;
