import React, {useEffect} from "react";
import {Menu, Dropdown, message} from "antd";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    EditOutlined,
    SettingOutlined,
    LockOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import {SignOut} from "redux/reducers/Auth";

const menuItem = [
    {
        title: "Edit Profile",
        icon: EditOutlined,
        path: "/app/settings/edit-profile",
    },

    {
        title: "Change Password",
        icon: LockOutlined,
        path: "/app/settings/change-password",
    },
];

export const NavSettings = () => {
    const {redirect} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const settingsMenu = (
        <div className="nav-settings nav-dropdown">
            <div className="nav-settings-body">
                <Menu>
                    {/* {menuItem.map((el, i) => {
                        return (
                            <Menu.Item key={i}>
                                <a href={el.path}>
                                    <Icon className="mr-3" type={el.icon} />
                                    <span className="font-weight-normal">
                                        {el.title}
                                    </span>
                                </a>
                            </Menu.Item>
                        );
                    })} */}
                    <Menu.Item
                        key={menuItem.length + 1}
                        onClick={(e) => {
                            localStorage.removeItem("auth-token");
                            dispatch(SignOut());
                            history.push(redirect);
                        }}
                    >
                        <span>
                            <LogoutOutlined className="mr-3" />
                            <span className="font-weight-normal">Sign Out</span>
                        </span>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
    return (
        <Dropdown
            placement="bottomRight"
            overlay={settingsMenu}
            trigger={["click"]}
        >
            <Menu className="d-flex align-item-center" mode="horizontal">
                <Menu.Item>
                    <SettingOutlined />
                </Menu.Item>
            </Menu>
        </Dropdown>
    );
};

export default NavSettings;
