import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

// ---------------------------------------Courses----------------------------------

export const AddCourse = createAsyncThunk(
    "tutor/add-course",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/course/addCourse`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditCourse = createAsyncThunk(
    "tutor/edit-course",
    async ({values, id}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/course/editCourse/${id}`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteCourse = createAsyncThunk(
    "tutor/delete-course",
    async (values, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/course/deleteCourse/${values}`
            );
            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetCourseByID = createAsyncThunk(
    "tutor/get-course-by-id",
    async (values, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/course/getCourseById/${values}`
            );

            if (response.status == 200) return response.data.course;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// ------------------------------------classes----------------------------------------

export const AddClass = createAsyncThunk(
    "tutor/add-class",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/class/addClass`,
                values
            );

            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditClass = createAsyncThunk(
    "tutor/edit-class",
    async ({_id, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/class/editClass/${_id}`,
                values
            );

            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteClass = createAsyncThunk(
    "tutor/delete-class",
    async (values, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/class/deleteClass/${values._id}/${values.classId}`
            );
            if (response.status == 200) return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetClassById = createAsyncThunk(
    "tutor/get-class-by-id",
    async (values, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/class/getClassById/${values}`
            );

            if (response.status == 200) return response.data.classDetails;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// ------------------------------------Date-----------------------------------------
export const AddDateInClass = createAsyncThunk(
    "course/add-date",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/class/addDateToClass`,
                values
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditDateInClass = createAsyncThunk(
    "course/add-date",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/class/editDateInClass`,
                values
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const RemoveDateFromClass = createAsyncThunk(
    "course/remove-date",
    async ({_id, dateId}, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/class/deleteDateFromClass/${_id}/${dateId}`
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// -----------------------------------Student----------------------------------------

export const AddStudentInClass = createAsyncThunk(
    "course/add-Student",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/class/addStudentToClass`,
                values
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const RemoveStudentFromClass = createAsyncThunk(
    "course/remove-Student",
    async ({_id, studentId}, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/class/deleteStudentFromClass/${_id}/${studentId}`
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const AddAttendance = createAsyncThunk(
    "course/add-attendance",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/attendance/addAttendance`,
                values
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

// ------------------------------------- Slice ---------------------------------------

let slice = createSlice({
    name: "course",
    initialState: {
        successMessage: "",
        errorMessage: "",
        showMessage: false,
        success: false,
        editSuccess: false,
        course: {},
        classDetails: {},
    },
    reducers: {
        HideErrorMessage: (state, action) => {
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;
            state.editSuccess = false;
            state.successMessage = "";
        },
    },

    extraReducers: {
        [AddCourse.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload.data.message;
        },

        [AddCourse.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditCourse.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload.data.message;
        },
        [EditCourse.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteCourse.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload.data.message;
        },

        [DeleteCourse.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [GetCourseByID.fulfilled]: (state, {payload}) => {
            state.course = payload;
        },
        [GetCourseByID.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [AddClass.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload.data.message;
        },
        [AddClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditClass.fulfilled]: (state, {payload}) => {
            state.editSuccess = true;
            state.success = true;
            state.successMessage = payload.data.message;
        },
        [EditClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteClass.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload.data.message;
        },
        [DeleteClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },

        [GetClassById.fulfilled]: (state, {payload}) => {
            state.classDetails = payload;
        },
        [GetClassById.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [AddDateInClass.fulfilled]: (state) => {
            state.success = true;
        },
        [AddDateInClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditDateInClass.fulfilled]: (state) => {
            state.success = true;
            state.editSuccess = true;
        },
        [EditDateInClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },

        [RemoveDateFromClass.fulfilled]: (state) => {
            state.success = true;
        },
        [RemoveDateFromClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },

        [AddStudentInClass.fulfilled]: (state) => {
            state.success = true;
        },
        [AddStudentInClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },

        [RemoveStudentFromClass.fulfilled]: (state) => {
            state.success = true;
        },
        [RemoveStudentFromClass.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },

        [AddAttendance.fulfilled]: (state) => {
            state.success = true;
        },
        [AddAttendance.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
