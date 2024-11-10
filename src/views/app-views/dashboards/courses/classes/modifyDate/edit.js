import React, {useState, useEffect} from "react";
import {Modal, Button, Form} from "antd";
import {EditOutlined} from "@ant-design/icons";
import FormInput from "components/shared-components/FormInput";
import {useDispatch, useSelector} from "react-redux";
import {EditDateInClass, GetCourseByID} from "redux/reducers/Course";
import moment from "moment";
import Icon from "components/util-components/Icon";

const EditDate = ({date, classId, courseId}) => {
    const [modal1, setModal1] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {editSuccess, course} = useSelector((state) => state.course);

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
                dispatch(
                    EditDateInClass({
                        _id: classId,
                        dateId: date?._id,
                        classDate: values.date,
                        classTime: values.time,
                    })
                );
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        if (editSuccess) {
            setModal1(false);
            form.resetFields();
            window.location.reload();
        }
    }, [editSuccess]);

    useEffect(() => {
        courseId && dispatch(GetCourseByID(courseId));
    }, [courseId]);

    return (
        <>
            <a onClick={() => setModal1(true)}>
                <Icon className="mr-3" type={EditOutlined} />
                <span className="font-weight-normal">Edit date</span>
            </a>
            <Modal
                visible={modal1}
                width="300px"
                centered
                title="Edit date to course schedule"
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
                        Save
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
                        value={moment(date.date)}
                        disabledDate={disableDateRanges({
                            endDate: course?.endDate,
                            startDate: course?.startDate,
                        })}
                    />
                    <FormInput
                        name="time"
                        type="time"
                        label="Time"
                        value={[moment(date.time[0]), moment(date.time[1])]}
                    />
                </Form>
            </Modal>
        </>
    );
};

export default EditDate;
