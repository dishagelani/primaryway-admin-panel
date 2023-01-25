import React, {lazy, Suspense} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Loading from "components/shared-components/Loading";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
const Settings = ({match}) => (
    <Suspense fallback={<Loading cover="content" />}>
        <Switch>
            <Route path={`${match.url}/edit-profile`} component={EditProfile} />
            <Route
                path={`${match.url}/change-password`}
                component={ChangePassword}
            />
        </Switch>
    </Suspense>
);

export default Settings;
