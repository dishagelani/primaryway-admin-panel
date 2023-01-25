import React from "react";
import {Dropdown, Menu} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

const EllipsisDropdown = (props) => {
    return (
        // <div className="ml-0">
        <Dropdown
            overlay={props.menu}
            placement={props.placement}
            trigger={["click"]}
        >
            <div className="ellipsis-dropdown">
                <EllipsisOutlined style={{height: "50%"}} />
            </div>
        </Dropdown>
        // </div>
    );
};

EllipsisDropdown.propTypes = {
    trigger: PropTypes.string,
    placement: PropTypes.string,
};

EllipsisDropdown.defaultProps = {
    trigger: "click",
    placement: "bottomRight",
    menu: <Menu />,
};

export default EllipsisDropdown;
