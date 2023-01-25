import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddStudent = createAsyncThunk(
    "student/add-student",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/student/addStudent`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditStudent = createAsyncThunk(
    "student/edit-student",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/student/EditStudent`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteStudent = createAsyncThunk(
    "student/delete-student",
    async (values, thunkAPI) => {
        try {
            console.log("delete reducer");
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/student/deleteStudent/${values}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetStudentByID = createAsyncThunk(
    "student/get-student-by-id",
    async (values, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/student/getStudentById/${values}`
            );
            console.log("get student response", response);
            if (response.status == 200) return response.data.student;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "student",
    initialState: {
        loading: false,
        errorMessage: "",
        successMessage: "",
        showMessage: false,
        success: false,
        deleteSuccess: false,
        student: {},
    },
    reducers: {
        HideErrorMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;
            state.deleteSuccess = false;
            state.successMessage = "";
        },
    },
    extraReducers: {
        [AddStudent.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [AddStudent.pending]: (state) => {
            state.loading = true;
        },
        [AddStudent.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditStudent.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [EditStudent.pending]: (state) => {
            state.loading = true;
        },
        [EditStudent.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteStudent.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.deleteSuccess = true;
            state.successMessage = payload;
        },
        [DeleteStudent.pending]: (state) => {
            state.loading = true;
        },
        [DeleteStudent.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [GetStudentByID.fulfilled]: (state, {payload}) => {
            state.student = payload;
        },
        [GetStudentByID.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
