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
import {AddTutor, EditTutor} from "redux/reducers/Tutor";
import {useDispatch, useSelector} from "react-redux";
import {HideSuccessMessage, HideErrorMessage} from "redux/reducers/Tutor";
import moment from "moment";

const Modify = () => {
    const history = useHistory();
    const {state} = useLocation();
    const mode = state.mode;
    const tutor = state.tutor;

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {loading, success, successMessage, showMessage, errorMessage} =
        useSelector((state) => state.tutor);
    const [image, setImage] = useState({avatarUrl: tutor?.profilePicture});

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();
                console.log(values);
                if (values.status == undefined) {
                    mode == "EDIT"
                        ? formData.append("status", tutor.status)
                        : formData.append("status", false);
                } else if (values.status == false) {
                    formData.append("status", false);
                }

                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image.imageFile)
                    formData.append("tutorPicture", image.imageFile);

                console.log(...formData);

                if (mode == "EDIT") {
                    formData.append("_id", tutor?._id);
                    dispatch(EditTutor(formData));
                }

                if (mode == "ADD") dispatch(AddTutor(formData));
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
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
            if (mode == "EDIT") {
                history.goBack();
            }

            if (mode == "ADD") {
                message.success({content: successMessage, duration: 2});
                form.resetFields();
                setImage({});
            }
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
                            Tutors
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>

            <Card bordered={false}>
                <Form
                    onFinish={onFinish}
                    name="tutorForm"
                    form={form}
                    layout="vertical"
                >
                    <Row>
                        <Col xs={16} sm={16} md={16} lg={6}>
                            <p className="form-title text-dark">
                                Tutor Details
                            </p>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={10}>
                            <Row>
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={tutor?.name}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Surname"
                                    name="surname"
                                    value={tutor?.surname}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Date of Birth"
                                    name="dob"
                                    value={
                                        tutor?.dob
                                            ? moment(tutor?.dob)
                                            : undefined
                                    }
                                    type="date"
                                />
                            </Row>

                            <Row>
                                <Form.Item>
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
                                            UP
                                        </Avatar>

                                        <div className="d-flex ml-3">
                                            <UploadPicture
                                                handleImage={handleImage}
                                            />
                                        </div>
                                    </Flex>
                                </Form.Item>
                            </Row>
                            <Row>
                                <FormInput
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={tutor?.phoneNumber}
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
                                    value={tutor?.email}
                                />
                            </Row>

                            <Row>
                                <FormInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={tutor?.password.substring(0, 8)}
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
                                            defaultChecked={tutor?.status}
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
                                        if (mode == "EDIT") {
                                            form.resetFields();
                                            setImage({});
                                        }
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
