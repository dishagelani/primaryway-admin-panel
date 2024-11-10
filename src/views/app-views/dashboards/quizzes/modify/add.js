import React, {useEffect, useState} from "react";
import {Button, Modal, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {AddQuiz} from "redux/reducers/Quiz";

export const FormDetails = ({form}) => {
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                dispatch(
                    AddQuiz({
                        date: values.date,
                        time: values.time,
                        classId: values.class,
                        name: values.name,
                        courseId: values.course,
                    })
                );
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Form form={form} name="QuizForm" onFinish={onFinish}>
            <FormInput name="date" label="Date" type="date" />
            <FormInput name="time" label="Time" type="time" />
            <FormInput name="name" label="Quizze name" />
            <FormInput
                name="course"
                label="Course"
                type="dropdown"
                form={form}
            />
            <FormInput name="class" label="Class" type="dropdown" form={form} />
        </Form>
    );
};

const ADD = () => {
    const [visible, setVisible] = useState(false);
    const {success} = useSelector((state) => state.quiz);

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
                    onClick={() => {
                        setVisible(true);
                    }}
                    icon={<PlusOutlined />}
                >
                    Add quiz
                </Button>

                <Modal
                    centered
                    width={400}
                    visible={visible}
                    title="Quiz"
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
                    <FormDetails form={form} />
                </Modal>
            </div>
        </div>
    );
};
export default ADD;
