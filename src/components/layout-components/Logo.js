import React from "react";
import {
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    NAV_TYPE_TOP,
} from "constants/ThemeConstant";

import {useSelector} from "react-redux";
import utils from "utils";
import {Grid} from "antd";

const {useBreakpoint} = Grid;

const getLogoWidthGutter = (navCollapsed, navType, isMobile, mobileLogo) => {
    const isNavTop = navType === NAV_TYPE_TOP ? true : false;
    if (isMobile && !mobileLogo) {
        return 0;
    }
    if (isNavTop) {
        return "auto";
    }
    if (navCollapsed) {
        return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
        return `${SIDE_NAV_WIDTH}px`;
    }
};

const getLogo = (navCollapsed) => {
    if (navCollapsed) {
        return "/img/Logo-sm-2.jpg";
    }
    return "/img/Logo.jpg";
};

const getLogoDisplay = (isMobile, mobileLogo) => {
    if (isMobile && !mobileLogo) {
        return "d-none";
    } else {
        return "logo";
    }
};

export const Logo = (props) => {
    const {navCollapsed, navType} = useSelector((state) => state.theme);
    const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");

    return (
        <div
            className={getLogoDisplay(isMobile, props.mobileLogo)}
            style={{
                width: `${getLogoWidthGutter(
                    navCollapsed,
                    navType,
                    isMobile,
                    props.mobileLogo
                )}`,
            }}
        >
            <img src={getLogo(navCollapsed)} />
        </div>
    );
};

export default Logo;
