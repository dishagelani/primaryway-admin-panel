import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddReport = createAsyncThunk(
    "Report/add-report",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/report/addReport`,

                values
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditReport = createAsyncThunk(
    "Report/edit-report",
    async ({_id, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/report/editReport/${_id}`,

                values
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteReport = createAsyncThunk(
    "Report/delete-report",
    async (_id, thunkAPI) => {
        try {
            console.log("delete reducer");
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/report/deleteReport/${_id}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetReportByID = createAsyncThunk(
    "Report/get-report-by-id",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/report/getReportById/${_id}`
            );
            console.log("get Report response", response);
            if (response.status == 200) return response.data.report;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "report",
    initialState: {
        errorMessage: "",
        successMessage: "",
        showMessage: false,
        success: false,
        editSuccess: false,
        report: {},
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
        [AddReport.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [AddReport.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditReport.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload;
        },
        [EditReport.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteReport.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [DeleteReport.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [GetReportByID.fulfilled]: (state, {payload}) => {
            state.report = payload;
        },
        [GetReportByID.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
