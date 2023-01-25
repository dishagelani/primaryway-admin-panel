import React from "react";
import {useSelector} from "react-redux";
import {NAV_TYPE_TOP} from "constants/ThemeConstant";
import utils from "utils";
import MenuContent from "./MenuContent";

export const TopNav = ({localization = true}) => {
    const {topNavColor} = useSelector((state) => state.theme);
    const props = {topNavColor, localization};
    return (
        <div
            className={`top-nav ${utils.getColorContrast(topNavColor)}`}
            style={{backgroundColor: topNavColor}}
        >
            <div className="top-nav-wrapper">
                <MenuContent type={NAV_TYPE_TOP} {...props} />
            </div>
        </div>
    );
};

export default TopNav;
