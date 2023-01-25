import React from "react";
import {Drawer} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {NAV_TYPE_SIDE} from "constants/ThemeConstant";
import {Scrollbars} from "react-custom-scrollbars";
import MenuContent from "./MenuContent";
import {onMobileNavToggle} from "../../redux/reducers/Theme";
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import {ArrowLeftOutlined} from "@ant-design/icons";

export const MobileNav = ({routeInfo, hideGroupTitle, localization = true}) => {
    const dispatch = useDispatch();
    const {navCollapsed, sideNavTheme, mobileNav} = useSelector(
        (state) => state.theme
    );
    const props = {
        navCollapsed,
        sideNavTheme,
        routeInfo,
        hideGroupTitle,
        localization,
    };
    const onClose = () => {
        dispatch(onMobileNavToggle(false));
    };

    return (
        <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            visible={mobileNav}
            bodyStyle={{padding: 5}}
        >
            <Flex flexDirection="column" className="h-100">
                <Flex justifyContent="between" alignItems="center">
                    <Logo mobileLogo={true} />
                    <div className="nav-close" onClick={() => onClose()}>
                        <ArrowLeftOutlined />
                    </div>
                </Flex>
                <div className="mobile-nav-menu">
                    <Scrollbars autoHide>
                        <MenuContent type={NAV_TYPE_SIDE} {...props} />
                    </Scrollbars>
                </div>
            </Flex>
        </Drawer>
    );
};

export default MobileNav;
