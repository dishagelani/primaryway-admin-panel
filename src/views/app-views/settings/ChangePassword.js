import React, {useRef, useEffect} from "react";
import {Form, Button, Input, Row, Col, message, Alert, Card} from "antd";
import {useSelector, useDispatch} from "react-redux";
import FormInput from "components/shared-components/FormInput";
import {
    HideAuthMessage,
    ChangeAdminPassword,
    HideSuccessMessage,
} from "redux/reducers/Auth";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";

const ChangePassword = () => {
    const [form] = Form.useForm();
    const {success, showMessage, errorMessage} = useSelector(
        (state) => state.auth
    );
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(ChangeAdminPassword(values));
    };

    useEffect(() => {
        if (success) {
            message.success({content: "Password Changed!", duration: 2});
            form.resetFields();
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [success]);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideAuthMessage());
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
                    <h1 className="dashboard-title">Change Password</h1>
                </Flex>
            </PageHeaderAlt>
            <Card>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <Form
                            name="changePasswordForm"
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                        >
                            <FormInput
                                label="Current Password"
                                name="currentPassword"
                                type="password"
                            />

                            <FormInput
                                label="New Password"
                                name="newPassword"
                                type="password"
                            />

                            <FormInput
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                            />

                            <Button type="primary" htmlType="submit">
                                Change password
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default ChangePassword;
