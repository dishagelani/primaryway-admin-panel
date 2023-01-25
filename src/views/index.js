import React from "react";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from "antd";
import AppLocale from "lang";
import error from "views/auth-views/errors/error-page-1";
import useBodyClass from "hooks/useBodyClass";
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from "configs/AppConfig";

export const Views = ({location}) => {
    const {token} = useSelector((state) => state.auth);
    const {locale, direction} = useSelector((state) => state.theme);
    const currentAppLocale = AppLocale[locale];
    useBodyClass(`dir-${direction}`);
    return (
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
        >
            <ConfigProvider
                locale={currentAppLocale.antd}
                direction={direction}
            >
                <Switch>
                    <Route exact path="/">
                        {token == null ? (
                            <Redirect to={`${AUTH_PREFIX_PATH}/login`} />
                        ) : (
                            <Redirect to={APP_PREFIX_PATH} />
                        )}
                    </Route>
                    <Route path={AUTH_PREFIX_PATH} direction={direction}>
                        <AuthLayout />
                    </Route>
                    <Route path={APP_PREFIX_PATH}>
                        <AppLayout direction={direction} location={location} />
                    </Route>
                    <Route path="*" component={error} />
                </Switch>
            </ConfigProvider>
        </IntlProvider>
    );
};

export default Views;
