import React, {useEffect, useState} from "react";
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
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    GetTutorByID,
    DeleteTutor,
    HideErrorMessage,
    HideSuccessMessage,
} from "redux/reducers/Tutor";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import moment from "moment";

const TutorInfo = () => {
    const history = useHistory();
    const {_id} = useParams();
    const dispatch = useDispatch();
    const {
        tutor,
        success,
        deleteSuccess,
        successMessage,
        showMessage,
        errorMessage,
    } = useSelector((state) => state.tutor);
    const [students, setStudents] = useState([]);
    const feedbackColumns = [
        {
            title: "Student profile",
            dataIndex: "student",
            width: "20%",
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus
                        size={40}
                        src={record.profilePicture}
                        name={`${record.name} ${record.surname}`}
                        text={`${record.name[0].toUpperCase()}${record.surname[0].toUpperCase()}`}
                    />
                </div>
            ),
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (_, record) => (
                <div className="d-flex">
                    {moment(record.updatedAt).format("DD/MM/YYYY")}
                </div>
            ),
        },
        {
            title: "Feedback",
            dataIndex: "feedback",
            render: (_, record) => (
                <div className="d-flex">
                    Feedback Feedback Feedback Feedback Feedback Feedback
                    Feedback Feedback Feedback Feedback Feedback Feedback
                </div>
            ),
        },
    ];

    useEffect(async () => {
        dispatch(GetTutorByID(_id));
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/student/getStudents`
        );
        console.log("students", response.data.students);
        setStudents(response.data.students);
    }, []);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideErrorMessage());
            }, 1500);
        }
        if (success) {
            message.success({
                content: successMessage,
                duration: 2,
            });
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [showMessage, success]);

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
                            Tutors
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card>
                <Row>
                    <Col>
                        <AvatarStatus
                            size={50}
                            src={tutor?.profilePicture}
                            text={`${
                                tutor?.name && tutor?.name[0].toUpperCase()
                            }${
                                tutor?.surname &&
                                tutor?.surname[0].toUpperCase()
                            }`}
                        />
                    </Col>
                    <Col flex={18}>
                        <Row className="ml-3" gutter={16}>
                            <div style={{display: "grid"}}>
                                <Col>
                                    <span className="form-title">
                                        {`${tutor?.name} ${tutor?.surname}`}
                                    </span>
                                </Col>
                                <Col>
                                    <span className="text-muted">
                                        #{tutor?.tutorId}
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
                                        <span>{tutor?.phoneNumber}</span>
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
                                        <span>{tutor?.email}</span>
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
                                            pathname: `../edit-tutor`,
                                            state: {mode: "EDIT", tutor},
                                        })
                                    }
                                    className="text-primary font-size-md user-select-all"
                                />
                            </Col>
                            <Col>
                                <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() =>
                                        dispatch(DeleteTutor(tutor?._id))
                                    }
                                    className="text-primary font-size-md user-select-all"
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Card title="Parent’s feedback" className="modified-table">
                <Table
                    columns={feedbackColumns}
                    dataSource={students}
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default TutorInfo;
