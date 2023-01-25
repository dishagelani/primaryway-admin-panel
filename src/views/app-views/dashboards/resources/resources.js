import React, {useEffect, useState} from "react";
import {Button, Table, Card, Modal, Form, message, Avatar} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Add from "./modify/add";
import Edit from "./modify/edit";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    DeleteResource,
    HideErrorMessage,
    HideSuccessMessage,
} from "redux/reducers/Resource";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import moment from "moment";

const Resource = () => {
    const [resource, setResource] = useState([]);

    let {success, successMessage, errorMessage, showMessage} = useSelector(
        (state) => state.resource
    );
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Date",
            render: (_, record) => (
                <div className="d-flex">
                    {moment(record.createdAt).format("MM/DD/YYYY")}
                </div>
            ),
            width: "10%",
        },
        {
            title: "Photo",
            render: (_, record) => (
                <div className="d-flex">
                    <Avatar size={50} src={record?.image} shape="square" />
                </div>
            ),
            width: "10%",
        },
        {
            title: "Title",
            dataIndex: "title",
            width: "20%",
        },
        {
            title: "Text",
            dataIndex: "text",
            ellipsis: true,
            width: "30%",
        },

        {
            title: "",
            width: "10%",

            render: (_, record, index) => {
                return (
                    <div className="d-flex float-right">
                        <Edit resource={record} />

                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => dispatch(DeleteResource(record._id))}
                            className="text-primary font-size-md user-select-all"
                        />
                    </div>
                );
            },
            align: "center",
        },
    ];

    useEffect(async () => {
        if (success) {
            message.success({content: successMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/resource/getResources`
        );
        setResource(response.data.resources);
    }, [success]);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideErrorMessage());
            }, 1500);
        }
    }, [showMessage]);

    return (
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <h1 className="dashboard-title">Resources</h1>
                    <div>
                        <Add />
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={resource}
                    pagination={false}
                />
            </Card>
        </>
    );
};

export default Resource;
