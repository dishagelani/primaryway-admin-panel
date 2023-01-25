import React, {useEffect, useState} from "react";
import {Button, Modal, Form} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {EditReport} from "redux/reducers/Report";

export const FormDetails = ({form, report}) => {
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);

                dispatch(EditReport({_id: report._id, values: values}));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Form form={form} name="courseForm" onFinish={onFinish}>
            <FormInput name="title" label="Title" value={report.title} />
            <FormInput
                name="text"
                label="Text"
                type="textarea"
                value={report.text}
            />
            <FormInput
                name="tutor"
                label="Tutor"
                type="dropdown"
                value={report.tutor?._id}
            />
            <FormInput
                name="student"
                label="Student"
                type="dropdown"
                value={report.student?._id}
            />
        </Form>
    );
};

const Edit = ({report}) => {
    const [visible, setVisible] = useState(false);
    const {editSuccess} = useSelector((state) => state.report);

    const [form] = Form.useForm();

    useEffect(() => {
        if (editSuccess) {
            setVisible(false);
            form.resetFields();
            window.location.reload();
        }
    }, [editSuccess]);

    return (
        <div>
            <div>
                <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                        setVisible(true);
                    }}
                    className="text-primary font-size-md user-select-all"
                />

                <Modal
                    centered
                    visible={visible}
                    width="400px"
                    title="Edit Report"
                    bodyStyle={{margin: 0}}
                    onCancel={() => {
                        form.resetFields();
                        setVisible(false);
                    }}
                    footer={[
                        <Button
                            type="ghost"
                            key="back"
                            onClick={() => {
                                form.resetFields();
                                setVisible(false);
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
                    <FormDetails form={form} report={report} />
                </Modal>
            </div>
        </div>
    );
};

export default Edit;
