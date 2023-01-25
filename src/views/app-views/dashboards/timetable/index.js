import React, {useState, useEffect} from "react";
import {Calendar, Select, Typography, Row, Col} from "antd";
import moment from "moment";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import axios from "axios";
import {env} from "configs/EnvironmentConfig";

const Index = () => {
    const [listData, setListData] = useState([]);

    useEffect(async () => {
        let list = [];
        const response = await axios.get(
            `${env.API_ENDPOINT_URL}/timetable/getTimetable`
        );

        response?.data.array.map((item) => {
            if (item.date) {
                list.push(item);
            }
        });
        setListData(list);
    }, []);

    function dateCellRender(value) {
        let list = [];

        list = listData?.filter((data) =>
            moment(data.date).isSame(value, "day")
        );

        var colors = ["#EFFDF8", "#FFF8E6", "#ECF8FF", "#EBEFF0", "#FFF4EB"];

        return (
            <ul className="events">
                {list
                    .sort(function (a, b) {
                        return moment(a.starttime) - moment(b.starttime) === 0
                            ? moment(a.endtime) - moment(b.endtime)
                            : moment(a.starttime) - moment(b.starttime);
                    })
                    .map((tt, index) => (
                        <li key={index}>
                            <div
                                key="content"
                                style={{
                                    minHeight: 50,
                                    margin: "5px 0",
                                    background:
                                        colors[
                                            Math.floor(
                                                Math.random() * colors.length
                                            )
                                        ],

                                    borderRadius: 10,
                                    padding: "5px 10px",
                                    display: "grid",
                                    fontSize: "12px",
                                }}
                            >
                                <span>
                                    {`${moment(tt.starttime).format(
                                        "hh:mm a"
                                    )} - ${moment(tt.endtime).format(
                                        "hh:mm a"
                                    )}`}
                                </span>
                                <span
                                    className="text-capitalize"
                                    style={{fontWeight: 600}}
                                >
                                    {tt.name}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        );
    }

    return (
        <div className="timetable">
            <Calendar
                locale={{
                    lang: {
                        locale: "en",
                        dayFormat: moment.updateLocale("en", {
                            weekdaysMin: [
                                "Sun",
                                "Mon",
                                "Tue",
                                "Wed",
                                "Thu",
                                "Fri",
                                "Sat",
                            ],
                        }),
                    },
                }}
                headerRender={({value, type, onChange, onTypeChange}) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current.month(i);
                        months.push(localeData.months(current));
                    }

                    for (let index = start; index < end; index++) {
                        monthOptions.push(
                            <Select.Option
                                className="month-item"
                                key={`${index}`}
                            >
                                {months[index]}
                            </Select.Option>
                        );
                    }
                    const month = value.month();

                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option
                                key={i}
                                value={i}
                                className="year-item"
                            >
                                {i}
                            </Select.Option>
                        );
                    }
                    return (
                        <div style={{background: "#fafafb"}}>
                            <PageHeaderAlt>
                                <Flex
                                    className="py-2"
                                    mobileFlex={false}
                                    justifyContent="between"
                                    alignItems="center"
                                >
                                    <h1 className="dashboard-title ml-2">
                                        {`${months[String(month)]}  ${String(
                                            year
                                        )}`}
                                    </h1>
                                    <div className="mr-2">
                                        <Row gutter={8}>
                                            <Col>
                                                <Select
                                                    width={150}
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    value={String(month)}
                                                    onChange={(
                                                        selectedMonth
                                                    ) => {
                                                        const newValue =
                                                            value.clone();
                                                        newValue.month(
                                                            parseInt(
                                                                selectedMonth,
                                                                10
                                                            )
                                                        );
                                                        onChange(newValue);
                                                    }}
                                                >
                                                    {monthOptions}
                                                </Select>
                                            </Col>
                                            <Col>
                                                <Select
                                                    width={150}
                                                    dropdownMatchSelectWidth={
                                                        false
                                                    }
                                                    className="my-year-select"
                                                    onChange={(newYear) => {
                                                        const now = value
                                                            .clone()
                                                            .year(newYear);
                                                        onChange(now);
                                                    }}
                                                    value={String(year)}
                                                >
                                                    {options}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </div>
                                </Flex>
                            </PageHeaderAlt>
                        </div>
                    );
                }}
                dateCellRender={dateCellRender}
                onSelect={(date) => console.log(date.toISOString())}
            />
            ,
        </div>
    );
};

export default Index;
