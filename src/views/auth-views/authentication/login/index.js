import React from "react";
import LoginForm from "../../components/LoginForm";
import {Card, Row, Col} from "antd";
import {useHistory} from "react-router-dom";

const backgroundStyle = {
    backgroundImage: "url(/img/Header.jpg)",
    backgroundRepeat: "repeat-x",
};

const LoginOne = (props) => {
    // const theme = useSelector((state) => state.theme.currentTheme);
    const history = useHistory();
    return (
        <div className="h-100 w-100">
            <div className="container d-flex flex-column justify-content-center h-100">
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={10}>
                        <Card>
                            <div style={backgroundStyle}>
                                <div className="text-center mb-5">
                                    <img
                                        className="img-fluid"
                                        src={"/img/Logo.jpg"}
                                        alt="company logo"
                                    />
                                </div>
                                <Row justify="center">
                                    <Col xs={24} sm={24} md={20} lg={20}>
                                        <LoginForm {...props} />
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    
                                    <p
                                        style={{
                                            paddingLeft: 5,
                                            fontWeight: 600,
                                            color: "black",
                                        }}
                                        onClick={() =>
                                            history.push(
                                                "/auth/forgot-password"
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Forgot Password?
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default LoginOne;
