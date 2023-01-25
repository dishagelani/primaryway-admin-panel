import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import StudentDetails from "./studentDetails";
import ModifyStudent from "./modifyStudent";
import StudentInfo from "./studentInfo";

const Index = ({match}) => {
    return (
        <div>
            <Switch>
                <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/student-details`}
                />
                <Route
                    path={`${match.url}/student-details`}
                    component={StudentDetails}
                />
                <Route
                    path={`${match.url}/add-student`}
                    component={ModifyStudent}
                />
                <Route
                    path={`${match.url}/edit-student`}
                    component={ModifyStudent}
                />
                <Route
                    path={`${match.url}/student-info/:_id`}
                    component={StudentInfo}
                />
            </Switch>
        </div>
    );
};

export default Index;
