import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../reducers/Auth";
import themeReducer from "../reducers/Theme";
import studentReducer from "../reducers/Student";
import tutorReducer from "../reducers/Tutor";
import courseReducer from "../reducers/Course";
import reportReducer from "../reducers/Report";
import quizReducer from "../reducers/Quiz";
import newsReducer from "../reducers/News";
import bookReducer from "../reducers/Book";
import resourceReducer from "../reducers/Resource";
import userReducer from "../reducers/User";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        student: studentReducer,
        tutor: tutorReducer,
        course: courseReducer,
        user: userReducer,
        resource: resourceReducer,
        book: bookReducer,
        news: newsReducer,
        quiz: quizReducer,
        report: reportReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
