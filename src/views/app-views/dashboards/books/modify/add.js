import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import Flex from "components/shared-components/Flex";
import UploadPicture from "components/shared-components/UploadPicture";
import {AddBook} from "redux/reducers/Book";

export const FormDetails = ({form, flag}) => {
    const [image, setImage] = useState({});
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();

                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image?.imageFile) formData.append("book", image.imageFile);

                dispatch(AddBook(formData));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    const handleImage = (images) => {
        if (images.imageFile) setImage(images);
    };

    useEffect(() => {
        setImage({});
    }, [flag]);
    return (
        <Form form={form} name="BookForm" onFinish={onFinish}>
            <Flex className="mb-3" justifyContent="left" alignItems="center">
                <Avatar
                    size={50}
                    style={{
                        border: "1px solid var(--blue)",
                        background: "var(--lightblue)",
                        color: "var(--blue)",
                    }}
                    src={image?.avatarUrl}
                    shape="square"
                    alt="book image"
                >
                    BP
                </Avatar>

                <div className="ml-3">
                    <UploadPicture handleImage={handleImage} />
                </div>
            </Flex>
            <FormInput name="course" label="course" type="dropdown" />
            <FormInput name="title" label="Title" />
            <FormInput name="text" label="Text" type="textarea" />
        </Form>
    );
};

const ADD = () => {
    const [visible, setVisible] = useState(false);
    const {success} = useSelector((state) => state.book);

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
                    onClick={() => {
                        setVisible(true);
                    }}
                    icon={<PlusOutlined />}
                >
                    Add book
                </Button>

                <Modal
                    centered
                    width={400}
                    visible={visible}
                    title="Book"
                    bodyStyle={{margin: 0}}
                    onCancel={() => {
                        form.resetFields();
                        setVisible(false);
                        setFlag(!flag);
                    }}
                    footer={[
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
                        <Button
                            key="submit"
                            type="primary"
                            onClick={form.submit}
                        >
                            Save
                        </Button>,
                    ]}
                >
                    <FormDetails form={form} flag={flag} />
                </Modal>
            </div>
        </div>
    );
};
export default ADD;
