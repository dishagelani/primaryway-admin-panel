import React, {useState, useEffect} from "react";
import {Form, DatePicker, Input, TimePicker, Select, message} from "antd";
import {env} from "configs/EnvironmentConfig";
import axios from "axios";
const {Option} = Select;
const {TextArea} = Input;

const Index = ({type, label, name, value, disabledDate, form, disabled}) => {
    const [isActive, setIsActive] = useState(false);
    const [tutors, setTutors] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [classs, setClasses] = useState([]);
    const [mode, setMode] = useState("");

    const strongPassword = new RegExp(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    const rules = {
        email: [
            mode == "ADD" && {
                required: true,
                message: "Please enter email.",
            },
            () => ({
                validator(rule, value) {
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter email.");

                    return Promise.resolve();
                },
            }),
            {type: "email", message: "Please enter a valid email!"},
        ],
        name: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter name.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter name.");

                    return Promise.resolve();
                },
            }),
        ],
        surname: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter surname.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter surname.");

                    return Promise.resolve();
                },
            }),
        ],
        date: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please select date.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please select date.");
                    return Promise.resolve();
                },
            }),
        ],
        time: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please select time.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please select time.");
                    return Promise.resolve();
                },
            }),
        ],
        startDate: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please select start date.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please select start date.");
                    return Promise.resolve();
                },
            }),
        ],
        endDate: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please select end date.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please select end time.");
                    return Promise.resolve();
                },
            }),
        ],
        phoneNumber: [
            // mode == "ADD" && {
            //     required: true,
            //     message: "Please enter phone number.",
            // },
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter phone number.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter phone number.");
                    if (value) {
                        const pNumber = value
                            .replaceAll(/\s/g, "")
                            .replaceAll(
                                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                                ""
                            );
                        if (pNumber.length > 9 && pNumber.length < 12) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            "Please enter a valid phone number!"
                        );
                    }
                    return Promise.resolve();
                },
            }),
        ],
        password: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter password.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter password.");

                    if (value) {
                        if (strongPassword.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            "Password should be at least 8 characters long with one uppercase letter, one lowercase letter, one digit and one special character !"
                        );
                    }
                    return Promise.resolve();
                },
            }),
        ],
        confirmPassword: [
            {required: true, message: "Please confirm your password"},
        ],
        currentPassword: [
            {required: true, message: "Please confirm your password"},
        ],
        newPassword: [
            {required: true, message: "Please enter new password"},
            () => ({
                validator(rule, value) {
                    if (value) {
                        if (strongPassword.test(value)) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            "Password should be at least 8 characters long with one uppercase letter, one lowercase letter, one digit and one special character !"
                        );
                    }
                    return Promise.resolve();
                },
            }),
        ],
        tutor: [
            mode == "ADD" && {
                required: true,
                message: "Please select tutor.",
            },
        ],
        student: [
            mode == "ADD" && {
                required: true,
                message: "Please select student.",
            },
        ],
        class: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter class name.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter class name.");

                    return Promise.resolve();
                },
            }),
        ],
        course: [
            () => ({
                validator(rule, value) {
                    if (mode == "ADD" && (value == undefined || value == ""))
                        return Promise.reject("Please enter course name.");
                    if (mode == "EDIT" && value == "")
                        return Promise.reject("Please enter course name.");

                    return Promise.resolve();
                },
            }),
        ],
    };

    const colors = [
        {
            name: "Blue",
            code: "var(--blue)",
        },

        {
            name: "Yellow",
            code: "var(--yellow)",
        },

        {
            name: "Green",
            code: "var(--green)",
        },
    ];

    const role = ["Admin", "Super Admin"];

    function handleTextChange(text) {
        if (!text) {
            setIsActive(false);
        } else if (text === "") {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }

    useEffect(() => {
        if (value) setIsActive(true);
    }); //IF IT DOESN'T WORK FINE THEN ADD VALUE AS DEPENDANCY

    useEffect(async () => {
        if (name == "tutor") {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/tutor/getTutors`
            );
            console.log("forminput", response);
            setTutors(response.data.tutors);
        }
        if (name == "student") {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/student/getStudents`
            );
            console.log("forminput", response);
            setStudents(response.data.students);
        }
        if (name == "course" || name == "class") {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/course/getCourses`
            );
            console.log("forminput", response);
            setCourses(response.data.courses);
        }
    }, [name, value]);

    useEffect(() => {
        if (value) {
            console.log(value);
            setMode("EDIT");
        } else {
            setMode("ADD");
        }
    }, [value]);

    return type == "date" ? (
        <div id="float-label2">
            <Form.Item name={name} rules={rules[name]}>
                <DatePicker
                    format="MM/DD/YYYY"
                    placeholder=""
                    onChange={(value, dateString) => {
                        handleTextChange(dateString);
                    }}
                    disabledDate={disabledDate}
                    defaultValue={value}
                    clearIcon={false}
                />
            </Form.Item>
            <label className={isActive ? "Active" : ""}>{label}</label>
        </div>
    ) : type == "time" ? (
        <div id="float-label2">
            <Form.Item name={name} rules={rules[name]}>
                <TimePicker.RangePicker
                    format="hh:mm"
                    placeholder=""
                    onChange={(value, dateString) => {
                        handleTextChange(dateString);
                    }}
                    defaultValue={value}
                    clearIcon={false}
                />
            </Form.Item>
            <label className={isActive ? "Active" : ""}>{label}</label>
        </div>
    ) : type == "textarea" ? (
        <Form.Item name={name}>
            <div id="float-label">
                <TextArea
                    style={{paddingTop: 20}}
                    rows={4}
                    defaultValue={value}
                    onChange={(e) => handleTextChange(e.target.value)}
                />

                <label className={isActive ? "Active" : ""}>{label}</label>
            </div>
        </Form.Item>
    ) : type == "dropdown" ? (
        <div id="float-label">
            <Form.Item name={name} rules={rules[name]}>
                {name == "class" ? (
                    <Select
                        disabled={disabled}
                        defaultValue={value}
                        onClick={(value) => {
                            handleTextChange(value);
                            form.getFieldValue("course") !== undefined
                                ? setClasses(
                                      courses.find(
                                          (c) =>
                                              c._id ==
                                              form.getFieldValue("course")
                                      )
                                  )
                                : mode == "ADD" &&
                                  message.info("Please select course first ! ");
                        }}
                    >
                        {classs?.classes?.map((cls) => (
                            <Option value={cls._id}>{cls.className}</Option>
                        ))}
                    </Select>
                ) : (
                    <Select
                        disabled={disabled}
                        defaultValue={value}
                        onChange={(value) => {
                            name == "class" && form.setFieldsValue({class: ""});
                            handleTextChange(value);
                        }}
                    >
                        {name == "tutor"
                            ? tutors.map((tutor) => (
                                  <Option value={tutor?._id}>
                                      {tutor?.name} {tutor?.surname}
                                  </Option>
                              ))
                            : name == "student"
                            ? students.map((student) => (
                                  <Option value={student?._id}>
                                      {student?.name} {student?.surname}
                                  </Option>
                              ))
                            : name == "course"
                            ? courses.map((course) => (
                                  <Option value={course?._id}>
                                      {course?.name}
                                  </Option>
                              ))
                            : name == "role"
                            ? role.map((r) => <Option value={r}>{r}</Option>)
                            : colors.map((color) => (
                                  <Option value={color.code} key={color.code}>
                                      <div className="d-flex align-items-center">
                                          <span
                                              style={{
                                                  height: 15,
                                                  width: 15,
                                                  background: color.code,
                                                  marginRight: 10,
                                                  borderRadius: 2,
                                              }}
                                          ></span>
                                          <span> {color.name}</span>
                                      </div>
                                  </Option>
                              ))}
                    </Select>
                )}
            </Form.Item>
            <label className={isActive ? "Active" : ""}>{label}</label>
        </div>
    ) : (
        <Form.Item name={name} rules={rules[name]}>
            <div id="float-label">
                <Input
                    type={type}
                    defaultValue={value}
                    onChange={(e) => handleTextChange(e.target.value)}
                />

                <label className={isActive ? "Active" : ""}>{label}</label>
            </div>
        </Form.Item>
    );
};

export default Index;
