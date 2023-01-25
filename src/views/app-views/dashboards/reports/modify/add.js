import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {AddReport} from "redux/reducers/Report";

export const FormDetails = ({form}) => {
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                dispatch(AddReport(values));
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Form form={form} name="courseForm" onFinish={onFinish}>
            <FormInput name="title" label="Title" />
            <FormInput name="text" label="Text" type="textarea" />
            <FormInput name="tutor" label="Tutor" type="dropdown" />
            <FormInput name="student" label="Student" type="dropdown" />
        </Form>
    );
};

const Add = () => {
    const [visible, setVisible] = useState(false);
    const {success} = useSelector((state) => state.report);

    const [form] = Form.useForm();

    useEffect(() => {
        if (success) {
            setVisible(false);
            form.resetFields();
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
                    Add Report
                </Button>

                <Modal
                    centered
                    visible={visible}
                    // style={{maxWidth: 350}}
                    title="Report"
                    bodyStyle={{margin: 0}}
                    onCancel={() => {
                        form.resetFields();
                        setVisible(false);
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
                            }}
                        >
                            Cancel
                        </Button>,
                    ]}
                >
                    <FormDetails form={form} />
                </Modal>
            </div>
        </div>
    );
};

export default Add;
