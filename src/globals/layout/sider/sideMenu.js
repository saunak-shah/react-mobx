import React, { Component } from "react";
import { observer } from "mobx-react";
import { Icon, Menu, Tooltip, Badge } from "antd";
import { Link } from "react-router-dom";
import userSeting from "utils/defaultSettings";

const SubMenu = Menu.SubMenu;

@observer
class SideBarMenu extends Component {
  render() {
    const props = this.props;
    const {
      globals,
      layout: { sideMenuListdata, collapsed, sideMenuCount, updateSideMenuCount },
      intl: { formatMessage }
    } = props;
    return (
      <Menu
        onClick={(item) => {
          props.layout.MenuClick(item);
        }}
        theme={userSeting.navTheme}
        mode="inline"
        openKeys={props.layout.selectSideMenu}
        selectedKeys={props.layout.getActiveKey(props, sideMenuListdata)}
        onOpenChange={props.layout.handleSideBarChange}
        className="main-layout-menu"
      >
        {sideMenuListdata.map((content) => {
          let showIds = globals.allow_routes.filter((e) => content.menuIds.indexOf(e) !== -1);
          let toShow = !!showIds.length;
          if (content.children.length) {
            let ids = content.ids.filter((id) => globals.allow_routes.includes(id));
            toShow = !!ids.length;
          }
          if (content.children.length && toShow) {
            return (
              <SubMenu
                key={content.key}
                title={
                  <span>
                    <Icon component={content.svg} />
                    <Tooltip
                      title={formatMessage({ id: content.name })}
                      placement="right"
                      overlayStyle={{
                        display: collapsed && "none"
                      }}
                    >
                      <span className="menu-name">{formatMessage({ id: content.name })}</span>
                      <Badge count={sideMenuCount[content.key]} />
                    </Tooltip>
                  </span>
                }
              >
                {content.children.map((child) => {
                  let showIds = globals.allow_routes.filter((e) => child.menuIds.indexOf(e) !== -1);
                  const tochildrenRoutesShow = !!showIds.length;

                  if (tochildrenRoutesShow) {
                    return (
                      <Menu.Item key={child.key}>
                        <Link to={child.route}>
                          {child.icon && <Icon type={child.icon} />}
                          <span className="menu-name ">{formatMessage({ id: child.name })}</span>
                          <Badge count={sideMenuCount[child.key]} />
                        </Link>
                      </Menu.Item>
                    );
                  } else {
                    return null;
                  }
                })}
              </SubMenu>
            );
          } else {
            if (toShow) {
              return (
                <Menu.Item
                  key={content.key}
                  onClick={() => {
                    updateSideMenuCount(content.key, 0);
                  }}
                >
                  <Tooltip
                    title={formatMessage({ id: content.name })}
                    placement="right"
                    overlayStyle={{
                      display: collapsed && "none"
                    }}
                  >
                    <Link to={`${content.route}`}>
                      <span>
                        <Icon component={content.svg} />
                        <span className="menu-name"> {formatMessage({ id: content.name })}</span>
                        <Badge
                          className="side-menu-count-badge"
                          count={sideMenuCount[content.key]}
                        />
                      </span>
                    </Link>
                  </Tooltip>
                </Menu.Item>
              );
            } else {
              return null;
            }
          }
        })}
      </Menu>
    );
  }
}

export default SideBarMenu;
