import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Menu, Grid, Divider} from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import {useSelector, useDispatch} from "react-redux";
import {SIDE_NAV_LIGHT, NAV_TYPE_SIDE} from "constants/ThemeConstant";
import utils from "utils";
import Flex from "../shared-components/Flex";
import {onMobileNavToggle} from "redux/reducers/Theme";
import {adminDetails, HideSuccessMessage} from "redux/reducers/User";
import NavProfile from "./NavProfile";

const {SubMenu} = Menu;
const {useBreakpoint} = Grid;

const setLocale = (isLocaleOn, localeKey) =>
    isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
    let keyList = [];
    let keyString = "";
    if (key) {
        const arr = key.split("-");
        for (let index = 0; index < arr.length; index++) {
            const elm = arr[index];
            index === 0
                ? (keyString = elm)
                : (keyString = `${keyString}-${elm}`);
            keyList.push(keyString);
        }
    }
    return keyList;
};

const SideNavContent = (props) => {
    const dispatch = useDispatch();
    const {sideNavTheme} = useSelector((state) => state.theme);

    const {routeInfo, hideGroupTitle, localization} = props;
    const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
    const closeMobileNav = () => {
        if (isMobile) {
            dispatch(onMobileNavToggle(false));
        }
    };

    return (
        <>
            <Flex
                alignItems="center"
                mobileFlex={false}
                className="mt-3 text-md-left text-center flex-column"
            >
                <NavProfile />

                <Divider />
            </Flex>
            <div className="admin-sidenav">
                <>
                    <Menu
                        theme={
                            sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"
                        }
                        mode="inline"
                        style={{
                            borderRight: 0,
                        }}
                        defaultSelectedKeys={[routeInfo?.key]}
                        defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
                        className={
                            hideGroupTitle
                                ? "hide-group-title"
                                : "sidenav-menu-list"
                        }
                    >
                        {navigationConfig.map((menuItem, index) => (
                            <>
                                <Menu.Item key={menuItem.key}>
                                    {menuItem.icon ? (
                                        <>
                                            <Icon
                                                type={menuItem?.icon}
                                                style={{zIndex: 100}}
                                            />
                                            <div className="hover-class"></div>
                                        </>
                                    ) : null}
                                    <span
                                        style={{
                                            zIndex: 100,
                                            fontWeight: 700,
                                            fontSize: "14px",
                                        }}
                                    >
                                        {setLocale(
                                            localization,
                                            menuItem?.title
                                        )}
                                    </span>
                                    {menuItem.path ? (
                                        <Link
                                            onClick={() => closeMobileNav()}
                                            to={menuItem.path}
                                        />
                                    ) : null}
                                </Menu.Item>
                                <Divider
                                    style={{
                                        display: menuItem.break
                                            ? "block"
                                            : "none",
                                    }}
                                />
                            </>
                        ))}
                    </Menu>
                </>
            </div>
        </>
    );
};

const TopNavContent = (props) => {
    const {topNavColor} = useSelector((state) => state.theme);
    const {localization} = props;
    return (
        <Menu mode="horizontal" style={{backgroundColor: topNavColor}}>
            {navigationConfig.map((menu) =>
                menu.submenu.length > 0 ? (
                    <SubMenu
                        key={menu.key}
                        popupClassName="top-nav-menu"
                        title={
                            <span>
                                {menu.icon ? <Icon type={menu?.icon} /> : null}
                                <span>
                                    {setLocale(localization, menu.title)}
                                </span>
                            </span>
                        }
                    >
                        {menu.submenu.map((subMenuFirst) =>
                            subMenuFirst.submenu.length > 0 ? (
                                <SubMenu
                                    key={subMenuFirst.key}
                                    icon={
                                        subMenuFirst.icon ? (
                                            <Icon type={subMenuFirst?.icon} />
                                        ) : null
                                    }
                                    title={setLocale(
                                        localization,
                                        subMenuFirst.title
                                    )}
                                >
                                    {subMenuFirst.submenu.map(
                                        (subMenuSecond) => (
                                            <Menu.Item key={subMenuSecond.key}>
                                                <span>
                                                    {setLocale(
                                                        localization,
                                                        subMenuSecond.title
                                                    )}
                                                </span>
                                                <Link to={subMenuSecond.path} />
                                            </Menu.Item>
                                        )
                                    )}
                                </SubMenu>
                            ) : (
                                <Menu.Item key={subMenuFirst.key}>
                                    {subMenuFirst.icon ? (
                                        <Icon type={subMenuFirst?.icon} />
                                    ) : null}
                                    <span>
                                        {setLocale(
                                            localization,
                                            subMenuFirst.title
                                        )}
                                    </span>
                                    <Link to={subMenuFirst.path} />
                                </Menu.Item>
                            )
                        )}
                    </SubMenu>
                ) : (
                    <Menu.Item key={menu.key}>
                        {menu.icon ? <Icon type={menu?.icon} /> : null}
                        <span>{setLocale(localization, menu?.title)}</span>
                        {menu.path ? <Link to={menu.path} /> : null}
                    </Menu.Item>
                )
            )}
        </Menu>
    );
};

const MenuContent = (props) => {
    return props.type === NAV_TYPE_SIDE ? (
        <SideNavContent {...props} />
    ) : (
        <TopNavContent {...props} />
    );
};

export default MenuContent;
