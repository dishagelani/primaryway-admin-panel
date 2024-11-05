import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import Logo from "./Logo";
import NavNotification from "./NavNotification";
import NavSettings from "./NavSettings";
import {
    toggleCollapsedNav,
    onMobileNavToggle,
} from "../../redux/reducers/Theme";
import {
    NAV_TYPE_TOP,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_WIDTH,
} from "constants/ThemeConstant";

const {Header} = Layout;

export const HeaderNav = (props) => {
    const {navCollapsed, mobileNav, navType, headerNavColor, direction} =
        useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const onToggle = () => {
        if (!props.isMobile) {
            dispatch(toggleCollapsedNav(!navCollapsed));
        } else {
            dispatch(onMobileNavToggle(!mobileNav));
        }
    };

    const isNavTop = navType === NAV_TYPE_TOP ? true : false;

    const getNavWidth = () => {
        if (isNavTop || props.isMobile) {
            return "0px";
        }
        if (navCollapsed) {
            return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
        } else {
            return `${SIDE_NAV_WIDTH}px`;
        }
    };

    return (
        <Header
            className={`app-header dark`}
            style={{backgroundColor: headerNavColor}}
        >
            <div
                className={`app-header-wrapper ${
                    isNavTop ? "layout-top-nav" : ""
                }`}
            >
                <Logo />

                <div
                    className="nav"
                    style={{width: `calc(100% - ${getNavWidth()})`}}
                >
                    {/* ----------------------------CLOSE SIDENAV BUTTON--------------------------- */}
                    {props.isMobile && (
                        <div className="nav-left">
                            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
                                {isNavTop && !props.isMobile ? null : (
                                    <li
                                        className="ant-menu-item ant-menu-item-only-child"
                                        onClick={() => {
                                            onToggle();
                                        }}
                                    >
                                        {navCollapsed || props.isMobile ? (
                                            <MenuUnfoldOutlined className="nav-icon" />
                                        ) : (
                                            <MenuFoldOutlined className="nav-icon" />
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    <div className="nav-right">
                         {/* <NavNotification /> */}
                        <NavSettings />
                    </div>
                </div>
            </div>
        </Header>
    );
};

export default HeaderNav;
