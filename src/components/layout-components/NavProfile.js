import React, {useState, useEffect} from "react";
import {Menu, Avatar, Card, Row, Col, Modal} from "antd";
import {MailOutlined, UserOutlined, HomeOutlined} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import Flex from "../shared-components/Flex";
import {adminDetails} from "redux/reducers/User";
import {useDispatch, useSelector} from "react-redux";
export const Content = ({admin}) => {
    return (
        <Card>
            <Row justify="center">
                <Col sm={24} md={23}>
                    <div className="d-md-flex">
                        <div
                            className="rounded p-2 bg-white shadow-sm mx-auto"
                            style={{
                                marginTop: "-3.5rem",
                                width: 160,
                                height: 170,
                            }}
                        >
                            <Avatar
                                shape="square"
                                size={140}
                                src={admin.adminProfile}
                            />
                        </div>
                        <div className="ml-md-4 w-100">
                            <Flex
                                alignItems="center"
                                mobileFlex={false}
                                className="mb-3 text-md-left text-center flex-column"
                            >
                                <h2 className="mb-3">
                                    {admin.name}
                                    {"  "}
                                    {admin.surname}
                                </h2>

                                <Row
                                    justify="end"
                                    style={{
                                        marginRight: 0,
                                    }}
                                >
                                    <Col>
                                        <Row className="mb-2 mt-2" gutter={16}>
                                            <Col>
                                                <Icon
                                                    type={MailOutlined}
                                                    className="text-primary font-size-md"
                                                />
                                            </Col>
                                            <Col>
                                                <span className="font-weight-semibold">
                                                    {admin.email}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row className="mb-2 mt-2" gutter={16}>
                                            <Col>
                                                <Icon
                                                    type={UserOutlined}
                                                    className="text-primary font-size-md"
                                                />
                                            </Col>
                                            <Col>
                                                <span className="font-weight-semibold">
                                                    {admin.role}
                                                </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Flex>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export const NavProfile = () => {
    const [visible, setVisible] = useState(false);
    const {admin, success} = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminDetails());
    }, []);

    useEffect(() => {
        if (success) {
            dispatch(adminDetails());
        }
    }, [success]);

    return (
        <>
            <Menu
                // className="d-flex align-items-center"
                mode="horizontal"
                onClick={() => setVisible(true)}
                style={{borderBottom: "none"}}
            >
                <Menu.Item>
                    <Flex
                        alignItems="center"
                        mobileFlex={false}
                        className="mt-3 text-md-left text-center flex-column"
                    >
                        <Avatar
                            style={{
                                border: "1px solid #FFC331",
                                background: "var(--yellow)",
                            }}
                            size={50}
                            src={admin.adminProfile}
                            alt="Admin profile"
                        >
                            <span className="text-white">AP</span>
                        </Avatar>
                        <p
                            className="mb-0 text-md-left text-dark "
                            style={{
                                fontWeight: "700",
                                fontSize: "16px",
                                lineHeight: 1,
                                marginTop: 10,
                            }}
                        >
                            {admin.name} {admin.surname}
                        </p>
                        <p className="mb-3 mt-0 text-md-left">{admin.email}</p>
                    </Flex>
                </Menu.Item>
            </Menu>
            <Modal
                centered
                visible={visible}
                footer={null}
                onCancel={() => setVisible(false)}
                bodyStyle={{padding: "45px"}}
            >
                <Content admin={admin} />
            </Modal>
        </>
    );
};

export default NavProfile;
