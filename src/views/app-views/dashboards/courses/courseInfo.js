import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ArrowLeftOutlined, DeleteOutlined} from "@ant-design/icons";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {Button, Card, Avatar, Table, message} from "antd";
import {
    GetCourseByID,
    DeleteClass,
    HideSuccessMessage,
    HideErrorMessage,
} from "redux/reducers/Course";
import {useSelector, useDispatch} from "react-redux";
import AvatarStatus from "components/shared-components/AvatarStatus";
import ADD from "./classes/modifyClass/add";
import EDIT from "./classes/modifyClass/edit";

const CourseInfo = () => {
    const history = useHistory();
    const {_id} = useParams();
    const dispatch = useDispatch();
    const {
        course,
        success,

        showMessage,
        errorMessage,
        successMessage,
    } = useSelector((state) => state.course);

    const columns = [
        {
            title: "class",
            width: "35%",
            render: (_, record) => (
                <div
                    className="text-primary cursor-pointer text-capitalize"
                    onClick={() =>
                        history.push({
                            pathname: `../class-details/${record._id}`,
                        })
                    }
                >
                    {record.className}
                </div>
            ),
        },
        {
            title: "tutor",
            render: (_, record) => (
                <AvatarStatus
                    size={40}
                    src={record.tutor?.profilePicture}
                    name={
                        record.tutor
                            ? `${record.tutor.name} ${record.tutor.surname}`
                            : ""
                    }
                    text={
                        record.tutor
                            ? `${record.tutor.name[0].toUpperCase()}${record.tutor.surname[0].toUpperCase()}`
                            : ""
                    }
                    onNameClick={() =>
                        history.push(
                            `../../tutors/tutor-info/${record.tutor?._id}`
                        )
                    }
                />
            ),
        },
        {
            title: "action",
            align: "right",
            render: (_, record) => (
                <div className="d-flex float-right">
                    <EDIT classData={record} />

                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() =>
                            dispatch(
                                DeleteClass({
                                    _id: course._id,
                                    classId: record._id,
                                })
                            )
                        }
                        className="text-primary font-size-md user-select-all"
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(GetCourseByID(_id));
    }, [success]);

    useEffect(() => {
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
    }, [showMessage]);
    return (
        <div>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <div>
                        <Button
                            className="heading-class-button"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => history.goBack()}
                        >
                            Courses
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card className="info-page-card">
                <div
                    className="card-top-div"
                    style={{
                        background: `${course.color} url('/img/Pattern.png') no-repeat`,
                    }}
                >
                    <div className="card-top-div-content">
                        <Avatar
                            src={course?.coursePicture}
                            shape="square"
                            size={30}
                            alt="Course picture"
                            style={{borderRadius: 4}}
                        ></Avatar>
                        <div className="d-flex mt-2">
                            <span className="text-white mr-2 form-title">
                                Year 2
                            </span>
                            <span
                                className="text-white"
                                style={{
                                    fontSize: "18px",
                                }}
                            >
                                {course.name}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-top-div-content">
                    <p
                        style={{
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: 0,
                        }}
                    >
                        Description
                    </p>
                    <p className="text-primary">{course.description}</p>
                </div>
                <div className="d-flex justify-content-between card-top-div-content">
                    <span className="form-title">Classes</span>

                    <ADD courseId={course._id} />
                </div>
                <div className="card-top-div-content mt-0 modified-table">
                    <Table
                        columns={columns}
                        dataSource={course?.classes}
                        showHeader={false}
                    />
                </div>
            </Card>
        </div>
    );
};

export default CourseInfo;
