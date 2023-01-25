import React from "react";
import {Switch, Redirect, Route} from "react-router-dom";
import UserDetails from "./userDetails";
import ModifyUser from "./modifyUser";

const User = ({match}) => {
    return (
        <div>
            <Switch>
                <Redirect
                    exact
                    from={`${match.url}`}
                    to={`${match.url}/user-details`}
                />
                <Route
                    path={`${match.url}/user-details`}
                    component={UserDetails}
                />
                <Route path={`${match.url}/add-user`} component={ModifyUser} />
                <Route path={`${match.url}/edit-user`} component={ModifyUser} />
            </Switch>
        </div>
    );
};

export default User;
