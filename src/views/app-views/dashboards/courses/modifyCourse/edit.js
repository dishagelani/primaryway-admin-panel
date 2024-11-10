import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import Flex from "components/shared-components/Flex";
import UploadPicture from "components/shared-components/UploadPicture";
import {useDispatch, useSelector} from "react-redux";
import {EditCourse} from "redux/reducers/Course";
import moment from "moment";

const FormDetails = ({form, course, flag}) => {
    const [image, setImage] = useState({});

    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                let formData = new FormData();
                Object.keys(values).forEach(function (key) {
                    if (values[key]) formData.append(`${key}`, values[key]);
                });

                if (image?.imageFile)
                    formData.append("coursePicture", image.imageFile);

                dispatch(EditCourse({values: formData, id: course?._id}));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleImage = (images) => {
        if (images) setImage(images);
    };
    useEffect(() => {
        setImage({avatarUrl: course.coursePicture});
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
                    src={image?.avatarUrl}
                    shape="square"
                    alt="course image"
                >
                    CP
                </Avatar>

                <div className="ml-3">
                    <UploadPicture handleImage={handleImage} />
                </div>
            </Flex>
            <FormInput label="Course name" name="name" value={course?.name} />
            <Flex justifyContent="between" alignItems="center">
                <FormInput
                    label="Start date"
                    name="startDate"
                    type="date"
                    value={
                        course?.startDate
                            ? moment(course?.startDate)
                            : undefined
                    }
                />
                <FormInput
                    label="End date"
                    name="endDate"
                    type="date"
                    value={
                        course?.endDate ? moment(course?.endDate) : undefined
                    }
                />
            </Flex>
            <FormInput
                label="Description"
                name="description"
                type="textarea"
                value={course?.description}
            />
            <FormInput
                label="color"
                name="color"
                type="dropdown"
                value={course?.color}
            />
        </Form>
    );
};

const Modify = ({course}) => {
    const [visible, setVisible] = useState();
    const [flag, setFlag] = useState(false);
    const {editSuccess} = useSelector((state) => state.course);

    const [form] = Form.useForm();

    useEffect(() => {
        if (editSuccess) {
            window.location.reload();
            setVisible(false);
            form.resetFields();
            setFlag(!flag);
        }
    }, [editSuccess]);

    return (
        <div>
            <Button
                icon={<EditOutlined />}
                onClick={() => setVisible(true)}
                className="text-primary font-size-md user-select-all"
            />
            <Modal
                centered
                visible={visible}
                width="400px"
                title="Edit Course"
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
                    <Button key="submit" type="primary" onClick={form.submit}>
                        Save
                    </Button>,
                ]}
            >
                <FormDetails form={form} course={course} flag={flag} />
            </Modal>
        </div>
    );
};

export default Modify;
