import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {AddStudentInClass, HideSuccessMessage} from "redux/reducers/Course";
const AddStudent = ({classId}) => {
    const [modal2, setModal2] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const {success} = useSelector((state) => state.course);

    const onFinish = () => {
        form.validateFields()
            .then((values) =>
                dispatch(
                    AddStudentInClass({
                        _id: classId,
                        studentId: values.student,
                    })
                )
            )
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (success) {
            setModal2(false);
            form.resetFields();
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
    }, [success]);

    return (
        <>
            <Button
                className="heading-class-button"
                icon={<PlusOutlined />}
                onClick={() => setModal2(true)}
            >
                Add student
            </Button>
            <Modal
                visible={modal2}
                centered
                width="400px"
                title="Add student to course"
                bodyStyle={{margin: 0}}
                onCancel={() => {
                    form.resetFields();
                    setModal2(false);
                }}
                footer={[
                    <Button
                        type="ghost"
                        key="back"
                        onClick={() => {
                            form.resetFields();
                            setModal2(false);
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
                    form={form}
                    name="addStudentForm"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <FormInput name="student" type="dropdown" label="Student" />
                </Form>
            </Modal>
        </>
    );
};

export default AddStudent;
