import {
    ReadOutlined,
    UserOutlined,
    ProfileOutlined,
    ScheduleOutlined,
    FolderOpenOutlined,
    BarChartOutlined,
    FormOutlined,
} from "@ant-design/icons";
import {APP_PREFIX_PATH} from "configs/AppConfig";

const dashBoardNavTree = [
    {
        key: "dashboards-timetable",
        path: `${APP_PREFIX_PATH}/dashboards/timetable`,
        title: "sidenav.dashboard.timetable",
        icon: ScheduleOutlined,
        submenu: [],
    },
    {
        key: "dashboards-course",
        path: `${APP_PREFIX_PATH}/dashboards/courses`,
        title: "sidenav.dashboard.courses",
        icon: ProfileOutlined,
        submenu: [],
    },
    {
        key: "dashboards-student",
        path: `${APP_PREFIX_PATH}/dashboards/students`,
        title: "sidenav.dashboard.students",
        icon: UserOutlined,
        submenu: [],
    },
    {
        key: "dashboards-reports",
        path: `${APP_PREFIX_PATH}/dashboards/reports`,
        title: "sidenav.dashboard.reports",
        icon: BarChartOutlined,
        submenu: [],
    },
    {
        key: "dashboards-tutor",
        path: `${APP_PREFIX_PATH}/dashboards/tutors`,
        title: "sidenav.dashboard.tutors",
        icon: UserOutlined,
        submenu: [],
        break: true,
    },
];

const dashBoardExtraNavTree = [
    {
        key: "dashboards-news",
        path: `${APP_PREFIX_PATH}/dashboards/news`,
        title: "sidenav.dashboard.news",
        icon: ReadOutlined,
        submenu: [],
    },
    {
        key: "dashboards-quizes",
        path: `${APP_PREFIX_PATH}/dashboards/quizzes`,
        title: "sidenav.dashboard.quizes",
        icon: FormOutlined,
        submenu: [],
    },
    {
        key: "dashboards-resources",
        path: `${APP_PREFIX_PATH}/dashboards/resources`,
        title: "sidenav.dashboard.resources",
        icon: FolderOpenOutlined,
        submenu: [],
    },
    {
        key: "dashboards-books",
        path: `${APP_PREFIX_PATH}/dashboards/books`,
        title: "sidenav.dashboard.books",
        icon: ReadOutlined,
        submenu: [],
        break: true,
    },
    {
        key: "dashboards-user",
        path: `${APP_PREFIX_PATH}/dashboards/users`,
        title: "sidenav.dashboard.users",
        icon: UserOutlined,
        submenu: [],
    },
];

const navigationConfig = [...dashBoardNavTree, ...dashBoardExtraNavTree];

export default navigationConfig;
