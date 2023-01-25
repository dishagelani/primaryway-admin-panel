import React, {useEffect, useState} from "react";
import {Button, Table, Card, message} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import {DeleteOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import AddCourse from "./modifyCourse/add";
import EditCourse from "./modifyCourse/edit";
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import {
    DeleteCourse,
    HideSuccessMessage,
    HideErrorMessage,
} from "redux/reducers/Course";

const Course = () => {
    const history = useHistory();
    const [courses, setCourses] = useState([]);
    const {success, successMessage, showMessage, errorMessage} = useSelector(
        (state) => state.course
    );
    const dispatch = useDispatch();
    const columns = [
        {
            title: "Course name",

            width: "40%",
            render: (_, record) => {
                return (
                    <>
                        <div
                            onClick={() =>
                                history.push(`./course-info/${record._id}`)
                            }
                            className="avatar-status-name cursor-pointer"
                        >
                            {record.name}
                        </div>
                        <div className="text-muted avatar-status-subtitle">
                            Year 2
                        </div>
                    </>
                );
            },
        },
        {
            title: "Start date",

            render: (_, record) => {
                return (
                    <p className="text-primary">
                        {moment(record.startDate).format("MM/DD/YYYY")}
                    </p>
                );
            },
        },
        {
            title: "End date",

            render: (_, record) => {
                return (
                    <p className="text-primary">
                        {moment(record.endDate).format("MM/DD/YYYY")}
                    </p>
                );
            },
        },
        {
            title: "Students",

            render: (_, record) => {
                return (
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <p className="text-primary">{record.students}</p>
                        </div>
                        <div className="d-flex">
                            <EditCourse course={record} />

                            <Button
                                icon={<DeleteOutlined />}
                                onClick={() =>
                                    dispatch(DeleteCourse(record._id))
                                }
                                className="text-primary font-size-md user-select-all"
                            />
                        </div>
                    </div>
                );
            },
        },
    ];

    useEffect(async () => {
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/course/getCourses`
        );
        setCourses(response.data.courses);
    }, [success]);

    useEffect(async () => {
        if (success) {
            message.success({
                content: successMessage,
                duration: 2,
            });
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [success]);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideErrorMessage());
            }, 1500);
        }
    }, [showMessage, errorMessage]);

    return (
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <div>
                        <h1 className="dashboard-title mb-0">Courses</h1>
                        <p className="text-primary mt-0">
                            Glad to see you here
                        </p>
                    </div>
                    <AddCourse />
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={courses.length && courses}
                />
            </Card>
        </>
    );
};

export default Course;
