import React, {useEffect} from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import Icon from "components/util-components/Icon";
import AvatarStatus from "components/shared-components/AvatarStatus";
import {Button, Card, Row, Col, Table, message} from "antd";
import {useHistory, useParams} from "react-router-dom";
import {
    ArrowLeftOutlined,
    PhoneOutlined,
    MailOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    GetStudentByID,
    DeleteStudent,
    HideErrorMessage,
    HideSuccessMessage,
} from "redux/reducers/Student";

const StudentInfo = () => {
    const history = useHistory();
    const {_id} = useParams();
    const dispatch = useDispatch();
    const {
        student,
        success,
        deleteSuccess,
        successMessage,
        showMessage,
        errorMessage,
    } = useSelector((state) => state.student);
    const courseColumns = [
        {
            title: "Course",
            dataIndex: "courseName",
            width: "20%",
        },
        {
            title: "Start date",
            dataIndex: "startDate",
            width: "20%",
        },
        {
            title: "End date",
            dataIndex: "endDate",
        },
    ];
    const reportColumns = [
        {
            title: "Date",
            dataIndex: "date",
            width: "20%",
        },
        {
            title: "Report Type",
            dataIndex: "reportType",
        },
    ];

    const courseData = [
        {
            courseName: "Course course",
            startDate: "21/05/2021",
            endDate: "21/05/2021",
        },
        {
            courseName: "Course course",
            startDate: "21/05/2021",
            endDate: "21/05/2021",
        },
        {
            courseName: "Course course",
            startDate: "21/05/2021",
            endDate: "21/05/2021",
        },
        {
            courseName: "Course course",
            startDate: "21/05/2021",
            endDate: "21/05/2021",
        },
    ];

    const reportData = [
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
        {
            date: "21/05/2021",
            reportType: "weekly report",
        },
    ];

    useEffect(() => {
        dispatch(GetStudentByID(_id));
    }, []);

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
        deleteSuccess && history.goBack();
    }, [deleteSuccess]);

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
                            Students
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card>
                <Row>
                    <Col>
                        <AvatarStatus
                            size={50}
                            src={student.profilePicture}
                            text={`${
                                student.name && student.name[0].toUpperCase()
                            }${
                                student.surname &&
                                student.surname[0].toUpperCase()
                            }`}
                        />
                    </Col>
                    <Col flex={18}>
                        <Row className="ml-3" gutter={16}>
                            <div style={{display: "grid"}}>
                                <Col>
                                    <span className="form-title">
                                        {`${student.name} ${student.surname}`}
                                    </span>
                                </Col>
                                <Col>
                                    <span className="text-muted">
                                        #{student.studentId}
                                    </span>
                                </Col>
                            </div>
                        </Row>

                        <Row className="ml-4 mt-2">
                            <Col>
                                <Row className="mb-2 mt-2" gutter={16}>
                                    <Col>
                                        <Icon
                                            type={PhoneOutlined}
                                            className="text-primary font-size-md"
                                        />
                                    </Col>
                                    <Col>
                                        <span>{student.phoneNumber}</span>
                                    </Col>
                                </Row>
                                <Row className="mb-2 mt-2" gutter={16}>
                                    <Col>
                                        <Icon
                                            type={MailOutlined}
                                            className="text-primary font-size-md"
                                        />
                                    </Col>
                                    <Col>
                                        <span>{student.email}</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        {" "}
                        <Row type="flex" justify="end">
                            <Col>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() =>
                                        history.push({
                                            pathname: `../edit-student`,
                                            state: {mode: "EDIT", student},
                                        })
                                    }
                                    className="text-primary font-size-md user-select-all"
                                />
                            </Col>
                            <Col>
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        dispatch(DeleteStudent(student._id))
                                    }
                                    className="text-primary font-size-md user-select-all"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Card title="Courses" className="modified-table">
                <Table
                    columns={courseColumns}
                    dataSource={courseData}
                    pagination={false}
                />
            </Card>
            <Card
                title="Reports"
                extra={
                    <Button
                        className="heading-class-button"
                        icon={<PlusOutlined />}
                        onClick={() => alert("show modal")}
                    >
                        Add Report
                    </Button>
                }
                className="modified-table"
            >
                <Table
                    columns={reportColumns}
                    dataSource={reportData}
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default StudentInfo;
