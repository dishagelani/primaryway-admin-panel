import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {AddDateInClass, GetCourseByID} from "redux/reducers/Course";
import moment from "moment";

const AddDate = ({classId, courseId}) => {
    const [modal1, setModal1] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {success, course} = useSelector((state) => state.course);

    function disableDateRanges(range = {startDate: false, endDate: false}) {
        const {startDate, endDate} = range;

        return function disabledDate(current) {
            let startCheck = true;
            let endCheck = true;
            if (startDate) {
                startCheck =
                    current && current < moment(startDate).subtract(1, "days");
            }
            if (endDate) {
                endCheck = current && current > moment(endDate);
            }
            return (startDate && startCheck) || (endDate && endCheck);
        };
    }

    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                dispatch(
                    AddDateInClass({
                        _id: classId,
                        classDate: values.date,
                        classTime: values.time,
                    })
                );
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        if (success) {
            setModal1(false);
            form.resetFields();
        }
    }, [success]);

    useEffect(() => {
        courseId && dispatch(GetCourseByID(courseId));
    }, [courseId]);

    return (
        <>
            <Button
                className="heading-class-button"
                icon={<PlusOutlined />}
                onClick={() => setModal1(true)}
            >
                Add date
            </Button>
            <Modal
                visible={modal1}
                centered
                width="300px"
                title="Add date to course schedule"
                bodyStyle={{margin: 0}}
                onCancel={() => {
                    form.resetFields();
                    setModal1(false);
                }}
                footer={[
                    <Button
                        type="ghost"
                        key="back"
                        onClick={() => {
                            form.resetFields();
                            setModal1(false);
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
                    name="addDateForm"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <FormInput
                        name="date"
                        type="date"
                        label="Date"
                        disabledDate={disableDateRanges({
                            endDate: course?.endDate,
                            startDate: course?.startDate,
                        })}
                    />

                    <FormInput name="time" type="time" label="Time" />
                </Form>
            </Modal>
        </>
    );
};

export default AddDate;
