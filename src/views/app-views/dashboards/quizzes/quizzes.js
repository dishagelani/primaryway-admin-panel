import React, {useEffect, useState} from "react";
import {Button, Table, Card, Modal, Form, message, Avatar} from "antd";
import Flex from "components/shared-components/Flex";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Add from "./modify/add";
import Edit from "./modify/edit";
import {DeleteOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    DeleteQuiz,
    HideErrorMessage,
    HideSuccessMessage,
} from "redux/reducers/Quiz";
import utils from "../../../../utils";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";
import moment from "moment";

const Quiz = () => {
    const [quiz, setQuiz] = useState([]);

    let {success, successMessage, errorMessage, showMessage} = useSelector(
        (state) => state.quiz
    );
    const dispatch = useDispatch();

    const columns = [
        {
            title: "Date",
            sorter: (a, b) => utils.antdTableSorter(a, b, "quiz", "date"),
            render: (_, record) => (
                <div className="d-flex">
                    {moment(record.quiz.date).format("MM/DD/YYYY")}
                </div>
            ),
            width: "10%",
        },
        {
            title: "Quizze name",
            dataIndex: ["quiz", "name"],
            sorter: (a, b) => utils.antdTableSorter(a, b, "quiz", "name"),
            width: "10%",
        },
        {
            title: "Course",
            sorter: (a, b) => utils.antdTableSorter(a, b, "course", "name"),
            render: (_, record) => (
                <div className="d-flex">{record.course.name}</div>
            ),
            width: "20%",
        },
        {
            title: "Class",
            dataIndex: "className",
            sorter: (a, b) => utils.antdTableSorter(a, b, "className"),
            width: "10%",
        },

        {
            title: "",
            width: "10%",

            render: (_, record, index) => {
                return (
                    <div className="d-flex float-right">
                        <Edit quiz={record} />

                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() =>
                                dispatch(
                                    DeleteQuiz({
                                        quizId: record.quiz._id,
                                        classId: record._id,
                                    })
                                )
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
        if (success) {
            message.success({content: successMessage, duration: 2});
            setTimeout(() => {
                dispatch(HideSuccessMessage());
            }, 1000);
        }
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/quiz/getQuizes`
        );

        console.log(response.data.quizes);
        setQuiz(response.data.quizes);
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
        <>
            <PageHeaderAlt>
                <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                >
                    <h1 className="dashboard-title">Quizzes</h1>
                    <div>
                        <Add />
                    </div>
                </Flex>
            </PageHeaderAlt>
            <Card bordered={false} className="modified-table">
                <Table
                    columns={columns}
                    dataSource={quiz}
                    pagination={false}
                    showSorterTooltip={false}
                />
            </Card>
        </>
    );
};

export default Quiz;
