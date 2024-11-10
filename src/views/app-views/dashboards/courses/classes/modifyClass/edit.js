import React, {useState, useEffect} from "react";
import {Form, Button, Modal} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {EditClass} from "redux/reducers/Course";
import FormInput from "components/shared-components/FormInput";

export const EDIT = ({classData}) => {
   
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const {editSuccess} = useSelector((state) => state.course);
    const [form] = Form.useForm();

    const onfinish = () => {
        form.validateFields()
            .then((values) => {
                dispatch(
                    EditClass({
                        _id: classData?._id,
                        values: {
                            className: values.class,
                            tutor: values.tutor,
                        },
                    })
                );
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        if (editSuccess) {
            window.location.reload(true);
            setVisible(false);
            form.resetFields();
        }
    }, [editSuccess]);
    return (
        <>
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
                title="Edit class"
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
                        Save
                    </Button>,
                ]}
            >
                <Form
                    onFinish={onfinish}
                    name="classForm"
                    form={form}
                    layout="vertical"
                >
                    <FormInput
                        label="Class name"
                        name="class"
                        value={classData?.className}
                    />
                    <FormInput
                        name="tutor"
                        label="Tutor"
                        type="dropdown"
                        value={classData?.tutor?._id}
                    />
                </Form>
            </Modal>
        </>
    );
};

export default EDIT;
