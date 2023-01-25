import React, {useEffect, useState} from "react";
import {Button, Table, Card, Modal, Form, message} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Add from "./modify/add";
import Edit from "./modify/edit";
import {useHistory} from "react-router";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    DeleteReport,
    HideErrorMessage,
    HideSuccessMessage,
} from "redux/reducers/Report";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import moment from "moment";

const Report = () => {
    const history = useHistory();

    const [Reports, setReports] = useState([]);

    let {success, successMessage, errorMessage, showMessage} = useSelector(
        (state) => state.report
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
        },
        {
            title: "Student",
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus
                        size={40}
                        src={record.student.profilePicture}
                        name={`${record.student.name} ${record.student.surname}`}
                        text={`${record.student.name[0].toUpperCase()}${
                            record.student.surname
                                ? record.student.surname[0].toUpperCase()
                                : ""
                        }`}
                    />
                </div>
            ),
        },
        {
            title: "tutor",

            render: (_, record) => (
                <div className="d-flex">
                    {/* {record.tutor && ( */}
                    <AvatarStatus
                        size={40}
                        src={record.tutor?.profilePicture}
                        name={`${record.tutor?.name} ${record.tutor?.surname}`}
                        text={`${record.tutor?.name[0].toUpperCase()}${record.tutor?.surname[0].toUpperCase()}`}
                    />
                    {/* )} */}
                </div>
            ),
        },
        {
            title: "Type",

            render: (_, record) => <div className="d-flex">{record.title}</div>,
        },

        {
            title: "",
            width: "20%",

            render: (_, record, index) => {
                return (
                    <div className="d-flex float-right">
                        <Edit report={record} />

                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => dispatch(DeleteReport(record._id))}
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
            `${env.API_ENDPOINT_URL}/report/getReports`
        );
        setReports(response.data.reports);
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
                    <h1 className="dashboard-title">Reports</h1>
                    {/* <div>
                        <Add />
                    </div> */}
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={Reports}
                    pagination={false}
                />
            </Card>
        </>
    );
};

export default Report;
