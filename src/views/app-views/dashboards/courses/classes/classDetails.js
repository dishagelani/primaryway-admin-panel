import React, {useState, useEffect} from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {
    Button,
    Card,
    Table,
    Menu,
    message,
    Avatar,
    Typography,
    Select,
} from "antd";
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    CaretDownOutlined,
} from "@ant-design/icons";
import {useHistory, useParams} from "react-router-dom";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EditDate from "./modifyDate/edit";
import AddDate from "./modifyDate/add";
import AddStudent from "./modifyStudent/add";
import {useSelector, useDispatch} from "react-redux";
import {
    GetClassById,
    RemoveDateFromClass,
    HideErrorMessage,
    HideSuccessMessage,
    AddAttendance,
} from "redux/reducers/Course";
import moment from "moment";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Icon from "components/util-components/Icon";

const {Option} = Select;

const ClassDetails = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {_id} = useParams();
    const {success, classDetails, showMessage, errorMessage} = useSelector(
        (state) => state.course
    );
    const [columns, setColumns] = useState([]);

    const handleAttendance = (key, studentId, dateId, classId) => {
        dispatch(AddAttendance({value: key, studentId, dateId, classId}));
    };

    const menu = (data, _id) => {
        return (
            <Menu>
                <Menu.Item key="edit">
                    <EditDate
                        date={data}
                        classId={_id}
                        courseId={classDetails?.courseId}
                    />
                </Menu.Item>
                <Menu.Item key="delete">
                    <a
                        onClick={() =>
                            dispatch(
                                RemoveDateFromClass({
                                    _id: _id,
                                    dateId: data._id,
                                })
                            )
                        }
                    >
                        <Icon className="mr-3" type={DeleteOutlined} />
                        <span className="font-weight-normal">Delete date</span>
                    </a>
                </Menu.Item>
            </Menu>
        );
    };

    useEffect(async () => {
        dispatch(GetClassById(_id))
            .unwrap()
            .then((result) => {
                let column = [
                    {
                        title: "",
                        fixed: true,
                        width: 150,
                        render: (_, record) => (
                            <div className="d-flex align-items-center mx-0 px-0">
                                <Avatar
                                    size={40}
                                    src={record.profilePicture}
                                    atyle={{background: "var(--blue)"}}
                                >
                                    {`${record.name[0].toUpperCase()} ${record.surname[0].toUpperCase()}`}
                                </Avatar>
                                <Typography.Text
                                    style={{
                                        width: 100,
                                        fontFamily: "Barlow-bold",
                                        textDecorationLine: "underline",
                                    }}
                                    ellipsis={true}
                                    className="ml-2 cursor-pointer"
                                    onClick={() =>
                                        history.push(
                                            `../../students/student-info/${record._id}`
                                        )
                                    }
                                >
                                    {`${record.name} ${record.surname}`}
                                </Typography.Text>
                            </div>
                        ),
                    },
                ];

                result?.classSchedule.map((data, index) =>
                    column.push({
                        title: () => (
                            <div className="d-flex place-items-center justify-content-around">
                                <span
                                    style={{
                                        fontSize: "12px",
                                        color: "var(--blue)",
                                        fontFamily: "Barlow",
                                        float: "right",
                                        width: 150,
                                        textAlign: "center",
                                    }}
                                >
                                    {moment(data.date).format("MMM DD")}
                                </span>

                                <EllipsisDropdown
                                    menu={menu(data, result._id)}
                                />
                            </div>
                        ),
                        render: (_, record) => (
                            <div className="attendance d-flex justify-content-center">
                                <Select
                                    showArrow={false}
                                    // width={150}
                                    onChange={(key) =>
                                        handleAttendance(
                                            key,
                                            record._id,
                                            data._id,
                                            result._id
                                        )
                                    }
                                    defaultValue={
                                        data.present.includes(record._id) ? (
                                            "Present"
                                        ) : data.absent.includes(record._id) ? (
                                            "Absent"
                                        ) : (
                                            <div
                                                className="d-flex align-items-center"
                                                style={{
                                                    fontWeight: 600,
                                                    color: "var(--blue)",
                                                }}
                                            >
                                                Attendance{" "}
                                                <CaretDownOutlined className="ml-2" />
                                            </div>
                                        )
                                    }
                                >
                                    <Option value="Present">
                                        <div
                                            style={{
                                                background: "#F2FDF4",
                                                width: 100,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={`/img/coolicon.png`}
                                                style={{width: "20px"}}
                                            />
                                            <span
                                                className="ml-2"
                                                style={{
                                                    color: "#20BE30",
                                                }}
                                            >
                                                Present
                                            </span>
                                        </div>
                                    </Option>
                                    <Option value="Absent">
                                        <div
                                            style={{
                                                background: "#FFEDEC",
                                                width: 100,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <img
                                                src={`/img/coolicon2.png`}
                                                style={{width: "20px"}}
                                            />
                                            <span
                                                className="ml-2"
                                                style={{
                                                    color: "#F0372B",
                                                }}
                                            >
                                                Absent
                                            </span>
                                        </div>
                                    </Option>
                                </Select>
                            </div>
                        ),
                        width: 120,
                    })
                );
                setColumns(column);
            });
    }, [success]);

    useEffect(() => {
        if (success)
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
    }, [success]);

    useEffect(() => {
        if (showMessage) {
            message.error({content: errorMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideErrorMessage());
            }, 1500);
        }
    }, [showMessage]);

    return (
        <div>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <div>
                        <Button
                            className="heading-class-button"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => history.goBack()}
                        >
                            Courses
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card>
                <div className="d-flex place-items-center">
                    <div className="form-title py-2 mr-4">
                        {classDetails.className}
                    </div>
                    <div>
                        <AvatarStatus
                            size={40}
                            src={classDetails.tutor?.profilePicture}
                            name={`${classDetails.tutor?.name} ${classDetails.tutor?.surname}`}
                            text={`${classDetails.tutor?.name[0].toUpperCase()}${classDetails.tutor?.surname[0].toUpperCase()}`}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <AddDate
                        classId={classDetails?._id}
                        courseId={classDetails?.courseId}
                    />
                </div>
                <div className="class-table">
                    <Table
                        columns={columns}
                        dataSource={classDetails?.students}
                        pagination={false}
                        scroll={{x: 1000, y: 500}}
                        bordered
                    />
                </div>
                <div className="d-flex justify-content-start">
                    <AddStudent classId={classDetails?._id} />
                </div>
            </Card>
        </div>
    );
};

export default ClassDetails;
