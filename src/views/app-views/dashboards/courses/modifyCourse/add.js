import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import Flex from "components/shared-components/Flex";
import UploadPicture from "components/shared-components/UploadPicture";
import {useDispatch, useSelector} from "react-redux";
import {AddCourse} from "redux/reducers/Course";

const FormDetails = ({form, flag}) => {
    const [image, setImage] = useState({});

    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();
                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image.imageFile)
                    formData.append("coursePicture", image.imageFile);

                dispatch(AddCourse(formData));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleImage = (images) => {
        setImage(images);
    };

    useEffect(() => {
        setImage({});
    }, [flag]);

    return (
        <Form form={form} name="courseForm" onFinish={onFinish}>
            <Flex className="mb-3" justifyContent="left" alignItems="center">
                <Avatar
                    size={50}
                    style={{
                        border: "1px solid var(--blue)",
                        background: "var(--lightblue)",
                        color: "var(--blue)",
                    }}
                    src={image.avatarUrl}
                    shape="square"
                    alt="course image"
                >
                    CP
                </Avatar>

                <div className="ml-3">
                    <UploadPicture handleImage={handleImage} />
                </div>
            </Flex>
            <FormInput label="Course name" name="name" />
            <Flex justifyContent="between" alignItems="center">
                <FormInput label="Start date" name="startDate" type="date" />
                <FormInput label="End date" name="endDate" type="date" />
            </Flex>
            <FormInput label="Description" name="description" type="textarea" />
            <FormInput label="color" name="color" type="dropdown" />
        </Form>
    );
};

const Modify = () => {
    const [visible, setVisible] = useState(false);
    const {success} = useSelector((state) => state.course);

    const [form] = Form.useForm();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if (success) {
            setVisible(false);
            form.resetFields();
            setFlag(!flag);
        }
    }, [success]);

    return (
        <div>
            <div>
                <Button
                    className="float-right"
                    type="primary"
                    onClick={() => setVisible(true)}
                    icon={<PlusOutlined />}
                >
                    Add course
                </Button>

                <Modal
                    centered
                    visible={visible}
                    width="450px"
                    title="Course"
                    bodyStyle={{margin: 0}}
                    onCancel={() => {
                        form.resetFields();
                        setVisible(false);
                        setFlag(!flag);
                    }}
                    footer={[
                        <Button
                            key="submit"
                            type="primary"
                            onClick={form.submit}
                        >
                            Save
                        </Button>,
                        <Button
                            type="ghost"
                            key="back"
                            onClick={() => {
                                form.resetFields();
                                setVisible(false);
                                setFlag(!flag);
                            }}
                        >
                            Cancel
                        </Button>,
                    ]}
                >
                    <FormDetails form={form} flag={flag} />
                </Modal>
            </div>
        </div>
    );
};

export default Modify;
