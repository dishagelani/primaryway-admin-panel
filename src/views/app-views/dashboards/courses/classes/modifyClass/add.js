import React, {useState, useEffect} from "react";
import {Form, Button, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {AddClass} from "redux/reducers/Course";
import FormInput from "components/shared-components/FormInput";
const ADD = ({courseId}) => {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const {success} = useSelector((state) => state.course);
    const [form] = Form.useForm();
    const onfinish = () => {
        form.validateFields()
            .then((values) => {
                console.log(values, courseId);
                dispatch(
                    AddClass({
                        _id: courseId,
                        className: values.class,
                        tutor: values.tutor,
                    })
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (success) {
            setVisible(false);
            form.resetFields();
        }
    }, [success]);
    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                icon={<PlusOutlined />}
            >
                Add Class
            </Button>
            <Modal
                centered
                visible={visible}
                width="400px"
                title="Add class"
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
                    <Button key="submit" type="primary" onClick={form.submit}>
                        Add
                    </Button>,
                ]}
            >
                <Form
                    onFinish={onfinish}
                    name="classForm"
                    form={form}
                    layout="vertical"
                >
                    <FormInput label="Class name" name="class" />
                    <FormInput name="tutor" label="Tutor" type="dropdown" />
                </Form>
            </Modal>
        </>
    );
};

export default ADD;
