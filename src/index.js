import React from "react";
import ReactDOM from "react-dom";
import "./globals.less";
import App from "./App";
import { Provider } from "mobx-react";
import "./utils/styles/variables.less";
import CombinedStore from "./globals/CombinedStore";
// import { MobxIntlProvider } from "mobx-react-intl";
// import { addLocaleData } from "react-intl";
// import { toJS } from "mobx";
import * as serviceWorker from "./serviceWorker";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";
import "core-js/stable";
import "regenerator-runtime/runtime";
import Header from "./header";
import Sider from "./sider";

// import enLocale from "react-intl/locale-data/en";
// import hiLocale from "react-intl/locale-data/hi";
// import guLocal from "react-intl/locale-data/gu";
// import zhLocal from "react-intl/locale-data/zh";
// addLocaleData([...enLocale, ...hiLocale, ...guLocal, ...zhLocal]);

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider {...new CombinedStore()}>
    {/* <MobxIntlProvider> */}
    <App />
    {/* </MobxIntlProvider> */}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
