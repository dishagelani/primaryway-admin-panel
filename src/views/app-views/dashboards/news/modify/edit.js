import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import Flex from "components/shared-components/Flex";
import UploadPicture from "components/shared-components/UploadPicture";
import {EditNews} from "redux/reducers/News";

export const FormDetails = ({form, flag, news}) => {
    const [image, setImage] = useState({});
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();

                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image?.imageFile) formData.append("news", image.imageFile);

                dispatch(EditNews({values: formData, _id: news._id}));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };
    const handleImage = (images) => {
        if (images) setImage(images);
    };
    useEffect(() => {
        setImage({avatarUrl: news?.image});
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
                    NP
                </Avatar>

                <div className="ml-3">
                    <UploadPicture handleImage={handleImage} />
                </div>
            </Flex>
            <FormInput name="title" label="title" value={news?.title} />
            <FormInput
                name="text"
                label="Text"
                type="textarea"
                value={news?.text}
            />
        </Form>
    );
};

const Edit = ({news}) => {
    const [visible, setVisible] = useState(false);
    const {editSuccess} = useSelector((state) => state.news);

    const [form] = Form.useForm();
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if (editSuccess) {
            setVisible(false);
            form.resetFields();
            setFlag(!flag);
            window.location.reload();
        }
    }, [editSuccess]);

    return (
        <div>
            <div>
                <Button
                    className="text-primary font-size-md user-select-all"
                    onClick={() => setVisible(true)}
                    icon={<EditOutlined />}
                ></Button>

                <Modal
                    centered
                    width="400px"
                    visible={visible}
                    title="Edit News"
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
                    <FormDetails form={form} flag={flag} news={news} />
                </Modal>
            </div>
        </div>
    );
};
export default Edit;
