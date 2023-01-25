import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, message, Alert} from "antd";
import {MailOutlined, LockOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {
    SignIn,
    ShowLoading,
    HideAuthMessage,
} from "../../../redux/reducers/Auth";
import {useHistory} from "react-router-dom";
import {motion} from "framer-motion";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const {loading, showMessage, errorMessage, token, redirect} = useSelector(
        (state) => state.auth
    );
    let history = useHistory();

    const onLogin = (values) => {
        dispatch(ShowLoading());
        dispatch(SignIn(values));
    };

    useEffect(() => {
        if (token !== null) {
            message.success({
                content: "Logged in user successfully !",
                duration: 2,
            });
            history.push(redirect);
        }
        if (showMessage) {
            message.error({content: errorMessage, duration: 3});
            setTimeout(() => {
                dispatch(HideAuthMessage());
            }, 3000);
        }
    });

    return (
        <>
            <Form layout="vertical" name="login-form" onFinish={onLogin}>
                <FormInput name="email" label="email" />
                <FormInput name="pwd" label="password" type="password" />

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;
