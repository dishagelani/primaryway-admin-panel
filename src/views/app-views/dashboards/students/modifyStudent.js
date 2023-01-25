import React, {useState, useEffect} from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import UploadPicture from "components/shared-components/UploadPicture";
import {
    Button,
    Card,
    Row,
    Col,
    Divider,
    Form,
    Avatar,
    message,
    Switch,
} from "antd";
import FormInput from "components/shared-components/FormInput";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {useHistory, useLocation} from "react-router-dom";
import {AddStudent, EditStudent} from "redux/reducers/Student";
import {useDispatch, useSelector} from "react-redux";
import {HideSuccessMessage, HideErrorMessage} from "redux/reducers/Student";
import moment from "moment";

const Modify = () => {
    const history = useHistory();
    const {state} = useLocation();
    const mode = state.mode;
    const student = state.student;

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {loading, success, successMessage, showMessage, errorMessage} =
        useSelector((state) => state.student);
    const [image, setImage] = useState({avatarUrl: student?.profilePicture});

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();

                if (values.status == undefined) {
                    mode == "EDIT"
                        ? formData.append("status", student.status)
                        : formData.append("status", false);
                } else if (values.status == false) {
                    formData.append("status", false);
                }

                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image.imageFile)
                    formData.append("studentPicture", image.imageFile);

                if (mode == "EDIT") {
                    formData.append("_id", student?._id);
                    dispatch(EditStudent(formData));
                }

                if (mode == "ADD") dispatch(AddStudent(formData));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleImage = (image) => {
        if (Object.keys(image).length != 0) setImage(image);
    };

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
            if (mode == "ADD") {
                message.success({content: successMessage, duration: 2});
                form.resetFields();
                setImage({});
            }
            if (mode == "EDIT") {
                history.goBack();
            }

            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [success]);

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

            <Card bordered={false}>
                <Form
                    onFinish={onFinish}
                    name="studentForm"
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={16} sm={16} md={16} lg={6}>
                            <p className="form-title text-dark">
                                Student Details
                            </p>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={10}>
                            <Row>
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={student?.name}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Surname"
                                    name="surname"
                                    value={student?.surname}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Date of Birth"
                                    name="dob"
                                    value={
                                        student?.dob
                                            ? moment(student?.dob)
                                            : undefined
                                    }
                                    type="date"
                                />
                            </Row>

                            <Row>
                                <Flex
                                    className="mb-3"
                                    justifyContent="between"
                                    alignItems="center"
                                >
                                    <Avatar
                                        size={40}
                                        style={{
                                            backgroundColor: "var(--blue)",
                                        }}
                                        src={image.avatarUrl}
                                    >
                                        JB
                                    </Avatar>

                                    <div className="d-flex ml-3">
                                        <UploadPicture
                                            handleImage={handleImage}
                                        />
                                    </div>
                                </Flex>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row className="mt-4">
                        <Col xs={16} sm={16} md={16} lg={6}>
                            <p className="form-title text-dark">Parents</p>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={10}>
                            <Row>
                                <FormInput
                                    label="Name"
                                    name="parentName"
                                    value={student?.parentName}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Surname"
                                    name="parentSurname"
                                    value={student?.parentSurname}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={student?.phoneNumber}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row className="mt-4">
                        <Col xs={16} sm={16} md={16} lg={6}>
                            <p className="form-title text-dark"> Account </p>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={10}>
                            <Row>
                                <FormInput
                                    label="Email"
                                    name="email"
                                    value={student?.email}
                                />
                            </Row>

                            <Row>
                                <FormInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={student?.password.substring(0, 8)}
                                />
                            </Row>
                            <Row
                                justify="space-between"
                                style={{width: "300px"}}
                            >
                                <Col>
                                    <div
                                        className="mt-2"
                                        style={{
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        {" "}
                                        Active Profile
                                    </div>
                                </Col>
                                <Col>
                                    <Form.Item name="status">
                                        <Switch
                                            defaultChecked={
                                                student?.status

                                                //     // == "Active"
                                                //     //     ? true
                                                //     //     : false
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Divider />
                    <Row className="mt-4">
                        <Flex justifyContent="between" alignItems="center">
                            <Col xs={10} sm={10} md={10} lg={10}>
                                <Button
                                    loading={loading}
                                    htmlType="Submit"
                                    type="primary"
                                    style={{
                                        minWidth: "15vh",
                                    }}
                                >
                                    {loading ? "Updating" : "Save"}
                                </Button>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10}>
                                <Button
                                    type="ghost"
                                    style={{
                                        minwidth: "15vh",
                                    }}
                                    onClick={() => {
                                        form.resetFields();
                                        setImage({});
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Flex>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default Modify;
