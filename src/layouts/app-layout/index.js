import React from "react";
import {useSelector} from "react-redux";
import SideNav from "components/layout-components/SideNav";
import TopNav from "components/layout-components/TopNav";
import Loading from "components/shared-components/Loading";
import MobileNav from "components/layout-components/MobileNav";
import HeaderNav from "components/layout-components/HeaderNav";
import AppViews from "views/app-views";
import {Layout, Grid} from "antd";
import navigationConfig from "configs/NavigationConfig";
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_TYPE_SIDE,
    NAV_TYPE_TOP,
    DIR_RTL,
    DIR_LTR,
} from "constants/ThemeConstant";
import utils from "utils";
import {useThemeSwitcher} from "react-css-theme-switcher";

const {Content} = Layout;
const {useBreakpoint} = Grid;

export const AppLayout = ({location, direction}) => {
    const {navCollapsed, navType, locale} = useSelector((State) => State.theme);
    const currentRouteInfo = utils.getRouteInfo(
        navigationConfig,
        location.pathname
    );
    // console.log("currentRouteInfo", currentRouteInfo);
    const screens = utils.getBreakPoint(useBreakpoint());
    const isMobile = screens.length === 0 ? false : !screens.includes("lg");
    const isNavSide = navType === NAV_TYPE_SIDE;
    const isNavTop = navType === NAV_TYPE_TOP;
    const getLayoutGutter = () => {
        if (isNavTop || isMobile) {
            return 0;
        }
        return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
    };

    const {status} = useThemeSwitcher();

    if (status === "loading") {
        return <Loading cover="page" />;
    }

    const getLayoutDirectionGutter = () => {
        if (direction === DIR_LTR) {
            return {paddingLeft: getLayoutGutter()};
        }
        if (direction === DIR_RTL) {
            return {paddingRight: getLayoutGutter()};
        }
        return {paddingLeft: getLayoutGutter()};
    };

    return (
        <Layout>
            <HeaderNav isMobile={isMobile} />
            {isNavTop && !isMobile ? (
                <TopNav routeInfo={currentRouteInfo} />
            ) : null}
            <Layout className="app-container">
                {isNavSide && !isMobile ? (
                    <SideNav routeInfo={currentRouteInfo} />
                ) : null}
                <Layout
                    className="app-layout"
                    style={getLayoutDirectionGutter()}
                >
                    <div
                        className={`app-content ${
                            isNavTop ? "layout-top-nav" : ""
                        }`}
                    >
                        <Content>
                            <AppViews />
                        </Content>
                    </div>
                </Layout>
            </Layout>
            {isMobile && <MobileNav />}
        </Layout>
    );
};

export default AppLayout;
