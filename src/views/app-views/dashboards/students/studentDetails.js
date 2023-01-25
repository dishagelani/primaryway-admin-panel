import React, {useEffect, useState} from "react";
import {Button, Table, Card} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import AvatarStatus from "components/shared-components/AvatarStatus";
import utils from "utils";
import {PlusOutlined, EditOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";

const Student = () => {
    const history = useHistory();
    const [students, setStudents] = useState([]);
    const columns = [
        {
            title: "Student",
            width: "80%",
            render: (_, record) => (
                <div className="d-flex">
                    <AvatarStatus
                        size={40}
                        src={record.profilePicture}
                        name={`${record.name} ${record.surname}`}
                        text={`${record.name[0].toUpperCase()}${
                            record.surname
                                ? record.surname[0].toUpperCase()
                                : ""
                        }`}
                        // onNameClick={() =>
                        //     history.push(`./student-info/${record._id}`)
                        // }
                    />
                </div>
            ),
        },

        {
            title: "Account Status",
            width: "20%",
            dataIndex: "status",
            sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
            render: (_, record, index) => {
                return (
                    <div className="d-flex align-items-center">
                        <div
                            className={`${
                                record.status ? "Active" : "Disabled"
                            }-column-class`}
                        >
                            {record.status ? "Active" : "Disabled"}
                        </div>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() =>
                                history.push(`./student-info/${record._id}`)
                            }
                            className="text-primary font-size-md user-select-all"
                        />
                    </div>
                );
            },
            align: "center",
        },
    ];

    useEffect(async () => {
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/student/getStudents`
        );
        setStudents(response.data.students);
    }, []);
    return (
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <h1 className="dashboard-title">Students</h1>
                    <div>
                        <Button
                            type="primary"
                            onClick={() =>
                                history.push({
                                    pathname: "./add-student",
                                    state: {mode: "ADD"},
                                })
                            }
                            htmlType="submit"
                            icon={<PlusOutlined />}
                        >
                            Add Student
                        </Button>
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={students.length && students}
                    showSorterTooltip={false}
                    pagination={false}
                />
            </Card>
        </>
    );
};

export default Student;
