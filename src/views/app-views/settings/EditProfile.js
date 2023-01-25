import React, {useState, useEffect} from "react";
import {Form, Avatar, Button, Input, Row, Col, message, Card} from "antd";
import {UserOutlined} from "@ant-design/icons";

import Flex from "components/shared-components/Flex";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {
    editProfile,
    HideSuccessMessage,
    HideAuthMessage,
} from "redux/reducers/Auth";

import {adminDetails} from "redux/reducers/User";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import UploadPicture from "components/shared-components/UploadPicture";

const EditProfile = () => {
    const dispatch = useDispatch();
    const {showMessage, errorMessage, status, success} = useSelector(
        (state) => state.auth
    );
    const {admin} = useSelector((state) => state.user);
    const [image, setImage] = useState({avatarUrl: admin.adminProfile});
    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();
                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image.imageFile)
                    formData.append("adminProfile", image.imageFile);

                dispatch(editProfile(formData));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (success) dispatch(adminDetails());
    }, [success]);

    useEffect(() => {
        if (status == 200) {
            message.success({content: "Profile Updated!", duration: 2});

            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [status]);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideAuthMessage());
            }, 1500);
        }
    }, [showMessage]);

    const handleImage = (image) => {
        if (image.imageFile) setImage(image);
    };

    return (
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <h1 className="dashboard-title">Edit profile</h1>
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false}>
                <Form
                    name="basicInformation"
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={16}>
                            <Row>
                                <Flex
                                    alignItems="center"
                                    mobileFlex={false}
                                    className="text-center text-md-left mb-3"
                                >
                                    <Avatar
                                        size={60}
                                        src={image.avatarUrl}
                                        icon={<UserOutlined />}
                                    />
                                    <div className="d-flex ml-3">
                                        <UploadPicture
                                            handleImage={handleImage}
                                        />
                                    </div>
                                </Flex>
                            </Row>
                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={12}>
                                    <FormInput
                                        label="Name"
                                        name="name"
                                        value={admin?.name}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <FormInput
                                        label="Username"
                                        name="username"
                                        value={admin?.username}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <FormInput
                                        label="Email"
                                        name="email"
                                        value={admin?.email}
                                    />
                                </Col>

                                <Col xs={24} sm={24} md={12}>
                                    <FormInput
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={admin?.phoneNumber}
                                    />
                                </Col>

                                <Col xs={24} sm={24} md={24}>
                                    <FormInput
                                        label="Address"
                                        name="address"
                                        type="textarea"
                                        value={admin?.address}
                                    />
                                </Col>
                            </Row>
                            <Button type="primary" htmlType="submit">
                                Save Change
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
};

export default EditProfile;
