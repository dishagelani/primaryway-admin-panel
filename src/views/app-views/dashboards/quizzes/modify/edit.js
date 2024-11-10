import React, {useEffect, useState} from "react";
import {Button, Modal, Form, Avatar} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {EditQuiz} from "redux/reducers/Quiz";
import moment from "moment";

export const FormDetails = ({form, quiz}) => {
    const dispatch = useDispatch();

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                dispatch(
                    EditQuiz({values, classId: quiz._id, quizId: quiz.quiz._id})
                );
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <Form form={form} name="QuizForm" onFinish={onFinish}>
            <FormInput
                name="date"
                label="Date"
                type="date"
                value={moment(quiz?.quiz?.date)}
            />
            <FormInput
                name="time"
                label="Time"
                type="time"
                value={[
                    moment(quiz?.quiz?.time[0]),
                    moment(quiz?.quiz?.time[1]),
                ]}
            />
            <FormInput
                name="name"
                label="Quizze name"
                form={form}
                value={quiz?.quiz?.name}
            />
            <FormInput
                name="course"
                label="Course"
                type="dropdown"
                form={form}
                value={quiz?.course?._id}
                disabled={true}
            />
            <FormInput
                name="class"
                label="Class"
                type="dropdown"
                form={form}
                value={quiz?.className}
                disabled={true}
            />
        </Form>
    );
};

const Edit = ({quiz}) => {
    const [visible, setVisible] = useState(false);
    const {editSuccess} = useSelector((state) => state.quiz);

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
                    className="text-primary font-size-md user-select-all"
                    onClick={() => setVisible(true)}
                    icon={<EditOutlined />}
                ></Button>

                <Modal
                    centered
                    width={400}
                    visible={visible}
                    title="Edit Quiz"
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
                    <FormDetails form={form} quiz={quiz} />
                </Modal>
            </div>
        </div>
    );
};
export default Edit;
