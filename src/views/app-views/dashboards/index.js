import React, {lazy, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Dashboards = ({match}) => {
    return (
        <Suspense fallback={<Loading cover="content" />}>
            <Switch>
                <Route
                    path={`${match.url}/timetable`}
                    component={lazy(() => import(`./timetable`))}
                />
                <Route
                    path={`${match.url}/courses`}
                    component={lazy(() => import(`./courses`))}
                />
                <Route
                    path={`${match.url}/tutors`}
                    component={lazy(() => import(`./tutors`))}
                />
                <Route
                    path={`${match.url}/students`}
                    component={lazy(() => import(`./students`))}
                />
                <Route
                    path={`${match.url}/reports`}
                    component={lazy(() => import(`./reports/reports`))}
                />
                <Route
                    path={`${match.url}/news`}
                    component={lazy(() => import(`./news/news`))}
                />
                <Route
                    path={`${match.url}/resources`}
                    component={lazy(() => import(`./resources/resources`))}
                />
                <Route
                    path={`${match.url}/books`}
                    component={lazy(() => import(`./books/books`))}
                />
                <Route
                    path={`${match.url}/quizzes`}
                    component={lazy(() => import(`./quizzes/quizzes`))}
                />
                <Route
                    path={`${match.url}/users`}
                    component={lazy(() => import(`./users`))}
                />

                <Redirect from={`${match.url}`} to={`${match.url}/timetable`} />
            </Switch>
        </Suspense>
    );
};

export default Dashboards;
