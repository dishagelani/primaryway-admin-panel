import React, {useState, useEffect} from "react";
import {useHistory} from "react-router";
import {Card, Row, Col, Form, Button, message, Alert} from "antd";
import FormInput from "components/shared-components/FormInput";
import {
    ForgetPassword,
    HideAuthMessage,
    HideSuccessMessage,
} from "redux/reducers/Auth";
import {useDispatch, useSelector} from "react-redux";
import {motion} from "framer-motion";

const backgroundStyle = {
    backgroundImage: "url(/img/Header.jpg)",
    backgroundRepeat: "no-repeat",
};

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm();

    const {redirect, showMessage, errorMessage, success, loading} = useSelector(
        (state) => state.auth
    );
    const onSend = (values) => {
        dispatch(ForgetPassword(values));
    };
    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 3});
            setTimeout(() => {
                dispatch(HideAuthMessage());
            }, 3000);
        }
        if (success && !loading) {
            message.success({
                content: "New password has been sent to your email!",
                duration: 2,
            });
            history.push(redirect);
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    });
    return (
        <div className="h-100">
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={9}>
                        <Card>
                            <div style={backgroundStyle}>
                                <div className="text-center">
                                    <img className="img-fluid" src="" alt="" />
                                    <h3 className="font-weight-bold ">
                                        Reset password?
                                    </h3>
                                    <p className="mb-5">
                                        Enter your email to reset password
                                    </p>
                                </div>

                                <Row justify="center">
                                    <Col xs={24} sm={24} md={20} lg={20}>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            name="forget-password"
                                            onFinish={onSend}
                                        >
                                            <FormInput
                                                name="email"
                                                label="email"
                                            />
                                            <Form.Item>
                                                <Button
                                                    loading={loading}
                                                    type="primary"
                                                    htmlType="submit"
                                                    block
                                                >
                                                    {loading
                                                        ? "Sending"
                                                        : success
                                                        ? "sent"
                                                        : "Send"}
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ForgotPassword;
