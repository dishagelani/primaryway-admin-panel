import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import TutorDetails from "./tutorDetails";
import ModifyTutor from "./modifyTutor";
import TutorInfo from "./tutorInfo";

const Tutor = ({match}) => {
    return (
        <div>
            <Switch>
                <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/tutor-details`}
                />
                <Route
                    path={`${match.url}/tutor-details`}
                    component={TutorDetails}
                />
                <Route
                    path={`${match.url}/add-tutor`}
                    component={ModifyTutor}
                />
                <Route
                    path={`${match.url}/edit-tutor`}
                    component={ModifyTutor}
                />
                <Route
                    path={`${match.url}/tutor-info/:_id`}
                    component={TutorInfo}
                />
            </Switch>
        </div>
    );
};

export default Tutor;
