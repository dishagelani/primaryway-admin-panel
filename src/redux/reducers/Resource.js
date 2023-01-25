import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddResource = createAsyncThunk(
    "resource/add-Resource",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/resource/addResource`,
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
export const EditResource = createAsyncThunk(
    "resource/edit-Resource",
    async ({_id, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/resource/editResource/${_id}`,

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

export const DeleteResource = createAsyncThunk(
    "resource/delete-Resource",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/resource/deleteResource/${_id}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "resource",
    initialState: {
        errorMessage: "",
        successMessage: "",
        showMessage: false,
        success: false,
        editSuccess: false,
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
        [AddResource.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [AddResource.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditResource.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload;
        },
        [EditResource.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteResource.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [DeleteResource.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
