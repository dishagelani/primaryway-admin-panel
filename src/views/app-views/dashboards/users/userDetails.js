import React, {useEffect, useState} from "react";
import {Button, Table, Card, message} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import AvatarStatus from "components/shared-components/AvatarStatus";
import utils from "utils";
import {PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import {DeleteUser} from "redux/reducers/User";
import {useDispatch, useSelector} from "react-redux";
import {HideErrorMessage, HideSuccessMessage} from "redux/reducers/User";
const User = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const {success, successMessage, showMessage, errorMessage} = useSelector(
        (state) => state.user
    );

    const columns = [
        {
            title: "User name",
            width: "30%",
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus
                        size={40}
                        src={record.adminProfile}
                        name={`${record.name} ${record.surname}`}
                        text={`${record.name[0].toUpperCase()}${record.surname[0].toUpperCase()}`}
                    />
                </div>
            ),
        },
        {
            title: "email",
            dataIndex: "email",
            width: "30%",
        },
        {
            title: "User role",
            dataIndex: "role",
            width: "20%",
        },

        {
            title: "Account Status",
            width: "20%",
            sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
            render: (_, record, index) => {
                return (
                    <div className="d-flex align-items-center">
                        <div
                            className={`${
                                record.status ? "Active" : "Disabled"
                            }-column-class`}
                        >
                            {record.status ? "Active" : "Disabled"}
                        </div>
                    </div>
                );
            },
            align: "center",
        },
        {
            title: "",
            render: (_, record, index) => {
                return (
                    <div className="d-flex align-items-center float-right">
                        <Button
                            icon={<EditOutlined />}
                            onClick={() =>
                                history.push({
                                    pathname: "./edit-user",
                                    state: {mode: "EDIT", user: record},
                                })
                            }
                            className="text-primary font-size-md user-select-all"
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => dispatch(DeleteUser(record._id))}
                            className="text-primary font-size-md user-select-all"
                        />
                    </div>
                );
            },
        },
    ];

    useEffect(async () => {
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/admin/getAdmin`
        );
        setUsers(response.data.admins);
    }, [success]);
    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideErrorMessage());
            }, 1500);
        }
    }, [showMessage]);

    useEffect(() => {
        if (success) {
            message.success({content: successMessage, duration: 2});

            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [success]);
    return (
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <h1 className="dashboard-title">Users</h1>
                    <div>
                        <Button
                            type="primary"
                            onClick={() =>
                                history.push({
                                    pathname: "./add-user",
                                    state: {mode: "ADD"},
                                })
                            }
                            icon={<PlusOutlined />}
                        >
                            Add User
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={users.length && users}
                    showSorterTooltip={false}
                    pagination={false}
                />
            </Card>
        </>
    );
};

export default User;
