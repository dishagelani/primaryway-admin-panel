import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LockOutlined, MailOutlined} from "@ant-design/icons";
import {Button, Form, Input, Alert, message} from "antd";
import {
    SignUp,
    ShowLoading,
    HideAuthMessage,
} from "../../../redux/reducers/Auth";
import {useHistory} from "react-router-dom";
import {motion} from "framer-motion";

const strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);

const rules = {
    email: [
        {
            required: true,
            message: "Please enter your email address",
        },
        {
            type: "email",
            message: "Please enter a valid email!",
        },
    ],
    password: [
        {
            required: true,
            message: "Please enter your password",
        },
        () => ({
            validator(rule, value) {
                if (strongPassword.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject(
                    "Password should be at least 8 characters long with one uppercase letter, one lowercase letter, one digit and one special character !"
                );
            },
        }),
    ],
    confirm: [
        {
            required: true,
            message: "Please confirm your password!",
        },
        ({getFieldValue}) => ({
            validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject("Passwords do not match!");
            },
        }),
    ],
};

export const RegisterForm = (props) => {
    const dispatch = useDispatch();

    const {loading, redirect, errorMessage, showMessage} = useSelector(
        (state) => state.auth
    );

    const [form] = Form.useForm();
    let history = useHistory();

    const onSignUp = () => {
        form.validateFields()
            .then((values) => {
                console.log("values", values);
                dispatch(ShowLoading());
                dispatch(SignUp({values}));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    useEffect(() => {
        if (redirect) {
            message.success({
                content: "Registered user successfully !",
                duration: 2,
            });
            history.push(redirect);
        }

        if (showMessage) {
            setTimeout(() => {
                dispatch(HideAuthMessage());
            }, 1500);
        }
    });

    return (
        <>
            <motion.div
                initial={{opacity: 0, marginBottom: 0, marginTop: 20}}
                animate={{
                    opacity: showMessage ? 1 : 0,
                    marginBottom: showMessage ? 20 : 0,
                }}
            >
                <Alert type="error" showIcon message={errorMessage}></Alert>
            </motion.div>
            <Form
                form={form}
                layout="vertical"
                name="register-form"
                onFinish={onSignUp}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={rules.email}
                    hasFeedback
                >
                    <Input prefix={<MailOutlined className="text-primary" />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={rules.password}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-primary" />}
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="ConfirmPassword"
                    rules={rules.confirm}
                    hasFeedback
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-primary" />}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
