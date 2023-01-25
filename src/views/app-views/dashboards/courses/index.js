import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import CourseDetails from "./courseDetails";
import ClassDetails from "./classes/classDetails";
// import ModifyStudent from "./modifyStudent";
import CourseInfo from "./courseInfo";

const Index = ({match}) => {
    return (
        <div>
            <Switch>
                <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/course-details`}
                />
                <Route
                    path={`${match.url}/course-details`}
                    component={CourseDetails}
                />
                <Route
                    path={`${match.url}/class-details/:_id`}
                    component={ClassDetails}
                />

                <Route
                    path={`${match.url}/course-info/:_id`}
                    component={CourseInfo}
                />
            </Switch>
        </div>
    );
};

export default Index;
