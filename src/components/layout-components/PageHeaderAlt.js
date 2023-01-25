import React, {useRef, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {NAV_TYPE_TOP} from "constants/ThemeConstant";

export const PageHeaderAlt = ({children, background, className, overlap}) => {
    const [widthOffset, setWidthOffset] = useState(0);
    const {navType} = useSelector((state) => state.theme);
    const ref = useRef(null);

    useEffect(() => {
        if (navType === NAV_TYPE_TOP) {
            const windowSize = window.innerWidth;
            const pageHeaderSize = ref.current.offsetWidth;
            setWidthOffset((windowSize - pageHeaderSize) / 2);
        }
    }, [navType]);

    const getStyle = () => {
        let style = {
            background: "none",
        };
        if (navType === NAV_TYPE_TOP) {
            style = {
                marginRight: -widthOffset,
                marginLeft: -widthOffset,
                paddingLeft: 0,
                paddingRight: 0,
            };
        }
        return style;
    };

    return (
        <div
            ref={ref}
            className={`page-header-alt ${overlap && "overlap"}`}
            style={getStyle()}
        >
            {navType === NAV_TYPE_TOP ? (
                <div className="container">{children}</div>
            ) : (
                <>{children}</>
            )}
        </div>
    );
};

PageHeaderAlt.propTypes = {
    children: PropTypes.node,
    background: PropTypes.string,
    className: PropTypes.string,
    overlap: PropTypes.bool,
};

export default PageHeaderAlt;
